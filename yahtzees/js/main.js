//Variables globales
var lastedit = null,
	lastval = null,
	rollcount = 1,
	prime = 0,
	store = Storages.initNamespaceStorage('Yahtzees').localStorage,
	oconfig = {
		variante : "zazane",
		nbjoueurs: 2,
		userealdices: "rdices",
		primeyahtzee: "yah"
	},
	tturndices = [];
	
//******************************************************************
// Execution de la fonction d'initialisation après chargement du dom
$(function() {
	loadConfig();
	addEvents();
	resteCoups();
	$('#dice1').dice({
		'glyphSrc': 'img/dice.gif',
		'juggleTimeout': 300,
		'callback': callback1
	});
	$('#dice2').dice({
		'glyphSrc': 'img/dice.gif',
		'juggleTimeout': 400,
		'callback': callback2
	});
	$('#dice3').dice({
		'glyphSrc': 'img/dice.gif',
		'juggleTimeout': 500,
		'callback': callback3
	});
	$('#dice4').dice({
		'glyphSrc': 'img/dice.gif',
		'juggleTimeout': 600,
		'callback': callback4
	});
	$('#dice5').dice({
		'glyphSrc': 'img/dice.gif',
		'juggleTimeout': 700,
		'callback': callback5
	});
});
// ##############################################
// Fonction d'ajout des évenements initiaux
function addEvents() {
	//saisie noms des jouurs
	$("#j1nom").click(editNom);
	$("#j2nom").click(editNom);
	//saisie tab haut
	$("td.haut").click(editCellH);
	$(".bxh").click(xclic);
	//effacement haut
	$("#effh").click(effCell);
	//saisie tab bas
	$("td.bas").click(editCellB);
	$(".bsb").click(sbclic);
	//effacement bas
	$("#effb").click(effCell);
	//saisie bas spé
	$("td.lfu").click(editCellFu);
	$("td.lps").click(editCellPs);
	$("td.lgs").click(editCellGs);
	$("td.lya").click(editCellYa);
	//dés
	$("#icondices").one("click", enDices);
	$(".dice").click(selectDice);
	$("#btnroll").click(rollDices);
	//config
	$("#iconfig").one("click", showConfig);
	$("#saveconfig").click(saveConfig);
	//raccourci
	shortcut.add("a",function() {
		var val = document.getElementById(lastedit).innerHTML;
		document.getElementById(lastedit).innerHTML = lastval;
		lastval = val;
		resteCoups();
		calcule();
	},{
		'type':'keydown',
		'propagate':true,
		'disable_in_input':true,
		'target':document
	});
}

/*function testKey(e) {
	if (e.which == 65) { // a - Annulation dernière saisie
		let val = $(lastedit).html();
		$(lastedit).html(lastval);
		lastval = val;
	}
}*/
// ##############################################
// Fonction qui compte le nombre de coups restants
// à jouer pour chaque joueur et indique le tour
function resteCoups() {
	let nbcell1 = 0, nbcell2 = 0, jnom = "";
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
	}
}
// ##############################################
// Fonctions callback pour les dés
function callback1(num) {
	$('#res1').val(num);
	resChanged();
}
function callback2(num) {
	$('#res2').val(num);
	resChanged();
}
function callback3(num) {
	$('#res3').val(num);
	resChanged();
}
function callback4(num) {
	$('#res4').val(num);
	resChanged();
}
function callback5(num) {
	$('#res5').val(num);
	resChanged();
}

function resChanged() {
	let tot = 0;
	$(".res").each(function() {
		tot += parseInt($(this).val(), 10);
	});
	$("#totalroll").html("total : " + tot);
	$(".res").each(function(index) {
		tturndices[index] = parseInt($(this).val(), 10);
	});
	if(getYahtzee() !== 0) $("#yahtzeeroll").html("<strong>Yahtzee !</strong>"); else $("#yahtzeeroll").empty();
	if(getGSuite() !== 0) $("#gsroll").text("Grande suite !"); else $("#gsroll").empty();
	if(getPSuite() !== 0) $("#psroll").text("Petite suite !"); else $("#psroll").empty();
	if(getFull() !== 0) $("#fullroll").text("Full !"); else $("#fullroll").empty();
	if(getCarre() !== 0) $("#caroll").text("Carré !"); else $("#caroll").empty();
	if(getBrelan() !== 0) $("#brroll").text("Brelan !"); else $("#brroll").empty();
}

function selectDice() {
	if(rollcount !== 1) $(this).toggleClass("seldice");
}

function rollDices() {
	$(".dice").each(function() {
		if(!$(this).hasClass("seldice")) $(this).trigger("roll");
		if($(this).hasClass("desfintour")) $(this).removeClass("desfintour");
	});
	if(rollcount >= 3) {
		rollcount = 0;
		finTour();
	}
	++rollcount;
	if(rollcount === 1) {
		$("#btnrollnum").text("résultat");
		//$("#btnroll").off("click");
	} else {
		$("#btnrollnum").text("Lancé " + rollcount);
	}
}

function finTour() {
		$(".dice").each(function() {
			$(this).removeClass("seldice");
			$(this).addClass("desfintour");
		});
}

function showWinPanel(){
	let t1 = 0, t2 = 0, msg = "";
	t1 = parseInt($("#j1_lt_ct").text(), 10);
	t2 = parseInt($("#j2_lt_ct").text(), 10);
	msg = t1 > t2 ? $("#j1nom").text() : $("#j2nom").text();
	msg += " vainqueur"; //par " + t1 + "à " + t2;
	alert(msg);
}
// ##############################################
// Fonction d'édition du nom d'un joueur
function editNom() {
	let inp = document.createElement("input");
	inp.id = "inp_" + $(this).attr("id");
	inp.className = "nom";
	inp.value = $(this).text();
	$(this).empty().append(inp).append(inpc);
	inp.focus();
	inp.select();
	$(this).off("click");
	$(inp).on("blur", saveNom);
}
function saveNom() {
	let nom = $(this).val();
	$(this).parent().click(editNom);
	$(this).parent().empty().append(nom);
}
// ##############################################
// Fonction d'édition d'une cellule du haut avec et sans dés int
function editCellH() {
	if(oconfig.userealdices === "rdices") {
		$("#saisieb").hide();
		let ppos = $(this).offset();
		$("#saisieh").css({"top": ppos.top + $(this).outerHeight() + "px", "left": ppos.left + "px"}).show();
	} else {
		lastedit = $(this).attr("id");
		lastval = $(this).html();
		if($(this).text()==="") hClick(this);
		else {$(this).empty(); $(this).removeClass("yahtzeeformat");}
		rollcount = 1;
		finTour();
		resteCoups();
		calcule();
	}
}
// ##############################################
// Fonction d'édition d'une cellule du bas avec et sans dés int
function editCellB() {
	if(oconfig.userealdices === "rdices") {
		$("#saisieh").hide();
		let ppos = $(this).offset();
		if($(this).hasClass("j1")) {
			$("#saisieb").css({"top": ppos.top + $(this).outerHeight() + "px", "left": ppos.left + "px"}).show();
			$("#saisieb").removeClass("j2");
		} else if($(this).hasClass("j2")) {
			$("#saisieb").css({"top": ppos.top + $(this).outerHeight() + "px", "left": ppos.left + $(this).outerWidth() - $("#saisieb").outerWidth() + "px"}).show();
			$("#saisieb").addClass("j2");
		}
	} else {
		lastedit = $(this).attr("id");
		lastval = $(this).html();
		if($(this).text()==="") bClick(this);
		else {$(this).empty(); $(this).removeClass("yahtzeeformat");}
		rollcount = 1;
		finTour();
		resteCoups();
		calcule();
	}
}

// gestion des clics sur full avec et sans dés int
function editCellFu() {
	lastedit = $(this).attr("id");
	lastval = $(this).html();
	if(oconfig.userealdices === "rdices") {
		if($(this).text()==="") {$(this).append("25"); if(confirm("Est-ce un yahtzee ?")) $(el).addClass("yahtzeeformat");}
		else if($(this).text()==="25") {$(this).empty().append("0"); $(el).removeClass("yahtzeeformat");}
		else $(this).empty();
	} else {
		if($(this).text()==="") bClick(this);
		else $(this).empty();
		rollcount = 1;
		finTour();
	}
	resteCoups();
	calcule();
}

// gestion des clics sur petite suite avec et sans dés int
function editCellPs() {
	lastedit = $(this).attr("id");
	lastval = $(this).html();
	if(oconfig.userealdices === "rdices") {
		if($(this).text()==="") $(this).append("30");
		else if($(this).text()==="30") {$(this).empty();$(this).append("0");}
		else $(this).empty();
	} else {
		if($(this).text()==="") bClick(this);
		else $(this).empty();
		rollcount = 1;
		finTour();
	}
	resteCoups();
	calcule();
}

// gestion des clics sur grande suite avec et sans dés int
function editCellGs() {
	lastedit = $(this).attr("id");
	lastval = $(this).html();
	if(oconfig.userealdices === "rdices") {
		if($(this).text()==="") $(this).append("40");
		else if($(this).text()==="40") {$(this).empty();$(this).append("0");}
		else $(this).empty();
	} else {
		if($(this).text()==="") bClick(this);
		else $(this).empty();
		rollcount = 1;
		finTour();
	}
	resteCoups();
	calcule();
}

// gestion des clics sur yahzee avec et sans dés int
function editCellYa() {
	lastedit = $(this).attr("id");
	lastval = $(this).html();
	if(oconfig.userealdices === "rdices") {
		if($(this).text()==="") {$(this).append("50"); $(this).addClass("yahtzeeformat");}
		else if($(this).text()==="50") {$(this).empty().append("0"); $(this).removeClass("yahtzeeformat");}
		else $(this).empty();
	} else {
		if($(this).text()==="") bClick(this);
		else {$(this).empty(); $(this).removeClass("yahtzeeformat");}
		rollcount = 1;
		finTour();
	}
	resteCoups();
	calcule();
}

// gestion des clics sur tab haut (sans dés int)
function xclic() {
	let t = 0, l = 0, elnum = null, eltarg = null, num, multiplier, div = null, infoval = 0;

	$("#saisieb").hide();

	t = $(this).parent().offset().top - 10;
	l = $(this).parent().offset().left + 10;
	elnum = getElAt(t, 30);
	eltarg = getElAt(t, l);
	lastedit = $(eltarg).attr("id");
	lastval = $(eltarg).html();
	multiplier = parseInt($(this).attr("id").substr(1,1), 10);
	num = parseInt($(elnum).text(), 10) * multiplier;
	$(eltarg).empty().append(num);
	
	if(multiplier === 5 && oconfig.primeyahtzee === "all") $(el).addClass("yahtzeeformat");
	
	div = $(document.createElement("div"));
	div.attr("id", $(eltarg).attr("id") + "i");
	div.addClass("info");
	infoval = num - (parseInt($(elnum).text(), 10) * 3);
	if(infoval < 0){
		div.addClass("red");
	} else if(infoval > 0) {
		div.addClass("green");
	}
	div.append(document.createTextNode(infoval));
	$(eltarg).append(div);
	
	$("#saisieh").hide();
	
	resteCoups();
	calcule();
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
	}
	div.append(document.createTextNode(infoval));
	$(el).append(div);
}

// gestion des clics sur tab bas (avec dés int)
function bClick(el) {
	let val = 0, tclass = el.className.split(" ");
	let li = tclass[1].substr(1);
	//let col = tclass[0].substr("_");
	switch(li){
		case "br": val = getBrelan(); break;
		case "ca": val = getCarre(); break;
		case "fu": val = getFull(); break;
		case "ps": val = getPSuite(); break;
		case "gs": val = getGSuite(); break;
		case "ya": val = getYahtzee(); break;
		case "ch": val = getChance(); break;
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
}

// gestion des clics sur effacement (sans dés int)
function effCell() {
	let t = 0, l = 0, eltarg = null;
	t = $(this).parent().offset().top - 10;
	if($(this).hasClass("j2") && $(this).parent().attr("id") === "saisieb")
		l = $(this).parent().offset().left + $(this).parent().outerWidth() - 10;
	else
		l = $(this).parent().offset().left + 10;
	eltarg = getElAt(t, l);
	lastedit = $(eltarg).attr("id");
	lastval = $(eltarg).html();
	$(eltarg).empty();
	$(eltarg).removeClass("yahtzeeformat");
	$(this).parent().hide();
	resteCoups();
	calcule();
}

// gestion des clics sur panneau de saisie tab bas (sans dés int)
function sbclic() {
	let t = 0, l = 0, eltarg = null, num;
	t = $(this).parent().offset().top - 10;
	if(!$(this).parent().hasClass("j2")) l = $(this).parent().offset().left + 10;
	else l = $(this).parent().offset().left + $(this).parent().outerWidth() - 10;
	eltarg = getElAt(t, l);
	lastedit = $(eltarg).attr("id");
	lastval = $(eltarg).html();
	num = parseInt($(this).text(), 10);
	$(eltarg).empty().append(num);
	$("#saisieb").hide();
	resteCoups();
	calcule();
}

// renvoi l'élément aux coordonnée (top, left)
function getElAt(top, left) {
	return document.elementFromPoint(left - window.pageXOffset, top - window.pageYOffset);
}

// renvoi la somme des éléments d'un tableau de nombres
function tabSomme(arr) {
	return arr.reduce(( accumulator, currentValue ) => accumulator + currentValue, 0);
}

function getBrelan() {
	let res = 0, n = 0, count = {};
	tturndices.sort();
	tturndices.forEach(function(i) { count[i] = (count[i]||0) + 1;});
	for(let i in count) {
		if(count[i] >= 3) res = tabSomme(tturndices);
	}
	return res;
}

function getCarre() {
	let res = 0, n = 0, count = {};
	tturndices.sort();
	tturndices.forEach(function(i) { count[i] = (count[i]||0) + 1;});
	for(let i in count) {
		if(count[i] >= 4) res = tabSomme(tturndices);
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
		tturndices[3] === tturndices[4])) res = 25;
	return res;
}

function getPSuite() {
	let res = 0;
	let result = tturndices.sort().reduce((accumulator, current) => {
			const length = accumulator.length
			if (length === 0 || accumulator[length - 1] !== current) {
					accumulator.push(current);
			}
			return accumulator;
	}, []);
	if((result[0] + 1 === result[1] &&
		result[1] + 1 === result[2] &&
		result[2] + 1 === result[3]) ||
		result[1] + 1 === result[2] &&
		result[2] + 1 === result[3] &&
		result[3] + 1 === result[4]) res = 30;
	return res;
}

function getGSuite() {
	let res = 0;
	tturndices.sort();
	if((tturndices[0] + 1 === tturndices[1] &&
		tturndices[1] + 1 === tturndices[2] &&
		tturndices[2] + 1 === tturndices[3]) &&
		tturndices[3] + 1 === tturndices[4]) res = 40;
	return res;
}

function getYahtzee() {
	let res = 0;
	tturndices.sort();
	if(tturndices[0] === tturndices[1] &&
		tturndices[1] === tturndices[2] && 
		tturndices[2] === tturndices[3] && 
		tturndices[3] === tturndices[4]) res = 50;
	return res;
}

function getChance() {
	return tabSomme(tturndices);
}

function calcule() { //todo: factoriser !
	let tltd = ["l1", "l2", "l3", "l4", "l5", "l6", "lbr", "lca", "lfu", "lps", "lgs", "lya", "lch"], 
			tlth = ["lst", "lp", "lth", "ltb", "lby", "lt"];
	//vertical
	//j1
	calcCol("ch1_l1");
	calcCol("ch1_l2");
	calcCol("ch1_d");
	calcCol("ch1_m");
	calcCol("ch1_a");
	//j2
	calcCol("ch2_l1");
	calcCol("ch2_l2");
	calcCol("ch2_d");
	calcCol("ch2_m");
	calcCol("ch2_a");
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
	let totcol = 0, totinfo = 0, v = 0, vi = 0, colid, cellid, j, p = 0, div = null, bya = 0;
	// tableau haut
	j = colclass.substr(2,1);
	colid = colclass.substr(colclass.search("_") + 1);
	$("." + colclass).each(function() {
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
	//info
	if(totcol > 0) {
		div = $(document.createElement("div"));
		div.attr("id",$(cellid).attr("id") + "i");
		div.addClass("tinfo");
		if(totinfo < 0) {
			div.addClass("red");
		} else if(totinfo > 0) {
			div.addClass("green");
		}
		div.append(document.createTextNode(totinfo));
		$(cellid).append(div);
	}
	if(totcol >= 63) p = 35;
	cellid = "#j" + j + "_lp_c" + colid;
	$(cellid).empty().append(p);
	totcol += p;
	cellid = "#j" + j + "_lth_c" + colid;
	$(cellid).empty().append(totcol);
	// tableau bas
	totcol = 0;
	p = 0;
	colclass = colclass.replace("ch", "cb");
	$("." + colclass).each(function() {
		v = parseInt($(this).text(), 10);
		if(!isNaN(v)) totcol += v;
		if($(this).hasClass("yahtzeeformat")) bya += 100;
	});
	cellid = "#j" + j + "_ltb_c" + colid;
	$(cellid).empty().append(totcol);
	//prime yatzee
	cellid = "#j" + j + "_lya_c" + colid;
	v = $(cellid).text();
	cellid = "#j" + j + "_lby_c" + colid;
	$(cellid).empty().append(bya);
	totcol += bya;
	//total haut
	cellid = "#j" + j + "_lth_c" + colid;
	totcol += parseInt($(cellid).text(), 10);
	cellid = "#j" + j + "_lt_c" + colid;
	$(cellid).empty().append(totcol);
}

function calcLigne(liclass, numj = 1) {
	let lc = liclass, j = numj, totli = 0, v, lid, cellid, p = 0;
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

function enDices(){
	$(this).one("click", disDices);
	store.set("userealdices", "idices");
	$(this).css("backgroundColor", "orange");
	$("#dices").show(500);
}

function disDices(){
	$(this).one("click", enDices);
	store.set("userealdices", "rdices");
	$(this).css("backgroundColor", "#abcdef");
	$("#dices").hide(500);
}

function showConfig() {
	$("#configpanel").css({"top": $(this).offset.top, "left": $(document).width-$("#configpanel").width});
	$("#configpanel").show(300);
	$(this).one("click", hideConfig);
	$(this).css("backgroundColor", "orange");
}

function hideConfig() {
	if(this.id === "iconfig") {
		$(this).one("click", showConfig);
		$(this).css("backgroundColor", "#abcdef");
	} else {
		$("#iconfig").one("click", showConfig);
		$("#iconfig").css("backgroundColor", "#abcdef");
	}
	$("#configpanel").hide(300);
}

function saveConfig() {
	//todo
	$(".config").each(function() {
		store.set(this.name, this.value);
		//console.log(this.name + " saved as " + store.get(this.name));
	});
	store.set("nbjoueurs", $('input[type=radio][name="nbjoueurs"]:checked').val());
	store.set("userealdices", $('input[type=radio][name="userealdices"]:checked').val());
	store.set("primeyahtzee", $('input[type=radio][name="primeyahtzee"]:checked').val());
	//console.log("nbjoueurs" + " saved as " + store.get("nbjoueurs"));
	//console.log("userealdices" + " saved as " + store.get("userealdices"));
	hideConfig();
	loadConfig();
}

function loadConfig() {
	$(".config").each(function() {
		$(this).val(store.get(this.name));
		oconfig.variante = store.get(this.name);
	});
	$('input[type=radio][name="nbjoueurs"]').each(function() {
		if($(this).val() === store.get("nbjoueurs")) {
			this.checked = "checked";
			oconfig.nbjoueurs = parseInt(store.get("nbjoueurs"), 10);
		}
	});
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
	});
	if(oconfig.userealdices === "rdices") $("#dices").hide(500);
	else $("#dices").show(500);
	//console.log("nbjoueurs" + " loaded as " + $('input[type=radio][name="nbjoueurs"][checked]').val());
	//console.log("userealdices" + " loaded as " + $('input[type=radio][name="userealdices"][checked]').val());
	//hideConfig();
}
