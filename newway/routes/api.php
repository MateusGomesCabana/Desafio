<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/**
 * caminho /api/heroi leva para o controller de heroi sendo que o se for utilizado o metodo
 * get leva a ao index
 * post leva store
 * put leva ao update
 * delete leva ao destroy
 */
Route::apiResource('heroi','api\HeroiController');
Route::get('/heroi2', 'api\HeroiController@index2');
Route::post('/heroiId', 'api\HeroiController@HeroiId');


/**
 * caminho /api/especialidade  leva para o controller de especialidade sendo que o se for utilizado o metodo
 * get leva a ao index
 * post leva store
 * put leva ao update
 * delete leva ao destroy
 */
Route::apiResource('especialidade','api\EspecialidadeController');
/**
 * caminho /api/tipo  leva para o controller de tipo  sendo que o se for utilizado o metodo
 * get leva a ao index
 * post leva store
 * put leva ao update
 * delete leva ao destroy
 */
Route::apiResource('tipo','api\TipoController');
/**
 * caminho /api/tipo  leva para o controller heroi_especialidade sendo que o se for utilizado o metodo
 * get leva a ao index
 * post leva store
 * put leva ao update
 * delete leva ao destroy
 */
Route::apiResource('heroi_especialidade','api\Herois_Especialidades');
Route::post('heroi_especialidadeID','api\Herois_Especialidades@espec_heroi');