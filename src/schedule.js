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

        // return true if any courses within the
        // schedule conflict with each other
        this.hasConflicts = function() {
            for (let i = 0; i < courses_.length; i++) {
                for (let j = i + 1; j < courses_.length; j++) {
                    if (courses_[i].conflicts(courses_[j])) {
                        return true;
                    }
                }
            }
            return false;
        };
    }
}
