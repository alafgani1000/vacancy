<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Vacancy;
use App\Models\VacancyApply;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function home()
    {
        $vacancies = Vacancy::with(['type','level','status','user','user.company'])->whereHas('status', function(Builder $query) {
            $query->where('name', 'like', '%'.'Publish'.'%');
        })->paginate(10);
        return Inertia::render('Welcome', ['vacancies' => $vacancies]);
    }

    public function detail($id, $name)
    {
        $vacancy= Vacancy::with(['type','level','status','user','user.company'])->whereHas('status', function(Builder $query) {
            $query->where('name', 'like', '%'.'Publish'.'%');
        })
        ->where('id',$id)
        ->first();
        $apply = VacancyApply::where('user_apply', Auth::user()->id)->where('vacancy_id',$vacancy->id)->first();
        return Inertia::render('Detail', ['vacancy' => $vacancy, 'apply' => $apply]);
    }
}
