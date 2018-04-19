import {SISUser} from '../src/sis.js';

var assert = require('assert');

describe('Sis', function() {
    let user = "661497203";
    let pass = "tomato";
    let sis = new SISUser(user, pass);
    let badSIS = new SISUser("not a rin", "not a password");

    // Testing constructor
    describe('constructor', function() {
        it('should never break. ', function() {
            let testSIS = new SISUser(user, pass);
            let testBadSIS = new SISUser("not a rin", "not a password");
        });
    });

    // Testing name() function.
    describe('name()', function() {
        it('should return the name of the student', function() {
            assert.deepStrictEqual(sis.name(), "Kyle R. Fawcett", "The real name failed.");
        });
    });

    // TODO: Testing for the register call.

});

