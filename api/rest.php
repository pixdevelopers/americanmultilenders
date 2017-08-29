<?php
header('Content-type:application/json');
$postdata = json_decode(file_get_contents('php://input'), true);
$request = $postdata['request'];
require('db.php');

if ($request == 'add'){
$categoryTitle = $postdata['category'];
$sql = "INSERT INTO categories (title) VALUES ('".$categoryTitle."')";
	if ($conn->query($sql) === TRUE) {
	    echo json_encode(true);
	} else {
	    echo json_encode(false);
	}
}
$conn->close();

?>