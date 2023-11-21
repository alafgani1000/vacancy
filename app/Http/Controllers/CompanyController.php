<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;

class CompanyController extends Controller
{
    public function index()
    {
        $company = Company::where('user_id',Auth::user()->id)->first();
        return Inertia::render('Company/Index', ['company' => $company]);
    }

    public function uploadLogo(Request $request, $id)
    {
        $file = $request->file('file');
        $name = $file->hashName();
        $file_name = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        /**
         * byte to kb 1024
         */
        $size = $file->getSize();
        $path = $file->storeAs('company', $name);
        Company::where('id',$id)->update([
            'logo' => $path,
        ]);
        to_route('company.index');
    }

    protected function showImage($filename)
    {
        $exists = file_exists(storage_path('app/company/'.$filename));
        if ($filename) {
            return response()->file(storage_path('app/company/'.$filename));
        } else {
            return response()->file(storage_path('app/company/default.jpg'));
        }

    }

    public function update(Request $request, $id)
    {
        Company::where('id',$id)->update([
            'name' => $request->name,
            'hp_number' => $request->phone_number,
            'desc' => $request->description
        ]);

        to_route('company.index');
    }
}
