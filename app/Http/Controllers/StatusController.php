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
        $status = Status::paginate(5);
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

}
