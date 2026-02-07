<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use MongoDB\Client;

class Auth extends ResourceController
{
    protected $collection;

    public function __construct()
    {
        $client = new Client("mongodb://localhost:27017"); // ✅ ini benar
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
            unset($json['_id']); // hindari overwrite _id

            $updateResult = $this->collection->updateOne(
                ['id' => (int)$id],
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

            $deleteResult = $this->collection->deleteOne(['id' => (int)$id]);

            if ($deleteResult->getDeletedCount() === 0) {
                return $this->failNotFound("User dengan ID $id tidak ditemukan.");
            }

            return $this->respondDeleted(['message' => 'User berhasil dihapus']);
        } catch (\Exception $e) {
            return $this->failServerError($e->getMessage());
        }
    }

    // POST /login/check
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
            // Jika user tidak ditemukan → otomatis buat user baru dengan ID berurutan
            $last = $this->collection->findOne([], ['sort' => ['id' => -1]]);
            $newId = $last ? $last['id'] + 1 : 1;

            $this->collection->insertOne([
                'id' => $newId,
                'username' => $username,
                'password' => $password
            ]);

            return $this->respond([
                'status' => 'success',
                'message' => 'User baru berhasil dibuat saat login',
                'user' => [
                    'id' => $newId,
                    'username' => $username,
                    'password' => $password
                ]
            ]);
        }
    }
}
