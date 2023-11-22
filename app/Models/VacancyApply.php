<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Vacancy;
use App\Models\Stage;
use App\Models\ApplyStatus;
use App\Models\User;

class VacancyApply extends Model
{
    use HasFactory;
    protected $fillable = ['vacancy_id','user_apply','stage_id','apply_status_id','message'];

    public function vacancy()
    {
        return $this->belongsTo(Vacancy::class);
    }

    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }

    public function status()
    {
        return $this->belongsTo(ApplyStatus::class, 'apply_status_id');
    }

    public function userApply()
    {
        return $this->belongsTo(User::class, 'user_apply');
    }
}
