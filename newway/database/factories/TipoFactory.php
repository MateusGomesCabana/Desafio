<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Models\Tipo;
use Faker\Generator as Faker;

$factory->define(\App\Tipo::class, function (Faker $faker) {
    return [
        'tipo' => $faker->name,
    ];
    
});
