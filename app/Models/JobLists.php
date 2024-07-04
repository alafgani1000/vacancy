<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobLists extends Model
{
    use HasFactory;

    protected $table = 'job_lists';
    protected $fillable = ['user_id','model','action','status'];
}
