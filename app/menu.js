"use strict";

var navicon = document.getElementById("navicon"),
    mainMenu = document.getElementById("mainMenu"),
    isMenuShown = false,
    upButton = document.getElementById("upButton"),
    downButton = document.getElementById("downButton");

navicon.onclick = function () {
	mainMenu.classList.toggle("opened");
};