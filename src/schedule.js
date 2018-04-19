/** Represents a schedule */
export class Schedule {
    /**
     * Constructs a Schedule from a list of courses
     * @param {array} courses An array of Courses in the schedule.
     */
    constructor(courses) {
        this.courses = courses;
    }

    /**
     * @return {Boolean} Returns true if any courses within the schedule
     * conflict with each other.
     */
    hasConflicts() {
        console.log('checking for conflicts in schedule');
        // check all pairs of Courses to see if there are any conflicts
        return this.courses.reduce(
            (acc, c1, i) => acc || this.courses
                .slice(i + 1)
                .map((c2) => c1.conflicts(c2))
                .reduce((x, y) => x || y, false),
            false);
    };
}
