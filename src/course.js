let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

/** Represents a specific period of a course */
export class Period {
    /**
     * Constructs a Period from a JSON object
     * @param {JSON} periodJson A JSON object containining data for the Period.
     */
    constructor(periodJson) {
        let type_ = '';
        let day_ = 0;
        let start_ = '';
        let end_ = '';

        type_ = periodJson.type;
        day_ = periodJson.day - 1;
        start_ = periodJson.start;
        end_ = periodJson.end;

        // define methods in constructor so they can access "private" fields
        this.toString = function() {
            return type_ + ': ' + days[day_] + ' ' + start_ + ' - ' + end_;
        };
    }
}

/** Represents a course */
export class Course {
    /**
     * Constructs a Course given its CRN and a JSON object
     * @param {integer} crn The CRN of the course.
     * @param {JSON} sectionJson A JSON object containining data for the Period.
     */
    constructor(crn, sectionJson) {
        let name_ = '';
        let departmentCode_ = '';
        let courseNumber_ = 0;
        let periods_ = [];

        this.crn = crn;
        name_ = sectionJson.course_name;
        departmentCode_ = sectionJson.department_code;
        courseNumber_ = sectionJson.course_number;
        for (let i = 0; i < sectionJson.periods.length; i++) {
            periods_.push(new Period(sectionJson.periods[i]));
        }

        // define methods in constructor so they can access "private" fields
        this.toString = function() {
            return name_ + ' (' + departmentCode_ + ' ' + courseNumber_ + ')';
        };

        this.numPeriods = function() {
            return periods_.length;
        };

        this.getPeriod = function(n) {
            return periods_[n];
        };
    }
}

/* export var Period = (function() {
    var type_ = "";
    var day_ = 0;
    var start_ = "";
    var end_ = "";

    function Period(periodJson) {
        type_ = periodJson.type;
        day_ = periodJson.day - 1;
        start_ = periodJson.start;
        end_ = periodJson.end;
    }

    Period.prototype.toString = function toString() {
        return type_ + ': ' + days[day] + ' ' + start_ + ' - ' + end_;
    }
})(); */

/* export var Course = (function() {
    var name_ = "";
    var departmentCode_ = "";
    var courseNumber_ = 0;
    var periods_ = [];

    function Course(crn, sectionJson) {
        this.crn = crn;
        name_ = sectionJson.course_name;
        departmentCode_ = sectionJson.department_code;
        courseNumber_ = sectionJson.course_number;
        for (let i = 0; i < sectionJson.periods.length; i++) {
            periods_.push(new Period(sectionJson.periods[i]));
        }
    }

    Course.prototype.toString = function toString() {
        return name_ + ' (' + departmentCode_ + ' ' + courseNumber_ + ')';
    }

    Course.prototype.numPeriods = function numPeriods() {
        return periods.length;
    }

    Course.prototype.getPeriod = function getPeriod(n) {
        return periods[n];
    }
})(); */
