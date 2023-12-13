<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Selection;
use App\Models\VacancyApply;
use Illuminate\Support\Facades\DB;

class ProcessInvite implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $stageId;
    public $vacancyApplyId;
    public $message;
    public $userInputId;
    /**
     * Create a new job instance.
     */
    public function __construct($stageId, $vacancyApplyId, $message, $userInputId)
    {
        $this->stageId = $stageId;
        $this->vacancyApplyId = $vacancyApplyId;
        $this->message = $message;
        $this->userInputId = $userInputId;
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
        DB::transaction(function () {
            VacancyApply::where('id', $this->vacancyApplyId)->update([
                'stage_id' => $this->stageId
            ]);

            Selection::create([
                'vacancy_apply_id' => $this->vacancyApplyId,
                'message' => $this->message,
                'user_selection' => $this->userInputId
            ]);
        });

    }
}
