<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type: application/json");

require_once '../db.php';

// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    // Use object notation to access properties of the $data object
    $firstName = $data->firstName;
    $lastName = $data->lastName;
    $email = $data->email;
    $password = password_hash($data->password, PASSWORD_DEFAULT);
    $shippingAddress = $data->address;
    $phone = $data->phone;
    $isAdmin = 0; // Set isAdmin to 0 for regular users
    $isDeleted = 0; // Set isDeleted to 0 for active users

    // Prepare and execute the SQL query to insert the user data into the database
    $stmt = $pdo->prepare("INSERT INTO Users (FirstName, LastName, Email, Password, ShippingAddress, phone, IsAdmin, IsDeleted)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$firstName, $lastName, $email, $password, $shippingAddress, $phone, $isAdmin, $isDeleted]);

    // Check if the insertion was successful
    if ($stmt->rowCount() > 0) {
        // Registration was successful
        echo json_encode(['message' => 'Registration successful']);
    } else {
        // Registration failed
        echo json_encode(['message' => 'Registration failed']);
    }
} else {
    // Invalid request method
    echo json_encode(['message' => 'Invalid request method']);
}
?>
