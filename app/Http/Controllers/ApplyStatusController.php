<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\ApplyStatus;
use App\Http\Requests\ApplyStatusStoreRequest;

class ApplyStatusController extends Controller
{
    /**
     * view data master status
     *
     */
    public function index(Request $req)
    {
        $status = ApplyStatus::where('name', 'like', '%'.$req->search.'%')->orderBy('id', 'desc')->paginate(5);
        $page = $req->page;
        return Inertia::render('Master/ApplyStatus/Index',['status' => $status, 'page' => $page]);
    }

    /**
     * store data master status
     */
    public function store(ApplyStatusStoreRequest $req)
    {
        ApplyStatus::create([
            'code' => $req->code,
            'name' => $req->name,
            'description' => $req->description

        ]);
        return to_route('apply-status.index');
    }

    /**
     * edit status
     */
    public function edit($id)
    {
        $status = ApplyStatus::find($id);
        return $status;
    }

    /**
     * update status
     */
    public function update(ApplyStatusStoreRequest $req, $id)
    {
        ApplyStatus::where('id',$id)->update([
            'code' => $req->code,
            'name' => $req->name,
            'description' => $req->description
        ]);
        return to_route('apply-status.index');
    }

    /**
     * delete stage
     */
    public function delete($id)
    {
        ApplyStatus::where('id',$id)->delete();
        return to_route('apply-status.index');
    }
}
