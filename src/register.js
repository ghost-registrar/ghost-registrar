import $ from 'jquery';
import {Course} from './course.js';
import {Schedule} from './schedule.js';

/** Sets up details for registration */
function registerSubmit() {
    document.getElementById('RegTime').innerHTML =
    document.getElementById('regTime').value;

    document.getElementById('RegDate').innerHTML =
    document.getElementById('regDate').value;

    // fill array with nonempty CRNs from input fields
    let valid = [];
    for (let i = 0; i < 6; i++) {
        let idStr = 'crn' + (i + 1);
        if (document.getElementById(idStr).value.length != 0) {
            valid.push(document.getElementById(idStr).value);
        }
    }

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
            // for each course in the created schedule, set corresponding element to course string
            for (let i = 0; i < schedule.numCourses(); i++) {
                document.getElementById('Course' + (i + 1)).innerHTML = schedule.getCourse(i).toStringComplete();
            }
        });
    }
}

window.registerSubmit = registerSubmit;
