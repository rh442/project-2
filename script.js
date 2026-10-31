//API-KEY: qkFJTDmLGWP6DN7f6cJB6DbR8Ck9CBpbdBpgFrcn
//  Grab the elements we need
const year = 2025;
const monthSelect = document.getElementById("month-select");
const daySelect   = document.getElementById("day-select");
const goBtn       = document.getElementById("go-btn");

//  Fill the day dropdown 
// When the month changes, we need to change how many days are in the list.
function fillDays(month) {
    daySelect.innerHTML = "";    // clear old days

    const daysInMonth = new Date(year, month, 0).getDate();  // e.g. 31, 30, 28...

    for (let day = 1; day <= daysInMonth; day++) {
        const option = document.createElement("option");
        option.value = String(day).padStart(2, "0"); // "01", "02"...
        option.textContent = day;
        daySelect.appendChild(option);
    }
}

// Fill days once when the page loads
fillDays(monthSelect.value);

// Refill days whenever the user picks a new month
monthSelect.addEventListener("change", function () {
    fillDays(monthSelect.value);
});


// Create the calendar 
const calendar = flatpickr("#calendar", {
    inline: true,
    defaultDate: "2025-01-01",
    minDate: "2025-01-01",
    maxDate: "2025-12-31",

    // When the user clicks a day on the calendar,
    // update the two dropdowns to match.
    onChange: function (dates, dateString) {
        const parts = dateString.split("-"); // ["2025", "01", "01"]
        const month = parts[1];
        const day   = parts[2];

        monthSelect.value = month;
        fillDays(month);
        daySelect.value = day;
    }
});


// jump calendar to chosen month/day 
goBtn.addEventListener("click", function () {
    const chosenDate = year + "-" + monthSelect.value + "-" + daySelect.value;
    calendar.setDate(chosenDate, true);  // true = also run onChange
});
