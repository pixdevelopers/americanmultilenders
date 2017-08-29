<?php
header('Content-type:application/json');
$postdata = json_decode(file_get_contents('php://input'), true);
$user = $postdata['username'];
$pass = md5($postdata['password']);
require('db.php');
$sql = "SELECT * FROM users where `user`='".$user."' and `pass`='".$pass."'";
$result = $conn->query($sql);
$response = array();

if ($result->num_rows > 0) {

    echo json_encode(true);

}
else {
    echo json_encode(false);
}
$conn->close();

?>