<?php
header('Content-Type: text/xml'); 
echo "<?xml version=\"1.0\"?>\n";
echo "<data>\n";
$dbhost="";
$dbuser="";
$dbpass="";
$dblink=mysql_connect($dbhost,$dbuser,$dbpass) or die('Impossible de se connecter à la BdD : '.mysql_error());
mysql_select_db($dbuser,$dblink);
$query = "SELECT * FROM yahtzees WHERE gametype='".$_GET['gt']."' AND jnom= '".$_GET['jn']."' ORDER BY jscore DESC LIMIT 1;";
$result = mysql_query($query,$dblink) or die (mysql_error($dblink));
while ($row = mysql_fetch_assoc($result)) {
	echo "<record>";
	echo "<dt>" . $row["dt"] . "</dt>\n";
	echo "<gt>" . htmlspecialchars($row["gametype"]) . "</gt>\n";
	echo "<jn>" . $row["jnom"] . "</jn>\n";
	echo "<js>" . $row["jscore"] . "</js>\n";
	echo "</record>";
}
mysql_free_result($result);
echo "</data>\n";
mysql_close($dblink);
?>
