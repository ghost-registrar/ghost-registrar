import $ from 'jquery';

/** Imports CRNs from a YACS schedule link */
function importFromYACS() {
    // should add paste from clipboard if possible
    let url = window.prompt('Enter the schedule link (copied from YACS):', '');

    if (url == null) {
        return;
    }

    let regex = /https?:\/\/yacs\.cs\.rpi\.edu\/#\/schedules\?section_ids=/;
    let valid = regex.test(url);

    if (!valid) {
        window.alert('Invalid schedule link.');
    }
    url = url.replace('#', 'api/v5');

    $.getJSON(url, function(data) {
        if (data.schedules.length > 0) {
            let index = 0;

            // match schedule_index to check if an index is specified
            let scheduleIndex = url.match(/schedule_index=\d+/);
            if (scheduleIndex != null && scheduleIndex.length > 0) {
                let str = scheduleIndex[0];
                str = str.slice(str.indexOf('=') + 1);
                index = str;
            }

            let schedule = data.schedules[index];
            for (let i = 0; i < schedule.sections.length && i < 6; i++) {
                let crnField = document.getElementById('crn' + (i + 1));
                crnField.value = schedule.sections[i].crn;
            }
            // might be able to reuse data from returned json
            // could register or at least show courses here
        } else {
            window.alert('No schedules found.');
        }
    });
}

window.importFromYACS = importFromYACS;
