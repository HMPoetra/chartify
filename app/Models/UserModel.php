<?php

namespace App\Models;

use Jenssegers\Mongodb\Model as Eloquent;

class UserModel extends Eloquent
{
    protected $collection = 'users';
    protected $primaryKey = '_id';
    protected $fillable = ['username', 'password'];
}
