"use strict";

var navicon = document.getElementById("navicon"),
    mainMenu = document.getElementById("mainMenu"),
    isMenuShown = false,
    upButton = document.getElementById("upButton"),
    downButton = document.getElementById("downButton"),
    showSystemButton = document.getElementById("showSystem");
var amountOfMenuPages = document.getElementsByClassName("mainMenuInner").length,
    currentPage = 0;

navicon.onclick = function () {
	toggleMenu();
};

upButton.onclick = function () {
	openMenuPage(--currentPage);
};
downButton.onclick = function () {
	openMenuPage(++currentPage);
};

function openMenuPage(page) {
	upButton.classList.remove("inactiveElement");
	downButton.classList.remove("inactiveElement");
	if (page >= amountOfMenuPages) {
		currentPage = amountOfMenuPages - 1;
	}
	if (page < 0) {
		currentPage = 0;
	}
	if (currentPage == amountOfMenuPages - 1) {
		downButton.classList.add("inactiveElement");
	}
	if (currentPage == 0) {
		upButton.classList.add("inactiveElement");
	}
	var firstMenuEl = document.getElementsByClassName("mainMenuInner")[0];
	firstMenuEl.style.marginTop = -currentPage * 100 + "vh";
}

function toggleMenu() {
	mainMenu.classList.toggle("opened");
}

//Open planet

var planets = document.getElementsByClassName("mainMenuItemPlanet");

var _loop = function _loop(i) {
	planets[i].onclick = function () {
		var list = planets[i].classList;
		var planet = list[list.length - 1];
		showPlanet(planet);
		toggleMenu();
	};
};

for (var i = 0; i < planets.length; i++) {
	_loop(i);
}

function showPlanet(planet) {
	isInfoShown = true;
	camera.position.x = Math.sin((t - Math.PI / 180 * 200) * planetSettings[planet].speedFactor) * planetSettings[planet].orbit;
	camera.position.z = Math.cos((t - Math.PI / 180 * 200) * planetSettings[planet].speedFactor) * planetSettings[planet].orbit;
	camera.position.y = sun.position.y + 200;
	camera.lookAt(window[planet].position);
	showReturnButton();
}
function showSystem() {
	isInfoShown = false;
	camera.position.z = 20000;
	hideReturnButton();
}

showSystemButton.onclick = showSystem;

//cancelBubbling on Menu

mainMenu.addEventListener('mousemove', function (e) {
	e.stopPropagation();
});
navicon.addEventListener('mousemove', function (e) {
	e.stopPropagation();
});

//toggle return button

function showReturnButton() {
	document.getElementById("showSystem").classList.remove("hidden");
}
function hideReturnButton() {
	document.getElementById("showSystem").classList.add("hidden");
}

//close menu throgh ESC

window.addEventListener("keydown", function (e) {
	if (e.keyCode == 27) {
		mainMenu.classList.add("opened");
	}
}, true);

//scroll with mouse in Menu

mainMenu.addEventListener('mousewheel', function (e) {
	if (e.deltaY > 0) {
		openMenuPage(++currentPage);
	} else {
		openMenuPage(--currentPage);
	}
});