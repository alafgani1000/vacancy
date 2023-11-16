<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\UserSkill;
use App\Models\UserEducation;
use App\Models\UserWorkHistory;
use App\Http\Requests\EducationStoreRequest;
use App\Http\Requests\WorkHistoryStoreRequest;
use App\Http\Requests\SkillStoreRequest;

class CvController extends Controller
{
    public function index()
    {
        return Inertia::render('Cv/Index');
    }

    public function uploadFoto(Request $request)
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
        File::create([
            'name' => $path,
        ]);
        return 'File Uploaded';
    }

    public function storeEducation(EducationStoreRequest $request)
    {
        UserSkill::create([
            'user_id' => Auth::user()->id,
            'start' => $request->from,
            'end' => $request->to,
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
        UserSkill::where('id',$id)->update([
            'start' => $request->form,
            'end' => $request->to,
            'name' => $request->name,
            'major' => $request->major,
            'degree' => $request->degree,
        ]);

        return to_route('cv.index');
    }

    public function deleteEducation($id)
    {
        UserSkill::where('id',$id)->delete();
        return  to_route('cv.index');
    }

    public function storeWorkHistory(WorkHistorStoreRequest $request)
    {
        UserWorkHistory::create([
            'user_id' => Auth::user()->id,
            'description' => $request->description
        ]);

        return to_route('cv.index');
    }

    public function editWorkHistory($id)
    {
        $workHistory = UserWorkHistory::find($id);
        return $workHistory;
    }

    public function updateWorkHistory(WorkHistorStoreRequest $request, $id)
    {
        UserWorkHistory::where('id',$id)->update([
            'description' => $request->description
        ]);

        return to_route('cv.index');
    }

    public function deleteWorkHistory($id)
    {
        $delete = UserWorkHistory::where('id',$id)->delete();

        return to_route('cv.index');
    }

    public function storeSkill(SkillStoreRequest $request)
    {
        UserSkill::create([
            'description' => $request->description
        ]);

        return to_route('cv.index');
    }

    public function editSkill($id)
    {
        $skil = UserSkill::find($id);
        return $skill;
    }

    public function updateSkill(SkillStoreRequest $request, $id)
    {
        UserSkill::where('id',$id)->update([
            'description' => $request->description
        ]);

        return to_route('cv.index');
    }

    public function deleteSkill($id)
    {
        UserSkill::where('id',$id)->delete();
        return to_route('cv.index');
    }


}
