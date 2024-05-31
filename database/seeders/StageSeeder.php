<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Stage;

class StageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $apply = Stage::create([
            'name' => 'Apply',
            'desc' => 'Apply vacancy'
        ]);

        $hrtest = Stage::create([
            'name' => 'HRD Test',
            'desc' => 'HRD Interview and Test'
        ]);

        $usertest = Stage::create([
            'name' => 'User Test',
            'desc' => 'User Test and Interview'
        ]);

        $done = Stage::create([
            'name' => 'Done',
            'desc' => 'Done'
        ]);
    }
}
