<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Stage;
use App\Http\Request\SageStoreRequest;

class StageController extends Controller
{
    /**
     * view data master stages
     *
     */
    public function index()
    {
        $stages = Stage::all();
        return Inertia::render('Master/Stage/Index',['stages' => $stages]);
    }

    /**
     * store data master stage
     *
     */
    public function store(StageStoreRequest $request)
    {
        Stage::create([
            'name' => $request->name,
            'desc' => $request->desc
        ]);

    }

    /**
     * view create new stage
     *
     */
    public function create()
    {
        return Inertia::render('Master/Stage/Create');
    }
}
