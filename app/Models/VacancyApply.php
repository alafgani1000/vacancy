<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Vacancy;

class VacancyApply extends Model
{
    use HasFactory;
    protected $fillable = ['vacancy_id','user_appy','stage_id','apply_status_id','message'];

    public function vacancy()
    {
        return belongsTo(Vacancy::class);
    }
}
