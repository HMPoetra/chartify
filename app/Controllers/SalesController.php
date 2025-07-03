<?php

namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;

class SalesController extends ResourceController
{
    public function index()
    {
        $data = [
            'bar' => [
                'labels' => ['January', 'February', 'March'],
                'datasets' => [[
                    'label' => 'Sales',
                    'data' => [65, 59, 80],
                    'backgroundColor' => 'rgba(75, 192, 192, 0.2)',
                    'borderColor' => 'rgba(75, 192, 192, 1)',
                    'borderWidth' => 1,
                ]]
            ],
            'line' => [
                'labels' => ['January', 'February', 'March'],
                'datasets' => [[
                    'label' => 'Revenue',
                    'data' => [85, 69, 90],
                    'fill' => false,
                    'backgroundColor' => 'rgba(255, 99, 132, 0.2)',
                    'borderColor' => 'rgba(255, 99, 132, 1)',
                ]]
            ],
            'pie' => [
                'labels' => ['Electronics', 'Fashion', 'Groceries'],
                'datasets' => [[
                    'label' => 'Category Sales',
                    'data' => [300, 150, 100],
                    'backgroundColor' => [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    'borderColor' => [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    'borderWidth' => 1,
                ]]
            ],
        ];
        return $this->respond($data);
    }
}
