<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class VacancyController extends Controller
{
    /**
     * display all vacancy
     */
    public function index()
    {
        return Inertia::render('Vacancy/Index', []);
    }

    /**
     * display form create vacancy
     */
    public function create()
    {
        return Inertia::render('Vacancy/Create', []);
    }

    /**
     * store vacancy
     *  */
    public function store(Request $reques)
    {

    }
}
