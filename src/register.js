import $ from 'jquery';
import {Course} from './course.js';

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
            for (let i = 0; i < data.sections.length; i++) {
                let idStr = 'Course' + (i + 1);
                let courseJson = data.sections[i];
                let courseText = '';
                let course = new Course(courseJson.crn, courseJson);
                courseText += course.toString() + '<br>';
                for (let j = 0; j < course.numPeriods(); j++) {
                    courseText += course.getPeriod(j).toString() + '<br>';
                }
                document.getElementById(idStr).innerHTML = courseText;
            }
        });
    }
}

window.registerSubmit = registerSubmit;
