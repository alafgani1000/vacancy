<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Vacancy;
use App\Models\WorkType;
use App\Models\JobLevel;
use App\Models\Status;
use App\Http\Requests\VacancyStoreRequest;

class VacancyController extends Controller
{
    /**
     * display all vacancy
     */
    public function index()
    {
        $vacancies = Vacancy::with('type')->with('level')->orderBy('created_at','desc')->paginate(6);
        return Inertia::render('Vacancy/Index', ['vacancies' => $vacancies]);
    }

    /**
     * display form create vacancy
     */
    public function create()
    {
        $workTypes = WorkType::all();
        $jobLevels = JobLevel::all();
        return Inertia::render('Vacancy/Create', ['workTypes' => $workTypes, 'jobLevels' => $jobLevels]);
    }

    /**
     * display detail vacancy
     */
    public function detail()
    {
        return Inertia::render('Vacancy/Detail',[]);
    }

    /**
     * store vacancy
     *  */
    public function store(VacancyStoreRequest $request)
    {
        Vacancy::create([
            'user_id' => Auth::user()->id,
            'job_name' => $request->title,
            'description' => $request->description,
            'qualification' => $request->qualification,
            'job_desc' => $request->job_desc,
            'work_type_id' => $request->work_type,
            'jobs_level_id' => $request->job_level,
            'end_date' => $request->end_date,
            'city' => $request->city,
            'country' => $request->country,
            'status_id' => Status::creat()->first()->id
        ]);
        return to_route('vacancy.index');
    }

    /**
     * display detail vacancy for job seeker
     */
    public function vacancyDetail($id, $name)
    {
        return Inertia::render('Detail');
    }

    /**
     * display form apply
     */
    public function apply(Request $request)
    {
        return Inertia::render('Apply');
    }
}
