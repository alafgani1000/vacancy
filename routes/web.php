<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VacancyController;
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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'hasVeried' => (Auth::user() != null) ? Auth::user()->hasVerifiedEmail() : "",
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth','verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['userverified'])->group(function ()  {
        Route::get('/vacancy', [VacancyController::class, 'index'])->name('vacancy.index');
        Route::get('/vacancy/create', [VacancyController::class, 'create'])->name('vacancy.create');
        Route::get('/vacancy/{id}/detail', [VacancyController::class, 'detail'])->name('vacancy.detail');
    });
});

require __DIR__.'/auth.php';
