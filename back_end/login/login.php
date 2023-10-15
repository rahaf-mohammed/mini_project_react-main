<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-type: application/json");

require_once '../db.php'; 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;
    $password = $data->password;

    $stmt = $pdo->prepare("SELECT * FROM Users WHERE Email = ?");
    $stmt->execute([$email]);

    $user = $stmt->fetch();
    if ($user && password_verify($password, $user['Password'])) {
        echo json_encode(['success' => true, 'message' => 'Login successful', 'UserId'=>$user['UserId']]);


    } else {
        // Passwords do not match, login failed
        echo json_encode(['success' => false, 'message' => 'Login failed. Please check your credentials.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
