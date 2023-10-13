<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\JobLevel;

class JobLevelController extends Controller
{
    /**
     * view data job level
     *
     */
    public function index()
    {
        $joblevels = JobLevel::paginate();
    }
}
