<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
<<<<<<< HEAD
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
=======
use MongoDB\Client as Mongo;

class Login extends ResourceController
{
    protected $collection;

    public function __construct()
    {
        $client = new Mongo("mongodb://localhost:27017");
        $this->collection = $client->chartify->login;
    }

    // GET /login
    public function index()
    {
        try {
            $data = $this->collection->find()->toArray();
            return $this->respond($data);
        } catch (\Exception $e) {
            return $this->failServerError($e->getMessage());
        }
    }

    // POST /login
    public function create()
    {
        try {
            $json = $this->request->getJSON(true);

            if (!isset($json['id']) || !isset($json['username']) || !isset($json['password'])) {
                return $this->failValidationErrors("Field 'id', 'username', dan 'password' wajib diisi.");
            }

            $this->collection->insertOne($json);
            return $this->respondCreated(['message' => 'User berhasil dibuat']);
        } catch (\Exception $e) {
            return $this->failServerError($e->getMessage());
        }
    }

    // PUT /login/{id}
    public function update($id = null)
    {
        try {
            if (!$id) {
                return $this->fail('ID tidak ditemukan', 400);
            }

            $json = $this->request->getJSON(true);

            // Hindari pengiriman _id ke Mongo
            unset($json['_id']);

            $updateResult = $this->collection->updateOne(
                ['id' => $id],
                ['$set' => $json]
            );

            if ($updateResult->getMatchedCount() === 0) {
                return $this->failNotFound("User dengan ID $id tidak ditemukan.");
            }

            return $this->respond(['message' => 'User berhasil diperbarui']);
        } catch (\Exception $e) {
            return $this->failServerError($e->getMessage());
        }
    }

    // DELETE /login/{id}
    public function delete($id = null)
    {
        try {
            if (!$id) {
                return $this->fail('ID tidak ditemukan', 400);
            }

            $deleteResult = $this->collection->deleteOne(['id' => $id]);

            if ($deleteResult->getDeletedCount() === 0) {
                return $this->failNotFound("User dengan ID $id tidak ditemukan.");
            }

            return $this->respondDeleted(['message' => 'User berhasil dihapus']);
        } catch (\Exception $e) {
            return $this->failServerError($e->getMessage());
        }
    }

    // (Opsional) POST /login/check
    public function loginCheck()
    {
        $json = $this->request->getJSON(true);
        $username = $json['username'] ?? '';
        $password = $json['password'] ?? '';

        $user = $this->collection->findOne([
            'username' => $username,
            'password' => $password,
        ]);

        if ($user) {
            return $this->respond(['status' => 'success', 'user' => $user]);
        } else {
            return $this->failUnauthorized('Username atau password salah.');
        }
>>>>>>> aa1ffb3ad (Revisi DatePicker & Final Projek)
    }
}
