<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Stage;
use App\Http\Requests\StageStoreRequest;

class StageController extends Controller
{
    /**
     * view data master stages
     *
     */
    public function index()
    {
        $stages = Stage::paginate(1);
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
            'desc' => $request->description
        ]);
        return to_route('stage.index');
    }

    /**
     * view create new stage
     *
     */
    public function create()
    {
        return Inertia::render('Master/Stage/Create');
    }

    public function pagination($currentPage, $jumlahPage)
    {
        $perPage = 5;
        $break = 4;
        $start = 0;
        $end = 0;
        if($currentPage == 1) {
            $start = 1;
            $end = 5;
        } else {
            if ($currentPage >= 1 and $currentPage <= 4) {
                $start = ($perPage - $currentPage) - ($perPage - ($perPage - $currentPage));
                $start = $start < 0 ? $start * -1 : $start;
                $end = $currentPage + ($perPage - $currentPage);
            } else {
                $start = 5 - 1; //5 (5 + 3) (5-3);
                $end = 5 + 3;

                $start = 6 - 2; //6
                $end = 6 + 2;

                $start = 7 - 3; //7
                $end = 7 + 1;

                $start = 8 - 1; //8
                $end = 8 + 3;

                $start = 9 - 2; //9
                $end = 9 + 2;

                $start = 10 - 3; //
                $end = 10 + 1;

                $start = 11 - 1;
                $end = 11 + 3;

                $start = 12 - 2;
                $end = 12 + 2;
            }

        }
    }
}
