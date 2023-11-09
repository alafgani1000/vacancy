<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Status extends Model
{
    use HasFactory;
    protected $fillable = ['name','desc'];

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
