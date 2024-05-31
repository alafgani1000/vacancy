<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Status;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $created = Status::create([
            'name' => 'Created',
            'desc' => 'Vacancy is created'
        ]);

        $published = Status::create([
            'name' => 'Published',
            'desc' => 'Vacancy is publish'
        ]);

        $done = Status::create([
            'name' => 'Done',
            'desc' => 'Vacancy is done'
        ]);
    }
}
