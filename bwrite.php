<?php
$file = "bwinfo.json";

$myfile = file_get_contents($file);

$localjson = json_decode($myfile, true);


$txt = file_get_contents("php://input");


$txt = json_decode($txt,true);


foreach ($localjson as $firms=>$values){

    if($values["id"] == $txt["id"])
    {
        $localjson[$firms]["datum"] = $txt["datum"];
        $localjson[$firms]["name"] = $txt["name"];
        $localjson[$firms]["als"] = $txt["als"];
        $localjson[$firms]["partner"] = $txt["partner"];
        $localjson[$firms]["ruckfrage"] = $txt["ruckfrage"];
        $localjson[$firms]["einladung"] = $txt["einladung"];
        $localjson[$firms]["einladungZeit"] = $txt["einladungZeit"];
        $localjson[$firms]["notiz"] = $txt["notiz"];
        $localjson[$firms]["status"] = $txt["status"];
    }
}

$myfile = json_encode($localjson, true);
file_put_contents($file, $myfile);
?>