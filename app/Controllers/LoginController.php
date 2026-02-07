<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use MongoDB\Client as MongoDB;

class LoginController extends ResourceController
{
    private $collection;

    public function __construct()
    {
        $mongo = new MongoDB();
        $this->collection = $mongo->chartify->login;
    }

    public function index()
    {
        $users = $this->collection->find();
        $data = [];

        foreach ($users as $user) {
            $user['_id'] = (string) $user['_id']; // ubah ObjectId ke string
            $data[] = $user;
        }

        return $this->respond($data);
    }

    public function create()
    {
        $json = $this->request->getJSON();

        $userData = [
            'username' => $json->username,
            'password' => $json->password,
            'role'     => $json->role,
        ];

        $this->collection->insertOne($userData);
        return $this->respondCreated(['message' => 'User berhasil ditambahkan']);
    }

    public function update($id = null)
    {
        $json = $this->request->getJSON();

        $updateData = [
            'username' => $json->username,
            'password' => $json->password,
            'role'     => $json->role,
        ];

        $this->collection->updateOne(
            ['_id' => new \MongoDB\BSON\ObjectId($id)],
            ['$set' => $updateData]
        );

        return $this->respond(['message' => 'User berhasil diperbarui']);
    }

    public function delete($id = null)
    {
        $this->collection->deleteOne(['_id' => new \MongoDB\BSON\ObjectId($id)]);
        return $this->respondDeleted(['message' => 'User berhasil dihapus']);
    }
}
