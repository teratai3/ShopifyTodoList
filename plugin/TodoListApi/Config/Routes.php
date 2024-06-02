<?php
$routes->group('api/todo_lists', ['namespace' => 'Plugin\TodoListApi\Controllers'], function ($routes) {
    $routes->get('/', 'TodoLists::index');
    $routes->get('show/(:num)', 'TodoLists::show/$1');
    $routes->post('create', 'TodoLists::create');
    $routes->put('update/(:num)', 'TodoLists::update/$1');
    $routes->delete('delete/(:num)', 'TodoLists::delete/$1');
});

