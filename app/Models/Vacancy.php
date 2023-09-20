<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vacancy extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','job_name','description','qualification','job_desc','work_type_id','jobs_level_id','status_id','end_date'];
}
