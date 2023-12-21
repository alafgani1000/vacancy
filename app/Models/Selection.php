<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\VacancyApply;
use App\Models\User;
use App\Models\Stage;

class Selection extends Model
{
    use HasFactory;
    protected $fillable = ['vacancy_apply_id','user_selection', 'date_interview', 'time_interview', 'stage_id'];

    public function vacancyApply()
    {
        return $this->belongsTo(VacancyApply::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_selection');
    }

    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }


}
