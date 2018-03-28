import $ from 'jquery';
import {distanceInWordsStrict, parse} from 'date-fns';

/**
 * Fetches the real name for an SIS user.
 * @param {string} rin - RIN of SIS user
 * @param {string} pass - password of SIS user
 * @param {function} cb - callback
 */
function sisFetchRealname(rin, pass, cb) {
    $.post('https:///sisapi.herokuapp.com/sis/name', {rin: rin, pass: pass}, cb);
}

/** Sets up details for registration */
function registerSubmit() {
    let regTime = $('#reg-time').val();
    let regDate = $('#reg-date').val();
    let rin = $('#rin').val();
    let password = $('#password').val();

    // fill array with nonempty CRNs from input fields
    let valid = [];
    for (let i = 0; i < 6; i++) {
        let idStr = '#crn' + (i + 1);
        if ($(idStr).val().length != 0) {
            valid.push($(idStr).val());
        }
    }

    $('#set-reg-time').html(regTime);
    $('#set-reg-date').html(regDate);

    if (valid.length > 0) {
        let queryStr = 'https://yacs.cs.rpi.edu/api/v5/sections.json?show_periods&crn=';
        for (let i = 0; i < valid.length; i++) {
            queryStr += valid[i];
            if (i != valid.length - 1) {
                queryStr += ',';
            }
        }

        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        // use jQuery to get json from YACS api
        $.getJSON(queryStr, (data) => {
            for (let i = 0; i < data.sections.length; i++) {
                let idStr = '#set-crn' + (i + 1);
                let course = data.sections[i];
                let courseText = '';
                courseText += course.course_name + ' ('
                    + course.department_code + ' '
                    + course.course_number + ')<ul>';
                for (let j = 0; j < course.periods.length; j++) {
                    courseText += '<li>'
                        + course.periods[j].type + ': '
                        + days[course.periods[j].day - 1] + ' '
                        + course.periods[j].start + ' - '
                        + course.periods[j].end + '</li>';
                }
                courseText += '</ul>';
                $(idStr).html(courseText);
            }
            sisFetchRealname(rin, password, (name) => {
                $('#set-realname').html(name);
                $('#crn-input').hide();
                $('#reg-details').fadeIn('fast');
                console.log(regDate + 'T' + regTime);
                let end = parse(regDate + 'T' + regTime);
                console.log(end);
                setInterval(() => {
                    console.log(Date());
                    $('#countdown').html(distanceInWordsStrict(Date(), end));
                }, 1000);
            });
        });
    }
}

window.registerSubmit = registerSubmit;
