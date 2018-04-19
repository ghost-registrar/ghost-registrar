import {Course} from '../src/course.js';
import {Schedule} from '../src/schedule.js';

var assert = require('assert');

describe('Schedule', function() {
    let c1json = {"course_name": "Natural Sciences I",                "course_number": 1030, "department_code": "ERTH", "name": "01","periods": [{"type": "LEC","day": 1,"start": 1600,"end": 1750}, {"type": "LEC", "day": 4, "start": 1600, "end": 1750}]};
    let c2json = {"course_name": "Software Design and Documentation", "course_number": 4440, "department_code": "CSCI", "name": "01","periods": [{"type": "LEC","day": 1,"start": 1600,"end": 1750}, {"type": "LEC", "day": 4, "start": 1600, "end": 1750}]};
    let c3json = {"course_name": "Course with no conflicts!",         "course_number": 6666, "department_code": "LALA", "name": "01","periods": [{"type": "LEC","day": 2,"start": 1600,"end": 1750}, {"type": "LEC", "day": 5, "start": 1600, "end": 1750}]};
    let c1 = new Course(65042, c1json);
    let c2 = new Course(61099, c2json);
    let c3 = new Course(66666, c3json);

    // Testing constructor
    describe('constructor', function() {
        it('should never break. ', function() {
            // Test it with an empty course array.
            let s1 = new Schedule([c1, c2, c3]);
            let s2 = new Schedule([c2, c1]);
            let s3 = new Schedule([c1]);
            let s4 = new Schedule([]);
        });
    });

    // Testing hasConflicts() function.
    // This is basically if the courses within have conflicts.
    // So very little testing here.
    describe('hasConflicts', function() {
        it('should break if either schedule has conflicting courses. ', function() {

            let s1 = new Schedule([c1, c3]);
            let s2 = new Schedule([c1, c2]);
            let s3 = new Schedule([]);
            let s4 = new Schedule([c1]);
            
            assert.ok(!s1.hasConflicts(), "Failed on hasConflicts() test 1.");
            assert.ok( s2.hasConflicts(), "Failed on hasConflicts() test 2.");
            assert.ok(!s3.hasConflicts(), "Failed on hasConflicts() test 3.");
            assert.ok(!s4.hasConflicts(), "Failed on hasConflicts() test 4.");
            
        });
    });

});

