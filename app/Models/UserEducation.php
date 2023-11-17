<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class UserEducation extends Model
{
    use HasFactory;

    protected $table = 'user_educations';

    protected $fillable = ['user_id','start','end','name','major','degree'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
