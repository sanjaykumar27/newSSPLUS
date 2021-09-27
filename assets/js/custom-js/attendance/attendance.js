$(function() {
    CalculateDateDiff();
    CalculateDateDiffOvertime();
	CalculateDateDiffShift();
});

function CalculateDateDiff() {
    document.getElementById("current-end-date").min = $("#current-start-date").val();
    var start_date = $("#current-start-date").val();
    var end_date = $("#current-end-date").val();
    AttendanceGenrator(start_date, end_date);
}

function CalculateDateDiffOvertime() {
    document.getElementById("overtime-end-date").min = $("#overtime-start-date").val();
    var start_date = $("#overtime-start-date").val();
    var end_date = $("#overtime-end-date").val();
    OvertimeAttendanceGenrator(start_date, end_date);
}

function CalculateDateDiffShift() {
    document.getElementById("shift-end-date").min = $("#shift-start-date").val();
    var start_date = $("#shift-start-date").val();
    var end_date = $("#shift-end-date").val();
    ShiftAttendanceGenrator(start_date, end_date);
}

function AttendanceGenrator(start_date, end_date) {
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tuey";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    var emp = 6;
    const dates = getDates(new Date(start_date), new Date(end_date));
    var html = '<table class="table align-middle table-borderd table-row-dashed">';
    html += '<tr><td class="bg-light-primary text-center">Emp/Date</td>';
    dates.forEach(function(date, index) {
        html += '<td class="bg-light-primary text-center">' + date.getDate() + '<br>' + weekday[date.getDay()] + '</td>';
        if ((index + 1 == dates.length)) {
            html += '<td class="bg-light-primary text-center">Present</td><td class="bg-light-primary text-center">Absent</td><td class="bg-light-primary text-center">Holiday</td><td class="bg-light-primary text-center">Weekly Off</td><td class="bg-light-primary text-center">Overtime</td><td class="bg-light-primary text-center">Leave</td>';
        }
    });

    html += '</tr>';
    for (i = 0; i < emp; i++) {
        html += '<tr><td class="border text-center py-0">Sanjay <br><span class="fs-10 text-gray-500">(SS001)</span></td>';
        dates.forEach(function(date, index) {
            html += '<td class="border text-center">P</td>';
            if ((index + 1 == dates.length)) {
                html += '<td class="text-center">23</td><td class="text-center">1</td><td class="text-center">5</td><td class="text-center">2</td><td class="text-center">5</td><td class="text-center">5</td>';
            }
        });
        html += '</tr>';
    }
    html += '</table>';
    $("#attendance-html").html(html);
}

function OvertimeAttendanceGenrator(start_date, end_date) {
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tuey";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    var emp = 5;
    const dates = getDates(new Date(start_date), new Date(end_date));
    var html = '<table class="table align-middle table-borderd table-row-dashed">';
    html += '<tr><td class="bg-light-primary text-center ps-2">Emp/Date</td>';
    dates.forEach(function(date, index) {
        html += '<td class="bg-light-primary text-center">' + date.getDate() + '<br>' + weekday[date.getDay()] + '</td>';
        if ((index + 1 == dates.length)) {
            html += '<td class="bg-light-primary text-center">Total OT in Hours</td>';
        }
    });

    html += '</tr>';
    for (i = 0; i < emp; i++) {
        html += '<tr><td class="border text-center py-0">Sanjay <br><span class="fs-10 text-gray-500">(SS001)</span></td>';
        dates.forEach(function(date, index) {
            html += '<td class="border text-center">1</td>';
            if ((index + 1 == dates.length)) {
                html += '<td class="text-center">8</td>';
            }
        });
        html += '</tr>';
    }
    html += '</table>';
    $("#overtime-html-attendance").html(html);
}

function ShiftAttendanceGenrator(start_date, end_date) {
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tuey";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    var emp = 5;
    const dates = getDates(new Date(start_date), new Date(end_date));
    var html = '<table class="table align-middle table-borderd table-row-dashed">';
    html += '<tr><td class="bg-light-primary text-center ps-2">Emp/Date</td>';
    dates.forEach(function(date, index) {
        html += '<td class="bg-light-primary text-center">' + date.getDate() + '<br>' + weekday[date.getDay()] + '</td>';
        if ((index + 1 == dates.length)) {
            html += '<td class="bg-light-primary text-center">Total Shift A</td><td class="bg-light-primary text-center">Total Shift B</td><td class="bg-light-primary text-center">Total Shift C</td><td class="bg-light-primary text-center">Total Shift D</td>';
        }
    });

    html += '</tr>';
    for (i = 0; i < emp; i++) {
        html += '<tr><td class="border text-center py-0">Sanjay <br><span class="fs-10 text-gray-500">(SS001)</span></td>';
        dates.forEach(function(date, index) {
            html += '<td class="border text-center">A</td>';
            if ((index + 1 == dates.length)) {
                html += '<td class="text-center">8</td><td class="text-center">12</td><td class="text-center">9</td><td class="text-center">8</td>';
            }
        });
        html += '</tr>';
    }
    html += '</table>';
    $("#shift-html-attendance").html(html);
}

function getDates(startDate, endDate) {
    const dates = []
    let currentDate = startDate
    const addDays = function(days) {
        const date = new Date(this.valueOf())
        date.setDate(date.getDate() + days)
        return date
    }
    while (currentDate <= endDate) {
        dates.push(currentDate)
        currentDate = addDays.call(currentDate, 1)
    }
    return dates
}

// Usage