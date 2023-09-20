<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VacancyApply extends Model
{
    use HasFactory;
    protected $fillable = ['vacancy_id','user_appy','stage_id','message'];
}
