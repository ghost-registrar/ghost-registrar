function NameGenerator() {
    if (Math.floor((Math.random() * 10) + 1) % 2 == 1) {
    	document.getElementById("TitleText").innerHTML = "Ghost 👻 Registrar"
    }
    else {
    	document.getElementById("TitleText").innerHTML = "Ghost 👻 Register"
    }
}