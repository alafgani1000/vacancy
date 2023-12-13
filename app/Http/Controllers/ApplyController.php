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
use App\Jobs\ProcessInvite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

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
                'apply_status_id' => ApplyStatus::wait()->first()->id,
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
                'vacancy.user.company'
            ])
        ->where('user_apply', Auth::user()->id)
        ->orderBy('created_at','desc')
        ->paginate(6);
        return Inertia::render('HistoryApply/Index', ['applies' => $applies]);
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
        $applies = VacancyApply::with(['vacancy','stage','status','userApply'])->where('vacancy_id',$id)->offset($offset)->limit($limit)->get();
        $vacancy = Vacancy::where('id',$id)->first();
        return Inertia::render('Apply/DetailApply', ['applies' => $applies, 'vacancy' => $vacancy]);
    }

    public function loadMoreApply(Request $req, $id)
    {
        $offset = isset($req->offset) ? $req->offset : 0;
        $limit = isset($req->limit) ? $req->limit : 100;
        $applies = VacancyApply::with(['vacancy','stage','status','userApply'])->where('vacancy_id',$id)->offset($offset)->limit($limit)->get();
        $vacancy = Vacancy::where('id',$id)->first();
        return $applies;
    }

    public function invite(Request $req, $id)
    {
        $message = $req->message;
        $stageId = $req->stage;
        $userId = Auth::user()->id;
        $applies = $req->apply;
        foreach($applies as $apply) {
            ProcessInvite::dispatch($stageId, $apply['id'], $message, $userId);
        }
        return "Candidate Invite in Process";
    }

}
