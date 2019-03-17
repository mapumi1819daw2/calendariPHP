<?php
// Basat en http://www.triconsole.com/php/calendar_datepicker.php
/* require_once('calendar/classes/tc_calendar.php'); */
?>
<HTML>
<HEAD>
	<meta content="text/html; charset=UTF-8" http-equiv="content-type">
	<link href="calendar/calendar.css" rel="stylesheet" type="text/css" />
	<script language="javascript" src="calendar/calendar.js"></script>
	<script language="javascript" src="jquery.min.js"></script>
	<script language="javascript" src="Chart.min.js"></script>
	<script language="javascript" src="script.js"></script>
	<style type="text/css">
	body, input, select { font-size: 13px; font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", "DejaVu Sans", "Verdana", sans-serif; }

	pre { font-size: 13px; font-family: "Consolas", "Menlo", "Monaco", "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace, serif; background-color: #FFFFCC; padding: 5px 5px 5px 5px; }
	pre .comment { color: #008000; }
	pre .builtin { color: #FF0000; }

	canvas{
		width: 500px;
		height: 500px;
	}
	</style>
	<TITLE>Selecció de gràfica a mostrar</TITLE>
</HEAD>
<BODY>
	<form id="formulari">
	<?php

	function getNumbers($n){
		for($i=0; $i<=23; $i++){
			$opcio = '<option value="'.$i.'"';
			$opcio .= ($i == (int)date($n)) ? "selected>": ">";
			$opcio .= $i. "</option>\n";
			echo $opcio;
		}
	}

	//get class into the page
	require_once('calendar/classes/tc_calendar.php');


	echo "Hora inicial: ";

	?><select id ="HoraIni"><?php
		getNumbers('H');
	?>
	</select>

	<?php

	echo "Minut Inicial: ";

	?><select name ="MinIni"><?php
		getNumbers('m');
	?>
	</select>

	<?php

	echo "Data inicial: ";
	//instantiate class and set properties
	$myCalendar = new tc_calendar("date1", true);
	$myCalendar->setIcon("calendar/images/iconCalendar.gif");
	$myCalendar->setDate(date('d'), date('m'), date('Y'));
	$myCalendar->setPath("calendar/");
	$myCalendar->setYearInterval(2017, 2080);
	//$myCalendar->dateAllow('2017-01-01', '2018-11-30', false);
	$myCalendar->startMonday(true);
	$myCalendar->showWeeks(true);  
	$myCalendar->setTimezone("Europe/Andorra");
	$myCalendar->setDate(17, 12, 2018);

	//output the calendar
	$myCalendar->writeScript();	  


	echo "<BR><BR>Hora final: ";
	?>

	<select name ="HoraFi"><?php
		getNumbers('H');
	?>
	</select>


	<?php


	echo "Minut final: ";

	?><select name ="MinFi"><?php
		getNumbers('m');
	?>
	</select>

	<?php


	echo "Data final: \n";
	
	$myCalendarE = new tc_calendar("date2", true);
	$myCalendarE->setIcon("calendar/images/iconCalendar.gif");
	$myCalendarE->setDate(date('d'), date('m'), date('Y'));
	$myCalendarE->setPath("calendar/");
	$myCalendarE->setYearInterval(2017, 2080);
	//$myCalendarE->dateAllow('2017-01-01', '2018-11-30', false);
	$myCalendarE->startMonday(true);
	$myCalendarE->showWeeks(true);  
	$myCalendarE->setTimezone("Europe/Andorra");
	$todayDay = date("d"); $todayMonth = date("m"); $todayYear = date("Y");
	$myCalendarE->setDate($todayDay, $todayMonth, $todayYear);
	$myCalendarE->writeScript();	  
	echo "<BR><BR>\n";
	?>
	<input id="submit" type="submit"/>
	</form>






	<canvas id="myCanvas"></canvas>	
	<canvas id="myCanvas1"></canvas>	
	<canvas id="myCanvas2"></canvas>	
</HTML>	
