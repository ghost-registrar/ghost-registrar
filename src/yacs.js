import $ from 'jquery';

function importFromYACS() {
    // should add paste from clipboard if possible
    var url = window.prompt("Enter the schedule link (copied from YACS):", "");
    
    if (url == null) {
        return;
    }
    
    var regex = /https?:\/\/yacs\.cs\.rpi\.edu\/#\/schedules\?section_ids=/
    var valid = regex.test(url);
    
    if (!valid) {
        window.alert("Invalid schedule link.")
    }
    url = url.replace("#", "api/v5");
    
    $.getJSON(url, function(data) {
        if (data.schedules.length > 0) {
            var index = 0;
            
            // match schedule_index to check if an index is specified
            var scheduleIndex = url.match(/schedule_index=\d+/);
            if (scheduleIndex != null && scheduleIndex.length > 0) {
                var str = scheduleIndex[0];
                str = str.slice(str.indexOf("=") + 1);
                index = str;
            }
            
            var schedule = data.schedules[index];
            for (var i = 0; i < schedule.sections.length && i < 6; i++) {
                document.getElementById("crn" + (i + 1)).value = schedule.sections[i].crn;
            }
            // might be able to reuse data from returned json
            //RegisterSubmit();
        } else {
            window.alert("No schedules found.");
        }
    });
}

window.importFromYACS = importFromYACS