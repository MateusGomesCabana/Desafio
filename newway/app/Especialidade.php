<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Heroi;
class Especialidade extends Model
{
    public function herois()
    {
        return $this->belongsToMany(Heroi::class,'heroi_especialidade');
    }
}
