<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Selection extends Model
{
    use HasFactory;
    protected $fillable = ['vacancy_apply_id','user_selection', 'date_interview', 'time_interview'];
}
