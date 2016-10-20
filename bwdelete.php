<?php

$file = "bwinfo.json";
$myfile = file_get_contents($file);
$localjson = json_decode($myfile, true);



$txt = file_get_contents("php://input");
$txt = json_decode($txt,true);

foreach ($localjson as $firms=>$values){

    if($values["id"] == $txt["id"])
    {
        $id = $txt["id"] - 1;
        unset($localjson[$id]);

    }
}


$myfile = json_encode($localjson, true);
file_put_contents($file, $myfile);
?>