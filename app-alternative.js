document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const calendarDays = document.querySelectorAll('.calendar div');
    const dateDisplay = document.getElementById('selected-date-display');
    const datePickerInput = document.getElementById('date-picker-input');

    let selectedDate = null;

    // Tab switching logic
    tabLinks.forEach(tab => {
        tab.addEventListener('click', () => {
            tabLinks.forEach(link => link.classList.remove('current'));
            tab.classList.add('current');

            const tabId = tab.getAttribute('data-tab');
            tabContents.forEach(content => {
                content.classList.remove('current');
                if (content.id === tabId) {
                    content.classList.add('current');
                }
            });
        });
    });

    // Date selection logic
    calendarDays.forEach(day => {
        day.addEventListener('click', () => {
            calendarDays.forEach(d => d.classList.remove('selected-date'));
            day.classList.add('selected-date');
            selectedDate = day.textContent;
            dateDisplay.textContent = `Selected Date: ${selectedDate}`;
            datePickerInput.value = ''; // Clear the date picker when using calendar
        });
    });

    // Date picker selection logic
    datePickerInput.addEventListener('change', (e) => {
        const newDate = new Date(e.target.value).toLocaleDateString();
        selectedDate = newDate;
        dateDisplay.textContent = `Selected Date: ${selectedDate}`;
    });
});
