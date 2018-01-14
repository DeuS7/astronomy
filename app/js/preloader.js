function hidePreloader() {
	setTimeout(function() {
		preloader.classList.add("done");
	}, 4000);
};

var currentPercentage = 0,
	dispPerc = document.getElementById("percentage"),
	preloader = document.getElementById("preloader");

function generateRandomNumber(start, end) {
	return Math.floor(Math.random() * end) + start;
}


setTimeout(function initPerc() {
	var delta = generateRandomNumber(1,6);
	currentPercentage += delta;
	if (currentPercentage >= 100) {
		currentPercentage = 100;
		hidePreloader();
	}
	dispPerc.innerHTML = currentPercentage + "%";
	if (currentPercentage <= 99) {
		var pause = generateRandomNumber(25, 100);
		setTimeout(initPerc, pause);
	}
}, 100);
