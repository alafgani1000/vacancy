<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class UserWorkHistory extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','start','end','company','job_desc'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
