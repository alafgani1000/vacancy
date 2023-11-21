<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\WorkType;
use App\Models\JobLevel;
use App\Models\Status;
use App\Models\Category;
use App\Models\VacancyApply;
use App\Models\User;

class Vacancy extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','job_name','description','qualification','job_desc','work_type_id','jobs_level_id','status_id','category_id','city','country','published_at','end_date'];

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

    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id', 'id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function applies()
    {
        return $this->hasMany(VacancyApply::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function company()
    {
        return $this->hasOne(Company::class);
    }

}
