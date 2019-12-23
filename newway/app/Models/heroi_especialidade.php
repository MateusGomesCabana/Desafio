<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class heroi_especialidade extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'heroi_id','especialidade_id','especialidade'
    ];
}
