<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UserCategory;

class UserCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $joobSeeker = UserCategory::create([
            'name' => 'Job Seeker'
        ]);

        $company = UserCategory::create([
            'name' => 'Company'
        ]);

        $admin = UserCategory::create([
            'name' => 'Admin'
        ]);
    }
}
