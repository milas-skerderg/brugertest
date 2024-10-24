function showPopup(date) {
    alert("You selected " + date + ". A booking window will open.");
}


function showPopup(date) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closePopup()">&times;</span>
            <h3>Booking Confirmation</h3>
            <p>You have selected ${date} for your appointment.</p>
            <button onclick="closePopup()">Confirm</button>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';
}

function closePopup() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}
