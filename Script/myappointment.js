// Get all appointments from localStorage
function getAppointments() {
    return JSON.parse(localStorage.getItem('appointments') || '[]');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Format booked date
function formatBookedDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Get appointment status
function getAppointmentStatus(appointmentDate) {
    const now = new Date();
    const apptDate = new Date(appointmentDate);
    
    if (apptDate < now) {
        return { status: 'completed', label: 'Completed', class: 'status-completed' };
    } else if (apptDate.toDateString() === now.toDateString()) {
        return { status: 'today', label: 'Today', class: 'status-today' };
    } else {
        return { status: 'upcoming', label: 'Upcoming', class: 'status-upcoming' };
    }
}

// Render appointments
function renderAppointments() {
    const appointments = getAppointments();
    const appointmentsContainer = document.getElementById('appointmentsContainer');
    
    if (appointments.length === 0) {
        appointmentsContainer.innerHTML = `
            <div class="no-appointments">
                <i data-lucide="calendar-x"></i>
                <h3>No Appointments Yet</h3>
                <p>You haven't booked any appointments. Visit the <a href="doctors.html">Doctors page</a> to book your first appointment.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    // Sort appointments by date (most recent first)
    appointments.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    appointmentsContainer.innerHTML = appointments.map((appointment, index) => {
        const status = getAppointmentStatus(appointment.date);
        return `
            <div class="appointment-card ${status.class}">
                <div class="appointment-header">
                    <div class="doctor-avatar">
                        <img src="${appointment.doctor.image}" alt="${appointment.doctor.name}">
                    </div>
                    <div class="appointment-info">
                        <h3>${appointment.doctor.name}</h3>
                        <p class="specialty"><i data-lucide="stethoscope"></i> ${appointment.doctor.specialty}</p>
                        <p class="facility"><i data-lucide="building-2"></i> ${appointment.doctor.facility}</p>
                    </div>
                    <span class="status-badge ${status.class}">${status.label}</span>
                </div>
                
                <div class="appointment-details">
                    <div class="detail-item">
                        <i data-lucide="calendar"></i>
                        <div>
                            <label>Date</label>
                            <span>${formatDate(appointment.date)}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i data-lucide="clock"></i>
                        <div>
                            <label>Time</label>
                            <span>${appointment.time}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i data-lucide="check-circle"></i>
                        <div>
                            <label>Booked On</label>
                            <span>${formatBookedDate(appointment.bookedAt)}</span>
                        </div>
                    </div>
                </div>
                
                <div class="appointment-actions">
                    ${status.status !== 'completed' ? `
                        <button class="reschedule-btn" onclick="rescheduleAppointment(${index})">
                            <i data-lucide="calendar-clock"></i>
                            <span>Reschedule</span>
                        </button>
                    ` : ''}
                    <button class="cancel-btn" onclick="cancelAppointment(${index})">
                        <i data-lucide="x-circle"></i>
                        <span>${status.status === 'completed' ? 'Remove' : 'Cancel'}</span>
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    lucide.createIcons();
}

// Cancel appointment
function cancelAppointment(index) {
    const appointments = getAppointments();
    const appointment = appointments[index];
    
    const confirmMsg = `Are you sure you want to cancel this appointment?\n\nDoctor: ${appointment.doctor.name}\nDate: ${formatDate(appointment.date)}\nTime: ${appointment.time}`;
    
    if (confirm(confirmMsg)) {
        appointments.splice(index, 1);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        renderAppointments();
        updateStats();
    }
}

// Reschedule appointment
function rescheduleAppointment(index) {
    const appointments = getAppointments();
    const appointment = appointments[index];
    
    // Store the doctor info and redirect to schedule page
    localStorage.setItem('selectedDoctor', JSON.stringify(appointment.doctor));
    
    // Remove old appointment
    appointments.splice(index, 1);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    // Redirect to schedule page
    window.location.href = 'schedule.html';
}

// Update statistics
function updateStats() {
    const appointments = getAppointments();
    const now = new Date();
    
    const total = appointments.length;
    const upcoming = appointments.filter(a => new Date(a.date) > now).length;
    const completed = appointments.filter(a => new Date(a.date) < now).length;
    
    document.getElementById('totalCount').textContent = total;
    document.getElementById('upcomingCount').textContent = upcoming;
    document.getElementById('completedCount').textContent = completed;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderAppointments();
    updateStats();
});
