<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InscripcionController;
use App\Http\Controllers\RegistroController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::controller(InscripcionController::class)->group(function(){
    Route::get('/inscripcions', 'index');
    Route::post('/inscripcions', 'store');
    Route::put('/inscripcions', 'update');
    Route::delete('/inscripcions', 'destroy');
});
Route::controller(RegistroController::class)->group(function(){
    Route::get('/registros', 'index');
    Route::post('/registros', 'store');
    Route::put('/registros', 'update');
    Route::delete('/registros', 'destroy');
});
Route::get('/', function () {
    return view('welcome');
});
Route::get('/usuario/{id}/{nombre}/{apellidos}', function ($id=0, $nombre='', $apellidos='') {
    return 'Usuario '.$id. ' '.$nombre.' '.$apellidos;
})->where('id', '[0-9]+');
