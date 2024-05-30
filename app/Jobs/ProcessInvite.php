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
use App\Models\ApplyStatus;
use App\Models\Stage;
use Illuminate\Support\Facades\DB;

class ProcessInvite implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $stageId;
    public $vacancyApplyId;
    public $dateInterview;
    public $timeInterview;
    public $userInputId;
    public $withConfirm;
    /**
     * Create a new job instance.
     */
    public function __construct($stageId, $vacancyApplyId, $dateInterview, $timeInterview, $userInputId, $withConfirm)
    {
        $this->stageId = $stageId;
        $this->vacancyApplyId = $vacancyApplyId;
        $this->dateInterview = $dateInterview;
        $this->timeInterview = $timeInterview;
        $this->userInputId = $userInputId;
        $this->withConfirm = $withConfirm;
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
            $stage = Stage::where('id', $this->stageId)->first();

            VacancyApply::where('id', $this->vacancyApplyId)->update([
                'stage_id' => $this->stageId,
            ]);

            Selection::create([
                'vacancy_apply_id' => $this->vacancyApplyId,
                'date_interview' => $this->dateInterview,
                'time_interview' => $this->timeInterview,
                'user_selection' => $this->userInputId,
                'with_confirmation' => $this->withConfirm,
                'stage_id' => $this->stageId
            ]);
        });

    }
}
