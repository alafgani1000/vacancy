<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessInvite implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $stageId;
    protected $vacancyApplyId;
    protected $message;
    protected $userInputId;
    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {

    }

    public function proses($stageId, $vacancyApplyId, $message, $userInputId)
    {
        DB::transaction(function () {
            Selection::create([
                'vacancy_apply_id' => $vacancyApplyId,
                'message' => $message,
                'user_selection' => $userInputId
            ]);

            VacancyApply::where('id', $vacancyApplyId)->update([
                'stage_id' => $stageId
            ]);
        });

    }
}
