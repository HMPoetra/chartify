<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use MongoDB\Client;

class AuthController extends ResourceController
{
    protected $collection;

    public function __construct()
    {
        $client = new Client("mongodb://localhost:27017");
        $this->collection = $client->chartify->login;
    }

    // POST /auth/login
    public function login()
    {
        $json = $this->request->getJSON(true);
        $username = $json['username'] ?? '';
        $password = $json['password'] ?? '';

        $user = $this->collection->findOne([
            'username' => $username,
            'password' => $password,
        ]);

        if ($user) {
            return $this->respond([
                'status' => 'success',
                'user' => $user
            ]);
        } else {
            return $this->failUnauthorized('Username atau password salah.');
        }
    }
}
