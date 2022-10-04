<?php
header("Content-Type: text/plain; charset=utf-8");
header("Cache-Control: no-cache , private");
header("Pragma: no-cache");
$dbhost="";
$dbuser="";
$dbpass="";
$jmail = "";
$dblink=mysql_connect($dbhost,$dbuser,$dbpass) or die('Impossible de se connecter à la BdD : ' . mysql_error());
mysql_select_db($dbuser,$dblink);
if(isset($_POST['jnomedit']) && isset($_POST['jpassedit']) && isset($_POST['jpasseditv']) && isset($_POST['jgenderedit'])){
	if(isset($_POST['jmailedit'])) { $jmail = $_POST['jmailedit']; }
	if($_POST['jpassedit'] !== $_POST['jpasseditv']) { 
		echo "Vérification du mot de passe échouée !";
		mysql_close($dblink);
		return;
	}
	/*$result = "test";*/
	$sql="INSERT INTO yahtzees_users(jnom,jpass,jgenre,jmail) VALUES ('".addslashes($_POST['jnomedit'])."','".addslashes($_POST['jpassedit'])."','".addslashes($_POST['jgenderedit'])."','".addslashes($jmail)."');";
	$result = mysql_query($sql,$dblink) or die (mysql_error($dblink));
  echo $_POST['jnomedit']." -> ADD OK! (".$result.")";
}else{
  echo "OUPS... (".$_POST['jnomedit'].",".$_POST['jpassedit'].",".$_POST['jpasseditv'].",".$_POST['jgenderedit'].")";
}
mysql_close($dblink);
?>
