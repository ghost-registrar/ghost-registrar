import './ui/ui.css';

import $ from 'jquery';

/** Injects a randomized title into the page. */
function insertTitle() {
    $('#register-registrar').html(
        Math.random() < 0.5 ? 'Register' : 'Registrar'
    );
}

/** Injects a randomized ghost icon into the page. */
function insertIcon() {
    let colors = ['orange', 'blue', 'red', 'pink'];
    $('#ghost').css('color', colors[Math.floor(Math.random() * colors.length)]);
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
    document.getElementById('credits').innerHTML = 'Brought to you by: '
        + names.reduce((x, y) => x + ', ' + y);
}

$(() => {
    $('#cover').fadeOut();
    insertTitle();
    insertIcon();
    insertCredits();
});
