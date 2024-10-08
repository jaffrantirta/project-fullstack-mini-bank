<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\PrintController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
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
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard', [
//         'session' => session()->all()
//     ]);
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('school', SchoolController::class);
    Route::resource('employee', EmployeeController::class);
    Route::resource('student', StudentController::class);
    Route::resource('transaction', TransactionController::class);
    Route::get('transaction/find/{account_number}', [UserController::class, 'show'])->name('transaction.show.user');
    Route::get('roleuser/check/{account_number}', [UserController::class, 'check'])->name('role.check.user');
    Route::get('print/{id}', [PrintController::class, 'index'])->name('print.index');
    Route::resource('role', RoleController::class);
    Route::resource('classroom', ClassroomController::class);
    Route::resource('account', AccountController::class);
    Route::resource('dashboard', DashboardController::class);
    Route::resource('report', ReportController::class)->only('index');
    Route::get('report/total', [ReportController::class, 'totalReport'])->name('report.total');
});

require __DIR__ . '/auth.php';
