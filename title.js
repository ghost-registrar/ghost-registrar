function NameGenerator() {
	var val = document.getElementById("TitleText").innerHTML;
	if (Math.floor((Math.random() * 10) + 1) % 2 == 1) {
		val = "Ghost " + val + " Registrar";
		document.getElementById("PageTitle").innerHTML = "Ghost Registrar";
	} else {
		val = "Ghost " + val + " Register";
		document.getElementById("PageTitle").innerHTML = "Ghost Register";
	}
	
	document.getElementById("TitleText").innerHTML = val;
}

function CreditsGenerator() {
	
	var namesArray = ["John Morach", "Cameron Riley", "Sam Breese", "Kyle Fawcett"];
	var published = ""
	
	published += 'Brought to you by:<br>'
	published += namesArray.splice(Math.floor(Math.random()*namesArray.length), 1) + '<br>';
	published += namesArray.splice(Math.floor(Math.random()*namesArray.length), 1) + '<br>';
	published += namesArray.splice(Math.floor(Math.random()*namesArray.length), 1) + '<br>';
	published += namesArray.splice(Math.floor(Math.random()*namesArray.length), 1) + '<br>';
	
	document.getElementById("Credits").innerHTML = published;
}

function ImageGenerator() {
	var num = Math.floor(Math.random() * 7) + 1;
	var img = document.getElementById("TitleImage");
	
	img.src = 'Ghosts/Ghost' + num + '.png';
	img.height = 32;
	img.width = 32;
	
	document.getElementById("PageIcon").href = 'Ghosts/Ghost' + num + '.png';
}

function Generator() {
	NameGenerator();
	ImageGenerator();
	CreditsGenerator();
}
