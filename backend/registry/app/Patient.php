<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
      'firstname',
      'lastname',
      'middlename',
      'phone',
      'birthdate',
    ];

}
