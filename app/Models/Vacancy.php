<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\WorkType;
use App\Models\JobLevel;

class Vacancy extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','job_name','description','qualification','job_desc','work_type_id','jobs_level_id','status_id','city','country','published_at','end_date'];

    /**
     * Get the workType that owns the Vacancy
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function type()
    {
        return $this->belongsTo(WorkType::class, 'work_type_id', 'id');
    }

    /**
     * Get the jobLevel that owns the Vacancy
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function level()
    {
        return $this->belongsTo(JobLevel::class, 'jobs_level_id', 'id');
    }
}
