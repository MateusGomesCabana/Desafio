<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Heroi;

class HeroiController extends Controller
{
    /**
     * Retorna todos os herois para o metodo get (apenas para teste)
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return Heroi::all();
    }
    /**
     * Função que retorna todos os herois para o menu
     */

    public function index2()
    {
      
        $user = DB::table('herois')
            ->join('tipos', 'herois.tipo_id', '=', 'tipos.id')
            ->join('heroi_especialidades', 'heroi_especialidades.heroi_id', '=', 'herois.id')
            ->select('herois.*', 'tipos.tipo', 'heroi_especialidades.especialidade')
            ->get();
        return $user;
    }


    /**
     * Cadastra um heroi
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {

            $heroi = Heroi::create($request->all());

            $return = ['data' => ['msg' => 'Heroi criado com sucesso!'], 'heroi' => $heroi];
            return response()->json($return, 201);
        } catch (\Exception $e) {

            return response()->json("erro ao tentar salvar", 500);
        }
        return response()->json("Erro ao tentar salvar",  500);
    }

    /**
     * retorna o objeto criado
     */
    public function show($id)
    {
        Heroi::findOrFail($id);
    }
    /**
     * Função que retorna todos os atributos do heroi pelo id
     */
    public function HeroiId(Request $request)
    {
       // echo $request->get('heroi_id') ;
        $user = DB::table('herois')
            ->join('tipos', 'herois.tipo_id', '=', 'tipos.id')
            ->join('heroi_especialidades', 'heroi_especialidades.heroi_id', '=', 'herois.id')
            ->where('herois.id', '=', $request->heroi_id)
            ->select('herois.*', 'tipos.tipo', 'heroi_especialidades.especialidade','heroi_especialidades.especialidade_id')
            ->get();
        return $user;
    }


    /**
     * atualiza um herói especifico
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $heroi = Heroi::findOrFail($id);
        // $heroi->update($request->all());
        try {

            $heroi = Heroi::findOrFail($id);
            $heroi->update($request->all());

            $return = ['data' => ['msg' => 'Heroi atualizado com sucesso!'], 'heroi' => $heroi];
            return response()->json($return, 201);
        } catch (\Exception $e) {
            return response()->json("Erro ao tentar salvar", 500);
        }
        return response()->json("Erro ao tentar salvar", 500);
    }

    /**
     * Remove um herooi especifico
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // $heroi = Heroi::findOrFail($id);
        // $heroi->delete();
        try {
            $heroi = Heroi::findOrFail($id);
            $heroi->delete();
            return response()->json(['data' => ['msg' => 'Heroi: ' . $heroi->name . ' removido com sucesso!']], 200);
        } catch (\Exception $e) {

            return response()->json('Erro ao deleltar',  500);
        }
        return response()->json('Erro ao deleltar',  500);
    }
}
