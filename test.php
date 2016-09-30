<?php

/*    $json = '{"id":"1",
            "datum":"12.07.16",
            "name":"Firma 1",
            "als":"Sofwareentwickler",
            "partner":"Frau Schulz",
            "ruckfrage":"12.12.12",
            "einladung":true,
            "einladungdatum":"12.12.12",
            "notiz":"Ich finde die Firma ist perfect für mich."}';

    $txt = json_decode($json);*/

    $file = "testfile.json";

    $myfile = file_get_contents($file);

    $localjson = json_decode($myfile, true);



    foreach ($localjson as $firms=>$values){
        echo $values["id"];

        if($values["id"] == 1)
        {
            echo "gefunden";
            $localjson[$firms]["einladung"] = 1;
            echo "<br> ". $localjson[$firms]["einladung"];

        }
    }


foreach ($localjson as $firms){
    echo "\n<br>";

    foreach ($firms as $firm => $values)
    {
        echo "$firm : $values";
        echo "<br>";
    }

}
    //print_r($localjson);

$myfile = json_encode($localjson, true);
file_put_contents($file, $myfile);
?>