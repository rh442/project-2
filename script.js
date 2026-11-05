
//API-KEY: qkFJTDmLGWP6DN7f6cJB6DbR8Ck9CBpbdBpgFrcn
//  Grab the elements we need
const year = 2025;
const monthSelect = document.getElementById("month-select");
const daySelect = document.getElementById("day-select");
const goBtn = document.getElementById("go-btn");

let Title = document.getElementById('Title')
let APOD_IMG = document.getElementById('APOD')
let Author = document.getElementById('Author')
let Description = document.getElementById('Description')

const startDate = "2025-01-01";

//  Fill the day dropdown 
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

// Refill days whenever the user picks a new month
monthSelect.addEventListener("change", function () {
    fillDays(monthSelect.value);
});

// Create the calendar 
const calendar = flatpickr("#calendar", {
    inline: true,
    defaultDate: startDate,
    minDate: "2025-01-01",
    maxDate: "2025-12-31",

    // When the user clicks a day on the calendar,
    // update the two dropdowns to match.
    onChange: function (dates, dateString) {
        const parts = dateString.split("-"); // ["2025", "01", "01"]
        const month = parts[1];
        const day = parts[2];

        monthSelect.value = month;
        fillDays(month);
        daySelect.value = day;

        //get API data
        getAPOD(dateString)
    }
});

// jump calendar to chosen month/day 
goBtn.addEventListener("click", function () {
    const chosenDate = year + "-" + monthSelect.value + "-" + daySelect.value;
    calendar.setDate(chosenDate, true);  // true = also run onChange
});

// hide/show calendar 

const toggleCalendarBtn = document.getElementById("toggle-calendar-btn");

toggleCalendarBtn.addEventListener("click", function () {

    const flatpickrCalendar = calendar.calendarContainer;

    if (flatpickrCalendar.style.display === "none") {
        flatpickrCalendar.style.display = "";
        toggleCalendarBtn.textContent = "Hide Calendar";
    } else {
        flatpickrCalendar.style.display = "none";
        toggleCalendarBtn.innerText = "Show Calendar";
    }
    
});

// Random date button
const randomBtn = document.getElementById("random-btn");

randomBtn.addEventListener("click", function () {
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const daysInMonth = new Date(year, randomMonth, 0).getDate();
    const randomDay = Math.floor(Math.random() * daysInMonth) + 1;

    const randomDate = year + "-" +
        String(randomMonth).padStart(2, "0") + "-" +
        String(randomDay).padStart(2, "0");

    calendar.setDate(randomDate, true);
});


//API fetcher
async function getAPOD(dateString) {
    // "2025-01-02" -> "250102"
    try {
        const apiDate = dateString.slice(2).replaceAll("-", "");
        console.log("Fetching APOD for:", dateString, "→", apiDate);
    
        const response = await fetch(
        `https://science.nasa.gov/wp-json/wp/v2/apod-basic/${apiDate}`
    );
    
    const APOD = await response.json();
    console.log(APOD)
    //Changes elements data to fetched Data
    Title.innerText = APOD.title
    APOD_IMG.src = APOD.hdurl
    Author.innerHTML = APOD.credit || APOD.copyright || "NASA";
    Description.innerHTML = APOD.explanation;
    } catch (err) {
        console.error("APOD failed:", err);
    }
}
calendar.setDate(startDate, true);
