<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHeroiEspecialidadesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('heroi_especialidades', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('heroi_id');
            $table->foreign('heroi_id')->references('id')->on('herois')->onDelete('CASCADE')->onUpdate('CASCADE');
            $table->unsignedBigInteger('especialidade_id');
            $table->foreign('especialidade_id')->references('id')->on('especialidades')->onDelete('CASCADE')->onUpdate('CASCADE');
            $table->string('especialidade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('heroi_especialidades');
    }
}
