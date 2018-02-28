function NameGenerator() {
	var val = document.getElementById("TitleText").innerHTML;
    if (Math.floor((Math.random() * 10) + 1) % 2 == 1) {
		val = "Ghost " + val + " Registrar";
    } else {
		val = "Ghost " + val + " Register";
	}
	
	document.getElementById("TitleText").innerHTML = val;
}

function ImageGenerator() {
	var num = Math.floor(Math.random() * 7) + 1;
	var img = document.getElementById("TitleImage");
	
	img.src = 'Ghosts/Ghost' + num + '.png';
	img.height = 32;
	img.width = 32;
}

function Generator() {
	NameGenerator();
	ImageGenerator();
}