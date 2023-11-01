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
     * @return view
     */
    public function index(Request $req)
    {
        $stages = Stage::orderBy('id','desc')->where('name','like','%'.$req->search.'%')->paginate(5);
        $page = $req->page;
        return Inertia::render('Master/Stage/Index',['stages' => $stages, 'page' => $page]);
    }

    /**
     * store data master stage
     * @return view
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
     * view create new stage     *
     */
    public function create()
    {
        return Inertia::render('Master/Stage/Create');
    }

    /**
     * edit stage
     */
    public function edit($id)
    {
        $stage = Stage::find($id);
        return $stage;
    }

    /**
     * update stage
     */
    public function update(StageStoreRequest $request, $id)
    {
        Stage::where('id',$id)->update([
            'name' => $request->name,
            'desc' => $request->description
        ]);
        return to_route('stage.index');
    }

    /**
     * delete stage
     */
    public function delete($id)
    {
        Stage::where('id',$id)->delete();
        return to_route('stage.index');
    }

    public function pagination($currentPage, $totalPage, $jumlahPerpage)
    {
        $start = 0;
        $end = 0;
        if ($currentPage <= $totalPage) {
            $countBreak = round($currentPage / ($jumlahPerpage - 2.5));
            if ($currentPage >= 1 and $currentPage < $jumlahPerpage ) {
                $start = $jumlahPerpage - ($jumlahPerpage - 1);
                $end = $jumlahPerpage;
            } else {
                $start = ($countBreak - 1) * ($jumlahPerpage - 2) + 1;
                $end =  $start + ($jumlahPerpage-1);
            }
            if ($end > $totalPage) {
                $end = $totalPage;
            }
            return [$start, $end];
        }
    }
}
