<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding');
header('Content-type: application/json');

require("../db.php"); // Include your database connection here

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Handle GET request
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id; // Assuming you are passing the user ID from React

    try {
        // Use a prepared statement to prevent SQL injection
        $stmt = $pdo->prepare("SELECT * FROM bill WHERE `UserId` = ?");
        $stmt->execute([$id]);

        $orders = array();

        // Fetch the data from the prepared statement
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $orders[] = $row;
        }

        echo json_encode($orders);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle POST request
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;

    try {
        // Use a prepared statement to prevent SQL injection
        $stmt = $pdo->prepare("SELECT * FROM bill WHERE `UserId` = ?");
        $stmt->execute([$id]);
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $ordersWithProducts = array();

        foreach ($orders as $order) {
            $orderId = $order['BillID'];
            $stmt = $pdo->prepare("SELECT p.ProductName , p.Image FROM bill AS b join bill_products bp on bp.bill_id = b.BillID JOIN products AS p ON bp.product_id = p.ProductID WHERE b.BillID = ?");
            $stmt->execute([$orderId]);
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Add the products to the order
            $order['Products'] = $products;

            // Add the modified order to the result array
            $ordersWithProducts[] = $order;
        }
        // var_dump($ordersWithProducts);


        // Fetch the data from the prepared statement
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $orders[] = $row;
        }

        echo json_encode($ordersWithProducts);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}

// Close the database connection
$pdo = null;