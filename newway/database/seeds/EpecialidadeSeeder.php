<?php

use App\Especialidade;
use Illuminate\Database\Seeder;

class EpecialidadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //método que cria 10 especialidades
        factory(Especialidade::class,10)->create();
    }
}
