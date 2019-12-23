<?php

use App\Tipo;
use Illuminate\Database\Seeder;

class TipoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         //Função que cria 10 tipos de classe 
         factory(\App\Tipo::class,10)->create();
    }
}
