import {Period} from '../src/course.js';

let assert = require('assert');

describe('Period', function() {
    let p1json = {type: 'LEC', day: 1, start: '1000', end: '1150'};
    let p2json = {type: 'LEC', day: 2, start: '1000', end: '1150'};
    let p3json = {type: 'LEC', day: 1, start: '1200', end: '1350'};
    let p4json = {type: 'LEC', day: 1, start: '1100', end: '1250'};
    let p5json = {type: 'LEC', day: 1, start: '900', end: '1050'};
    let p1 = new Period(p1json);
    let p2 = new Period(p2json);
    let p3 = new Period(p3json);
    let p4 = new Period(p4json);
    let p5 = new Period(p5json);
    
    describe('conflicts', function() {
        it('should return false for periods with different days', function() {
            assert.ok(!p1.conflicts(p2));
        });
        it('should return false for periods with different times on the same day', function() {
            assert.ok(!p1.conflicts(p3));
        });
        it('should return true for the same period', function() {
            assert.ok(p1.conflicts(p1));
        });
        it('should return true for a conflicting period starting later', function() {
            assert.ok(p1.conflicts(p4));
        });
        it('should return true for a conflicting period starting earlier', function() {
            assert.ok(p1.conflicts(p5));
        });
    });
    
    describe('toString', function() {
        it('should return the correct representation', function() {
            assert.ok(p1.toString() == 'LEC: Monday 1000 - 1150');
        });
    });
});
