<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Vacancy;

class ApplyController extends Controller
{
    public function displayForm($id)
    {
        $vacancy = Vacancy::find($id);
        return Inertia::render('Apply', ['vacancy' => $vacancy]);
    }

    public function apply(Request $request, $id)
    {
        dd($request->all());
    }


}
