let currentDate = new Date();
const mapElement = document.getElementById("map");
const timeSlotContainer = document.getElementById("time-slots");
const currentMonthElement = document.getElementById("current-month");

// Generate random unavailable dates
function getRandomUnavailableDates(totalDays) {
    const unavailableDates = new Set();
    const count = Math.floor(Math.random() * totalDays / 4); // Randomly mark 0 to 25% as unavailable
    while (unavailableDates.size < count) {
        const randomDay = Math.floor(Math.random() * totalDays) + 1;
        unavailableDates.add(randomDay);
    }
    return unavailableDates;
}

// Initialize Google Map
function initMap() {
    const location = { lat: 55.6761, lng: 12.5683 }; // Copenhagen coordinates
    const map = new google.maps.Map(mapElement, {
        zoom: 14,
        center: location,
    });
    new google.maps.Marker({
        position: location,
        map: map,
    });
}

// Generate calendar dates for the current month
function generateCalendar() {
    const calendar = document.querySelector(".calendar");
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const unavailableDates = getRandomUnavailableDates(daysInMonth); // Get random unavailable dates

    calendar.innerHTML = `<div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>`;

    for (let i = 0; i < firstDay; i++) {
        calendar.innerHTML += `<div></div>`; // Empty space for the first week
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const isUnavailable = unavailableDates.has(day);
        const className = isUnavailable ? 'unavailable-date' : 'date';
        calendar.innerHTML += `<div class="${className}" onclick="${isUnavailable ? '' : `selectDate(${day})`}">${day}</div>`;
    }

    // Update the current month displayed
    currentMonthElement.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
}

// Select a date and show time slots instead of the map
function selectDate(day) {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    // Clear previous selections
    const previousSelected = document.querySelector(".selected-date");
    if (previousSelected) {
        previousSelected.classList.remove("selected-date");
    }

    // Highlight the selected date
    const dateCells = document.querySelectorAll(".calendar div.date");
    dateCells.forEach((cell, index) => {
        // Clear previous selections
        cell.classList.remove("selected-date"); 
    });

    // Apply the selected class to the correct cell
    const selectedElement = document.querySelector(`.calendar div:nth-child(${day + (new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() + 7)})`);
    selectedElement.classList.add("selected-date");

    // Hide map and show time slots
    mapElement.style.display = "none";
    timeSlotContainer.style.display = "flex"; // Show time slots with flexbox
}

// Show the booking confirmation modal
function showPopup(time) {
    const modal = document.getElementById("booking-modal");
    const bookingTime = document.getElementById("booking-time");
    bookingTime.textContent = `You have selected ${time} on ${new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toLocaleDateString()}`;
    
    modal.style.display = "block"; // Show modal
}

// Close the booking confirmation modal
function closePopup() {
    const modal = document.getElementById("booking-modal");
    modal.style.display = "none"; // Hide modal
}

// Navigation for the calendar (previous and next month)
document.getElementById("prev-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
    initMap(); // Reinitialize the map for the new month
});

document.getElementById("next-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
    initMap(); // Reinitialize the map for the new month
});

// Initialize calendar and map on load
window.onload = function() {
    generateCalendar();
    initMap();
};
