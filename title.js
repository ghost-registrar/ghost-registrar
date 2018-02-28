function NameGenerator() {
    if (Math.floor((Math.random() * 10) + 1) % 2 == 1) {
    	document.getElementById("TitleText").innerHTML = document.getElementById("TitleText").innerHTML.replace("Registrar", "Register");
    }
}

function ImageGenerator() {
	var num = Math.floor(Math.random() * 7) + 1;
	var img = document.getElementById("TitleImage");
	
	img.src = 'Ghosts/Ghost' + num + '.png';
}

function Generator() {
	NameGenerator();
	ImageGenerator();
}