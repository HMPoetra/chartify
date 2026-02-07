<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
<<<<<<< HEAD
$routes->get('/', 'Home::index');
$routes->get('api/sales', 'SalesController::index');
$routes->post('auth/login', 'AuthController::login');
=======

$routes->get('/', 'Home::index');

// CRUD login (otomatis buat route GET, POST, PUT, DELETE)
$routes->resource('login', ['controller' => 'LoginController']);

// Tambahan route jika ingin ambil berdasarkan role
$routes->get('/login/role', 'LoginController::getUsersByRole');

// (Opsional) endpoint login
$routes->post('auth/login', 'AuthController::login');
$routes->post('api/login', 'Auth::loginCheck');
$routes->post('api/login/check', 'Auth::loginCheck');

$routes->get('api/sales', 'SalesController::index');
$routes->put('/login/update/(:segment)', 'LoginController::update/$1');
$routes->delete('/login/delete/(:segment)', 'LoginController::delete/$1');
>>>>>>> aa1ffb3ad (Revisi DatePicker & Final Projek)
