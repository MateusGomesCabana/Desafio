<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\heroi_especialidade;
use Illuminate\Support\Facades\DB;

class Herois_Especialidades extends Controller
{
    /**
     * lista todos os herois e especialidades
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return heroi_especialidade::all();
    }
    /**
     * Função que retorna a espcialidade do heroi pelo id do heroi
     */
    public function espec_heroi(Request $request)
    {
        $user = DB::table('heroi_especialidades')->where('heroi_id', '=', $request->heroi_id)->get();
        return $user;
    }

    /**
     * cria uma linha na tabela heroi_especialidade
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // heroi_especialidade::create($request->all());
        try {

            // $heroi = Heroi::create($request->all());
            $heroi_epes =  heroi_especialidade::create($request->all());
            $return = ['data' => ['msg' => 'Heroi especialidade criado com sucesso!'], 'heroi_especialidade' => $heroi_epes];
            return response()->json($return, 201);
        } catch (\Exception $e) {

            return response()->json("erro ao tentar salvar", 500);
        }
        return response()->json("Erro ao tentar salvar",  500);
    }



    /**
     * atualiza uma linha da tabela heroi_especialidade
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $heroi = heroi_especialidade::findOrFail($id);
        $heroi->update($request->all());
    }

    /**
     * Remove uma linha de heroi_especialidade
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // $heroi = heroi_especialidade::findOrFail($id);
        // $heroi->delete();

        try {
            $heroi = heroi_especialidade::findOrFail($id);
            $heroi->delete();
            return response()->json(['data' => ['msg' => 'especialidade removido com sucesso!']], 200);
        } catch (\Exception $e) {

            return response()->json('Erro ao deleltar',  500);
        }
        return response()->json('Erro ao deleltar',  500);
    }
}
