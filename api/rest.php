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

if ($request == 'remove'){
$category = $postdata['category'];
$categoryID = $category['id'];
$sql = "DELETE FROM categories WHERE `id`='".$categoryID."'";
	if ($conn->query($sql) === TRUE) {
	    echo json_encode(true);
	} else {
	    echo json_encode(false);
	}

 }

if ($request == 'update'){
$category = $postdata['category'];
$categoryID = $category['id'];
$categoryTitle = $category['title'];
$categoryForms = $category['forms'];
$sql = "UPDATE categories SET title='".$categoryTitle."' WHERE `id`='".$categoryID."'";
	if ($conn->query($sql) === TRUE) {
	    echo json_encode(true);
	} else {
	    echo json_encode(false);
	}

 }



if ($request == 'upload'){

		$file = $postdata['file'];
		$fileURL = $file['downloadURL'];
		$fileSize = $file['size'];
		$fileExt = $file['ext'];
		$filedate = $file['date'];
		$title = $file['title'];
		$category = $postdata['category'];
		$categoryID = $category['id'];
		$pushResult = '{"title":"'.$title.'","size":"'.$fileSize.'","date":"'.$filedate.'","format":"'.$fileExt.'","url":"'.$fileURL.'"}';

		$sql = "SELECT forms FROM categories WHERE `id`='".$categoryID."'";
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$readResult=$row["forms"];

			}


		}

		 if($readResult){
		 		$readResult = substr($readResult, 1);
		 		$readResult = rtrim($readResult,"]");
		 		$pushResult = '['.$readResult .','. $pushResult.']';
		 }
		 else{
		 		$pushResult = '['. $pushResult.']';

		 }
		$sqlPush = "UPDATE categories SET forms='".$pushResult."' WHERE `id`='".$categoryID."'";
	if ($conn->query($sqlPush) === TRUE) {
	    echo json_encode(true);
	} else {
	    echo json_encode(false);
	}

 }


$conn->close();

?>