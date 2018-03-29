import $ from 'jquery';

/** Encapsulates interactions with the SIS **/
export class SISUser {
    /**
     * Constructs an SIS interface given a RIN and the associated password.
     * @param {String} rin - RIN to use when authenticating.
     * @param {String} pass - Password to use when authenticating.
     */
    constructor(rin, pass) {
        this.rin = rin;
        this.pass = pass;
    }

    /** Fetches the user's real name from SIS.
     * @param {Function} cb - Callback on success, passed the real name.
     */
    name(cb) {
        $.post('https://sisapi.herokuapp.com/sis/name',
               {rin: this.rin, pass: this.pass}, cb);
    }

    /** the user's real name from SIS.
     * @param {Array} crns - Courses to register.
     * @param {Function} cb - Callback on success, passed the courses
     * registered successfully.
     */
    register(crns, cb) {
        $.post('https://sisapi.herokuapp.com/sis/register',
               {rin: this.rin,
                pass: this.pass,
                crns: JSON.stringify(crns.map((x) => x.toString()))},
               cb);
    }
};
