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
use Illuminate\Support\Facades\Auth;

class ApplyController extends Controller
{
    public function displayForm($id)
    {
        $vacancy = Vacancy::find($id);
        return Inertia::render('Apply', ['vacancy' => $vacancy]);
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
                'message' => $request->desription
            ]);
            $message->put('process', 'success');
            return response($message);
        }
    }

    public function applyHistory()
    {
        $applies = VacancyApply::orderBy('created_at','desc')->paginate(6);
        return Inertia::render('Vacancy/Index', ['vacancies' => $vacancies]);
    }
}
