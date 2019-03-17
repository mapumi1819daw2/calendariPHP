<?php
require("dbconfig.php");

$theDate1 = isset($_REQUEST["date1"]) ? $_REQUEST["date1"] : "";
$theDate2 = isset($_REQUEST["date2"]) ? $_REQUEST["date2"] : "";
echo "Interval entre $theDate1 i $theDate2";




$conn = mysqli_connect($host, $user, $pswd, $dbname);

if(!$conn){
    die("Connection failed: ".mysqli_connect_error());
}


function getInfo($conn){
    $sql = "SELECT * FROM $table";
    $result = mysqli_query($conn, $sql);
    
    $info = array();

    if(mysqli_num_rows($result)>0){
        while($row = mysqli_fetch_assoc($result)){
            array_push($info, $row);
        }
    }



    return $info;

}



getInfo($conn);
?> 
