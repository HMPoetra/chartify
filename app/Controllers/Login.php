<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Login extends ResourceController
{
    public function index()
    {
        $rules = [
            'username' => 'required|valid_username',
            'password' => 'required|min_length[6]',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $username = $this->request->getVar('username');
        $password = $this->request->getVar('password');

        // Cek pengguna di database
        $userModel = new \App\Models\UserModel();
        $user = $userModel->where('username', $username)->first();

        if (!$user || !password_verify($password, $user['password'])) {
            return $this->failNotFound('Invalid login credentials');
        }

        // Buat JWT token
        $key = getenv('JWT_SECRET');
        $payload = [
            'iss' => "Issuer of the token",
            'aud' => "Audience of the token",
            'iat' => time(),
            'exp' => time() + 3600,
            'uid' => $user['_id'],
        ];

        $token = JWT::encode($payload, $key, 'HS256');

        return $this->respond(['token' => $token]);
    }
}
