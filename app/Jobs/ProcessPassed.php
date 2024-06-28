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


class ProcessPassed implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $vacancyApplyId;

    /**
     * Create a new job instance.
     */
    public function __construct($vacancyApplyId)
    {
        $this->vacancyApplyId = $vacancyApplyId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        //
    }

    public function prose()
    {
        VacancyApply::where('id',$this->vacancyApplyId)->update([
            'apply_status_id' => ApplyStatus::pass()->first()->id
        ]);
    }
}
