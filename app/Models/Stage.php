<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use App\Models\VacancyApply;

class Stage extends Model
{
    use HasFactory;
    protected $fillable = ['name','desc'];

    public function applies()
    {
        return $this->hasMany(VacancyApply::class);
    }

    public function scopeApply(Builder $query): void
    {
        $query->where('name', 'like', '%'.'Apply'.'%');
    }

    public function scopeHrTest(Builder $query): void
    {
        $query->where('name', 'like', '%'.'HR Test'.'%');
    }

    public function scopeUserTest(Builder $query): void
    {
        $query->where('name', 'like', '%'.'User Test'.'%');
    }

    public function scopeDone(Builder $query): void
    {
        $query->where('name', 'like', '%'.'Done'.'%');
    }

}
