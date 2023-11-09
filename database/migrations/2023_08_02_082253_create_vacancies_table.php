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
        Schema::create('vacancies', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->unsigned();
            $table->string('job_name');
            $table->longText('description');
            $table->longText('qualification');
            $table->longText('job_desc');
            $table->integer('work_type_id');
            $table->integer('jobs_level_id');
            $table->string('location')->nullable();
            $table->string('city');
            $table->string('country');
            $table->date('published_at')->nullable();
            $table->date('end_date')->nullable();
            $table->integer('status_id')->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacancies');
    }
};
