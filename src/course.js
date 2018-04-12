/** Represents a specific period of a course */
export class Period {
    /**
     * Constructs a Period from a JSON object
     * @param {JSON} periodJson - A JSON object containining data
     * for the Period.
     */
    constructor(periodJson) {
        this.type = periodJson.type;
        this.day = periodJson.day - 1;
        this.start = periodJson.start;
        this.end = periodJson.end;
    }

    /**
     * @return {String} Returns the string representation of the object.
     */
    toString() {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        return this.type + ': ' + days[this.day]
            + ' ' + this.start + ' - ' + this.end;
    };

    /**
     * @param {Period} period - The other period.
     * @return {Boolean} Returns true if this conflicts with period.
     */
    conflicts(period) {
        console.log('checking for conflicts in period');
        if (this.day != period.day) return false;
        if (this.start < period.start) return (this.end >= period.start);
        else if (this.start > period.start) return (period.end >= this.start);
        else return true;
    };
}

/** Represents a course */
export class Course {
    /**
     * Constructs a Course given its CRN and a JSON object.
     * @param {Number} crn - The CRN of the course.
     * @param {JSON} sectionJSON - A JSON object containining data
     * for the Period.
     */
    constructor(crn, sectionJSON) {
        this.name = sectionJSON.course_name;
        this.departmentCode = sectionJSON.department_code;
        this.courseNumber = sectionJSON.course_number;
        this.sectionNumber = sectionJSON.name;
        this.crn = crn;
        this.periods = sectionJSON.periods.map((x) => new Period(x));
        this.listedConflicts = sectionJSON.conflicts;
    }

    /**
     * @return {String} Returns the string representation of the object.
     */
    toString() {
        return this.name + ' (' + this.departmentCode + ' '
            + this.courseNumber + ' - ' + this.sectionNumber + ')';
    };

    /**
     * @return {String} Returns an HTML representation of the object.
     */
    toHTML() {
        return this.toString() + '<br>'
            + this.periods.reduce((acc, p) => acc + '<br>' + p.toString());
    };

    /**
     * @param {String} course - Course to compare.
     * @return {Boolean} Returns true if this conflicts with course.
     */
    conflicts(course) {
        console.log('checking for conflicts in course');
        console.log('comparing ' + this + ' with ' + course);
        return this.periods.reduce(
            (acc, p1) => acc || course.periods
                .map((p2) => p1.conflicts(p2))
                .reduce((x, y) => x || y, false),
            false);
    };
}
