import {Period} from '../src/course.js';

var assert = require('assert');

describe('Period', function() {
    describe('conflicts', function() {
        it('should return false for periods with different days', function() {
            let p1json = {type: 'LEC', day: 1, start: '1000', end: '1150'};
            let p2json = {type: 'LEC', day: 2, start: '1000', end: '1150'};
            let p1 = new Period(p1json);
            let p2 = new Period(p2json);
            assert.ok(!p1.conflicts(p2));
        });
    });
});
