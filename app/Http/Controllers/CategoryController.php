<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Requests\CategoryStoreRequest;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{

    /**
     * view data user category
     *
     */
    public function index(Request $req)
    {
        $categories = Category::where('name','like','%'.$req->search.'%')->orderBy('created_at','desc')->paginate(5);
        $page = $req->page;
        return Inertia::render('Master/Category/Index',['categories' => $categories, 'page' => $page]);
    }

    /**
     * store data master job level
     */
    public function store(CategoryStoreRequest $request)
    {
        Category::create([
            'code' => $request->code,
            'name' => $request->name
        ]);
        return to_route('category.index');
    }

    /**
     * edit job level
     */
    public function edit($id)
    {
        $category = Category::find($id);
        return $category;
    }

    /**
     * update stage
     */
    public function update(CategoryStoreRequest $request, $id)
    {
        Category::where('id',$id)->update([
            'code' => $request->code,
            'name' => $request->name
        ]);
        to_route('category.index');
    }

    /**
     * delete stage
     */
    public function delete($id)
    {
        Category::where('id',$id)->delete();
        return to_route('category.index');
    }
}
