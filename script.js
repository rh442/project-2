//API-KEY: qkFJTDmLGWP6DN7f6cJB6DbR8Ck9CBpbdBpgFrcn
flatpickr("#calendar", {
    inline: true,

    defaultDate: "2025-01-01",

    minDate: "2025-01-01",
    maxDate: "2025-12-31",

    onChange: function (selectedDates, dateStr) {
        document.getElementById("output").textContent = dateStr;
    }

});