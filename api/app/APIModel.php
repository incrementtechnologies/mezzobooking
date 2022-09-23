<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use DB;

class APIModel extends Model
{
    use SoftDeletes;
    public $parent = [];

    public function getTableColumns() {
        return $this->getConnection()->getSchemaBuilder()->getColumnListing($this->getTable());
    }
    public function newModel($table, $attribute){
      $modelName = "App\\".str_replace(' ', '', ucwords(str_replace('_', ' ', str_singular($table))));
      return new $modelName($attribute);
    }
}
