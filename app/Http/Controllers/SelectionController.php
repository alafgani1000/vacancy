<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Selection;

class SelectionController extends Controller
{
    public function index(Request $request)
    {
        $ofset = isset($request->offset) ? $request->ofset : 0;
        $limit = isset($request->limit) ? $request->limit : 100;
        $selections;
    }

    public function selection(Request $request)
    {
        $selection = Selection::where('id', $id)->first();
        return $selection;
    }
}
