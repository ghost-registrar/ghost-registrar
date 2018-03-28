/** Represents a schedule */
export class Schedule {
    // might want to add option for using schedule json
    /**
     * Constructs a Schedule from a list of courses
     * @param {array} courses An array of Courses in the schedule.
     */
    constructor(courses) {
        // make a copy of the array so it cannot be changed
        let courses_ = courses.slice(0);

        this.numCourses = function() {
            return courses_.length;
        };

        this.getCourse = function(n) {
            return courses_[n];
        };
    }
}
