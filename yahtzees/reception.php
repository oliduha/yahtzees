<?php
header("Content-Type: text/plain; charset=utf-8");
header("Cache-Control: no-cache , private");
header("Pragma: no-cache");
$dbhost="";
$dbuser="";
$dbpass="";
$dblink=mysql_connect($dbhost,$dbuser,$dbpass) or die('Impossible de se connecter à la BdD : ' . mysql_error());
mysql_select_db($dbuser,$dblink);
if(isset($_POST['gt']) && isset($_POST['jn']) && isset($_POST['js'])){
	$sql="INSERT INTO yahtzees(gametype,jnom,jscore) VALUES ('".addslashes($_POST['gt'])."','".addslashes($_POST['jn'])."','".addslashes($_POST['js'])."');";
	$result = mysql_query($sql,$dblink) or die (mysql_error($dblink));
  echo $_POST['jn']." : ".$_POST['js']." -> POST OK! (".$result.")";
}else{
  echo "OUPS...";
}
mysql_close($dblink);
?>
