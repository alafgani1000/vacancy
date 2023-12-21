<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('selections', function (Blueprint $table) {
            $table->id();
            $table->integer('vacancy_apply_id')->unsigned();
            $table->date('date_interview');
            $table->time('time_interview');
            $table->integer('stage_id');
            $table->integer('user_selection')->unsigned();
            $table->enum('with_confirmation', ['yes','no']);
            $table->integer('confirmation')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('selections');
    }
};
