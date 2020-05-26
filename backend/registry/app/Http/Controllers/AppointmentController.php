<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Appointment;

class AppointmentController extends Controller
{

  public function index()
  {
    return Appointment::all();
  }

  public function create()
  {
    return [
      'firstname' => 'string',
      'lastname' => 'string',
      'middlename' => 'string',
      'phone' => 'string',
      'birthdate' => 'string',
    ];
  }

  public function store(Request $request)
  {
    $model = Appointment::create($request->all());
    return $model;
  }

  public function show($id)
  {
    return Appointment::findOrFail($id);
  }

  public function edit($id)
  {
    return Appointment::findOrFail($id);
  }

  public function update(Request $request, $id)
  {
    $model = Appointment::findOrFail($id);
    $model->fill($request->all());
    if ($model->save())
      return $model;
    else
      abort(500, "Can not update");
  }

  public function destroy($id)
  {
    $model = Appointment::findOrFail($id);
    if ($model->delete())
      return 'success';
    else
      abort(500, "Can not delete");
  }
}
