<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding');
header('Content-type: application/json');

require("../db.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'];

    // Use a prepared statement to prevent SQL injection
    $stmt = $pdo->prepare("SELECT * FROM Users WHERE `UserId` = ?");
    $stmt->execute([$id]);

    $user = array();

    // Fetch the data from the prepared statement
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $user[] = $row;
    }

    echo json_encode($user);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle POST request
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;

    // Use a prepared statement to prevent SQL injection
    $stmt = $pdo->prepare("SELECT * FROM Users WHERE `UserId` = ?");
    $stmt->execute([$id]);

    $user = array();

    // Fetch the data from the prepared statement
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $user[] = $row;
    }

    echo json_encode($user);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}

// Close the database connection
$pdo = null;
?>
