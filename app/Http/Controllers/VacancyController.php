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
use App\Http\Requests\VacancyPublishRequest;

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
    public function detail($id)
    {
        $vacancy = Vacancy::with('type')->with('level')->where('id',$id)->first();
        return Inertia::render('Vacancy/Detail',['vacancy' => $vacancy]);
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
     * view form edit
     */
    public function edit($id)
    {
        $vacancy = Vacancy::where('id',$id)->first();
        $workTypes = WorkType::all();
        $jobLevels = JobLevel::all();
        return Inertia::render('Vacancy/Edit',['vacancy' => $vacancy, 'workTypes' => $workTypes, 'jobLevels' => $jobLevels]);
    }

    /**
     * update vacancy
     */
    public function update(VacancyStoreRequest $request, $id)
    {
        Vacancy::where('id',$id)->update([
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
        ]);
        return to_route('vacancy.index');
    }

    /**
     * publish vacancy
     */
    public function publish(VacancyPublishRequest $request, $id)
    {
        Vacancy::where('id',$id)->update([
            'status_id' => Status::published()->first()->id,
            'published_at' => $request->published_at
        ]);
        return to_route('vacancy.index');
    }

    /**
     * unpublish vacancy
     */
    public function unpblish($id)
    {
        Vacancy::where('id',$id)->update([
            'status_id' => Status::creat()->first()->id,
            'published_at' => NULL
        ]);
        return to_route('vacancy.index');
    }

    /**
     * display form apply
     */
    public function apply(Request $request)
    {
        return Inertia::render('Apply');
    }
}
