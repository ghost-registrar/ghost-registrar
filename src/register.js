import $ from 'jquery';
import {distanceInWordsStrict, isAfter, parse} from 'date-fns';

import {Course} from './course.js';
import {Schedule} from './schedule.js';
import {SISUser} from './sis.js';

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
            // create Courses from returned json
            for (let i = 0; i < data.sections.length; i++) {
                let courseJSON = data.sections[i];
                let course = new Course(courseJSON.crn, courseJSON);
                courses.push(course);
            }
            let schedule = new Schedule(courses);

            if (schedule.hasConflicts()) {
                window.alert('Conflicts in schedule, ' +
                'will not be able to register.');
                return;
            }

            // for each course in the created schedule,
            // set corresponding element to course string
            for (let i = 0; i < schedule.courses.length; i++) {
                $('#set-crn' + (i + 1)).html(
                    '<li>' + schedule.courses[i].toHTML() + '</li>'
                );
            }

            let sis = new SISUser(rin, password);

            sis.name((name) => {
                // display name of user
                $('#set-realname').html(name);
                $('#crn-input').hide();
                $('#reg-details').fadeIn('slow');
                let end = parse(regDate + 'T' + regTime);
                // create timer to register when time is reached
                let timer = setInterval(() => {
                    let now = Date();
                    // if now is after registration time, register
                    if (isAfter(now, end)) {
                        $('#countdown').hide();
                        clearInterval(timer);
                        sis.register($('#reg-term').val(), valid, (crns) => {
                            $('#status').fadeIn('slow');
                            if (crns.length != 0) {
                                let status = 'Successfully registered for: '
                                    + crns.reduce((x, y) => x + ', ' + y);
                                $('#status').html(status);
                            } else {
                                $('#status').html('Failed to register for all courses');
                            }
                        });
                    // otherwise, update countdown
                    } else {
                        $('#countdown').html(distanceInWordsStrict(now, end));
                    }
                }, 1000);
            });
        });
    } else {
        window.alert('No CRNs chosen.');
    }
}

window.registerSubmit = registerSubmit;
