<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\InviteStatus;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\InviteStatusStoreRequest;

class InviteStatusController extends Controller
{
    /**
     * view data master invite status
     * @return view
     */
    public function index(Request $req)
    {
        $inviteStatus = InviteStatus::orderBy('id','desc')->where('name','like','%'.$req->search.'%')->paginate(5);
        $page = $req->page;
        return Inertia::render('Master/InviteStatus/Index',['inviteStatus' => $inviteStatus, 'page' => $page]);
    }

    /**
     * data invite status
     * @return stages
     */
    public function stages()
    {
        return InviteStatus::all();
    }

    /**
     * store data master invite status
     * @return view
     */
    public function store(InviteStatusStoreRequest $request)
    {
        InviteStatus::create([
            'code' => $request->code,
            'name' => $request->name,
            'description' => $request->description
        ]);
        return to_route('invite-status.index');
    }

    /**
     * view create new invite status     *
     */
    public function create()
    {
        return Inertia::render('Master/InviteStatus/Create');
    }

    /**
     * edit invite status
     */
    public function edit($id)
    {
        $inviteStatus = InviteStatus::find($id);
        return $inviteStatus;
    }

    /**
     * update invite status
     */
    public function update(InviteStatusStoreRequest $request, $id)
    {
        InviteStatus::where('id',$id)->update([
            'code' => $request->code,
            'name' => $request->name,
            'description' => $request->description
        ]);
        return to_route('invite-status.index');
    }

    /**
     * delete invite status
     */
    public function delete($id)
    {
        InviteStatus::where('id',$id)->delete();
        return to_route('invite-status.index');
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
