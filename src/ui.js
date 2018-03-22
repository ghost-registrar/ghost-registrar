import './ui/ui.css';

import Ghost1 from './ui/ghosts/Ghost1.png';
import Ghost2 from './ui/ghosts/Ghost2.png';
import Ghost3 from './ui/ghosts/Ghost3.png';
import Ghost4 from './ui/ghosts/Ghost4.png';
import Ghost5 from './ui/ghosts/Ghost5.png';
import Ghost6 from './ui/ghosts/Ghost6.png';
import Ghost7 from './ui/ghosts/Ghost7.png';

import $ from 'jquery';

const GHOSTS = [Ghost1, Ghost2, Ghost3, Ghost4, Ghost5, Ghost6, Ghost7];

/** Injects a randomized title into the page. */
function insertTitle() {
    let val = document.getElementById('title-text').innerHTML;
    if (Math.floor((Math.random() * 10) + 1) % 2 == 1) {
        val = 'Ghost ' + val + ' Registrar';
        document.getElementById('page-title').innerHTML = 'Ghost Registrar';
    } else {
        val = 'Ghost ' + val + ' Register';
        document.getElementById('page-title').innerHTML = 'Ghost Register';
    }
    document.getElementById('title-text').innerHTML = val;
}

/** Injects a randomized ghost icon into the page. */
function insertIcon() {
    let num = Math.floor(Math.random() * 7);
    let img = document.getElementById('title-image');
    img.src = GHOSTS[num];
    img.height = 32;
    img.width = 32;
    document.getElementById('page-icon').href = 'assets/images/ghosts/Ghost'
        + num + '.png';
}

/** Injects the randomly-ordered project credits into the page. */
function insertCredits() {
    let names = [
        'John Morach',
        'Cameron Riley',
        'Sam Breese',
        'Kyle Fawcett',
    ];
    names = [...Array(4)].map(
        (_) => names.splice(Math.floor(Math.random() * names.length), 1)
    );
    document.getElementById('credits').innerHTML = 'Brought to you by:<br>'
        + names.reduce((x, y) => x + '<br>' + y);
}

$(() => {
    insertTitle();
    insertIcon();
    insertCredits();
});
