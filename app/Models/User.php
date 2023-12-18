<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Company;
use App\Models\UserCategory;
use App\Models\UserEducation;
use App\Models\UserWorkHistory;
use App\Models\UserSkill;
use App\Models\Vacancy;
use App\Models\VacancyApply;
use App\Models\Selection;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'user_category_id',
        'sex',
        'address',
        'phone_number',
        'foto',
        'date_of_birth'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the user that owns the Company
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function company(): HasOne
    {
        return $this->hasOne(Company::class);
    }

    public function userCategory()
    {
        return $this->belongsTo(UserCategory::class);
    }

    public function educations()
    {
        return $this->hasMany(UserEducation::class);
    }

    public function workHisories()
    {
        return $this->hasMany(UserWorkHistory::class);
    }

    public function skills()
    {
        return $this->hasMany(UserSkill::class);
    }

    public function vacancies()
    {
        return $this->hasMany(Vacancy::class);
    }

    public function applies()
    {
        return $this->hasMany(VacancyApply::class);
    }

    public function selection()
    {
        return $this->hasMany(Selection::class);
    }
}
