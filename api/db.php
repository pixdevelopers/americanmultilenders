<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";
// $username = "monaa_aml";
// $password = "Monamona123";
// $dbname = "monaandsha_aml";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

?>