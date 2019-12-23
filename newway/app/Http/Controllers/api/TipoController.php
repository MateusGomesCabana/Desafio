<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Tipo;

class TipoController extends Controller
{
    /**
     * Retorna todos os tipos de heroi
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      
        return Tipo::all();
    }

  

    /**
     * Cria um tipo de heroi
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $tipo = Tipo::create($request->all());
        echo $tipo;
    }

    /**
     * Apresenta um tipoi de heroi
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        Tipo::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * atualiza um tipo de heroi
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $tipo = Tipo::findOrFail($id);
        $tipo->update($request->all());
    }

    /**
     * Remove um tipo de heroi
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tipo = Tipo::findOrFail($id);
        $tipo->delete();
    }
}
