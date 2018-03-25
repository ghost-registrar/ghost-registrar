function ImportFromYACS() {
	var url = window.prompt("Enter the schedule link (copied from YACS)", "");
	// should check to ensure link is valid
	// should add paste from clipboard if possible
	if (url != null && url != "") {
		url = url.replace("#", "api/v5");
	}
	
	$.getJSON(url, function(data) {
		// should allow for choosing from multiple schedules
		if (data.schedules.length > 0) {
			// use the first schedule
			var schedule = data.schedules[0];
			for (i = 0; i < schedule.sections.length && i < 6; i++) {
				document.getElementById("crn" + (i + 1)).value = schedule.sections[i].crn;
			}
		} else {
			window.alert("No schedules found.");
		}
		// should just take data from returned json
		RegisterSubmit();
	});
}