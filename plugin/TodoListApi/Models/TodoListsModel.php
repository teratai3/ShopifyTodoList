<?php

namespace Plugin\TodoListApi\Models;

use CodeIgniter\Model;

class TodoListsModel extends Model
{
    protected $table = 'todo_lists';
    protected $primaryKey = 'id';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $useTimestamps = true;
    
    protected $allowedFields = ['shopify_auth_id','title', 'description', 'status'];
}
