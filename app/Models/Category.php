<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Vacancy;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['code','name'];

    public function vacancies()
    {
        return $this->hasMany(Vacancy::class);
    }
}
