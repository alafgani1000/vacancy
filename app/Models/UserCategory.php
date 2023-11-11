<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class UserCategory extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    public function user()
    {
        return $this->hasMany(User::class);
    }

    public function scopeAdmin($query): void
    {
        $query->where('name', 'Admin');
    }

    public function scopeCompany($query): void
    {
        $query->where('name', 'like','%'.'Company'.'%');
    }

    public function scopeJobSeeker($query): void
    {
        $query->where('name', 'like', '%'.'Job Seeker'.'%');
    }
}
