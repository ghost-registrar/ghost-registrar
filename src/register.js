import $ from 'jquery';
import {distanceInWordsStrict, parse} from 'date-fns';
import {Course} from './course.js';
import {Schedule} from './schedule.js';

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

        // use jQuery to get json from YACS api
        $.getJSON(queryStr, function(data) {
            let courses = [];
            for (let i = 0; i < data.sections.length; i++) {
                let courseJson = data.sections[i];
                let course = new Course(courseJson.crn, courseJson);
                courses.push(course);
            }
            let schedule = new Schedule(courses);
            // for each course in the created schedule,
            // set corresponding element to course string
            for (let i = 0; i < schedule.numCourses(); i++) {
                $('#set-crn' + (i + 1)).html(
                    '<li>' + schedule.getCourse(i).toStringComplete() + '</li>'
                );
            }
            sisFetchRealname(rin, password, (name) => {
                $('#set-realname').html(name);
                $('#crn-input').hide();
                $('#reg-details').fadeIn('fast');
                let end = parse(regDate + 'T' + regTime);
                console.log(end);
                setInterval(() => {
                    $('#countdown').html(distanceInWordsStrict(Date(), end));
                }, 1000);
            });
        });
    }
}

window.registerSubmit = registerSubmit;
