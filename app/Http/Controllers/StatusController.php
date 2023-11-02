<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Status;
use App\Http\Requests\StatusStoreRequest;

class StatusController extends Controller
{
    /**
     * view data master status
     *
     */
    public function index(Request $req)
    {
        $status = Status::where('name', 'like', '%'.$req->search.'%')->orderBy('id', 'desc')->paginate(5);
        $page = $req->page;
        return Inertia::render('Master/Status/Index',['status' => $status, 'page' => $page]);
    }

    /**
     * store data master status
     */
    public function store(StatusStoreRequest $req)
    {
        Status::create([
            'name' => $req->name,
            'desc' => $req->description
        ]);
        return to_route('status.index');
    }

    /**
     * edit status
     */
    public function edit($id)
    {
        $status = Status::find($id);
        return $status;
    }

    /**
     * update status
     */
    public function update(StatusStoreRequest $req, $id)
    {
        Status::where('id',$id)->update([
            'name' => $req->name,
            'desc' => $req->description
        ]);
        return to_route('status.index');
    }

    /**
     * delete stage
     */
    public function delete($id)
    {
        Status::where('id',$id)->delete();
        return to_route('status.index');
    }

}
