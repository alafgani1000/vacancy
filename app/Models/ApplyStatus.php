<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use App\Models\VacancyApply;

class ApplyStatus extends Model
{
    use HasFactory;

    protected $table = 'apply_status';
    protected $fillable = ['code', 'name', 'description'];

    public function applies()
    {
        return $this->hasMany(VacancyApply::class);
    }

    public function scopeApply(Builder $query): void
    {
        $query->where('code','apply');
    }

    public function scopePass(Builder $query): void
    {
        $query->where('code','pass');
    }

    public function scopeRejected(Builder $query): void
    {
        $query->where('code','rejected');
    }

    public function scopeDone(Builder $query): void
    {
        $query->where('code','done');
    }
}
