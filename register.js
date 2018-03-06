function RegisterSubmit() {
	document.getElementById("RegTime").innerHTML = document.getElementById("regTime").value;
	document.getElementById("RegDate").innerHTML = document.getElementById("regDate").value;
	
	var valid = [];
	for (i = 0; i < 6; i++) {
		var idStr = "crn" + (i + 1);
		if (document.getElementById(idStr).value.length != 0) {
			valid.push(document.getElementById(idStr).value);
		}
	}
	
	if (valid.length > 0) {
		var queryStr = "https://yacs.cs.rpi.edu/api/v5/sections.json?show_periods&crn=";
		for (i = 0; i < valid.length; i++) {
			queryStr += valid[i];
			if (i != valid.length - 1) {
				queryStr += ",";
			}
		}
		
		var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
		
		// use jQuery to get json from YACS api
		$.getJSON(queryStr, function(data) {
			for (i = 0; i < data.sections.length; i++) {
				var idStr = "Course" + (i + 1);
				var course = data.sections[i];
				var courseText = "";
				courseText += course.course_name + " (" + course.department_code + " " +  course.course_number + ")<br>";
				for (j = 0; j < course.periods.length; j++) {
					courseText += course.periods[j].type + ": " + days[course.periods[j].day - 1] + " " + course.periods[j].start + " - " + course.periods[j].end + "<br>";
				}
				document.getElementById(idStr).innerHTML = courseText;
			}
		});
	}
}