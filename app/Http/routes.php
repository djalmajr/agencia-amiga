<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('{all}', function ($slug) {
    return view('home');
})->where('all', '.*');

// Route::get('/', function () {
// Route::any( '(.*)', function ($page) {
//     dd($page);
// });
