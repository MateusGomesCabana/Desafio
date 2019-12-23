<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Especialidade;
class Heroi extends Model
{
    public function especialidades()
    {
        return $this->belongsToMany(Especialidade::class,'heroi_especialidade');
    }
}
