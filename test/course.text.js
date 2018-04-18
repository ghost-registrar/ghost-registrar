import {Course} from '../src/course.js';

var assert = require('assert');

describe('Course', function() {
    // Testing toString()
    describe('toString', function() {
        it('should return false if either course doesn\'t match it\' string. ', function() {
            let c1json = {"course_name": "Natural Sciences I",                "course_number": 1030, "department_code": "ERTH", "name": "01","periods": [{"type": "LEC","day": 1,"start": 1600,"end": 1750}, {"type": "LEC", "day": 4, "start": 1600, "end": 1750}]};
            let c2json = {"course_name": "Software Design and Documentation", "course_number": 4440, "department_code": "CSCI", "name": "01","periods": [{"type": "LEC","day": 1,"start": 1600,"end": 1750}, {"type": "LEC", "day": 4, "start": 1600, "end": 1750}]};

            let c1 = new Course(65042, c1json);
            let c2 = new Course(61099, c2json);

            assert.ok(c1.toString() == "Natural Sciences I (ERTH 1030 - 01)" && c2.toString() == "Software Design and Documentation (CSCI 4440 - 1)", "Failed to follow toString() test cases.");
        });
    });




    // Testing toHTML()






    // Testing conflicts(course)

});

