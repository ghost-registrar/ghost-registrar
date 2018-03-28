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

        this.getDay = function() {
            return day_;
        };

        this.getStart = function() {
            return start_;
        };

        this.getEnd = function() {
            return end_;
        };

        // return true if this conflicts with period
        this.conflicts = function(period) {
            if (day_ != period.getDay()) {
                return false;
            }
            if (start_ < period.getStart()) {
                return (end_ >= period.getStart());
            } else if (start_ > period.getStart()) {
                return (period.getEnd() >= start_);
            } else {
                return true;
            }
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
        let sectionNumber_ = '';

        this.crn = crn;
        name_ = sectionJson.course_name;
        departmentCode_ = sectionJson.department_code;
        courseNumber_ = sectionJson.course_number;
        for (let i = 0; i < sectionJson.periods.length; i++) {
            periods_.push(new Period(sectionJson.periods[i]));
        }
        sectionNumber_ = sectionJson.name;

        // define methods in constructor so they can access "private" fields
        this.toString = function() {
            return name_ + ' (' + departmentCode_ + ' ' + courseNumber_ +
            ' - ' + sectionNumber_ + ')';
        };

        // returns complete representation of course, including all periods
        this.toStringComplete = function() {
            let str = this.toString() + '<br>';
            for (let i = 0; i < periods_.length; i++) {
                str += periods_[i].toString() + '<br>';
            }
            return str;
        };

        this.numPeriods = function() {
            return periods_.length;
        };

        this.getPeriod = function(n) {
            return periods_[n];
        };

        this.getCRN = function() {
            return this.crn;
        };

        // return true if this conflicts with course
        this.conflicts = function(course) {
            for (let i = 0; i < periods_.length; i++) {
                for (let j = 0; j < course.numPeriods(); j++) {
                    if (periods_[i].conflicts(course.getPeriod(j))) {
                        return true;
                    }
                }
            }
            return false;
        };
    }
}
