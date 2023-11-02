<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\JobLevel;
use App\Http\Requests\JobLevelStoreRequest;

class JobLevelController extends Controller
{
    /**
     * view data job level
     *
     */
    public function index(Request $req)
    {
        $joblevels = JobLevel::where('name','like','%'.$req->search.'%')->orderBy('created_at','desc')->paginate(5);
        $page = $req->page;
        return Inertia::render('Master/Joblevel/Index',['joblevels' => $joblevels, 'page' => $page]);
    }

    /**
     * store data master job level
     */
    public function store(JobLevelStoreRequest $req)
    {
        JobLevel::create([
            'name' => $req->name
        ]);
        return to_route('joblevel.index');
    }

    /**
     * edit job level
     */
    public function edit($id)
    {
        $joblevel = JobLevel::find($id);
        return $joblevel;
    }

    /**
     * update stage
     */
    public function update(JobLevelStoreRequest $req, $id)
    {
        JobLevel::where('id',$id)->update([
            'name' => $req->name
        ]);
        to_route('joblevel.index');
    }

    /**
     * delete stage
     */
    public function delete($id)
    {
        JobLevel::where('id',$id)->delete();
        return to_route('joblevel.index');
    }
}
