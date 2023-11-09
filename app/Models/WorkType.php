<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Vacancy;

class WorkType extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    /**
     * Get all of the vacancies for the WorkType
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function vacancies(): HasMany
    {
        return $this->hasMany(Vacancy::class);
    }
}
