var navicon = document.getElementById("navicon"),
mainMenu = document.getElementById("mainMenu"),
isMenuShown = false,
upButton = document.getElementById("upButton"),
downButton = document.getElementById("downButton"),
showSystemButton = document.getElementById("showSystem"),
showInfoBlock = document.getElementById("showInfo"),
mainMenuWrapper = document.getElementById("mainMenuInnerWrapper");
var amountOfMenuPages = document.getElementsByClassName("mainMenuInner").length,
currentPage = 0;

navicon.onclick = function() {
	toggleMenu();
}

upButton.onclick = function() {
	openMenuPage(--currentPage);
}
downButton.onclick = function() {
	openMenuPage(++currentPage);
}

function openMenuPage(page) {
	upButton.classList.remove("inactiveElement");
	downButton.classList.remove("inactiveElement");
	if (page >= amountOfMenuPages) {
		currentPage = amountOfMenuPages - 1;
	}
	if (page < 0) {
		currentPage = 0;
	}
	if (currentPage == amountOfMenuPages-1) {
		downButton.classList.add("inactiveElement");
	}
	if (currentPage == 0) {
		upButton.classList.add("inactiveElement");
	}
	mainMenuWrapper.style.transform = "translateY(" + -100*currentPage + "vh)";
}

function toggleMenu() {
	mainMenu.classList.toggle("opened");
}


//Open planet

var planets = document.getElementsByClassName("mainMenuItemPlanet");

for (let i = 0;i<planets.length;i++) {
	planets[i].onclick = function() {
		var list = planets[i].classList;
		var planet = list[list.length-1];
		showPlanet(planet);
		toggleMenu();
	}
}

function showPlanet(planet) {
	hideInfo();
	isInfoShown = true;
	var x = window[planet].position.x / 1.5;
	var z = window[planet].position.z / 1.5;
	var y = window[planet].position.y + 2000;
	camera.position.set(x,y,z);
	camera.lookAt(window[planet].position.x, window[planet].position.y, window[planet].position.z);
	showReturnButton();
	showInfo(planet);
}
function showSystem() {
	isInfoShown = false;
	camera.position.z = 20000;
	hideReturnButton();
	hideInfo();
}

showSystemButton.onclick = showSystem;

//cancelBubbling on Menu

mainMenu.addEventListener('mousemove', function(e) {
	e.stopPropagation();
});
navicon.addEventListener('mousemove', function(e) {
	e.stopPropagation();
});

//cancelBubbling on showInfo

document.getElementById("showInfo").addEventListener('mousemove', function(e) {
	e.stopPropagation();
});

//toggle return button

function showReturnButton() {
	document.getElementById("showSystem").classList.remove("hidden");
}
function hideReturnButton() {
	document.getElementById("showSystem").classList.add("hidden");
}

//close menu with ESC

window.addEventListener("keydown", function(e){
	if (e.keyCode == 27) {
		mainMenu.classList.toggle("opened");
	}

}, true);

//scroll with mouse in Menu

mainMenu.addEventListener('mousewheel', function(e) {
	if (e.deltaY > 0) {
		openMenuPage(++currentPage);
	} else {
		openMenuPage(--currentPage);
	}
});

function showInfo(planet) {
	showInfoBlock.style.transform = "translateX(-200%)";
	document.getElementById(planet).style.opacity = 1;
	document.getElementById(planet).style.zIndex = 20;
}
function hideInfo() {
	showInfoBlock.style.transform = "translateX(0)";
	var items = document.getElementsByClassName("showInfoItem");
	for (var i = 0;i<items.length;i++) {
		items[i].style.opacity = 0;
		items[i].style.zIndex = 10;
	}
}

//close by clicking on the canvas

document.getElementsByTagName("canvas")[0].onclick = function() {
	showSystem();
}