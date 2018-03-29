import $ from 'jquery';

$(window).on('load', () => {
    $('#register-registrar').html(
        Math.random() < 0.5 ? 'Register' : 'Registrar'
    );
    let colors = ['orange', 'blue', 'red', 'pink'];
    $('#ghost').css('color', colors[Math.floor(Math.random() * colors.length)]);
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
    $('#cover').fadeOut('slow');
});
