import {Course} from '../src/course.js';

var assert = require('assert');

describe('Course', function() {
    let c1json = {"course_name": "Natural Sciences I",                "course_number": 1030, "department_code": "ERTH", "name": "01","periods": [{"type": "LEC","day": 1,"start": 1600,"end": 1750}, {"type": "LEC", "day": 4, "start": 1600, "end": 1750}]};
    let c2json = {"course_name": "Software Design and Documentation", "course_number": 4440, "department_code": "CSCI", "name": "01","periods": [{"type": "LEC","day": 1,"start": 1600,"end": 1750}, {"type": "LEC", "day": 4, "start": 1600, "end": 1750}]};
    let c3json = {"course_name": "Course with no conflicts!",         "course_number": 6666, "department_code": "LALA", "name": "01","periods": [{"type": "LEC","day": 2,"start": 1600,"end": 1750}, {"type": "LEC", "day": 5, "start": 1600, "end": 1750}]};

    let c1 = new Course(65042, c1json);
    let c2 = new Course(61099, c2json);
    let c3 = new Course(66666, c3json);

    // Testing toString()
    describe('toString', function() {
        it('should break if either course doesn\'t match it\'s string. ', function() {
            assert.deepStrictEqual(c1.toString(), "Natural Sciences I (ERTH 1030 - 01)", "Case 1 does not follow toString() format.");
            assert.deepStrictEqual(c2.toString(), "Software Design and Documentation (CSCI 4440 - 01)", "Case 2 does not follow toString() format.");
        });
    });

    // Testing toHTML()
    describe('toHTML', function() {
        it('should break if either course doesn\'t match it\'s HTML string. ', function() {
            assert.deepStrictEqual(c1.toHTML(), "Natural Sciences I (ERTH 1030 - 01)<br>LEC: Monday 1600 - 1750<br>LEC: Thursday 1600 - 1750", "Case 1 does not follow toHTML() format.");
            assert.deepStrictEqual(c2.toHTML(), "Software Design and Documentation (CSCI 4440 - 01)<br>LEC: Monday 1600 - 1750<br>LEC: Thursday 1600 - 1750", "Case 2 does not follow toHTML() format.");
        });
    });

    // Testing conflicts(course)
    // These conflicts are largely based off the periods conflicting. So these tests are simple 
    // pass fail tests. 
    describe('conflicts', function() {
        it('should return true if either course has conflicting periods within. ', function() {

            // Makes sure it is reflexive
            assert.ok( c1.conflicts(c2), "Course conflict test 1 failed.");
            assert.ok( c2.conflicts(c1), "Course conflict test 2 failed.");

            // Makes sure there are no conflict paths.
            assert.ok(!c3.conflicts(c2), "Course conflict test 3 failed.");
            assert.ok(!c3.conflicts(c1), "Course conflict test 4 failed.");

            // A course must conflict with itself.
            assert.ok( c1.conflicts(c1), "Course conflict test 5 failed.");
            assert.ok( c2.conflicts(c2), "Course conflict test 6 failed.");
            assert.ok( c3.conflicts(c3), "Course conflict test 7 failed.");

        });
    });



});

