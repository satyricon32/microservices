<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/


use Illuminate\Http\Request;

$router->get('/', function () use ($router) {
    return $router->app->version();
});
$router->group(['middleware' => \App\Http\Middleware\Authorize::class, 'prefix' => 'api'], function () use ($router) {
    $router->get('/test', function () {
        return 'success';
    });
    $router->post('/testCreate', function (Request $request) {
        return $request->all();
    });
    $router->get('/testToken/{token}', function ($token) {
        return checkToken($token);
    });
    $router->group(['prefix' => 'patients'], function() use ($router) {
        $router->get('/', 'PatientController@index');
        $router->get('/create', 'PatientController@create');
        $router->post('/', 'PatientController@store');
        $router->get('/{id}', 'PatientController@show');
        $router->get('/{id}/edit', 'PatientController@edit');
        $router->put('/{id}', 'PatientController@update');
        $router->delete('/{id}', 'PatientController@destroy');
    });
    $router->group(['prefix' => 'appointments'], function() use ($router) {
        $router->get('/', 'AppointmentController@index');
        $router->get('/create', 'AppointmentController@create');
        $router->post('/', 'AppointmentController@store');
        $router->get('/{id}', 'AppointmentController@show');
        $router->get('/{id}/edit', 'AppointmentController@edit');
        $router->put('/{id}', 'AppointmentController@update');
        $router->delete('/{id}', 'AppointmentController@destroy');
    });
});

$router->group(['middleware' => \App\Http\Middleware\Authorize::class], function () use ($router) {
    // код
});