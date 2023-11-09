<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VacancyController;
use App\Http\Controllers\StageController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JobLevelController;
use App\Http\Controllers\WorkTypeController;
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
    Route::get('/vacancy/{id}/apply', [VacancyController::class, 'apply'])->name('vacancy.apply');

    Route::middleware(['userverified'])->group(function () {
        Route::get('/vacancy', [VacancyController::class, 'index'])->name('vacancy.index');
        Route::get('/vacancy/create', [VacancyController::class, 'create'])->name('vacancy.create');
        Route::get('/vacancy/{id}/detail', [VacancyController::class, 'detail'])->name('vacancy.detail');
        Route::post('/vacancy', [VacancyController::class, 'store'])->name('vacancy.store');
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

    });
});

require __DIR__.'/auth.php';
