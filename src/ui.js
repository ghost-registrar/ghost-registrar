import $ from 'jquery';
import {format} from 'date-fns';
import bonus from './bonus.gif';

$(window).on('load', () => {
    // randomize register/registrar
    $('#register-registrar').html(
        Math.random() < 0.5 ? 'Register' : 'Registrar'
    );

    // randomize ghost color
    let colors = ['orange', 'blue', 'red', 'pink'];
    $('#ghost').css('color', colors[Math.floor(Math.random() * colors.length)]);

    let names = [
        ['John Morach', 'johnmorach'],
        ['Cameron Riley', 'camr315'],
        ['Sam Breese', 'chameco'],
        ['Kyle Fawcett', 'RustyPotato'],
    ];
    // randomize credits order
    $('#credits').html('Brought to you by: ' +
                       names
                       .sort((x, y) => Math.random() < 0.5 ? -1 : 1)
                       .map(([n, u]) => '<a href="https://github.com/' + u + '">' + n + '</a>')
                       .reduce((x, y) => x + ', ' + y));

    $('#cover').fadeOut('slow');
    $('#reg-date').attr('value', format(new Date(), 'YYYY-MM-DD'));
    $('#reg-time').attr('value', format(new Date(), 'hh:mm'));
    $('#bonus').html('<a href="http://sis.rpi.edu"><img id="bonus-img" src="' + bonus + '"></a>');
    $('#bonus').mouseenter((_) => $('#bonus-img').fadeIn('slow'));
    $('#bonus').mouseleave((_) => $('#bonus-img').fadeOut('slow'));
});
