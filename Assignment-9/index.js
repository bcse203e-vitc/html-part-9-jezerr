function openForm() {
    document.getElementById("bookingForm").style.display = "block";
}

function closeForm() {
    document.getElementById("bookingForm").style.display = "none";
}

document.getElementById("appointmentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let service = document.getElementById("service").value;
    let datetime = document.getElementById("datetime").value;

    if (!name || !email || !phone || !service || !datetime) {
        alert("Please fill in all required fields!");
        return;
    }

    let appointment = {
        name, email, phone, service, datetime,
        status: "Pending"
    };

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    displayAppointments();
    showConfirmation(name, service, datetime);
    closeForm();
});

function displayAppointments() {
    let list = document.getElementById("appointmentList");
    list.innerHTML = "";
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    appointments.forEach((app, index) => {
        let row = `<tr>
            <td>${app.name}</td>
            <td>${app.service}</td>
            <td>${app.datetime}</td>
            <td>${app.status}</td>
            <td><button onclick="cancelAppointment(${index})">Cancel</button></td>
        </tr>`;
        list.innerHTML += row;
    });
}

function cancelAppointment(index) {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.splice(index, 1);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    displayAppointments();
}

function showConfirmation(name, service, datetime) {
    document.getElementById("confirmationMessage").innerText = 
        `Thank you, ${name}! Your appointment for ${service} on ${datetime} is confirmed.`;
    document.getElementById("confirmationPopup").style.display = "block";
}

function closePopup() {
    document.getElementById("confirmationPopup").style.display = "none";
}

document.addEventListener("DOMContentLoaded", displayAppointments);
