<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class ApplyStatus extends Model
{
    use HasFactory;

    protected $table = 'apply_status';
    protected $fillable = ['code', 'name', 'description'];

    public function scopeWait(Builder $query): void
    {
        $query->where('code','wait');
    }

    public function scopeCallHr(Builder $query): void
    {
        $query->where('code','call-hr');
    }

    public function scopeCallUser(Builder $query): void
    {
        $query->where('code','call-user');
    }

    public function scopeDone(Builder $query): void
    {
        $query->where('code','done');
    }
}
