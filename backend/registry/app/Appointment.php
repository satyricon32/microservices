<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = [
      'patient_id',
      'doctor_fio',
      'doctor_id',
      'time',
      'list',
    ];

    protected $casts = [
        'list' => 'array'
    ];

}
