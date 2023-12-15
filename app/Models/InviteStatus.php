<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InviteStatus extends Model
{
    use HasFactory;

    protected $table = "invite_status";

    protected $fillable = ["code", "name", "description"];
}
