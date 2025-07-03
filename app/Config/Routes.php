<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('api/sales', 'SalesController::index');
$routes->post('auth/login', 'AuthController::login');
