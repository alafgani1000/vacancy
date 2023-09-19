<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function home()
    {
        return Inertia::render('Welcome', []);
    }

    public function detail($id, $name)
    {
        return Inertia::render('Detail', []);
    }
}
