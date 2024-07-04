<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobLists;
use Illuminate\Support\Facades\Auth;

class JobListsController extends Controller
{
    public function data(Request $request)
    {
        $data = JobLists::where('user_id', Auth::user()->id)
            ->where('model',$request->model)
            ->where('action', $request->action)
            ->where('status',0)
            ->get()
            ->count();
        $ch = JobLists::where('user_id', Auth::user()->id)
            ->where('model',$request->model)
            ->where('action', $request->action)
            ->where('status',0)
            ->first();
        if (!is_null($ch)) {
            $ch->status = 1;
            $ch->save();
        }
        return $data;
    }
}
