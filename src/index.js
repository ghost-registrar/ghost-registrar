require('file-loader?name=[name].[ext]!../assets/index.html');

import '../assets/stylesheets/index.css';
import Ghost1 from '../assets/images/ghosts/Ghost1.png'
import Ghost2 from '../assets/images/ghosts/Ghost2.png'
import Ghost3 from '../assets/images/ghosts/Ghost3.png'
import Ghost4 from '../assets/images/ghosts/Ghost4.png'
import Ghost5 from '../assets/images/ghosts/Ghost5.png'
import Ghost6 from '../assets/images/ghosts/Ghost6.png'
import Ghost7 from '../assets/images/ghosts/Ghost7.png'

import $ from 'jquery'

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
    var num = Math.floor(Math.random() * 7);
    var img = document.getElementById("TitleImage");

    var ghosts = [Ghost1, Ghost2, Ghost3, Ghost4, Ghost5, Ghost6, Ghost7];

    img.src = ghosts[num];
    img.height = 32;
    img.width = 32;

    document.getElementById("PageIcon").href = 'assets/images/ghosts/Ghost' + num + '.png';
}

function Generator() {
	NameGenerator();
	ImageGenerator();
	CreditsGenerator();
}

$(Generator);
