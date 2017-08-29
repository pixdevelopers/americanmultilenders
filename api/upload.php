<?php

$filename = date("Y-m-d-H-i-s").'_'.$_FILES['file']['name'];
$location = '../uploads/forms/';
function human_filesize($bytes, $decimals = 2) {
    $size = array('B','kB','MB','GB','TB','PB','EB','ZB','YB');
    $factor = floor((strlen($bytes) - 1) / 3);
    return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . @$size[$factor];
}

function get_extension($file) {
 $extension = end(explode(".", $file));
 return $extension ? $extension : false;
}


$size = human_filesize($_FILES['file']['size']);
$ext = get_extension($filename);


/* Upload file */
if(move_uploaded_file($_FILES['file']['tmp_name'],$location.$filename)){
echo json_encode(array("name"=>$filename, "size"=>$size, "ext"=>$ext, "date"=>date("Y-m-d")));   
}

