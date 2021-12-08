//Variables globales
var vp = viewport(),
	lastedit = null,
	lastval = null,
	rollcount = 1,
	prime = 0,
	store = Storages.initNamespaceStorage('Yahtzees').localStorage,
	odefconfig = {
		variante: "custom",
		nbjoueurs: 2,
		userealdices: "rdices",
		primeyahtzee: "yah",
		scoretype: "styaht",
		linesopt: ["lch"],
		suitesopt: "su1",
		colsopt: [{
			coltype: "L",
			multi: 1,
			colopt: ""
		},{
			coltype: "L",
			multi: 1,
			colopt: ""
		},{
			coltype: "L",
			multi: 1,
			colopt: ""
		},{
			coltype: "L",
			multi: 1,
			colopt: ""
		},{
			coltype: "L",
			multi: 1,
			colopt: ""
		}]
	},
	ocfgzazane = {
		variante: "zazane",
		nbjoueurs: 2,
		userealdices: "rdices",
		primeyahtzee: "all",
		scoretype: "styaht",
		linesopt: ["lch"],
		suitesopt: "su1",
		colsopt: [{
			coltype: "L",
			multi: 1,
			colopt: ""
		},{
			coltype: "L",
			multi: 1,
			colopt: ""
		},{
			coltype: "D",
			multi: 1,
			colopt: ""
		},{
			coltype: "M",
			multi: 1,
			colopt: ""
		},{
			coltype: "A",
			multi: 1,
			colopt: ""
		}]
	},
	ocfgyahtzee = {
		variante: "yahtzee",
		nbjoueurs: 2,
		userealdices: "rdices",
		primeyahtzee: "yah",
		scoretype: "styaht",
		linesopt: ["lch"],
		suitesopt: "su1",
		colsopt: [{
			coltype: "L",
			multi: 1,
			colopt: ""
		},{
			coltype: "L",
			multi: 1,
			colopt: ""
		},{
			coltype: "L",
			multi: 1,
			colopt: ""
		},{
			coltype: "L",
			multi: 1,
			colopt: ""
		},{
			coltype: "L",
			multi: 1,
			colopt: ""
		}]
	},
	ocfgyams = {
		variante: "yams",
		nbjoueurs: 2,
		userealdices: "rdices",
		primeyahtzee: "yah",
		scoretype: "styams",
		linesopt: ["lmm"],
		suitesopt: "su1",
		colsopt: [{
			coltype: "L",
			multi: 1,
			colopt: ""
		},{
			coltype: "L",
			multi: 1,
			colopt: ""
		},{
			coltype: "L",
			multi: 1,
			colopt: ""
		},{
			coltype: "L",
			multi: 1,
			colopt: ""
		},{
			coltype: "L",
			multi: 1,
			colopt: ""
		}]
	},
	ocfgx5 = {
		variante: "x5",
		nbjoueurs: 2,
		userealdices: "rdices",
		primeyahtzee: "all",
		scoretype: "styaht",
		linesopt: ["lch"],
		suitesopt: "su1",
		colsopt: [{
			coltype: "L",
			multi: 1,
			colopt: ""
		},{
			coltype: "L",
			multi: 2,
			colopt: ""
		},{
			coltype: "L",
			multi: 3,
			colopt: ""
		},{
			coltype: "L",
			multi: 4,
			colopt: ""
		},{
			coltype: "L",
			multi: 5,
			colopt: ""
		}]
	},
	ocfgx10 = {
		variante: "x10",
		nbjoueurs: 2,
		userealdices: "rdices",
		primeyahtzee: "all",
		scoretype: "styaht",
		linesopt: ["lch"],
		suitesopt: "su1",
		colsopt: [{
			coltype: "L",
			multi: 1,
			colopt: ""
		},{
			coltype: "L",
			multi: 2,
			colopt: ""
		},{
			coltype: "L",
			multi: 3,
			colopt: ""
		},{
			coltype: "L",
			multi: 4,
			colopt: ""
		},{
			coltype: "L",
			multi: 5,
			colopt: ""
		},{
			coltype: "L",
			multi: 6,
			colopt: ""
		},{
			coltype: "L",
			multi: 7,
			colopt: ""
		},{
			coltype: "L",
			multi: 8,
			colopt: ""
		},{
			coltype: "L",
			multi: 9,
			colopt: ""
		},{
			coltype: "L",
			multi: 10,
			colopt: ""
		}]
	},
	tdeflines = [
		{type: "th", title: "Joueur #", id:"jnom#", classes: "j# edit jnom"},
		{type: "th", title: "", id:"t_j#_l0_c$", classes: "j# title"},
		{type: "td", title: "1", id:"j#_l1_c$", classes: "j# l1 c$ haut"},
		{type: "td", title: "2", id:"j#_l2_c$", classes: "j# l2 c$ haut"},
		{type: "td", title: "3", id:"j#_l3_c$", classes: "j# l3 c$ haut"},
		{type: "td", title: "4", id:"j#_l4_c$", classes: "j# l4 c$ haut"},
		{type: "td", title: "5", id:"j#_l5_c$", classes: "j# l5 c$ haut"},
		{type: "td", title: "6", id:"j#_l6_c$", classes: "j# l6 c$ haut"},
		{type: "th", title: "Sous-total", id:"j#_lst_c$", classes: "j# lst"},
		{type: "th", title: "Prime", id:"j#_lp_c$", classes: "j# lp"},
		{type: "th", title: "Total haut", id:"j#_lth_c$", classes: "j# lth"},
		{type: "td", title: "Mini", id:"j#_lmi_c$", classes: "j# lmi c$ bas", opt: true},
		{type: "td", title: "Maxi", id:"j#_lma_c$", classes: "j# lma c$ bas", opt: true},
		{type: "td", title: "Brelan", id:"j#_lbr_c$", classes: "j# lbr c$ bas"},
		{type: "td", title: "Carré", id:"j#_lca_c$", classes: "j# lca c$ bas"},
		{type: "td", title: "Full", id:"j#_lfu_c$", classes: "j# lfu c$ bas"},
		{type: "td", title: "Petite suite", id:"j#_lps_c$", classes: "j# lps c$ bas"},
		{type: "td", title: "Grande suite", id:"j#_lgs_c$", classes: "j# lgs c$ bas"},
		{type: "td", title: "Rigole", id:"j#_lri_c$", classes: "j# lri c$ bas", opt: true},
		{type: "td", title: "Yahtzee|Yam\'s", id:"j#_lya_c$", classes: "j# lya c$ bas"},
		{type: "td", title: "Chance", id:"j#_lch_c$", classes: "j# lch c$ bas", opt: true},
		{type: "th", title: "Total bas", id:"j#_ltb_c$", classes: "j# ltb c$"},
		{type: "th", title: "Bonus ya.", id:"j#_lby_c$", classes: "j# lby c$"},
		{type: "th", title: "Total", id:"j#_lt_c$", classes: "j# lt c$"}
	],
	tdefcols = [
		{type: "th", title: "", id:"t_j#_l%_c0", classes: ""},
		{type: "td", title: "Libre", id:"j#_l%_c1", classes: "", opt: "", coef: 1},
		{type: "td", title: "Libre", id:"j#_l%_c2", classes: "", opt: "", coef: 1},
		{type: "td", title: "Libre", id:"j#_l%_c3", classes: "", opt: "", coef: 1},
		{type: "td", title: "Libre", id:"j#_l%_c4", classes: "", opt: "", coef: 1},
		{type: "td", title: "Libre", id:"j#_l%_c5", classes: "", opt: "", coef: 1},
		{type: "th", title: "Total", id:"j#_l%_ct", classes: "ct"}
	],
	tturndices = [],
	globalturn = 0,
	jturn = 1,
	playing = false,
	oconfig = $.extend({}, odefconfig),
	ctInt = null;
//var ocustom = $.extend({}, odefcustom);
	
//******************************************************************
function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
      a = 'client';
      e = document.documentElement || document.body;
    }
    //console.log({ width : e[ a+'Width' ] , height : e[ a+'Height' ] });
    return { width : e[ a + 'Width' ] , height : e[ a + 'Height' ] };
}

//******************************************************************
// Execution de la fonction d'initialisation après chargement du dom
$(function() {
	$('#dice1').dice({ 'background': 'transparent', 'glyphSrc': 'img/dice.gif', 'juggleTimeout': 300, 'callback': callback1 });
	$('#dice2').dice({ 'background': 'transparent', 'glyphSrc': 'img/dice.gif', 'juggleTimeout': 450, 'callback': callback2 });
	$('#dice3').dice({ 'background': 'transparent', 'glyphSrc': 'img/dice.gif',	'juggleTimeout': 600,	'callback': callback3 });
	$('#dice4').dice({ 'background': 'transparent',	'glyphSrc': 'img/dice.gif', 'juggleTimeout': 750, 'callback': callback4 });
	$('#dice5').dice({ 'background': 'transparent', 'glyphSrc': 'img/dice.gif', 'juggleTimeout': 900, 'callback': callback5 });
	$("#dices").dialog({
		dialogClass: "no-titlebar",
		autoOpen: false,
		show: { effect: "fold", duration: 500 },
		hide: { effect: "fold", duration: 500 },
	  draggable: false,
	  resizable: false,
	  width: 260,
	  height: 250 }).parent().draggable();
	$("#custconfigpanel").dialog({
		dialogClass: "no-close",
		title: "Configuration du jeu",
		autoOpen: false,
	  show: { effect: "fold", duration: 500 },
	  hide: { effect: "fold", duration: 500 },
	  draggable: false,
	  resizable: false,
	  modal: true,
	  width: 542,
	  height: 595 });
	$("#userpanel").dialog({
		dialogClass: "no-close",
		title: "Utilisateurs",
		autoOpen: false,
	  show: { effect: "fold", duration: 500 },
	  hide: { effect: "fold", duration: 500 },
	  draggable: false,
	  resizable: false,
	  width: 400,
	  height: 500,
	  buttons: [{
      text: "Ok",
      icon: "ui-icon-check",
      click: function() { $( this ).dialog( "close" ); }
    }] 
  }).parent().draggable();
	$("#edituserpanel").dialog({
		dialogClass: "no-close",
		title: "Nouveau joueur",
		autoOpen: false,
	  show: { effect: "fold", duration: 500 },
	  hide: { effect: "fold", duration: 500 },
	  draggable: false,
	  resizable: false,
	  width: 352,
	  height: 300,
	  buttons: [{
      text: "Ok",
      icon: "ui-icon-check",
      click: function() { $("#usereditform").trigger("submit"); }
    },{
      text: "Reset",
      icon: " ui-icon-arrowreturnthick-1-w",
      click: function() { $("#usereditform").trigger("reset"); }
    },{
      text: "Annuler",
      icon: "ui-icon-cancel",
      click: function() { $( this ).dialog( "close" ); }
    }] 
  }).parent().draggable();
	$("#helppanel").dialog({
		dialogClass: "no-close",
		title: "Aide",
		autoOpen: false,
		position: { my: "right top", at: "right bottom", of: "#iconhelp" },
	  show: { effect: "fold", duration: 500 },
	  hide: { effect: "fold", duration: 500 },
	  draggable: false,
	  resizable: false,
	  width: 300,
	  height: 500,
	  buttons: [{
      text: "Ok",
      icon: "ui-icon-check",
      click: function() { $( this ).dialog( "close" ); }
    }] 
  }).parent().draggable();
	$("#winpanel").dialog({
		dialogClass: "no-close",
		title: "Résultats de la partie",
		autoOpen: false,
	  show: { effect: "fold", duration: 500 },
	  hide: { effect: "fold", duration: 500 },
	  draggable: false,
	  resizable: false,
	  width: 500,
	  height: 400,
	  buttons: [{
      text: "Ok",
      icon: "ui-icon-check",
      click: closeWinPanel
    }] 
  }).parent().draggable();
	$("#top10panel").dialog({
		dialogClass: "no-close",
		title: "Meilleurs scores",
		autoOpen: false,
	  show: { effect: "fold", duration: 500 },
	  hide: { effect: "fold", duration: 500 },
	  draggable: false,
	  resizable: false,
	  width: 400,
	  height: 500,
	  buttons: [{
      text: "Ok",
      icon: "ui-icon-check",
      click: function() { $( this ).dialog( "close" ); }
    }] 
  }).parent().draggable();
	addInitEvents();
	//loadConfig();
	loadCustConfig();
	initPrev();
	createInitTables();
});
// ##############################################
// Fonctions d'ajout des évenements
function addInitEvents() {
	// icones
	$("#iconhelp").on("click", showHelpPanel);
	$("#icontop").on("click", showTop10Panel);
	$("#icondices").on("click", enDices);
	$("#iconuser").on("click", showUserPanel);
	$("#iconfig").one("click", showCustConfig);
	// panneau users
	$("#btnadduser,#btnmoduser").click(showUserEdit);
	//$("#btnmoduser").click(function() { showUserEdit(this) });
	$("#usereditform").submit(function(event) { sendUser(event);	});
	// panneau config
	$("#selvariante").change(varianteChange);
	$(':checkbox.radiocheckbox').click(radiocheckbox);
	//$("#saveconfig").click(saveConfig);
	$("#addcol").click(addColPrev);
	$("#supprcol").click(supprColPrev);
	$("#savecustconfig").click(saveCustConfig);
	$("#cancelcustconfig").click(cancelCustConfig);
	$( document ).click(function() { $('.ui-tooltip').remove();	});
	$("#icontablelayout").click(toggleTableLayout);// tools
	$("#ipcont").click(startGame).tooltip({
		position: { my: "left bottom-15", at: "left top", collision: "flipfit" }
	});
}

function addTableEvents() {
	$("img,th,td,label").tooltip(); // TODO : title="" sur les <th>
	$("span").tooltip();
	for(let i = 1; i <= oconfig.nbjoueurs; ++i) {	$("#jnom" + i).click(editNom); }
	$("input[type=color]").change(colorChange);
	animIP();
}

function addPlayEvents() {
	// hauteur mini du conteneur de tables
	let thautmax = 33 + (19 * 23.4) + 2;
	if(oconfig.linesopt.indexOf("lmm") !== -1) thautmax += 2 * 23.4;
	if(oconfig.linesopt.indexOf("lri") !== -1) thautmax += 23.4;
	if(oconfig.linesopt.indexOf("lch") !== -1) thautmax += 23.4;
	if($("#table_container").resizable("instance"))
		$("#table_container").resizable("destroy");
	$("#table_container").resizable({// redim. table
		minHeight: thautmax,
		maxHeight: vp.height - 140,
		minWidth: 720,
		maxWidth: vp.width - 26
		});
	$(window).resize(function() {// redim. fenêtre
		vp = viewport();
		$("#table_container").resizable("option", "maxWidth", vp.width - 30)
			.resizable("option", "maxHeight", vp.height - 150);
	});
	$(".dice").click(selectDice);// selection dés
	$("#btnroll").click(rollDices);// btn lancé de dés
	$("td.haut").click(editCellH);//saisie tab haut
	$(".bxh").click(xclic);// btns panneau saisie haut
	$("#bhsh").click(saisieHide);// btn fermeture saisie haut
	$("#effh").click(effCell);// btn effacement haut
	$("td.bas").click(editCellB);// saisie tab bas
	$(".bsb").click(sbclic);// btns panneau saisie bas
	$("#bhsb").click(saisieHide);// btn fermeture panneau saisie bas
	$("#effb").click(effCell);// btn effacement bas
	$("#bhsbs").click(saisieHide);// btn fermeture saisie bas spe
	$("#effbs").click(effCell);// btn effacement bas
	$("#bby").click(bascYa);// btn bascule yahtzee
}

function removePlayEvents() {
	$("#table_container").resizable("destroy");// redim. table
	$(window).off("resize");// redim. fenêtre
	$(".dice").off("click");// selection dés
	$("#btnroll").off("click");// btn lancé de dés
	$("td.haut").off("click");// saisie tab haut
	$(".bxh").off("click");// btns panneau saisie haut
	$("#bhsh").off("click");// btn fermeture saisie haut
	$("#effh").off("click");// btn effacement haut
	$("td.bas").off("click");// saisie tab bas
	$(".bsb").off("click");// btns panneau saisie bas
	$("#bhsb").off("click");// btn fermeture panneau saisie bas
	$("#effb").off("click");// btn effacement bas
	$("#bhsbs").off("click");// btn fermeture saisie bas spe
	$("#effbs").off("click");// btn effacement bas
	$("#bby").off("click");// btn bascule yahtzee
}

function animIP() {
	let animend = 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd';
	if(!$("#ipcont").hasClass("bigip") && !playing) {
		$("#ipcont").addClass("animip");
		$("#ipcont").one(animend, function() {
			$(this).removeClass("animip").addClass("bigip");
		});
	}
}
// ##############################################
// Fonctions callback pour les dés
function callback1(num) { $('#res1').val(num); resChanged(); }
function callback2(num) { $('#res2').val(num); resChanged(); }
function callback3(num) {	$('#res3').val(num); resChanged(); }
function callback4(num) {	$('#res4').val(num); resChanged(); }
function callback5(num) {	$('#res5').val(num); resChanged(); }

function resChanged() {
	let tot = 0;
	$(".res").each(function() {	tot += parseInt($(this).val(), 10);	});
	$("#totalroll").html("total : " + tot);
	$(".res").each(function(index) { tturndices[index] = parseInt($(this).val(), 10);	});
	if(getYahtzee() !== 0) $("#yahtzeeroll").html("<strong>Yahtzee !</strong>"); else $("#yahtzeeroll").empty();
	if(getRigole() !== 0) $("#riroll").text("Rigole !"); else $("#riroll").empty();
	if(getGSuite() !== 0) $("#gsroll").text("Grande suite !"); else $("#gsroll").empty();
	if(getPSuite() !== 0) $("#psroll").text("Petite suite !"); else $("#psroll").empty();
	if(getFull() !== 0) $("#fullroll").text("Full !"); else $("#fullroll").empty();
	if(getCarre() !== 0) $("#caroll").text("Carré !"); else $("#caroll").empty();
	if(getBrelan() !== 0) $("#brroll").text("Brelan !"); else $("#brroll").empty();
}

function selectDice(event) {
	if(rollcount !== 1) $(this).toggleClass("seldice");
	event.stopImmediatePropagation();
}

function rollDices(event) {
	$(".dice").each(function() {
		if(!$(this).hasClass("seldice")) $(this).trigger("roll");
		if($(this).hasClass("desfintour")) $(this).removeClass("desfintour");
	});
	if(rollcount >= 3) { rollcount = 0; finTour(); }
	++rollcount;
	if(rollcount === 1) {
		$("#btnrollnum").text("résultat");
		//$("#btnroll").off("click");
	} else {
		$("#btnrollnum").text("Lancé " + rollcount);
		if(rollcount === 3) maskAn();
	}
	event.stopImmediatePropagation();
}

function finTour() {
		$(".dice").each(function() {
			$(this).removeClass("seldice");
			$(this).addClass("desfintour");
		});
		majTscore();
		$("#btnrollnum").text("Lancé 1");
}
// ##############################################
// Users
function sendUser(event) {
  let url = "jedit.php",
  		fields = $("#usereditform").serializeArray();
  console.log(fields);
  event.preventDefault();
  $.get("https://api.ipdata.co?api-key=test", function (response) {
    console.log("ip:" + response.ip);
    console.log(response);
	}, "jsonp");
  var posting = $.post(url, fields);
	posting.done(function(data) {
    console.log(data);
  });
}
// ##############################################
function startGame() {
	let iplay = $("#iconplay"), cont = $("#ipcont");
	globalturn = 1;
	jturn = 1;
	playing = true;
	iplay.empty().html('<i class="far fa-stop-circle fa-lg"></i>');
	iplay.css("color", "#cc0000");
	cont.attr("title", "Arrêter cette partie");
	cont.off("click");
	cont.click(stopGame);
	if(cont.hasClass("bigip")) {
		cont.removeClass("bigip").addClass("ipreset");
		let animend = 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd';
		cont.one(animend, function() { $(this).removeClass("ipreset"); });
	}
	addPlayEvents();
	initTscore();
	$("th").addClass("noeditth");
	$("td").addClass("noedit");
	$("#tableprev th").removeClass("noeditth");
	$("th.j" + jturn).removeClass("noeditth");
	$("td.j" + jturn).removeClass("noedit");
	$("#tstatus").show();
	startTimer();
	maskUD();
}

function stopGame() {
	if($(this).attr("id") !== "ipcont" || confirm("Arrêter cette partie ?")) {
		let iplay = $("#iconplay"), cont = $("#ipcont");
		globalturn = 0;
		playing = false;
		iplay.empty().html('<i class="far fa-play-circle fa-lg"></i>');
		iplay.css("color", "Lime");
		cont.attr("title", "Démarrer une nouvelle partie");
		$("#tstatus").hide();
		$("th").removeClass("noeditth");
		$("td").removeClass("noedit").removeClass("yahtzeeformat").empty();
		calcule();
		removePlayEvents();
		animIP();
		stopTimer();
		clearTimer();
		cont.off("click");
		cont.click(startGame);
	}
}

function pretty_time_string(num) {
	return ( num < 10 ? "0" : "" ) + num;
}

function startTimer() {
	var start = new Date;
	ctInt = setInterval(function() {
		var total_seconds = (new Date - start) / 1000;   

		var hours = Math.floor(total_seconds / 3600);
		total_seconds = total_seconds % 3600;

		var minutes = Math.floor(total_seconds / 60);
		total_seconds = total_seconds % 60;

		var seconds = Math.floor(total_seconds);

		hours = pretty_time_string(hours);
		minutes = pretty_time_string(minutes);
		seconds = pretty_time_string(seconds);

		var currentTimeString = hours + ":" + minutes + ":" + seconds;

		$('#ttime').text(currentTimeString);
	}, 1000);
}

function stopTimer() {
	clearInterval(ctInt);
}

function clearTimer() {
	$('#ttime').text('00:00:00');
}

function maskUD() {
	for(let j = 1; j <= oconfig.nbjoueurs; ++j) {
		$("th.title.j" + j).each(function(i) {
			if($(this).attr("data-spe") === "D") {// descendant
				let tcd = [];
				$(".j" + j + ".c" + i).each(function() { tcd.push([$(this).text(), $(this).attr("id")]); });
				for(let t = 1, len = tcd.length; t < len; ++t) {
					if(tcd[t][0] === "" && tcd[t-1][0] === "") $("#" + tcd[t][1]).addClass("noedit");
				}
			} else if($(this).attr("data-spe") === "M") {// montant
				let tcd = [];
				$(".j" + j + ".c" + i).each(function() { tcd.push([$(this).text(), $(this).attr("id")]); });
				for(let t = 0, len = tcd.length; t < len - 1; ++t) {
					if(tcd[t][0] === "" && tcd[t+1][0] === "") $("#" + tcd[t][1]).addClass("noedit");
				}
			}
		});
	}
}

function maskAn() {
	$("th.title.j" + jturn).each(function(i) {// annoncé
		if($(this).attr("data-opt") === "S") $(".j" + jturn + ".c" + i).addClass("noedit");
	});
}

function initTscore() {
	let html = "", jcolor = "";
	for(let i = 1; i <= oconfig.nbjoueurs; ++i) {
		html += "<div id='tscorej" + i + "' class='tscorej'>";
		html += $("#jnom" + i).text() + " : ";
		html += $("#j" + i + "_lt_ct").text() + "</div>";
	}
	$("#tscore").empty().append(html);
	$(".tscorej").css({'width': 100 / parseInt(oconfig.nbjoueurs, 10) - 2 + '%'});
	$("#tturn").html("Tour : " + globalturn + " / " + $("td.j1").length + " <span id='pcaret' class='fa-layers fa-fw'><i class='fas fa-location-arrow iblue' data-fa-transform='rotate-45 left-4'></i><i class='fas fa-location-arrow' data-fa-transform='rotate-45 right-3'  style='color:Black'></i><i class='fas fa-location-arrow iblue' data-fa-transform='rotate-45 right-4'></i></span> " + $("#jnom" + jturn).text());
	jcolor = $("#jnom1").css("backgroundColor");
	$("#tturn").css({color: jcolor, borderColor: jcolor});
	$("#tscore").show();
}

function majTscore() {
	let html, ts = [], min = ts[0], max = ts[0], minid = 1, maxid = 1, jcolor = "";
	for(let i = 1, v = ""; i <= oconfig.nbjoueurs; ++i) {
		html = "";
		v = $("#j" + i + "_lt_ct").text();
		html += $("#jnom" + i).text() + " : ";
		html += v;
		$("#tscorej" + i).empty().append(html);
		ts.push(parseInt(v, 10));
	}
	min = ts[0]; max = ts[0]; minid = 1; maxid = 1;
	for(let j = 0, l = ts.length; j < l; ++j) {
		if(max < ts[j]) { max = ts[j]; maxid = j + 1; }
		if(min > ts[j]) { min = ts[j]; minid = j + 1; }
		$("#tscorej" + (j + 1)).removeClass("tsjlast").removeClass("tsjmid").removeClass("tsjfirst");
		if(oconfig.nbjoueurs > 2) {
			$("#tscorej" + (j + 1)).addClass("tsjmid");
		}
	}
	$("#tscorej" + maxid).removeClass("tsjmid").addClass("tsjfirst");
	if(min < max) $("#tscorej" + minid).removeClass("tsjmid").addClass("tsjlast");
	$("#tturn").html("Tour : " + globalturn + " / " + $("td.j1").length + " <span id='pcaret' class='fa-layers fa-fw'><i class='fas fa-location-arrow iblue' data-fa-transform='rotate-45 left-4'></i><i class='fas fa-location-arrow' data-fa-transform='rotate-45 right-3'  style='color:Black'></i><i class='fas fa-location-arrow iblue' data-fa-transform='rotate-45 right-4'></i></span> " + $("#jnom" + jturn).text());
	jcolor = $("#jnom" + jturn).css("backgroundColor");
	$("#tturn").css({color: jcolor, borderColor: jcolor, boxShadow: "0 0 8px " + jcolor});
}

function nextPlayer() {
	++jturn;
	if(jturn > oconfig.nbjoueurs) { jturn = 1; nextTurn(); }
	$("#btnrolljnom").text($("#jnom" + jturn).text());
	$("th").addClass("noeditth");
	$("td").addClass("noedit");
	$("#tableprev th").removeClass("noeditth");
	$("th.j" + jturn).removeClass("noeditth");
	$("td.j" + jturn).removeClass("noedit");
	maskUD();
	majTscore();
}

function nextTurn() {
	let nbemptycells = 0;
	$("td").each(function() { if($(this).text() === "") ++nbemptycells});
	if(nbemptycells > 0) ++globalturn;
	else {
		stopTimer();
		showWinPanel();
	}
}

// Fonction qui compte le nombre de coups restants à jouer pour chaque joueur et indique le tour
function resteCoups() {
	//console.log(parseInt(lastedit.substr(1, 1), 10) + " = " + jturn);
	if(/*TODO: lastval === "" || */(!(globalturn === 1 && jturn === 1) && parseInt(lastedit.substr(1, 1), 10) !== jturn)) {
		//alert("Ce n'est pas votre tour !");
		//$("#" + lastedit).empty();
		//calcule();
		//console.log("stop lastval : " + lastval + " (#" + lastedit+ ")");
		majTscore();
		return;
	}
	//console.log("cont lastval : " + lastval + " (#" + lastedit+ ")");
	/*//let nbcell1 = 0, nbcell2 = 0, jnom = "";
	$("td.j1").each(function() {
		if($(this).text()==="") ++nbcell1;
	});
	$("#j1_cr").empty().append(nbcell1);
	$("td.j2").each(function() {
		if($(this).text()==="") ++nbcell2;
	});
	$("#j2_cr").empty().append(nbcell2);
	
	if(Math.abs(nbcell1 - nbcell2) > 1) {
		alert("Ce n'est pas votre tour !");
		$("#" + lastedit).empty();
	}
	if(nbcell1 === nbcell2) { //tour j1
		$("td.j2").each(function() {
			$(this).addClass("noedit");
			//$(this).off("click");
		});
		$("td.j1").each(function() {
			$(this).removeClass("noedit");
		});
		jnom = $("#j1nom").text();
	} else { //tour j2
		$("td.j1").each(function() {
			$(this).addClass("noedit");
		});
		$("td.j2").each(function() {
			$(this).removeClass("noedit");
		});
		jnom = $("#j2nom").text();
	}
	if(oconfig.userealdices === "idices") {
		$("#btnrolljnom").text(jnom);
		$("#btnrollnum").text("Lancé 1");
		//$("#btnroll").click(rollDices);
	}
	if(nbcell1 === 0 && nbcell2 === 0) {
		showWinPanel();
	}*/
	nextPlayer();
}

function showWinPanel() {
	let tres = [], html = "<p class='bgwinner'></p>";
	for(let i = 1, jn, js; i <= oconfig.nbjoueurs; ++i) {
		jn = $("#jnom" + i).text();
		js = $("#j" + i + "_lt_ct").text();
		getJRecord(jn);
		tres.push([parseInt(js, 10), jn]);
		saveScore(jn, js);
	}
	tres.sort(function(a, b){ return b[0] - a[0] });
	html += "<p id='pwinner' data-resjn='" + tres[0][1] + "' data-resjs='" + tres[0][0] + "'>Victoire de " + tres[0][1] + " avec " + tres[0][0] + " pts</p>";
	html += "<p class='margintop110'>devant</p>";
	for(let j = 1, l = tres.length; j < l; ++j) {
		html += "<p id='plooser' data-resjn='" + tres[j][1] + "' data-resjs='" + tres[j][0] + "'>" + tres[j][1] + " (" + tres[j][0] + " pts)</p>";
		if(j < l - 1) html += "<p>et</p>";
	}
	$("#winpanel").html(html);
	$("#winpanel").dialog("open");
}

/*function saveScores() {
	for(let i = 1; i <= oconfig.nbjoueurs; ++i) {
		saveScore($("#jnom" + i).text(), $("#j" + i + "_lt_ct").text());
	}
}*/

function saveScore(jnom, jscore) {
	let url = "recscrore.php", gtype = createGType();
  // Send the data using post
  var posting = $.post( url, { gt: gtype, jn: jnom, js: jscore } );
  posting.done(function(data) {
    console.log(data);
  });
}

function getJRecord(jnom) {
	let url = "jrecord.php", gtype = createGType();
  // Send the data using get
  var getting = $.get( url, { gt: gtype, jn: jnom } );
  getting.done(function(data) {
    let record = parseInt($(data).find("js").text(), 10),
    		score = parseInt($("p[data-resjn='" + jnom + "']").attr("data-resjs"), 10);
    if(score >= record) {
    	$("p[data-resjn='" + jnom + "']").append("<img src='img/topicon.png' class='newrecord' title='Nouveau record !' />");
    	$(".newrecord").off("click").click(function() {
    		showTop10Panel();
    	});
    }
  });
}

function showTop10Panel() {
	let html = "";
	getTop10();
	$("#top10panel").dialog("open");
}

function getTop10() {
	let url = "top10.php", gtype = createGType();
  var getting = $.get( url, { gt: gtype } );// Send the data using get
  getting.done(function(data) { populateTop10(data); });
}

// callback getTop10
function populateTop10(data) {
	let d = data,
			game = "",
			content = "";
  //console.log(d);
  if(!d.firstElementChild.firstElementChild) {
  	$("#top10panel").html("<h5>Encore aucun enregistrement pour cette variante...</h5>");
  	return;
  }
	content = "<table class='top10table'><tr><th colspan='3' title='" + createDGTfromDB($(d.firstElementChild.firstElementChild).find("gt").text()) + "'>";
	game = $(d).find("gt").text();
	game = game.substr(2, game.indexOf("-") - 2);
	game = game === "custom" ? "Personnalisée" : game;
	content += game + "</th></tr>";
  $(d).find("records").each(function(i) {
  	content += "<tr><td>" + (i + 1) + "</td><td>" + $(this).find("jn").text() + "</td><td title='" + new Date($(this).find("dt").text()).toLocaleDateString() + " à " + new Date($(this).find("dt").text()).toLocaleTimeString() + "'>" + $(this).find("js").text() + "</td></tr>";
  });
  content += "</table>"
  $("#top10panel").html(content);
}

function createGType() {
	let gt = "v:" + oconfig.variante;
	gt += "-st:" + oconfig.scoretype;
	gt += "-py:" + oconfig.primeyahtzee;
	gt += "-so:" + oconfig.suitesopt;
	gt += "-lo:" + oconfig.linesopt.join("+");
	gt += "-co:";
	for(let i = 1, l = oconfig.colsopt.length; i <= l; ++i) {
		gt += "#" + i + "#" + $.param(oconfig.colsopt[i - 1]).replace("coltype", "ct").replace("multi", "x").replace("colopt", "co")/*.replace("&", "%")*/;
	}
	/*let test = btoa(gt);
	console.log(test + " (" + test.length + ")");
	test = atob(test);
	console.log(test + " (" + test.length + ")");*/
	return gt;
}

function createDisplayGType() {
	let dgt = oconfig.variante;
	if(dgt === "custom") {
		dgt += "-" + oconfig.colsopt.length + "col(";
		for(let i = 0, l = oconfig.colsopt.length; i < l; ++i) {
			dgt += oconfig.colsopt[i].coltype + "x" + oconfig.colsopt[i].multi + oconfig.colsopt[i].colopt
			if(i < l - 1) dgt += ",";
		}
		dgt += ") li(" + oconfig.linesopt.join(",") + ")";
		dgt += " opt(score:" + oconfig.scoretype.replace("styaht", "yahtzee").replace("styams", "yams") + ",primeY:" + oconfig.primeyahtzee.replace("yah", "placés").replace("all", "tous") + ",suites:" + oconfig.suitesopt.replace("su1", "4&5dés").replace("su2", "[1-5]&[2-6]") + ")";
	}
	return dgt;
}

function createDGTfromDB(gt) {
	let dgt = "", tg = gt.split("-"), tcols = tg[5].split("#ct="), tcolopt = [];
	tcols.shift();
	dgt = tg[0].split(":")[1] + " " + tcols.length + "col(";
	for(let i = 0, j = 1, l = tcols.length; i < l; ++i, ++j) {
		tcols[i] = tcols[i].indexOf("#") !== -1 ? tcols[i].substring(0, tcols[i].indexOf("#")) : tcols[i];
		tcolopt = tcols[i].split("&");
		dgt += tcolopt[0] + tcolopt[1].replace("=", "") + tcolopt[2].replace("co=", "");
		if(i < l - 1) dgt += ",";
	}
	dgt += ") li(" + tg[4].split(":")[1].replace(/\+/g, ",") + ") opt(";
	dgt += "sco:" + tg[1].split(":")[1].replace("styaht", "yahtzee").replace("styams", "yams");
	dgt += ",PY:" + tg[2].split(":")[1].replace("yah", "placés").replace("all", "tous");
	dgt += ",sui:" + tg[3].split(":")[1].replace("su1", "4&5dés").replace("su2", "[1-5]&[2-6]") + ")";
	return dgt;
}

function closeWinPanel() {
	//stopGame();
	$("#winpanel").dialog("close");
	$("th").removeClass("noeditth");
	$("td").removeClass("noedit");
}

function showUserPanel() {
	$("#userpanel").dialog("open");
}

function showUserEdit() {
	console.log($(this).attr("id"));
	$("#edituserpanel").dialog("open");
}

function showHelpPanel() {
	$("#helppanel").dialog("open");
}

function enDices() {
	$("#icondices").off("click");
	store.set("userealdices", "idices");
	oconfig.userealdices = store.get("userealdices");
	$("#icondices").css("backgroundColor", "orange");
	//$("#dices").show(500);
	$("#dices").dialog("open");
	$("#icondices").on("click", disDices);
}

function disDices() {
	$("#icondices").off("click");
	store.set("userealdices", "rdices");
	oconfig.userealdices = store.get("userealdices");
	$("#icondices").css("backgroundColor", "#abcdef");
	//$("#dices").hide(500);
	$("#dices").dialog("close");
	$("#icondices").on("click", enDices);
}

function radiocheckbox() {
   this.checked && $(this).siblings('input[name="' + this.name + '"]:checked.' + this.className).prop('checked', false);
}

function varianteChange() {
	console.log("variante = " + $(this).val());
	let vari = $(this).val();
	if(vari === "yahtzee" || vari === "yams") {
		$("#dsscoretype").prop('disabled', true).css({ backgroundColor: "#eee", color: "#666" });
	} else {
		$("#dsscoretype").prop('disabled', false).css({ backgroundColor: "#fff", color: "#333" });
	}
	if(vari !== "custom") {
		$("fieldset:not(.persist)").each(function() {
			$(this).prop('disabled', true);
			$(this).css({ backgroundColor: "#eee", color: "#666" });
		});
		$(".btncolopt").each(function() {
			$(this).attr('disabled', true);
			$(this).addClass("btncoloptdis");
		});
	} else {$("fieldset:not(.persist)").each(function() {
			$(this).prop('disabled', false);
			$(this).css({ backgroundColor: "#fff", color: "#333" });
		});
		$(".btncolopt").each(function() {
			$(this).attr('disabled', false);
			$(this).removeClass("btncoloptdis");
		});
	}
	/*switch(vari){
		case "yahtzee":
			oconfig = ocfgyahtzee; break;
		case "yams":
			oconfig = ocfgyams; break;
		case "zazane":
			oconfig = ocfgzazane; break;
		case "x5":
			oconfig = ocfgx5; break;
		case "x10":
			oconfig = ocfgx10; break;
		case "custom":
			oconfig = ocfgcustom; break;
	}*/
	//oconfig = eval("ocfg" + vari);
	if(vari === "custom") majConfig("oconfig")
	else majConfig(eval("ocfg" + vari));
}

function majConfig(ocfg) {
	console.log(ocfg);
	// variante
	$(".variante").val(ocfg.variante);
	// nombre de joueurs (1 à 4)
	$('input[type=radio][name="nbjoueurs"]').each(function() {
		if($(this).val() === ocfg.nbjoueurs) {
			this.checked = "checked";
		}
	});
	// prime yahtzee ("yah" || "all")
	$('input[type=radio][name="primeyahtzee"]').each(function() {
		if($(this).val() === ocfg.primeyahtzee) {
			this.checked = "checked";
		}
	});
	// type de score ("styaht" || "styams")
	$('input[type=radio][name="scoretypeopt"]').each(function() {
		if($(this).val() === ocfg.scoretype) {
			this.checked = "checked";
		}
	});
	$('input[type=checkbox][name="linesopt"]').each(function() {
		if(ocfg.linesopt.indexOf($(this).val()) !== -1) {
			this.checked = "checked";
		} else {
			this.checked = false;
		}
	});
	// type de suites ("su1" || "su2")
	$('input[type=radio][name="suitesopt"]').each(function() {
		if($(this).val() === ocfg.suitesopt) {
			this.checked = "checked";
		}
	});
	// lignes optionnelles [["lmm"[, "lch"[, "lri"]]]]
	//oconfig.linesopt = store.get("linesopt"); // array of strings!
	// options de colonnes
	//oconfig.colsopt = store.get("colsopt"); // array of objects!
}

/*function showConfig() {
	$("#configpanel").css({"top": $(this).offset.top, "left": $(document).width-$("#configpanel").width});
	$("#configpanel").show(300);
	$(this).one("click", hideConfig);
	$(this).css("backgroundColor", "orange");
	showCustConfig();
}
function hideConfig() {
	$("#iconfig").one("click", showConfig);
	$("#iconfig").css("backgroundColor", "#abcdef");
	$("#configpanel").hide(300);
}

function saveConfig() {
	//todo
*/	/*$(".config").each(function() {
		store.set(this.name, this.value);
		//console.log(this.name + " saved as " + store.get(this.name));
	});
	store.set("nbjoueurs", $('input[type=radio][name="nbjoueurs"]:checked').val());
	store.set("userealdices", $('input[type=radio][name="userealdices"]:checked').val());
	store.set("primeyahtzee", $('input[type=radio][name="primeyahtzee"]:checked').val());*/
	//console.log("nbjoueurs" + " saved as " + store.get("nbjoueurs"));
	//console.log("userealdices" + " saved as " + store.get("userealdices"));
/*	hideConfig();
	loadConfig();
}

function loadConfig() {
	$(".config").each(function() {
		$(this).val(store.get(this.name));
		oconfig.variante = store.get(this.name);
	});
*/	/*$('input[type=radio][name="nbjoueurs"]').each(function() {
		if($(this).val() === store.get("nbjoueurs")) {
			this.checked = "checked";
			oconfig.nbjoueurs = parseInt(store.get("nbjoueurs"), 10);
		}
	});
	// TODO
	$('input[type=radio][name="userealdices"]').each(function() {
		if($(this).val() === store.get("userealdices")) {
			this.checked = "checked";
			oconfig.userealdices = store.get("userealdices");
		}
	});
	$('input[type=radio][name="primeyahtzee"]').each(function() {
		if($(this).val() === store.get("primeyahtzee")) {
			this.checked = "checked";
			oconfig.primeyahtzee = store.get("primeyahtzee");
		}
	});*/

	//if(oconfig.userealdices === "idices") enDices();
	//else disDices();
/*	disDices();
}
*/

function showCustConfig() {
	//$("#custconfigpanel").css({"top": $(this).offset.top, "left": $(document).width-$("#configpanel").width});
	//$("#custconfigpanel").show();
	$("#custconfigpanel").dialog("open");
	/*$(this).one("click", hideCustConfig);
	$(this).css("backgroundColor", "orange");*/
}

function hideCustConfig() {
	$("#iconfig").one("click", showCustConfig);
	$("#custconfigpanel").dialog("close");
}

function saveCustConfig(e) {
	let lopt = [];//, copt = [];
	if(playing) {
		if(confirm("Arrêter cette partie ?")) stopGame(true);
		else return;
	} 
	store.set("variante", $('#selvariante').val());
	oconfig.variante = store.get("variante");
	store.set("nbjoueurs", $('input[type=radio][name="nbjoueurs"]:checked').val());
	oconfig.nbjoueurs = store.get("nbjoueurs");
	//store.set("userealdices", $('input[type=radio][name="userealdices"]:checked').val());
	store.set("primeyahtzee", $('input[type=radio][name="primeyahtzee"]:checked').val());
	oconfig.primeyahtzee = store.get("primeyahtzee");
	//linesopt
	store.set("scoretypeopt", $('input[type=radio][name="scoretypeopt"]:checked').val());
	oconfig.scoretype = store.get("scoretypeopt");
	$('input[type=checkbox][name="linesopt"]:checked').each(function() {
		lopt.push($(this).val());
	});
	store.set("linesopt", lopt);
	oconfig.linesopt = store.get("linesopt");
	// suitesopt
	store.set("suitesopt", $('input[type=radio][name="suitesopt"]:checked').val());
	oconfig.suitesopt = store.get("suitesopt");
	//colsopt
	store.set("colsopt", oconfig.colsopt);
	if(oconfig.variante === "custom") ocfgcustom = oconfig;
	hideCustConfig();
	//loadCustConfig();
	createInitTables();
	e.stopImmediatePropagation();
}

function cancelCustConfig() {
	hideCustConfig();
}

function loadCustConfig() {
	if(store.isEmpty("variante")) store.set("variante", odefconfig.variante);
	if(store.isEmpty("nbjoueurs")) store.set("nbjoueurs", odefconfig.nbjoueurs);
	if(store.isEmpty("primeyahtzee")) store.set("primeyahtzee", odefconfig.primeyahtzee);
	if(store.isEmpty("scoretypeopt")) store.set("scoretypeopt", odefconfig.scoretype);
	if(store.isEmpty("linesopt")) store.set("linesopt", odefconfig.linesopt);
	if(store.isEmpty("suitesopt")) store.set("suitesopt", odefconfig.suitesopt);
	if(store.isEmpty("colsopt")) store.set("colsopt", odefconfig.colsopt);
	if(store.isEmpty("userpref.j1nom")) store.set("userpref.j1nom", "Joueur 1");
	if(store.isEmpty("userpref.j2nom")) store.set("userpref.j2nom", "Joueur 2");
	if(store.isEmpty("userpref.j3nom")) store.set("userpref.j3nom", "Joueur 3");
	if(store.isEmpty("userpref.j4nom")) store.set("userpref.j4nom", "Joueur 4");
	if(store.isEmpty("userpref.j1color")) store.set("userpref.j1color", "#eeeeee");
	if(store.isEmpty("userpref.j2color")) store.set("userpref.j2color", "#eeeeee");
	if(store.isEmpty("userpref.j3color")) store.set("userpref.j3color", "#eeeeee");
	if(store.isEmpty("userpref.j4color")) store.set("userpref.j4color", "#eeeeee");
	// variante
	$(".variante").val(store.get("variante"));
	oconfig.variante = store.get("variante");
	// nombre de joueurs (1 à 4)
	$('input[type=radio][name="nbjoueurs"]').each(function() {
		if($(this).val() === store.get("nbjoueurs")) {
			this.checked = "checked";
		}
	});
	oconfig.nbjoueurs = parseInt(store.get("nbjoueurs"), 10);
	// prime yahtzee ("yah" || "all")
	$('input[type=radio][name="primeyahtzee"]').each(function() {
		if($(this).val() === store.get("primeyahtzee")) {
			this.checked = "checked";
		}
	});
	oconfig.primeyahtzee = store.get("primeyahtzee");
	// type de score ("styaht" || "styams")
	$('input[type=radio][name="scoretypeopt"]').each(function() {
		if($(this).val() === store.get("scoretypeopt")) {
			this.checked = "checked";
		}
	});
	oconfig.scoretype = store.get("scoretypeopt");
	$('input[type=checkbox][name="linesopt"]').each(function() {
		if(store.get("linesopt").indexOf($(this).val()) !== -1) {
			this.checked = "checked";
		} else {
			this.checked = false;
		}
	});
	oconfig.suitesopt = store.get("suitesopt");
	// type de suites ("su1" || "su2")
	$('input[type=radio][name="suitesopt"]').each(function() {
		if($(this).val() === store.get("suitesopt")) {
			this.checked = "checked";
		}
	});
	// lignes optionnelles [["lmm"[, "lch"[, "lri"]]]]
	oconfig.linesopt = store.get("linesopt"); // array of strings!
	// options de colonnes
	oconfig.colsopt = store.get("colsopt"); // array of objects!

}

function initPrev() {
	if(oconfig.colsopt.length > 0) {
		let ct = "", m = "", opt = "";
		for(let i = 0, len = oconfig.colsopt.length; i < len; ++i) {
			ct = oconfig.colsopt[i].coltype;
			m = oconfig.colsopt[i].multi;
			opt = oconfig.colsopt[i].colopt;
			opt += m > 1 ? " x" + m : "";
			title = ct;
			if(ct === "L" && opt !== "") title = opt;
			else title += opt;
			$("#prevcaption").hide();
			$("#lprev").append("<th>" + title + "</th>");
		}
	}
}

function addColPrev() {
	let coltype = $('input[type=radio][name="coltype"]:checked').val(),
			multi = parseInt($("#multicolnbopt").val(), 10),
			opt = "",
			title = "";
	$('input[type=checkbox][name="colopt"]:checked').each( function() {
		opt += $(this).val();
	})
	oconfig.colsopt[oconfig.colsopt.length] = {coltype : coltype.trim(), multi : multi, colopt : opt};
	
	opt += multi > 1 ? " x" + multi : "";
	title = coltype;
	if(coltype === "L" && opt !== "") title = opt;
	else title += opt;
	$("#prevcaption").hide();
	$("#lprev").append("<th>" + title + "</th>");
	$("#savecustconfig").attr("disabled", false);
		$("#savecustconfig").removeClass("disable");
}

function supprColPrev() {
	oconfig.colsopt.pop();
	$("#tableprev th:last").remove();
	if($("#tableprev").has("th").length === 0) {
		$("#prevcaption").show();
		$("#savecustconfig").attr("disabled", "disabled");
		$("#savecustconfig").addClass("disable");
	}else{
		$("#prevcaption").hide();
		$("#savecustconfig").attr("disabled", false);
		$("#savecustconfig").removeClass("disable");
	}
}

function createInitTables() {
	let html = '';//, w = '';
	$("#table_container").empty();
	for(let i = 1; i <= oconfig.nbjoueurs; ++i) {
		html += createInitTable(i);
	}
	$("#table_container").html(html);
	if(oconfig.nbjoueurs < 4) w = parseFloat(100 / oconfig.nbjoueurs) + "%";
	else  w = "50%";
	$(".scoregrid").css("width", w);
	$("#btnrolljnom").text($("#jnom1").text());
	for(let i = 1, c = ""; i <= oconfig.nbjoueurs; ++i) {
		c = store.get("userpref.j" + i + "color") || $("#jcolor" + i).val();
		$("th.j" + i).css("backgroundColor", c);
		$("#jcolor" + i).val(c);
	}
	addTableEvents();
}

function createInitTable(numj) {
	let html = '<table id="score_grid_j' + numj + '" class="scoregrid">';
	html += createInitTHead(numj);
	html += createInitTBodyH(numj);
	html += createInitTFootH(numj);
	html += createInitTBodyB(numj);
	html += createInitTFoot(numj);
	html += '</table>';
	return html;
}

function createInitTHead(numj) {
	let html = '<thead>',
			nbcol = oconfig.colsopt.length,
			opt = "", id = "",	title = "", classes = "", btncolor = "";
	// ligne noms
	id = tdeflines[0].id.replace("#", numj);
	title = store.get("userpref.j" + numj + "nom") || tdeflines[0].title.replace("#", numj);
	classes = tdeflines[0].classes.replace("#", numj);
	html += '<tr>' + createCell("th", id, classes, title, "colspan=" + (nbcol + 2));
	html += '</tr>';
	// ligne titres
	id = tdeflines[1].id.replace("#", numj).replace("$", 0);
	classes = tdeflines[1].classes.replace("#", numj);
	btncolor = '<input id="jcolor' + numj + '" type="color" value="#eeeeee" class="inpcolor">';
	html += '<tr>' + createCell("th", id, classes, btncolor);
	for(let i = 0; i < nbcol; ++i) {
		id = "title_j" + numj + "_c" + (i + 1);
		opt = oconfig.colsopt[i].colopt;
		opt += oconfig.colsopt[i].multi > 1 ? "<span class='tcoef'> x" + oconfig.colsopt[i].multi + "</span>" : "";
		title =  oconfig.colsopt[i].coltype;

		if(title === "L") title = "Libre";
		if(title === "Libre" && opt !== "") title = opt;
		else title += opt;
		title = title.replace("D", '<img src=\"img/down.png\" /> ').replace("M", '<img src=\"img/up.png\" />').replace("A", '<img src=\"img/a.png\" />').replace("S", '<img src=\"img/s.png\" />');
		html += '<th id="' + id + '" data-spe="' + oconfig.colsopt[i].coltype + '" data-opt="' + oconfig.colsopt[i].colopt + '" data-coef="' + oconfig.colsopt[i].multi + '" class="j' + numj + ' title">' + title + '</th>';
	}
	html += '<th class="j' + numj + '">Total</th></tr></thead>';
	return html;
}

function createInitTBodyH(numj) {
	let html = '<tbody>',
			nbcol = oconfig.colsopt.length + 1,
			opt = "", id = "",	title = "", classes = "", lnum = 0;
	// lignes 1 à 6
	for(let index = 2; index < 8; ++index) {
		lnum = index - 1;
		id = "t_" + tdeflines[index].id.replace("#", numj).replace("$", 0);
		classes = tdeflines[index].classes.replace("#", numj).replace("$", 0);
		html += '<tr>' + createCell("th", id, classes, tdeflines[index].title);
		for(let cnum = 1; cnum < nbcol; ++cnum) {
			id = tdeflines[index].id.replace("#", numj).replace("$", cnum);
			classes = tdeflines[index].classes.replace("#", numj).replace("$", cnum);
			html += createCell("td", id, classes);
		}
		id = tdefcols[tdefcols.length - 1].id.replace("#", numj).replace("%", index - 1);
		classes = tdeflines[index].classes.replace("#", numj).replace("$", "t");
		html += createCell("th", id, classes, "0") + '</tr>';
	}
	return html;
}

function createInitTFootH(numj) {
	let html = '',
			nbcol = oconfig.colsopt.length + 1,
			id = "",	title = "", classes = "";
	// ligne sous-total haut
	for(let l = 8; l < 11; ++l) {
		id = "t_" + tdeflines[l].id.replace("#", numj).replace("_c$", "");
		classes = tdeflines[l].classes.replace("#", numj);
		html += "<tr>" + createCell("th", id, classes, tdeflines[l].title);
		for(let i = 1; i < nbcol; ++i) {
			id = tdeflines[l].id.replace("#", numj).replace("$", i);
			classes = tdeflines[l].classes.replace("#", numj);
			html += createCell("th", id, classes, "0", 'title=""');
		}
		id = tdefcols[tdefcols.length - 1].id.replace("#", numj).replace("l%", tdeflines[l].classes.split(" ")[1]);
		classes = tdeflines[l].classes.split(" ")[0].replace("#", numj).replace("$", "t");
		html += createCell("th", id, classes, "0") + '</tr>';
	}
	return html;
}

function createInitTBodyB(numj) {
	let html = '',
			//nbcol = tdefcols.length - 1,
			nbcol = oconfig.colsopt.length + 1,
			id = "",	title = "", classes = "", stitle, stt = "";

	for(let l = 11; l < 21; ++l) {
	// Mini-Maxi ?
		if(oconfig.linesopt.indexOf("lmm") === -1 && l === 11) ++l;
		if(oconfig.linesopt.indexOf("lmm") === -1 && l === 12) ++l;
	// Brelan-Carré Full Suites
	// Rigole ?
		if(oconfig.linesopt.indexOf("lri") === -1 && l === 18) ++l;
	// Yahtzee/Yam's ?
		if(l===19) stitle = oconfig.scoretype === "styaht" ? "Yahtzee" : "Yam\'s";
		else stitle = null;
	// Chance ?
		if(oconfig.linesopt.indexOf("lch") === -1 && l === 20) return html += '</tbody>';

		id = "t_" + tdeflines[l].id.replace("#", numj).replace("_c$", "");
		classes = tdeflines[l].classes.replace("#", numj).replace(" c$", "");
		html += "<tr>" + createCell("th", id, classes, stitle || tdeflines[l].title);
		for(let cnum = 1; cnum < nbcol; ++cnum) {
			id = tdeflines[l].id.replace("#", numj).replace("$", cnum);
			classes = tdeflines[l].classes.replace("#", numj).replace("$", cnum);
			html += createCell("td", id, classes);
		}
		id = tdefcols[tdefcols.length - 1].id.replace("#", numj).replace("l%", tdeflines[l].classes.split(" ")[1]);
		classes = tdeflines[l].classes.replace("#", numj).replace("$", "t");
		html += createCell("th", id, classes, "0") + '</tr>';
	}
	html += '</tbody>';
	return html;
}

function createInitTFoot(numj) {
	let html = '<tfoot>',
			//nbcol = tdefcols.length - 1,
			nbcol = oconfig.colsopt.length + 1,
			id = "",	title = "", classes = "";
	// ligne total haut
	for(let l = 21; l < 24; ++l) {
		id = "t_" + tdeflines[l].id.replace("#", numj).replace("_c$", "");
		classes = tdeflines[l].classes.replace("#", numj);
		html += "<tr>" + createCell("th", id, classes, tdeflines[l].title);
		for(let i = 1; i < nbcol; ++i) {
			id = tdeflines[l].id.replace("#", numj).replace("$", i);
			classes = tdeflines[l].classes.replace("#", numj);
			html += createCell("th", id, classes, "0");
		}
		id = tdefcols[tdefcols.length - 1].id.replace("#", numj).replace("l%", tdeflines[l].classes.split(" ")[1]);
		classes = tdeflines[l].classes.split(" ")[0].replace("#", numj).replace("$", "t");
		html += createCell("th", id, classes, "0") + '</tr>';
	}
	html += '</tfoot>';
	return html;
}

function createCell(type, id, classes, title, opt) {
	let cid = id || "", cclasses = classes || "", ctitle = title || "", copt = opt || "";
	copt = copt !== "" ? ' ' + copt : '';
	cid = cid !== "" ? ' id="' + id + '"' : '';
	cclasses = cclasses !== "" ? ' class="' + cclasses + '"' : '';
	return '<' + type + cid + cclasses + copt + '>' + ctitle + '</' + type + '>';
}

/*
function createTables() {
	let html = '';
	$("#table_container").empty();
	for(let i = 1; i <= oconfig.nbjoueurs; ++i) {
		html += createTable(i);
	}
	$("#table_container").html(html);
	let w = "";
	if(oconfig.nbjoueurs < 4) w = parseFloat(100 / oconfig.nbjoueurs) + "%";
	else  w = "50%";
	$("table").css("width",  w);
	$("#container").resizable(/*{alsoresize: "#dices"}*//*);
	addPlayEvents();
}
function createTable(numj) {
	let html = '<table id="score_grid_j' + numj + '" class="scoregrid">';
	html += createTHead(numj);
	html += createTBody(numj);
	html += createTFoot(numj);
	html += '</table>';
	return html;
}
function createTHead(numj) {
	let html = '<thead>',
			nbcol = oconfig.colsopt.length,
			opt = "",
			title = "";
	html += '<tr><th id="j' + numj + 'nom" class="edit jnom" colspan="' + (nbcol + 2) + '">Joueur ' + numj + '</th></tr>';
	html += '<tr><th id="t_l0_j' + numj + '" class="title' + numj + '"></th>';
	for(let i = 0; i < nbcol; ++i) {
		opt = oconfig.colsopt[i].colopt;
		opt += oconfig.colsopt[i].multi > 1 ? " x" + oconfig.colsopt[i].multi : "";
		title =  oconfig.colsopt[i].coltype;
		if(title === "L" && opt !== "") title = opt;
		else title += opt;
		html += '<th>' + title + '</th>';
	}
	html += '<th>Total</th></tr></thead>';
	return html;
}
function createTBody(numj) {
	let html = '<tbody>',
			nbcol = oconfig.colsopt.length;
	for(let j = 1; j <= 6; ++j) {
		html += '<tr><th id="t_l' + j + '_j' + numj + '">' + j + '</th>';
		for(let i = 1; i <= nbcol; ++i) {
			html += '<td id="j' + numj + '_l' + j + '_c' + i + '" class="j' + numj + ' c' + i + ' l' + j + ' haut"></td>';
		}
		html += '<th id="j' + numj + '_l' + j + '_ct" class="j' + j + ' ct l' + j + ' haut">0</th></tr>';
	}
	html += '<tr><th id="t_lst_j' + numj + '">Sous-total</th>';
	for(let i = 1; i <= nbcol; ++i) {
		html += '<th id="j' + numj + '_lst_c' + i + '" class="j' + numj + ' lst">0</th>';
	}
	html += '<th id="j' + numj + '_lst_ct" class="j' + numj + ' ct lst">0</th></tr>';
	html += '<tr><th title="Si total haut >= 63 : 35 points">Prime</th>';
	for(let i = 1; i <= nbcol; ++i) {
		html += '<th id="j' + numj + '_lp_c' + i + '" class="j' + numj + ' lp">0</th>';
	}
	html += '<th id="j' + numj + '_lp_ct" class="j' + numj + ' ct lp">0</th></tr>';
	html += '<tr><th>Total haut</th>';
	for(let i = 1; i <= nbcol; ++i) {
		html += '<th id="j' + numj + '_lth_c' + i + '" class="j' + numj + ' lth">0</th>';
	}
	html += '<th id="j' + numj + '_lth_ct" class="j' + numj + ' ct lth">0</th></tr>';
	if(oconfig.linesopt.indexOf("lmm") !== -1) {
		html += '<tr><th>Mini</th>';
		for(let i = 1; i <= nbcol; ++i) {
			html += '<td id="j' + numj + '_lmi_c' + i + '" class="j' + numj + ' c' + i + ' lmi bas"></td>';
		}
		html += '<th id="j' + numj + '_lmi_ct" class="j' + numj + ' ct lmi">0</th></tr>';
		html += '<tr><th>Maxi</th>';
		for(let i = 1; i <= nbcol; ++i) {
			html += '<td id="j' + numj + '_lma_c' + i + '" class="j' + numj + ' c' + i + ' lma bas"></td>';
		}
		html += '<th id="j' + numj + '_lma_ct" class="j' + numj + ' ct lma">0</th></tr>';
	}
	html += '<tr><th>Brelan</th>';
	for(let i = 1; i <= nbcol; ++i) {
		html += '<td id="j' + numj + '_lbr_c' + i + '" class="j' + numj + ' c' + i + ' lbr bas"></td>';
	}
	html += '<th id="j' + numj + '_lbr_ct" class="j' + numj + ' ct lbr">0</th></tr>';
	html += '<tr><th>Carré</th>';
	for(let i = 1; i <= nbcol; ++i) {
		html += '<td id="j' + numj + '_lca_c' + i + '" class="j' + numj + ' c' + i + ' lca bas"></td>';
	}
	html += '<th id="j' + numj + '_lca_ct" class="j' + numj + ' ct lca">0</th></tr>';
	html += '<tr><th>Full</th>';
	for(let i = 1; i <= nbcol; ++i) {
		html += '<td id="j' + numj + '_lfu_c' + i + '" class="j' + numj + ' c' + i + ' lfu bas"></td>';
	}
	html += '<th id="j' + numj + '_lfu_ct" class="j' + numj + ' ct lfu">0</th></tr>';
	html += '<tr><th>Petite suite</th>';
	for(let i = 1; i <= nbcol; ++i) {
		html += '<td id="j' + numj + '_lps_c' + i + '" class="j' + numj + ' c' + i + ' lps bas"></td>';
	}
	html += '<th id="j' + numj + '_lps_ct" class="j' + numj + ' ct lps">0</th></tr>';
	html += '<tr><th>Grande suite</th>';
	for(let i = 1; i <= nbcol; ++i) {
		html += '<td id="j' + numj + '_lgs_c' + i + '" class="j' + numj + ' c' + i + ' lgs bas"></td>';
	}
	html += '<th id="j' + numj + '_lgs_ct" class="j' + numj + ' ct lgs">0</th></tr>';
	if(oconfig.linesopt.indexOf("lri") !== -1) {
		html += '<tr><th>Rigole</th>';
		for(let i = 1; i <= nbcol; ++i) {
			html += '<td id="j' + numj + '_lri_c' + i + '" class="j' + numj + ' c' + i + ' lri bas"></td>';
		}
		html += '<th id="j' + numj + '_lri_ct" class="j' + numj + ' ct lri">0</th></tr>';
	}
	html += oconfig.scoretype === "styaht" ? '<tr><th>Yahtzee</th>' : '<tr><th>Yam\'s</th>';
	for(let i = 1; i <= nbcol; ++i) {
		html += '<td id="j' + numj + '_lya_c' + i + '" class="j' + numj + ' c' + i + ' lya bas"></td>';
	}
	html += '<th id="j' + numj + '_lya_ct" class="j' + numj + ' ct lya">0</th></tr>';
	if(oconfig.linesopt.indexOf("lch") !== -1) {
		html += '<tr><th>Chance</th>';
		for(let i = 1; i <= nbcol; ++i) {
			html += '<td id="j' + numj + '_lch_c' + i + '" class="j' + numj + ' c' + i + ' lch bas"></td>';
		}
		html += '<th id="j' + numj + '_lch_ct" class="j' + numj + ' ct lch">0</th></tr>';
	}
	html += '<tr><th>Total bas</th>';
	for(let i = 1; i <= nbcol; ++i) {
		html += '<th id="j' + numj + '_ltb_c' + i + '" class="j' + numj + ' ltb"></th>';
	}
	html += '<th id="j' + numj + '_ltb_ct" class="j' + numj + ' ct ltb">0</th></tr>';
	html += '<tr><th>Bonus</th>';
	for(let i = 1; i <= nbcol; ++i) {
		html += '<th id="j' + numj + '_lby_c' + i + '" class="j' + numj + ' lby"></th>';
	}
	html += '<th id="j' + numj + '_lby_ct" class="j' + numj + ' ct lby">0</th></tr>';
	html += '<tr><th>Total</th>';
	for(let i = 1; i <= nbcol; ++i) {
		html += '<th id="j' + numj + '_lt_c' + i + '" class="j' + numj + ' lt"></th>';
	}
	html += '<th id="j' + numj + '_lt_ct" class="j' + numj + ' ct lt">0</th></tr>';
	return html;
}
function createTFoot(numj) {
	let html = '<tfoot>',
			nbcol = oconfig.colsopt.length;
	html += '<tr><th>Coups restant</th><th id="j' + numj + '_cr" colspan="' + (nbcol + 1) + '" class="cr"></th></tr>';
	html += '</tfoot>';
	return html;
}
*/

// ##############################################
// Fonctions d'édition du nom d'un joueur
function editNom() {
	let inp = document.createElement("input");
	inp.id = "inp_" + $(this).attr("id");
	inp.className = "nom";
	inp.value = $(this).text();
	$(this).empty().append(inp);
	inp.focus();
	inp.select();
	$(this).off("click");
	$(inp).on("blur", saveNom);
}
function saveNom() {
	let nom = $(this).val(), j = $(this).parent().attr("id").substr(-1);
	$(this).parent().click(editNom);
	$(this).parent().empty().append(nom);
	store.set("userpref.j"+j+"nom", nom);
}
// Couleur du joueur
function colorChange(){
	let j = $(this).attr("id").substr(-1);
	$("th.j" + j).css("backgroundColor", $(this).val());
	store.set("userpref.j"+j+"color", $(this).val());
}

// disposition des tables
function toggleTableLayout(event) {
	if(this.src.indexOf("itablelayoutf") !== -1) {
		this.src = "img/itablelayoutnf.png";
		$("table").css("tableLayout", "fixed");
		$("th").css("minWidth", 36);

	} else {
		this.src = "img/itablelayoutf.png";
		$("table").css("tableLayout", "unset");
		$("th").css("minWidth", 0);
	}
	event.stopImmediatePropagation();
}
// ##############################################
// Fonction d'édition d'une cellule du haut avec et sans dés int
function editCellH() {
		$("td").removeClass("curentcell");
		$("#saisieh").hide();
		$("#saisieb").hide();
		$("#saisiebs").hide();
	if(oconfig.userealdices === "rdices") {
		$("td").removeClass("curentcell");
		$("#saisieb").hide();
		let ppos = $(this).offset();
		$("#saisieh").css({"top": ppos.top + $(this).outerHeight() + "px", "left": ppos.left + "px"}).show();
		$(this).addClass("curentcell");
	} else {
		lastedit = $(this).attr("id");
		lastval = $(this).html();
		if($(this).text()==="") hClick(this);
		else {$(this).empty(); $(this).removeClass("yahtzeeformat");}
		rollcount = 1;
		finTour();
		calcule();
		resteCoups();
	}
}

// ##############################################
// Fonction d'édition d'une cellule du bas avec et sans dés int
function editCellB(e) {
	if(oconfig.userealdices === "rdices") {
		let ppos = $(this).offset(),
				elcompareid,
				numj = $(this).attr("id").substr(1, 1),
				col = $(this).attr("id").substr(-1),
				psaisie = $("#saisieb"),
				btnval = 0,
				valcomp = 0;
		$("td").removeClass("curentcell");
		$("#saisieh").hide();
		$("#saisieb").hide();
		$("#saisiebs").hide();
		$(".bsb").each(function() {
			$(this).attr("disabled", false);
			$(this).removeClass("disable");
		});
		if($(this).hasClass("lps")) { psaisie = $("#saisiebs");$("#bspe").text(30); }
		if($(this).hasClass("lgs")) { psaisie = $("#saisiebs");$("#bspe").text(40); }
		if($(this).hasClass("lri")) { psaisie = $("#saisiebs");$("#bspe").text(45); }
		if($(this).hasClass("lya")) {
			psaisie = $("#saisiebs");
			$("#bspe").text(50);
			$("#bspe").addClass("yahtzeeformat");
		} else {
			$("#bspe").removeClass("yahtzeeformat");
		}
		if($(this).hasClass("lfu")) {
			psaisie = $("#saisiebs");
			$("#bspe").text(25);
			$("#bspe").addClass("bsbsy");
			$("#effbs").addClass("beffbsfu");
			$("#bspeya").show();
		} else {
			$("#bspe").removeClass("bsbsy");
			$("#effbs").removeClass("beffbsfu");
			$("#bspeya").hide();
		}
		if($(this).hasClass("lmi")) {
			elcompareid = "j" + numj + "_lma_c" + col;
			if($("#" + elcompareid).text() !== "") {
				valcomp = parseInt($("#" + elcompareid).text(), 10);
				$(".bsb").each(function() {
					btnval = parseInt($(this).attr("id").substr(1), 10);
					if(btnval >= valcomp) {
						$(this).attr("disabled", "disabled");
						$(this).addClass("disable");
					}
				});
			}
		} else if($(this).hasClass("lma")) {
			elcompareid = "j" + numj + "_lmi_c" + col;
			if($("#" + elcompareid).text() !== "") {
				valcomp = parseInt($("#" + elcompareid).text(), 10);
				$(".bsb").each(function() {
					btnval = parseInt($(this).attr("id").substr(1), 10);
					if(btnval <= valcomp && btnval !== 0) {
						$(this).attr("disabled", "disabled");
						$(this).addClass("disable");
					}
				});
			}
		}
		//console.log(ppos);
		//console.log(vp);
		if(ppos.left + psaisie.outerWidth() > vp.width) {
			psaisie.css({"top": ppos.top + $(this).outerHeight() + "px", "left": ppos.left + $(this).outerWidth() - psaisie.outerWidth() + "px"}).show();
			psaisie.addClass("ar");
			psaisie.removeClass("al");
		} else {
			psaisie.css({"top": ppos.top + $(this).outerHeight() + "px", "left": ppos.left + "px"}).show();
			psaisie.addClass("al");
			psaisie.removeClass("ar");
		}
		/*console.log(ppos.top + $(this).outerHeight() + psaisie.outerHeight() + " > " + vp.height + " ?");
		todo : ajout val scroll vertical
		todo : réglage cell cible
		if(ppos.top + $(this).outerHeight() + psaisie.outerHeight() > vp.height) {
			psaisie.css({"top": ppos.top - psaisie.outerHeight() + "px"}).show();
			psaisie.addClass("at");
			psaisie.removeClass("ab");
		} else {
			psaisie.css({"top": ppos.top + $(this).outerHeight() + "px"}).show();
			psaisie.addClass("ab");
			psaisie.removeClass("at");
		}*/
		$(this).addClass("curentcell");
	} else { // oconfig.userealdices === "idices"
		lastedit = $(this).attr("id");
		lastval = $(this).html();
		if($(this).text()==="") bClick(e, this);
		else {$(this).empty(); $(this).removeClass("yahtzeeformat");}
		rollcount = 1;
		finTour();
		calcule();
		resteCoups();
	}
	e.stopImmediatePropagation();
}

function bascYa() {
	if($(this).hasClass("yahtzeeformat")) {
		$(this).removeClass("yahtzeeformat");
		$(this).parent().attr("data-py", false);
		$(".bsb").each(function() {
			if($(this).parent().attr("id") === "saisieb" && $(this).attr("id") !== "b5" && $(this).attr("id") !== "b30") $(this).removeClass("yahtzeeformat");
		});
	} else {
		$(this).addClass("yahtzeeformat");
		$(this).parent().attr("data-py", true);
		$(".bsb").each(function() {
			if($(this).parent().attr("id") === "saisieb" && $(this).text() !== "0" && parseInt($(this).text(), 10) % 5 === 0) $(this).addClass("yahtzeeformat");
		});
	}
}
/*
// gestion des clics sur full avec et sans dés int
function editCellFu(el) {
	lastedit = $(el).attr("id");
	lastval = $(el).html();
	if(oconfig.userealdices === "rdices") {
		if($(el).text()==="") {
			$(el).append("25"); 
			if(oconfig.primeyahtzee === "all" && confirm("Est-ce un yahtzee ?")) $(el).addClass("yahtzeeformat");
		}
		else if($(el).text()==="25") {$(el).empty().append("0"); $(el).removeClass("yahtzeeformat");}
		else $(el).empty();
	} else {
		if($(el).text()==="") bClick(el);
		else $(el).empty();
		rollcount = 1;
		finTour();
	}
	calcule();
	resteCoups();
}
// gestion des clics sur petite suite avec et sans dés int
function editCellPs(el) {
	lastedit = $(el).attr("id");
	lastval = $(el).html();
	if(oconfig.userealdices === "rdices") {
		if($(el).text()==="") $(el).append("30");
		else if($(el).text()==="30") {$(el).empty();$(el).append("0");}
		else $(el).empty();
	} else {
		if($(el).text()==="") bClick(el);
		else $(el).empty();
		rollcount = 1;
		finTour();
	}
	calcule();
	resteCoups();
}
// gestion des clics sur grande suite avec et sans dés int
function editCellGs(el) {
	lastedit = $(el).attr("id");
	lastval = $(el).html();
	if(oconfig.userealdices === "rdices") {
		if($(el).text()==="") $(el).append("40");
		else if($(el).text()==="40") {$(el).empty();$(el).append("0");}
		else $(el).empty();
	} else {
		if($(el).text()==="") bClick(el);
		else $(el).empty();
		rollcount = 1;
		finTour();
	}
	calcule();
	resteCoups();
}
// gestion des clics sur yahzee avec et sans dés int
function editCellYa(el) {
	lastedit = $(el).attr("id");
	lastval = $(el).html();
	if(oconfig.userealdices === "rdices") {
		if($(el).text()==="") {$(el).append("50"); $(el).addClass("yahtzeeformat");}
		else if($(el).text()==="50") {$(el).empty().append("0"); $(el).removeClass("yahtzeeformat");}
		else $(el).empty();
	} else {
		if($(el).text()==="") bClick(el);
		else {$(el).empty(); $(el).removeClass("yahtzeeformat");}
		rollcount = 1;
		finTour();
	}
	calcule();
	resteCoups();
}
*/
// gestion des clics sur tab haut (sans dés int)
function xclic(e) {
	let t = 0, l = 0, elnum = null, eltarg = null, num, multiplier, div = null, infoval = 0;
	$("#saisieb").hide();
	$("#saisiebs").hide();
	t = $(this).parent().offset().top - 10;
	l = $(this).parent().offset().left + 10;
	elnum = getElAt(t, 30);
	eltarg = getElAt(t, l);
	lastedit = $(eltarg).attr("id");
	lastval = $(eltarg).html();
	multiplier = parseInt($(this).attr("id").substr(1, 1), 10);
	num = parseInt($(elnum).text(), 10) * multiplier;
	$(eltarg).empty().append(num).removeClass("curentcell");
	if(multiplier === 5 && oconfig.primeyahtzee === "all") $(eltarg).addClass("yahtzeeformat");
	else $(eltarg).removeClass("yahtzeeformat");
	div = $(document.createElement("div"));
	div.attr("id", $(eltarg).attr("id") + "i");
	div.addClass("info");
	infoval = num - (parseInt($(elnum).text(), 10) * 3);
	if(infoval < 0){
		div.addClass("red");
	} else if(infoval > 0) {
		div.addClass("green");
		infoval = "+" + infoval;
	}
	div.append(document.createTextNode(infoval));
	$(eltarg).append(div);
	$("#saisieh").hide();
	calcule();
	resteCoups();
	e.stopImmediatePropagation();
}

// gestion des clics sur tab haut (avec dés int)
function hClick(el) {
	let div = null, infoval = 0, nb = 0, res = 0, li = 0, tclass = [];
	tclass = el.className.split(" ");
	//let col = tclass[0].substr("_");
	li = parseInt(tclass[1].substr(1), 10);
	for(let i = 0, len = tturndices.length; i < len; ++i) {
		if(li === tturndices[i]) ++nb;
	}
	res = li * nb;
	$(el).empty().append(res);
	if(nb === 5 && oconfig.primeyahtzee === "all") $(el).addClass("yahtzeeformat");
	div = $(document.createElement("div"));
	div.attr("id", $(el).attr("id") + "i");
	div.addClass("info");
	infoval = res - (li * 3);
	if(infoval < 0){
		div.addClass("red");
	} else if(infoval > 0) {
		div.addClass("green");
		infoval = "+" + infoval;
	}
	div.append(document.createTextNode(infoval));
	$(el).append(div);
}

// gestion des clics sur tab bas (avec dés int)
function bClick(event, el) {
	let val = 0, tclass = el.className.split(" ");
	let j = tclass[0].substr(1);
	let li = tclass[1].substr(1);
	let col = tclass[2].substr(1);
	switch(li){
		case "br": val = getBrelan(); break;
		case "ca": val = getCarre(); break;
		case "fu": val = getFull(); break;
		case "ps": val = getPSuite(); break;
		case "gs": val = getGSuite(); break;
		case "ya": val = getYahtzee(); break;
		case "ch": val = getChance(); break;
		case "ri": val = getRigole(); break;
		case "mi": val = getMini(j, col); break;
		case "ma": val = getMaxi(j, col); break;
		default: break;
	}
	$(el).empty().append(val);
	//check yahtzees
	if(li === "ya") {
		if(val === 50) $(el).addClass("yahtzeeformat");
		else  $(el).removeClass("yahtzeeformat");
	} else if(oconfig.primeyahtzee === "all" && li !== "ps" && li !== "gs" && getYahtzee() !== 0) {
		$(el).addClass("yahtzeeformat");
	}
	event.stopImmediatePropagation();
}

// gestion des clics sur effacement (sans dés int)
function effCell(e) {
	let t = 0, l = 0, eltarg = null;
	t = $(this).parent().offset().top - 10;
	if($(this).parent().hasClass("ar") && $(this).parent().attr("id") === "saisieb")
		l = $(this).parent().offset().left + $(this).parent().outerWidth() - 10;
	else
		l = $(this).parent().offset().left + 10;
	eltarg = getElAt(t, l);
	lastedit = $(eltarg).attr("id");
	lastval = $(eltarg).html();
	$(eltarg).empty();
	$(eltarg).removeClass("curentcell").removeClass("yahtzeeformat");
	$(this).parent().hide();
	e.stopImmediatePropagation();
	calcule();
	//resteCoups();
}

function saisieHide() {
	$("td").removeClass("curentcell");
	$(this).parent().hide();
}

// gestion des clics sur panneau de saisie tab bas (sans dés int)
function sbclic() {
	let t = 0, l = 0, eltarg = null, num;
	t = $(this).parent().offset().top - 10;
	if(!$(this).parent().hasClass("ar")) l = $(this).parent().offset().left + 10;
	else l = $(this).parent().offset().left + $(this).parent().outerWidth() - 10;
	eltarg = getElAt(t, l);
	lastedit = $(eltarg).attr("id");
	lastval = $(eltarg).html();
	num = parseInt($(this).text(), 10);
	$(eltarg).empty().append(num);
	if(num !== 0) {
		if($(this).hasClass("yahtzeeformat")) $(eltarg).addClass("yahtzeeformat");
		else if (num === 5 || (num === 30 && !$(eltarg).hasClass("lps")) || $(eltarg).hasClass("lya")) $(eltarg).addClass("yahtzeeformat");
		else if ($(eltarg).hasClass("lps") || $(eltarg).hasClass("lgs") || $(eltarg).hasClass("lri")) $(eltarg).removeClass("yahtzeeformat");
		//else if(!$(eltarg).hasClass("lfu") && num % 5 === 0 && oconfig.primeyahtzee === "all" && confirm("Est-ce un yahtzee ?")) $(eltarg).addClass("yahtzeeformat");
		else $(eltarg).removeClass("yahtzeeformat");
	}
	$(eltarg).removeClass("curentcell");
	$("#saisieb").hide();
	$("#saisiebs").hide();
	$(".bsb").each(function() {
		$(this).attr("disabled", false);
		$(this).removeClass("disable");
	});
	if($("#saisieb").attr("data-py") === "true") bascYa();
	calcule();
	resteCoups();
}

// renvoi l'élément aux coordonnée (top, left)
function getElAt(top, left) {
	return document.elementFromPoint(left - window.pageXOffset, top - window.pageYOffset);
}

// renvoi la somme des éléments d'un tableau de nombres
function tabSomme(arr) {
	return arr.reduce(function(pv, cv) { return cv + pv; });
}

function getBrelan() {
	let res = 0, n = 0, count = {};
	tturndices.sort();
	tturndices.forEach(function(i) { 
		count[i] = (count[i]||0) + 1;
	});
	for(let i in count) {
		if(count[i] >= 3) {
			if(oconfig.scoretype === "styams") res = i * 3 + 10;
			else res = tabSomme(tturndices);
		}
	}
	return res;
}

function getCarre() {
	let res = 0, n = 0, count = {};
	tturndices.sort();
	tturndices.forEach(function(i) { count[i] = (count[i]||0) + 1;});
	for(let i in count) {
		if(count[i] >= 4) {
			if(oconfig.scoretype === "styams") res = i * 4 + 30;
			else res = tabSomme(tturndices);
		}
	}
	return res;
}

function getFull() {
	let res = 0;
	tturndices.sort();
	if((tturndices[0] === tturndices[1] &&
		tturndices[1] === tturndices[2] && 
		tturndices[3] === tturndices[4]) ||
		(tturndices[0] === tturndices[1] &&
		tturndices[2] === tturndices[3] && 
		tturndices[3] === tturndices[4])) {
			if(oconfig.scoretype === "styams") res = tabSomme(tturndices) + 25;
			else res = 25;
		}
	return res;
}

function getPSuite() {
	let res = 0;
	let result = tturndices.sort().reduce(function(accumulator, current){
			const length = accumulator.length;
			if (length === 0 || accumulator[length - 1] !== current) {
					accumulator.push(current);
			}
			return accumulator;
	}, []);
	if(result[0] + 1 === result[1] && result[1] + 1 === result[2] && result[2] + 1 === result[3]) {
		res = 30;
		if(oconfig.scoretype === "styams") {
			res += result[0] + result[1] + result[2] + result[3];
		} 
	}
	if(result[1] + 1 === result[2] && result[2] + 1 === result[3] && result[3] + 1 === result[4]) {
		res = 30;
		if(oconfig.scoretype === "styams") {
			res += result[1] + result[2] + result[3] + result[4];
		} 
	}
	return res;
}

function getGSuite() {
	let res = 0;
	tturndices.sort();
	if((tturndices[0] + 1 === tturndices[1] &&
		tturndices[1] + 1 === tturndices[2] &&
		tturndices[2] + 1 === tturndices[3]) &&
		tturndices[3] + 1 === tturndices[4]) {
			if(oconfig.scoretype === "styams") res = tabSomme(tturndices) + 40;
			else res = 40;
		}
	return res;
}

function getYahtzee() {
	let res = 0;
	tturndices.sort();
	if(tturndices[0] === tturndices[1] &&
		tturndices[1] === tturndices[2] && 
		tturndices[2] === tturndices[3] && 
		tturndices[3] === tturndices[4]) {
			if(oconfig.scoretype === "styams") res = tabSomme(tturndices) + 50;
			else res = 50;
		}
	return res;
}

function getChance() {
	return tabSomme(tturndices);
}

function getMini(j, col) {
	let res = tabSomme(tturndices), 
			elcompareid = "j" + j + "_lma_c" + col;
	if($("#" + elcompareid).text() === "" || parseInt($("#" + elcompareid).text(), 10) > res)	return res;
	else return 0;
}

function getMaxi(j, col) {
	let res = tabSomme(tturndices), 
			elcompareid = "j" + j + "_lmi_c" + col;
	if($("#" + elcompareid).text() === "" || parseInt($("#" + elcompareid).text(), 10) < res)	return res;
	else return 0;
}

function getRigole() {
	let res = 0, n = 0, count = {};
	tturndices.sort();
	tturndices.forEach(function(i) { count[i] = (count[i]||0) + 1;});
	if(tturndices[0] + tturndices[tturndices.length -1] !== 7) return 0;
	for(let i in count) {
		if(count[i] >= 4) 
			if(oconfig.scoretype === "styams") res = tabSomme(tturndices) + 45;
			else res = 45;
	}
	return res;
}

function calcule() {
	let tltd = ["l1", "l2", "l3", "l4", "l5", "l6", "lbr", "lca", "lfu", "lps", "lgs", "lya"], 
			tlth = ["lst", "lp", "lth", "ltb", "lby", "lt"];
	/*console.log(oconfig.linesopt);*/
	if(oconfig.linesopt.indexOf("lch") !== -1) tltd.push("lch");
	if(oconfig.linesopt.indexOf("lri") !== -1) tltd.push("lri");
	if(oconfig.linesopt.indexOf("lmm") !== -1) {tltd.push("lmi"); tltd.push("lma");}
	//vertical
	for(let i = 1; i <= oconfig.nbjoueurs; ++i) {
		for(let j = 1; j <= oconfig.colsopt.length; ++j) {
			calcCol("j" + i +".c" + j);
		}
	}
	//horizontal
	for(let i = 0, len = tltd.length; i < len; ++i) {
		calcLigne("td." + tltd[i]);
	}
	for(let i = 0, len = tlth.length; i < len; ++i) {
		calcLigne("th." + tlth[i]);
	}
	//TOTAL
	calcTotV();
}

function calcCol(colclass) {
	let cclass = colclass, totcol = 0, totinfo = 0, v = 0, vi = 0, coef, colid, cellid, j, p = 0, div = null, bya = 0;
	// tableau haut
	j = cclass.substr(1,1);
	colid = cclass.substr(cclass.search(/\./) + 2);
	cclass = "." + cclass + ".haut";
	$(cclass).each(function() {
		if($(this).text()!=="") {
			v = parseInt(this.firstChild.textContent, 10);
			vi = parseInt(this.lastChild.textContent, 10);
			if($(this).hasClass("yahtzeeformat")) bya += 100;
		} else {
			v = 0;
			vi = 0;
		}
		if(!isNaN(v)) totcol += v;
		if(!isNaN(v)) totinfo += vi;
	});
	cellid = "#j" + j + "_lst_c" + colid;
	$(cellid).empty().append(totcol);
	// info
	if(totcol > 0) {
		div = $(document.createElement("div"));
		div.attr("id",$(cellid).attr("id") + "i");
		div.addClass("tinfo");
		if(totinfo < 0) {
			div.addClass("red");
		} else if(totinfo > 0) {
			div.addClass("green");
			totinfo = "+" + totinfo;
		}
		div.append(document.createTextNode(totinfo));
		$(cellid).append(div);
		$(cellid).attr("title", totinfo);
	}
	// prime
	if(totcol >= 63) p = 35;
	cellid = "#j" + j + "_lp_c" + colid;
	$(cellid).empty().append(p);
	totcol += p;
	// coef
	coef = parseInt($("#title_j" + j + "_c" + colid).attr("data-coef"), 10);
	totcol *= coef;
	// total haut
	cellid = "#j" + j + "_lth_c" + colid;
	$(cellid).empty().append(totcol);
	// tableau bas
	totcol = 0;
	cclass = cclass.replace("haut", "bas");
	$(cclass).each(function() {
		v = parseInt($(this).text(), 10);
		if(!isNaN(v)) totcol += v;
		if($(this).hasClass("yahtzeeformat")) bya += 100;
	});
	// total bas
	totcol *= coef;
	cellid = "#j" + j + "_ltb_c" + colid;
	$(cellid).empty().append(totcol);
	// prime yatzee
	bya *= coef;
	cellid = "#j" + j + "_lby_c" + colid;
	$(cellid).empty().append(bya);
	totcol += bya;
	// total
	cellid = "#j" + j + "_lth_c" + colid;
	totcol += parseInt($(cellid).text(), 10);
	cellid = "#j" + j + "_lt_c" + colid;
	$(cellid).empty().append(totcol);
}

function calcLigne(liclass, numj) {
	let lc = liclass, j = numj || 1, totli = 0, v, lid, cellid, p = 0;
	lc = liclass + ".j" + j;
	$(lc).each(function() {
		if($(this).text()!=="") {
			v = parseInt(this.firstChild.textContent, 10);
		} else {
			v = 0;
		}
		if(!isNaN(v)) totli += v;
	});
	//j = liclass.substr(liclass.search("j") + 1);
	lid = lc.substring(lc.indexOf(".") + 1, lc.lastIndexOf("."));
	cellid = "#j" + j + "_" + lid + "_ct";
	$(cellid).empty().append(totli);
	if(j < oconfig.nbjoueurs) {
		j++;
		calcLigne(liclass, j);
	}
}

function calcTotV() {
	let totcol = 0, v, colid, cellid, j, p = 0;
	totcol = parseInt($("#j1_lth_ct").text(), 10);
	totcol += parseInt($("#j1_ltb_ct").text(), 10);
	totcol += parseInt($("#j1_lby_ct").text(), 10);
	$("#j1_lt_ct").empty().append(totcol);
	totcol = parseInt($("#j2_lth_ct").text(), 10);
	totcol += parseInt($("#j2_ltb_ct").text(), 10);
	totcol += parseInt($("#j2_lby_ct").text(), 10);
	$("#j2_lt_ct").empty().append(totcol);
}

speechSynthesis.cancel();
var objSpeak = new SpeechSynthesisUtterance();

//speak("bonjour !");
// say a message
function speak(text, callback) {
    objSpeak.text = text;
    objSpeak.lang = 'fr-FR';
 
    objSpeak.onend = function () {
        if (callback) {
            callback();
        }
    };
 
    objSpeak.onerror = function (e) {
        if (callback) {
            callback(e);
        }
    };
 
    speechSynthesis.speak(objSpeak);
}
speechSynthesis.onvoiceschanged = function () {
    // get the voice
    var voices = speechSynthesis.getVoices();
    var derangedVoice = voices.filter(function (voice) {
        return voice.name == 'Deranged';
    })[0];
 
    // create the uttrance
    var u = new SpeechSynthesisUtterance();
    u.voice = derangedVoice;
    u.text = 'Jon likes Iced Tea!';
 
    // utter the utterance
    //speechSynthesis.speak(u);
}