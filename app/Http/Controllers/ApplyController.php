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
        $file = $req->file('file');
        $name = $file->hashName();
        $file_name = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        /**
         * byte to kb 1024
         */
        $size = $file->getSize();
        $path = $file->storeAs('documents', $name);
        File::create([
            'category_id' => $req->category,
            'name' => $path,
            'file_name' => $file_name,
            'size' => $size,
            'file_type' => $extension,
            'visibility_id' => 1,
            'user_id' => Auth::user()->id
        ]);
        return 'File Uploaded';
    }


}
