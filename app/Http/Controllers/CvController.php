<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\UserSkill;
use App\Models\UserEducation;
use App\Models\UserWorkHistory;
use App\Models\User;
use App\Http\Requests\EducationStoreRequest;
use App\Http\Requests\WorkHistoryStoreRequest;
use App\Http\Requests\SkilStoreRequest;
use Illuminate\Support\Facades\Storage;
use Response as Res;

class CvController extends Controller
{
    public function index()
    {
        $educations = Auth::user()->educations;
        $histories = Auth::user()->workHisories;
        $skills = Auth::user()->skills;
        return Inertia::render('Cv/Index', ['educations' => $educations, 'histories' => $histories, 'skills' => $skills]);
    }

    public function uploadPhoto(Request $request)
    {
        $file = $request->file('file');
        $name = $file->hashName();
        $file_name = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        /**
         * byte to kb 1024
         */
        $size = $file->getSize();
        $path = $file->storeAs('profiles', $name);
        Auth::user()->update([
            'foto' => $path,
        ]);
        return 'File Uploaded';
    }

    protected function showImage($filename)
    {
        $exists = file_exists(storage_path('app/profiles/'.$filename));
        if ($exists) {
            return response()->file(storage_path('app/profiles/'.$filename));
        } else {
            return response()->file(storage_path('app/profiles/default.jpg'));
        }

    }

    public function storeEducation(EducationStoreRequest $request)
    {
        UserEducation::create([
            'user_id' => Auth::user()->id,
            'start' => $request->start,
            'end' => $request->end,
            'name' => $request->name,
            'major' => $request->major,
            'degree' => $request->degree
        ]);

        return to_route('cv.index');
    }

    public function editEducation($id)
    {
        $education = UserEducation::find($id);
        return $education;
    }

    public function updateEducation(EducationStoreRequest $request, $id)
    {
        UserEducation::where('id',$id)->update([
            'start' => $request->start,
            'end' => $request->end,
            'name' => $request->name,
            'major' => $request->major,
            'degree' => $request->degree,
        ]);

        return to_route('cv.index');
    }

    public function deleteEducation($id)
    {
        UserEducation::where('id',$id)->delete();
        return  to_route('cv.index');
    }

    public function storeWorkHistory(WorkHistoryStoreRequest $request)
    {
        UserWorkHistory::create([
            'user_id' => Auth::user()->id,
            'start' => $request->start,
            'end' => $request->end,
            'company' => $request->company,
            'job_desc' => $request->job_desc
        ]);

        return to_route('cv.index');
    }

    public function editWorkHistory($id)
    {
        $workHistory = UserWorkHistory::find($id);
        return $workHistory;
    }

    public function updateWorkHistory(WorkHistoryStoreRequest $request, $id)
    {
        UserWorkHistory::where('id',$id)->update([
            'start' => $request->start,
            'end' => $request->end,
            'company' => $request->company,
            'job_desc' => $request->job_desc
        ]);

        return to_route('cv.index');
    }

    public function deleteWorkHistory($id)
    {
        $delete = UserWorkHistory::where('id',$id)->delete();

        return to_route('cv.index');
    }

    public function storeSkill(SkilStoreRequest $request)
    {
        UserSkill::create([
            'user_id' => Auth::user()->id,
            'description' => $request->skill
        ]);

        return to_route('cv.index');
    }

    public function editSkill($id)
    {
        $skil = UserSkill::find($id);
        return $skill;
    }

    public function updateSkill(SkilStoreRequest $request, $id)
    {
        UserSkill::where('id',$id)->update([
            'description' => $request->skill
        ]);

        return to_route('cv.index');
    }

    public function deleteSkill($id)
    {
        UserSkill::where('id',$id)->delete();
        return to_route('cv.index');
    }


}
