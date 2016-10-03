<?php

$file = "bwinfo.json";
$myfile = file_get_contents($file);
$localjson = json_decode($myfile, true);


$txt = file_get_contents("php://input");
$txt = json_decode($txt,true);

array_push($localjson, $txt);

$myfile = json_encode($localjson, true);
file_put_contents($file, $myfile);
?>