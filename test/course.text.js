import {Course} from '../src/course.js';

var assert = require('assert');

describe('Course', function() {
    // Testing toString()
    describe('toString', function() {
        it('should break if either course doesn\'t match it\'s string. ', function() {
            let c1json = {"course_name": "Natural Sciences I",                "course_number": 1030, "department_code": "ERTH", "name": "01","periods": [{"type": "LEC","day": 1,"start": 1600,"end": 1750}, {"type": "LEC", "day": 4, "start": 1600, "end": 1750}]};
            let c2json = {"course_name": "Software Design and Documentation", "course_number": 4440, "department_code": "CSCI", "name": "01","periods": [{"type": "LEC","day": 1,"start": 1600,"end": 1750}, {"type": "LEC", "day": 4, "start": 1600, "end": 1750}]};
            let c1 = new Course(65042, c1json);
            let c2 = new Course(61099, c2json);
            assert.deepStrictEqual(c1.toString(), "Natural Sciences I (ERTH 1030 - 01)", "Case 1 does not follow toString() format.")
            assert.deepStrictEqual(c2.toString(), "Software Design and Documentation (CSCI 4440 - 01)", "Case 2 does not follow toString() format.");
        });
    });

    // Testing toHTML()
    describe('toHTML', function() {
        it('should break if either course doesn\'t match it\'s HTML string. ', function() {
            let c1json = {"course_name": "Natural Sciences I",                "course_number": 1030, "department_code": "ERTH", "name": "01","periods": [{"type": "LEC","day": 1,"start": 1600,"end": 1750}, {"type": "LEC", "day": 4, "start": 1600, "end": 1750}]};
            let c2json = {"course_name": "Software Design and Documentation", "course_number": 4440, "department_code": "CSCI", "name": "01","periods": [{"type": "LEC","day": 1,"start": 1600,"end": 1750}, {"type": "LEC", "day": 4, "start": 1600, "end": 1750}]};
            let c1 = new Course(65042, c1json);
            let c2 = new Course(61099, c2json);
            assert.deepStrictEqual(c1.toString(), "Natural Sciences I (ERTH 1030 - 01)<br>LEC: Monday 1600 - 1750<br>LEC: Thursday 1600 - 1750<br>", "Case 1 does not follow toHTML() format.")
            assert.deepStrictEqual(c2.toString(), "Software Design and Documentation (CSCI 4440 - 01)<br>LEC: Monday 1600 - 1750<br>LEC: Thursday 1600 - 1750<br>", "Case 2 does not follow toHTML() format.");
        });
    });

    // Testing conflicts(course)



});

