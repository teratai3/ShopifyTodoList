<?php

namespace Plugin\TodoListApi\Controllers;

use CodeIgniter\API\ResponseTrait;
use Plugin\ShopifyAuth\Controllers\Api\ApiBaseController;
use Plugin\TodoListApi\Models\TodoListsModel;
use Config\Database;

class TodoLists extends ApiBaseController
{
    use ResponseTrait;

    protected $TodoLists;

    public function __construct()
    {
        parent::__construct();
        $this->TodoLists = new TodoListsModel();
    }

    public function index()
    {
        $page = $this->request->getVar('page') ?? 1;
        $perPage = $this->request->getVar('perPage') ?? 10;
        $title = $this->request->getVar('title') ?? "";
        $status = $this->request->getVar('status') ?? "";

        // クエリを初期化
        $query = $this->TodoLists->orderBy("created_at", "DESC");


        $query->where('shopify_auth_id', $this->getShopId());
        // 検索語が提供されている場合はLIKE条件を追加
        if (!empty($title)) {
            $query->like('title', $title);
        }

        if (!empty($status)) {
            $query->where('status', $status);
        }

        $totalItems = $this->TodoLists->countAllResults(false); // Get total items without resetting query
        $totalPages = ceil($totalItems / $perPage);

        $datas = $query->paginate($perPage, '', $page);

        return $this->respond([
            "data" => $datas,
            "meta" => [
                "currentPage" => $page,
                "perPage" => $perPage,
                "totalItems" => $totalItems,
                "totalPages" => $totalPages,
                "hasNextPage" => $page < $totalPages,
                "hasPreviousPage" => $page > 1,
            ],
        ]);
    }

    public function show($id = 0)
    {
        $data = $this->TodoLists->where([
            "id" => $id,
            'shopify_auth_id' => $this->getShopId()
        ])->first();

        if (empty($data)) {
            return $this->fail(["error" => "指定されたやることリストは存在しません。"], 404);
        }

        return $this->respond([
            "data" => $data
        ]);
    }

    public function create()
    {
        $jsonData = $this->request->getJSON(true);


        if (is_null($jsonData) || !is_array($jsonData)) {
            return $this->failValidationErrors(['error' => '無効なJSONデータ']);
        }

        // log_message('info', 'Received data: ' . json_encode($jsonData));
        // バリデーションを実行
        if (!$this->validateData($jsonData, config("TodoListValidation")::DEFAULT)) {
            //log_message('info', 'Received data: ' . json_encode($this->validator->getErrors()));
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $db = Database::connect();
        $db->transStart();

        try {
            $jsonData["shopify_auth_id"] = $this->getShopId();
            $result = $this->TodoLists->insert($jsonData);

            if ($result === false) {
                throw new \Exception($db->error()["message"]);
            }

            $db->transCommit();
        } catch (\Exception $e) {
            $db->transRollback();
            // log_message('error', 'サーバーエラー：' . $e->getMessage());
            return $this->failServerError('サーバーエラー：' . $e->getMessage());
        }

        return $this->respondCreated([
            "id" => $result,
            'message' => 'やることリストの追加に成功しました。'
        ]);
    }

    public function update($id = 0)
    {
        $jsonData = $this->request->getJSON(true);
        $data = $this->TodoLists->where([
            "id" => $id,
            'shopify_auth_id' => $this->getShopId()
        ])->first();

        if (empty($data)) {
            return $this->fail(["error" => "指定されたやることリストは存在しません。"], 404);
        }

        if (is_null($jsonData) || !is_array($jsonData)) {
            return $this->failValidationErrors(['error' => '無効なJSONデータ']);
        }

        if (!$this->validateData($jsonData, config("TodoListValidation")::DEFAULT)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $db = Database::connect();
        $db->transStart();

        try {
            $jsonData["shopify_auth_id"] = $this->getShopId();
            $result = $this->TodoLists->update($id, $jsonData);

            if ($result === false) {
                throw new \Exception($db->error()["message"]);
            }

            $db->transCommit();
        } catch (\Exception $e) {
            $db->transRollback();
            return $this->failServerError('サーバーエラー：' . $e->getMessage());
        }

        return $this->respondCreated([
            "id" => $result,
            'message' => 'やることリストの更新に成功しました。'
        ]);
    }

    public function delete($id = 0)
    {
        $data = $this->TodoLists->where([
            "id" => $id,
            'shopify_auth_id' => $this->getShopId()
        ])->first();

        if (empty($data)) {
            return $this->fail(["error" => "指定されたやることリストは存在しません。"], 404);
        }

        $db = \Config\Database::connect();
        $db->transStart();

        try {
            $result = $this->TodoLists->delete($id);

            if ($result === false) {
                throw new \Exception($db->error()["message"]);
            }

            $db->transCommit();
        } catch (\Exception $e) {
            $db->transRollback();
            return $this->failServerError('サーバーエラー：' . $e->getMessage());
        }

        return $this->respondDeleted([
            "id" => $id,
            'message' => '削除に成功しました。'
        ]);
    }
}
