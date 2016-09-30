<?php
//Script to get bigest ID in bewerbungsfile to now last one.
$file = "bwinfo.json";

$myfile = file_get_contents($file);

$localjson = json_decode($myfile, true);


$txt = file_get_contents("php://input");


$txt = json_decode($txt,true);

$lastId = 0;

foreach ($localjson as $firms=>$values){

    if($values["id"] > $lastId)
    {
       $lastId = $values["id"];
    }
}
echo $lastId;


?>