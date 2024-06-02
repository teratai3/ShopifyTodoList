<?php

namespace Plugin\TodoListApi\Config;

class TodoListValidation
{
    const DEFAULT = [
        'title' => ['label' => 'タイトル', 'rules' => 'required|max_length[255]'],
        'description' => ['label' => '説明文', 'rules' => 'permit_empty|max_length[500]'],
        'status' => ['label' => 'ステータス', 'rules' => 'required|in_list[pending,completed]'],
    ];
}
