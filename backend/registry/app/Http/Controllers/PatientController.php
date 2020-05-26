<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Patient;
use Symfony\Component\HttpKernel\Exception\HttpException;

class PatientController extends Controller
{

  public function index()
  {
    return Patient::all();
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
    $model = Patient::create($request->all());
    return $model;
  }

  public function show($id)
  {
    return Patient::findOrFail($id);
  }

  public function edit($id)
  {
    return Patient::findOrFail($id);
  }

  public function update(Request $request, $id)
  {
    $model = Patient::findOrFail($id);
    $model->fill($request->all());
    if ($model->save())
      return $model;
    else
      abort(500, "Can not update");
  }

  public function destroy($id)
  {
    $model = Patient::findOrFail($id);
    if ($model->delete())
      return 'success';
    else
      abort(500, "Can not delete");
  }
}
