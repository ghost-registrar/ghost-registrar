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
        ['John Morach', 'johnmorach'],
        ['Cameron Riley', 'camr315'],
        ['Sam Breese', 'chameco'],
        ['Kyle Fawcett', 'RustyPotato'],
    ];
    $('#credits').html('Brought to you by: ' +
                       names
                       .sort((x, y) => Math.random() < 0.5 ? -1 : 1)
                       .map(([n, u]) => '<a href="https://github.com/' + u + '">' + n + '</a>')
                       .reduce((x, y) => x + ', ' + y));
}

$(window).on('load', () => {
    insertTitle();
    insertIcon();
    insertCredits();
    $('#cover').fadeOut('slow');
});
