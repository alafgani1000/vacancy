<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ApplyStatus;

class ApplyStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $apply = ApplyStatus::create([
            'code' => 'apply',
            'name' => 'Apply',
            'description' => 'Apply'
        ]);

        $pass = ApplyStatus::create([
            'code' => 'pass',
            'name' => 'Pass',
            'description' => 'Pass'
        ]);

        $reject = ApplyStatus::create([
            'code' => 'rejected',
            'name' => 'Rejected',
            'description' => 'Rejected'
        ]);

        $done = ApplyStatus::create([
            'code' => 'done',
            'name' => 'Process Done',
            'description' => 'process done'
        ]);
    }
}
