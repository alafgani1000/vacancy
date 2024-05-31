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
        $wait = ApplyStatus::create([
            'code' => 'wait',
            'name' => 'Wait for Invite',
            'description' => 'wait for invite'
        ]);

        $invite_hr = ApplyStatus::create([
            'code' => 'invite-hr',
            'name' => 'Invite Interview',
            'description' => 'interview dengan HR'
        ]);

        $invite_user = ApplyStatus::create([
            'code' => 'invite-user',
            'name' => 'Invite User Interview',
            'description' => 'interview with user'
        ]);

        $done = ApplyStatus::create([
            'code' => 'done',
            'name' => 'Process Done',
            'description' => 'process done'
        ]);
    }
}
