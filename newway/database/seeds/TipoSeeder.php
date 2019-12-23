<?php

use App\Tipo;
use Illuminate\Database\Seeder;

class TipoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Função que cria 10 tipos de classe 
        factory(Tipo::class,10)->create();
    }
}
