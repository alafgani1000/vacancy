<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Vacancy;
use App\Models\UserSkill;
use App\Models\UserEducation;
use App\Models\UserWokrHistory;
use App\Models\User;
use App\Models\VacancyApply;
use App\Models\Stage;
use App\Models\ApplyStatus;
use App\Models\Selection;
use App\Jobs\ProcessInvite;
use App\Jobs\ProcessRejected;
use App\Jobs\ProcessPassed;
use App\Mail\InviteCandidateMail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Mail;
use Illuminate\Contracts\Database\Eloquent\Builder;

class ApplyController extends Controller
{
    public function displayForm($id)
    {
        $vacancy = Vacancy::find($id);
        $allow = true;
        if (isset(Auth::user()->id)) {
            $apply = VacancyApply::where('user_apply', Auth::user()->id)->where('vacancy_id',$id)->first();
            if (!is_null($apply)) {
                $allow = false;
            }
        }
        if ($allow) {
            return Inertia::render('Apply', ['vacancy' => $vacancy]);
        } else {
            return to_route('home');
        }
    }

    public function apply(Request $request, $id)
    {
        $foto = Auth::user()->foto;
        $edu = Auth::user()->educations;
        $skill = Auth::user()->skills;
        $work = Auth::user()->workHisories;
        $message = collect([]);

        // cek
        !isset($foto) ? $message->put('foto', 'Please upload your photo') : "";
        $edu->count() == 0 ? $message->put('edu', 'Please fill education data') : "";
        $skill->count() == 0 ? $message->put('skill', 'Please fill skill data') : "";
        $work->count() == 0 ? $message->put('work', 'Please fill work histories data') : "";

        // response
        if ($message->count() > 0) {
            $message->put('process', 'error');
            return response($message);
        } else {
            VacancyApply::create([
                'vacancy_id' => $id,
                'user_apply' => Auth::user()->id,
                'stage_id' => Stage::apply()->first()->id,
                'apply_status_id' => ApplyStatus::apply()->first()->id,
                'message' => $request->description
            ]);
            $message->put('process', 'success');
            return response($message);
        }
    }

    public function applyHistories()
    {
        $applies = VacancyApply::with([
                'vacancy',
                'stage',
                'status',
                'vacancy.user',
                'vacancy.user.company',
                'selections' => function (Builder $query) {
                    $query->whereNull('read_at');
                }
            ])
        ->where('user_apply', Auth::user()->id)
        ->orderBy('created_at','desc')
        ->paginate(6);
        return Inertia::render('HistoryApply/Index', ['applies' => $applies]);
    }

    public function readSelection($applyId)
    {
        $selection = Selection::where('vacancy_apply_id', $applyId)->update([
            'read_at' => now()
        ]);
    }

    public function index()
    {
        $vacancies = Vacancy::with(['user','type','level','applies','applies.userApply'])
            ->where('user_id',Auth::user()->id)
            ->orderBy('published_at','desc')
            ->paginate(6);
        return Inertia::render('Apply/Index', ['vacancies' => $vacancies]);
    }

    public function detailApply(Request $req, $id)
    {
        $offset = isset($req->offset) ? $req->offset : 0;
        $limit = isset($req->limit) ? $req->limit : 100;
        $applies = VacancyApply::with(['vacancy','stage','status','userApply','selections','selections.stage'])
            ->whereRelation('status','code','!=','rejected')
            ->whereRelation('status','code','!=','pass')
            ->where('vacancy_id',$id)
            ->offset($offset)
            ->limit($limit)
            ->orderBy('updated_at','desc')
            ->get();
        $vacancy = Vacancy::where('id',$id)->first();
        $stagesdata = Stage::all();
        $statusData = ApplyStatus::all();
        return Inertia::render('Apply/DetailApply', [
            'applies' => $applies,
            'vacancy' => $vacancy,
            'stagesdata' => $stagesdata,
            'statusData' => $statusData
        ]);
    }

    public function loadMoreApply(Request $req, $id)
    {
        $offset = isset($req->offset) ? $req->offset : 20;
        $limit = isset($req->limit) ? $req->limit : 20;
        $stage = $req->stage;
        $applies = VacancyApply::with(['vacancy','stage','status','userApply'])
            ->whereRelation('status','code','!=','rejected')
            ->whereRelation('status','code','!=','pass')
            ->where('vacancy_id',$id)
            ->where('stage_id', $stage)
            ->offset($offset)
            ->limit($limit)
            ->orderBy('updated_at','desc')
            ->get();
        $vacancy = Vacancy::where('id',$id)->first();
        return $applies;
    }

    public function invites(Request $req, $id)
    {
        $offset = isset($req->offset) ? $req->offset : 0;
        $limit = isset($req->limit) ? $req->limit : 100;
        $idApplies = VacancyApply::where('vacancy_id',$id)
            ->orderBy('updated_at','desc')
            ->get();
        $invites = Selection::whereIn('vacancy_apply_id', $idApplies->pluck('id'))
            ->with(['vacancyApply.userApply'])
            ->with('user')
            ->with('stage')
            ->offset($offset)
            ->limit($limit)
            ->get();
        return $invites;
    }

    public function loadMoreInvites(Request $req, $id)
    {
        $offset = isset($req->offset) ? $req->offset : 0;
        $limit = isset($req->limit) ? $req->limit : 100;
        $idApplies = VacancyApply::where('vacancy_id',$id)
            ->orderBy('updated_at','desc')
            ->get();
        $invites = Selection::whereIn('vacancy_appy_id', $idApplies->pluck('id'))
            ->offset($offset)
            ->limit($limit)
            ->get();
        return $invites;
    }

    public function dataApplyReject(Request $req, $id)
    {
        $applies = VacancyApply::with(['vacancy','stage','status','userApply','selections','selections.stage'])
            ->whereRelation('status','code','=','rejected')
            ->where('vacancy_id',$id)
            ->orderBy('updated_at','desc')
            ->get();
        return $applies;
    }

    public function dataApplyPass(Request $req, $id)
    {
        $applies = VacancyApply::with(['vacancy','stage','status','userApply','selections','selections.stage'])
            ->whereRelation('status','code','=','pass')
            ->where('vacancy_id',$id)
            ->orderBy('updated_at','desc')
            ->get();
        return $applies;
    }

    public function invite(Request $req, $id)
    {
        $dateInterview = $req->date_interview;
        $timeInterview = $req->time_interview;
        $stageId = $req->stage;
        $withConfirm = $req->with_confirm;
        $userId = Auth::user()->id;
        $applies = $req->apply;
        foreach($applies as $apply) {
            $user = User::where('id',$apply['user_apply'])->first();
            $name = $user->first_name." ".$user->last_name;
            ProcessInvite::dispatch($stageId, $apply['id'], $dateInterview, $timeInterview, $userId, $withConfirm);
            Mail::to($user)->send(new InviteCandidateMail($dateInterview, $timeInterview, $name, $withConfirm));
        }
        return "Candidate Invite in Process";
    }

    public function confirmation($id)
    {
        Selection::where('id',$id)->update([
            'confirmation' => 1
        ]);
        return "Confirmation Success";
    }

    public function selections($id)
    {
        $selections = Selection::with('stage')->where('vacancy_apply_id', $id)->get();
        $read = $this->readSelection($id);
        return $selections;
    }

    public function reject(Request $req)
    {
        $applies = $req->apply;
        $appliesColl = collect($applies);
        $job = ProcessRejected::dispatch($appliesColl->pluck('id'), Auth::user()->id);
        return 'Reject Success';
    }

    public function pass(Request $req)
    {
        $applies = $req->apply;
        $appliesColl = collect($applies);
        ProcessPassed::dispatch($appliesColl->pluck('id'), Auth::user()->id);
        return "Success";
    }

    public function done($id)
    {
        $reject = VacancyApply::where('id',$id)->update([
            'apply_status_id' => ApplyStatus::rejected()->first()->id
        ]);
        return "Process Selection Is Done";
    }

    function changeApplyStatus(Request $req, $id)
    {
        $applies = $req->apply;
        $appliesColl = collect($applies);
        $change = VacancyApply::where('vacancy_id',$id)->whereIn('id',$appliesColl->pluck('id'))->update([
            'apply_status_id' => $req->status
        ]);

        $applies = VacancyApply::with(['vacancy','stage','status','userApply','selections','selections.stage'])
            ->whereRelation('status','code','=','rejected')
            ->where('vacancy_id',$id)
            ->orderBy('updated_at','desc')
            ->get();
        return $applies;
    }

    function changeApplyPassStatus(Request $req, $id)
    {
        $applies = $req->apply;
        $appliesColl = collect($applies);
        $change = VacancyApply::where('vacancy_id',$id)->whereIn('id',$appliesColl->pluck('id'))->update([
            'apply_status_id' => $req->status
        ]);

        $applies = VacancyApply::with(['vacancy','stage','status','userApply','selections','selections.stage'])
            ->whereRelation('status','code','=','pass')
            ->where('vacancy_id',$id)
            ->orderBy('updated_at','desc')
            ->get();
        return $applies;
    }


}
