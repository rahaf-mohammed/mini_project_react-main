<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type: application/json");

require_once("../db.php");

if(isset($_POST)){
    $data = file_get_contents("php://input");
    $user = json_decode($data, true);

    $FirstName = ($user['FirstName']);
    $LastName = ($user['LastName']);
    $Email = ($user['Email']);
    $phone = ($user['phone']);
    $ShippingAddress = ($user['ShippingAddress']);
    $Password = ($user['Password']);
    $UserId = ($user['UserId']);

    // Check if all necessary data is provided before attempting to update
    if(isset($FirstName, $LastName, $Email, $phone, $ShippingAddress, $Password, $UserId)){
        // Assuming you have a 'users' table in your database
        $sql = "UPDATE users SET 
                FirstName = :FirstName,
                LastName = :LastName,
                Email = :Email,
                phone = :phone,
                ShippingAddress = :ShippingAddress,
                Password = :Password
                WHERE UserId = :UserId"; // You should have a unique identifier for the user, like UserID

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':FirstName', $FirstName);
        $stmt->bindParam(':LastName', $LastName);
        $stmt->bindParam(':Email', $Email);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':ShippingAddress', $ShippingAddress);
        $stmt->bindParam(':Password', $Password);
        $stmt->bindParam(':UserId', $UserId);

        if ($stmt->execute()) {
            echo json_encode(array("message" => "User updated successfully."));
        } else {
            echo json_encode(array("message" => "Unable to update user."));
        }
    } else {
        echo json_encode(array("message" => "Missing required user data."));
    }
} else {
    echo json_encode(array("message" => "Invalid request."));
}
?>
