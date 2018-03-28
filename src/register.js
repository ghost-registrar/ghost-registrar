import $ from 'jquery';

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

        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        // use jQuery to get json from YACS api
        $.getJSON(queryStr, function(data) {
            for (let i = 0; i < data.sections.length; i++) {
                let idStr = 'Course' + (i + 1);
                let course = data.sections[i];
                let courseText = '';
                courseText += course.course_name + ' ('
                + course.department_code + ' '
                + course.course_number + ')<br>';
                for (let j = 0; j < course.periods.length; j++) {
                    courseText += course.periods[j].type + ': '
                    + days[course.periods[j].day - 1] + ' '
                    + course.periods[j].start + ' - '
                    + course.periods[j].end + '<br>';
                }
                document.getElementById(idStr).innerHTML = courseText;
            }
        });
    }
}

window.registerSubmit = registerSubmit;
