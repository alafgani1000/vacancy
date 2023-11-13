<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Vacancy;

class HomeController extends Controller
{
    public function home()
    {
        $vacancies = Vacancy::with(['type','level','status'])->whereHas('status', function(Builder $query) {
            $query->where('name', 'like', '%'.'Publish'.'%');
        })->paginate(10);
        return Inertia::render('Welcome', ['vacancies' => $vacancies]);
    }

    public function detail($id, $name)
    {
        $vacancy= Vacancy::with(['type','level','status'])->whereHas('status', function(Builder $query) {
            $query->where('name', 'like', '%'.'Publish'.'%');
        })
        ->where('id',$id)
        ->first();
        return Inertia::render('Detail', ['vacancy' => $vacancy]);
    }
}
