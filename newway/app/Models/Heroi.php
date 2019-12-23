<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Heroi extends Model
{
    //
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name','tipo_id','vida','defesa','dano','velocidade','velocidade_movimento','photo'
    ];
    
}
