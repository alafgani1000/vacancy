<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\UserCategory;
use App\Http\Requests\UserCategoryStoreRequest;

class UserCategoryController extends Controller
{
    /**
     * view data user category
     *
     */
    public function index(Request $req)
    {
        $userCategories = UserCategory::where('name','like','%'.$req->search.'%')->orderBy('created_at','desc')->paginate(5);
        $page = $req->page;
        return Inertia::render('Master/UserCategory/Index',['userCategories' => $userCategories, 'page' => $page]);
    }

    /**
     * store data master job level
     */
    public function store(UserCategoryStoreRequest $req)
    {
        UserCategory::create([
            'name' => $req->name
        ]);
        return to_route('user_category.index');
    }

    /**
     * edit job level
     */
    public function edit($id)
    {
        $userCategory = UserCategory::find($id);
        return $userCategory;
    }

    /**
     * update stage
     */
    public function update(UserCategoryStoreRequest $req, $id)
    {
        UserCategory::where('id',$id)->update([
            'name' => $req->name
        ]);
        to_route('user_category.index');
    }

    /**
     * delete stage
     */
    public function delete($id)
    {
        UserCategory::where('id',$id)->delete();
        return to_route('user_category.index');
    }
}
