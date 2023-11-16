<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VacancyController;
use App\Http\Controllers\StageController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JobLevelController;
use App\Http\Controllers\WorkTypeController;
use App\Http\Controllers\UserCategoryController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ApplyController;
use App\Http\Controllers\CvController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'home'])->name('home');
Route::get('/detail/{id}/{name}', [HomeController::class, 'detail'])->name('detail');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth','verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::patch('/personal-data', [ProfileController::class, 'updatePersonalData'])->name('personal-data.update');

    // apply
    Route::get('/vacancy/{id}/apply', [ApplyController::class, 'displayForm'])->name('vacancy.display-apply');
    Route::put('/vacancy/{id}/apply', [ApplyController::class, 'apply'])->name('vacancy.apply');
    Route::get('/apply-history', [ApplyController::class, 'applyHistory'])->name('apply.history');

    Route::middleware(['userverified'])->group(function () {
        Route::get('/vacancy', [VacancyController::class, 'index'])->name('vacancy.index');
        Route::get('/vacancy/create', [VacancyController::class, 'create'])->name('vacancy.create');
        Route::get('/vacancy/{id}/detail', [VacancyController::class, 'detail'])->name('vacancy.detail');
        Route::post('/vacancy', [VacancyController::class, 'store'])->name('vacancy.store');
        Route::get('/vacancy/{id}/edit', [VacancyController::class, 'edit'])->name('vacancy.edit');
        Route::patch('/vacancy/{id}/update', [VacancyController::class, 'update'])->name('vacancy.update');
        Route::patch('/vacancy/{id}/publish', [VacancyController::class, 'publish'])->name('vacancy.publish');
        Route::patch('/vacancy/{id}/unpublish', [VacancyController::class, 'unpublish'])->name('vacancy.unpublish');
    });

    Route::controller(CvController::class)->prefix('cv')->group(function () {
        // inde cv
        Route::get('/', 'index')->name('cv.index');
        // education
        Route::post('/education', 'storeEducation')->name('education.store');
        Route::get('/education/{id}/edit')->name('education.edit');
        Route::put('/education/{id}/update')->name('education.update');
        Route::delete('education/{id}/delete')->name('education.delete');
        // work history
        Route::post('/work-history', 'storeWorkHistory')->name('workhistory.store');
        Route::get('/work-history/{id}/edit', 'editWorkHistory')->name('workhistory.edit');
        Route::put('/work-history/{id}/update', 'updateWorkHistory')->name('workhistory.update');
        Route::delete('/work-history/{id}/delete', 'deleteWorkHistory')->name('workhistory.delete');
        // skill
        Route::post('/skill', 'storeSkill')->name('skill.store');
        Route::get('/skill/{id}/edit')->name('skill.edit');
        Route::put('/skill/{id}/update')->name('skill.update');
        Route::delete('/skill/{id}/delete')->name('skill.delete');
    });

    Route::middleware(['admin'])->group(function () {
        // stage
        Route::controller(StageController::class)->group(function () {
            Route::get('/stage', 'index')->name('stage.index');
            Route::post('/stage', 'store')->name('stage.store');
            Route::get('/stage/{id}/edit', 'edit')->name('stage.edit');
            Route::put('/stage/{id}/update', 'update')->name('stage.update');
            Route::delete('/stage/{id}/delete', 'delete')->name('stage.delete');
        });

        // status
        Route::controller(StatusController::class)->group(function () {
            Route::get('/status', 'index')->name('status.index');
            Route::post('/status', 'store')->name('status.store');
            Route::get('/status/{id}/edit', 'edit')->name('status.edit');
            Route::put('/status/{id}/update', 'update')->name('status.update');
            Route::delete('/status/{id}/delete', 'delete')->name('status.delete');
        });

        // job level
        Route::controller(JobLevelController::class)->group(function () {
            Route::get('/job-level', 'index')->name('joblevel.index');
            Route::post('/job-level', 'store')->name('joblevel.store');
            Route::get('/job-level/{id}/edit', 'edit')->name('joblevel.edit');
            Route::put('/job-level/{id}/update', 'update')->name('joblevel.update');
            Route::delete('/job-level/{id}/delete', 'delete')->name('joblevel.delete');
        });

        // work type
        Route::controller(WorkTypeController::class)->group(function () {
            Route::get('/work-type', 'index')->name('worktype.index');
            Route::post('/work-type', 'store')->name('worktype.store');
            Route::get('/work-type/{id}/edit', 'edit')->name('worktype.edit');
            Route::put('/work-type/{id}/update', 'update')->name('worktype.update');
            Route::delete('/work-type/{id}/delete', 'delete')->name('worktype.delete');
        });

        // user category
        Route::controller(UserCategoryController::class)->group(function () {
            Route::get('/user-category', 'index')->name('user_category.index');
            Route::post('/user-category', 'store')->name('user_category.store');
            Route::get('/user-category/{id}/edit', 'edit')->name('user_category.edit');
            Route::put('/user-category/{id}/update', 'update')->name('user_category.update');
            Route::delete('/user-category/{id}/delete', 'delete')->name('user_category.delete');
        });

        // category
        Route::controller(CategoryController::class)->group(function () {
            Route::get('/category', 'index')->name('category.index');
            Route::post('/category', 'store')->name('category.store');
            Route::get('/category/{id}/edit', 'edit')->name('category.edit');
            Route::put('/category/{id}/update', 'update')->name('category.update');
            Route::delete('/category/{id}/delete', 'delete')->name('category.delete');
        });

    });
});

require __DIR__.'/auth.php';
