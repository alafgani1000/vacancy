<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\ApplyStatus;
use App\Models\VacancyApply;
use App\Models\JobLists;


class ProcessPassed implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $vacancyApplyId;
    public $authId;


    /**
     * Create a new job instance.
     */
    public function __construct($vacancyApplyId, $authId)
    {
        $this->vacancyApplyId = $vacancyApplyId;
        $this->authId = $authId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->proses();
    }

    public function proses()
    {
        VacancyApply::whereIn('id',$this->vacancyApplyId)->update([
            'apply_status_id' => ApplyStatus::pass()->first()->id
        ]);

        $jobLists = JobLists::create([
            'user_id' => $this->authId,
            'model' => 'VacancyApply',
            'action' => 'pass',
            'status' => 0
        ]);

    }
}
