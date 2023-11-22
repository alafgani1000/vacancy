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
use App\Http\Controllers\ApplyStatusController;
use App\Http\Controllers\CompanyController;
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
Route::get('/company/{filename}', [CompanyController::class, 'showImage'])->name('company.image');


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
    Route::get('/apply-history', [ApplyController::class, 'applyHistories'])->name('apply.history');

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

    // cv controller
    Route::controller(CvController::class)->prefix('cv')->group(function () {
        // inde cv
        Route::get('/', 'index')->name('cv.index');
        // upload photo
        Route::put('/upload-photo', 'uploadPhoto')->name('upload.photo');
        Route::get('/profiles/{filename}', 'showImage')->name('display.photo');
        // education
        Route::post('/education', 'storeEducation')->name('education.store');
        Route::get('/education/{id}/edit', 'editEducation')->name('education.edit');
        Route::put('/education/{id}/update', 'updateEducation')->name('education.update');
        Route::delete('education/{id}/delete', 'deleteEducation')->name('education.delete');
        // work history
        Route::post('/work-history', 'storeWorkHistory')->name('workhistory.store');
        Route::get('/work-history/{id}/edit', 'editWorkHistory')->name('workhistory.edit');
        Route::put('/work-history/{id}/update', 'updateWorkHistory')->name('workhistory.update');
        Route::delete('/work-history/{id}/delete', 'deleteWorkHistory')->name('workhistory.delete');
        // skill
        Route::post('/skill', 'storeSkill')->name('skill.store');
        Route::get('/skill/{id}/edit', 'editSkill')->name('skill.edit');
        Route::put('/skill/{id}/update', 'updateSkill')->name('skill.update');
        Route::delete('/skill/{id}/delete', 'deleteSkill')->name('skill.delete');
    });

    // company controller
    Route::controller(CompanyController::class)->group(function () {
        Route::get('/company', 'index')->name('company.index');
        Route::put('/company/{id}/upload-logo', 'uploadLogo')->name('company.upload-logo');
        Route::put('/company/{id}/update', 'update')->name('company.update');
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

        // apply status
        Route::controller(ApplyStatusController::class)->group(function () {
            Route::get('/apply-status', 'index')->name('apply-status.index');
            Route::post('/apply-status', 'store')->name('apply-status.store');
            Route::get('/apply-status/{id}/edit', 'edit')->name('apply-status.edit');
            Route::put('/apply-status/{id}/update', 'update')->name('apply-status.update');
            Route::delete('/apply-status/{id}/delete', 'delete')->name('apply-status.delete');
        });

    });
});

require __DIR__.'/auth.php';
