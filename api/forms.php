<?php
header('Content-type:application/json');
require('db.php');
$sql = "SELECT * FROM categories";
$result = $conn->query($sql);
$response = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
            $arr = array(
        	'id' => $row["id"],
        	'title' => $row["title"],
        	'forms' => $row["forms"]
    );
    array_push($response,$arr);
    }
    echo json_encode($response);
} else {
    echo "0 results";
}
$conn->close();
?>