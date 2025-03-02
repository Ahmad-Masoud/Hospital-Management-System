document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const problem = document.getElementById('problem').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const doctor = document.getElementById('doctor').value;
    const date = document.getElementById('date').value;

    const patientData = {
        name,
        email,
        phone,
        problem,
        age,
        gender,
        doctor,
        date,
        status: 'Appointment Pending'
    };

    addPatientToTable(patientData);
    document.getElementById('appointmentForm').reset();
});

function addPatientToTable(patient) {
    const table = document.getElementById('patientTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const nameCell = newRow.insertCell(0);
    const emailCell = newRow.insertCell(1);
    const phoneCell = newRow.insertCell(2);
    const problemCell = newRow.insertCell(3);
    const ageCell = newRow.insertCell(4);
    const genderCell = newRow.insertCell(5);
    const doctorCell = newRow.insertCell(6);
    const dateCell = newRow.insertCell(7);
    const statusCell = newRow.insertCell(8);

    nameCell.textContent = patient.name;
    emailCell.textContent = patient.email;
    phoneCell.textContent = patient.phone;
    problemCell.textContent = patient.problem;
    ageCell.textContent = patient.age;
    genderCell.textContent = patient.gender;
    doctorCell.textContent = patient.doctor;
    dateCell.textContent = patient.date;

const statusDropdown = document.createElement('select');
statusDropdown.innerHTML = `
    <option value="Appointment Pending" ${patient.status === 'Appointent Pending' ? 'selected' : ''}>Appointment Pending</option>
    <option value="Under Treatment" ${patient.status === 'Under Treatment' ? 'selected' : ''}>Under Treatment</option>
    <option value="Cured" ${patient.status === 'Cured' ? 'selected' : ''}>Cured</option>
`;
statusDropdown.addEventListener('change', function() {
    patient.status = this.value;
});
statusCell.appendChild(statusDropdown);
}

function updateStatus(patientId, status) {
    fetch(`/update_status/${patientId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': '{{ csrf_token }}' // Add CSRF token for security
        },
        body: JSON.stringify({ status: status })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Status updated successfully!');
        } else {
            alert('Failed to update status.');
        }
    });
}