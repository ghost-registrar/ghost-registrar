/** Represents a schedule */
export class Schedule {
    // might want to add option for using schedule json

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
        /**
        return this.courses.reduce(
            (acc, c1, i) => acc || this.courses
                .slice(i + 1)
                .map((c2) => c1.conflicts(c2))
                .reduce((x, y) => x || y, false),
            false);
        */
        // Get the list of all conflicting classes.
        let allConflicts = [];
        for (let i = 0; i < this.courses.length; i++) {
            allConflicts = allConflicts.concat(this.courses[i].listedConflicts);
        }
        
        // Check if any of the courses we have are in the conflicting courses list.
        for (let i = 0; i < this.courses.length; i++) {
            if (allConflicts.includes(this.courses[i].crn)) {
                return true;
            }
        }
        return false;
    };
}
