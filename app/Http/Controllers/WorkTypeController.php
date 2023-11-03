<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\WorkType;
use App\Http\Requests\WorkTypeStoreRequest;

class WorkTypeController extends Controller
{
    /**
     * view data work type
     *
     */
    public function index(Request $req)
    {
        $worktypes = WorkType::where('name','like','%'.$req->search.'%')->orderBy('created_at','desc')->paginate(5);
        $page = $req->page;
        return Inertia::render('Master/Worktype/Index',['worktypes' => $worktypes, 'page' => $page]);
    }

    /**
     * store data master work type
     */
    public function store(WorkTypeStoreRequest $req)
    {
        WorkType::create([
            'name' => $req->name
        ]);
        return to_route('worktype.index');
    }

    /**
     * edit work type
     */
    public function edit($id)
    {
        $worktype = WorkType::find($id);
        return $worktype;
    }

    /**
     * update work type
     */
    public function update(WorkTypeStoreRequest $req, $id)
    {
        WorkType::where('id',$id)->update([
            'name' => $req->name
        ]);
        to_route('worktype.index');
    }

    /**
     * delete stage
     */
    public function delete($id)
    {
        WorkType::where('id',$id)->delete();
        return to_route('worktype.index');
    }
}
