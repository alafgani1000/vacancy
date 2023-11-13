<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Vacancy;

class Status extends Model
{
    use HasFactory;
    protected $fillable = ['name','desc'];

    /**
     * Get all of the vacancy for the Status
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function vacancies(): HasMany
    {
        return $this->hasMany(Vacancy::class);
    }

    /**
     * get created
     */
    public function scopeCreat(Builder $query): void
    {
        $query->where('name', 'Created');
    }

    /**
     * get published
     */
    public function scopePublished(Builder $query): void
    {
        $query->where('name', 'like', '%'.'Published'.'%');
    }

    /**
     * get done
     */
    public function scopeDone(Builder $query): void
    {
        $query->where('name', 'like', '%'.'Done'.'%');
    }

}
