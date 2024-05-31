<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserCategory;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminUser = User::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'admin@test.com',
            'email_verified_at' => now(),
            'password' => Hash::make('test'),
            'user_category_id' => UserCategory::where('Admin')->first()->id
        ]);
    }
}
