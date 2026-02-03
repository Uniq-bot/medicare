// Get selected doctor from localStorage
const selectedDoctor = JSON.parse(localStorage.getItem('selectedDoctor'));

// Calendar state
let currentDate = new Date();
let selectedDate = null;
let selectedTimeSlot = null;

// Time slots available
const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
];

// Function to render doctor info
function renderDoctorInfo() {
    const doctorInfoContainer = document.getElementById('doctorInfo');
    
    if (!selectedDoctor) {
        doctorInfoContainer.innerHTML = `
            <div class="no-doctor">
                <i data-lucide="alert-circle"></i>
                <p>No doctor selected. Please select a doctor from the <a href="doctors.html">Doctors page</a>.</p>
            </div>
        `;
        document.getElementById('scheduleSection').style.display = 'none';
        return;
    }
    
    doctorInfoContainer.innerHTML = `
        <div class="doctor-details">
            <img src="${selectedDoctor.image}" alt="${selectedDoctor.name}" class="doctor-img">
            <div class="doctor-text">
                <h2>${selectedDoctor.name}</h2>
                <p class="specialty"><i data-lucide="stethoscope"></i> ${selectedDoctor.specialty}</p>
                <p class="facility"><i data-lucide="building-2"></i> ${selectedDoctor.facility}</p>
                <p class="availability"><i data-lucide="calendar"></i> Available: ${selectedDoctor.availability}</p>
            </div>
        </div>
    `;
    
    lucide.createIcons();
}

// Function to render calendar
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update month/year display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Create calendar grid
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Add days of month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;
        
        const cellDate = new Date(year, month, day);
        
        // Disable past dates
        if (cellDate < today.setHours(0, 0, 0, 0)) {
            dayCell.classList.add('disabled');
        } else {
            // Mark today
            if (cellDate.toDateString() === new Date().toDateString()) {
                dayCell.classList.add('today');
            }
            
            // Mark selected date
            if (selectedDate && cellDate.toDateString() === selectedDate.toDateString()) {
                dayCell.classList.add('selected');
            }
            
            // Add click handler
            dayCell.addEventListener('click', () => selectDate(cellDate, dayCell));
        }
        
        calendarGrid.appendChild(dayCell);
    }
}

// Function to select a date
function selectDate(date, element) {
    selectedDate = date;
    selectedTimeSlot = null;
    
    // Update UI
    document.querySelectorAll('.calendar-day').forEach(day => day.classList.remove('selected'));
    element.classList.add('selected');
    
    renderTimeSlots();
}

// Function to render time slots
function renderTimeSlots() {
    const timeSlotsContainer = document.getElementById('timeSlots');
    
    if (!selectedDate) {
        timeSlotsContainer.innerHTML = '<p class="select-date-msg">Please select a date first</p>';
        return;
    }
    
    timeSlotsContainer.innerHTML = `
        <h3>Available Time Slots for ${selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })}</h3>
        <div class="slots-grid">
            ${timeSlots.map(slot => `
                <button class="time-slot" onclick="selectTimeSlot('${slot}', this)">
                    <i data-lucide="clock"></i>
                    <span>${slot}</span>
                </button>
            `).join('')}
        </div>
    `;
    
    lucide.createIcons();
}

// Function to select time slot
function selectTimeSlot(slot, element) {
    selectedTimeSlot = slot;
    
    // Update UI
    document.querySelectorAll('.time-slot').forEach(btn => btn.classList.remove('selected'));
    element.classList.add('selected');
    
    // Enable confirm button
    document.getElementById('confirmBtn').disabled = false;
}

// Function to confirm appointment
function confirmAppointment() {
    if (!selectedDate || !selectedTimeSlot || !selectedDoctor) {
        alert('Please select a date and time slot');
        return;
    }
    
    const appointment = {
        doctor: selectedDoctor,
        date: selectedDate.toISOString(),
        time: selectedTimeSlot,
        bookedAt: new Date().toISOString()
    };
    
    // Get existing appointments
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    alert(`Appointment confirmed!\n\nDoctor: ${selectedDoctor.name}\nDate: ${selectedDate.toLocaleDateString()}\nTime: ${selectedTimeSlot}`);
    localStorage.removeItem('selectedDoctor');
    // Redirect to appointments page
    window.location.href = 'myappointment.html';
}

// Navigation functions
function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderDoctorInfo();
    renderCalendar();
    renderTimeSlots();
});
