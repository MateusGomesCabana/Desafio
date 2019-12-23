<?php

use App\Heroi;
use Illuminate\Database\Seeder;

class HeroiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //cria 10 herois
        factory(Heroi::class,10)->create();
    }
}
