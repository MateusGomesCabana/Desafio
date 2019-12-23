<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Especialidade;
/**
 * O controller a seguir é para os atributos de especialidades do heroi, feito apenas para teste
 * 
 */
class EspecialidadeController extends Controller
{
    /**
     * retorna todas as especialidade do banco
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Especialidade::all();
    }

   
    /**
     * salva e cria uma especialidade no banco
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Especialidade::create($request->all());
    }

    /**
     *  busca uma especilidade especifica no banco
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        Especialidade::findOrFail($id);
    }

  

    /**
     * atualiza uma especialidade no banco
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $especialidade = Especialidade::findOrFail($id);
        $especialidade->update($request->all());
    }

    /**
     * remove uma especialidade no banco
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $especialidade = Especialidade::findOrFail($id);
        $especialidade->delete();
    }
}
