// Get user data
function getUserData() {
    return JSON.parse(localStorage.getItem('user') || '{}');
}

// Get appointments
function getAppointments() {
    return JSON.parse(localStorage.getItem('appointments') || '[]');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
}

// Format time with date
function formatDateTime(dateString, time) {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
        return `Today at ${time}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
        return `Tomorrow at ${time}`;
    } else {
        return `${formatDate(dateString)} at ${time}`;
    }
}

// Render welcome section
function renderWelcome() {
    const user = getUserData();
    const welcomeSection = document.getElementById('welcomeSection');
    
    const currentHour = new Date().getHours();
    let greeting = 'Good Evening';
    if (currentHour < 12) greeting = 'Good Morning';
    else if (currentHour < 18) greeting = 'Good Afternoon';
    
    welcomeSection.innerHTML = `
        <div class="welcome-content">
            <h1>${greeting}, ${user.name || 'User'}!</h1>
            <p>Here's your health overview for today</p>
        </div>
        <div class="welcome-icon">
            <i data-lucide="activity"></i>
        </div>
    `;
    
    lucide.createIcons();
}

// Render statistics
function renderStats() {
    const appointments = getAppointments();
    const now = new Date();
    
    const upcoming = appointments.filter(a => new Date(a.date) >= now).length;
    const completed = appointments.filter(a => new Date(a.date) < now).length;
    const total = appointments.length;
    
    // Calculate next appointment
    const nextAppointment = appointments
        .filter(a => new Date(a.date) >= now)
        .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
    
    let nextApptText = 'None scheduled';
    if (nextAppointment) {
        const daysUntil = Math.ceil((new Date(nextAppointment.date) - now) / (1000 * 60 * 60 * 24));
        nextApptText = daysUntil === 0 ? 'Today' : `In ${daysUntil} day${daysUntil > 1 ? 's' : ''}`;
    }
    
    document.getElementById('upcomingCount').textContent = upcoming;
    document.getElementById('completedCount').textContent = completed;
    document.getElementById('totalCount').textContent = total;
    document.getElementById('nextAppt').textContent = nextApptText;
}

// Render upcoming appointments
function renderUpcomingAppointments() {
    const appointments = getAppointments();
    const now = new Date();
    const upcomingAppts = appointments
        .filter(a => new Date(a.date) >= now)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);
    
    const container = document.getElementById('upcomingAppointments');
    
    if (upcomingAppts.length === 0) {
        container.innerHTML = `
            <div class="no-upcoming">
                <i data-lucide="calendar-x"></i>
                <p>No upcoming appointments</p>
                <a href="doctors.html" class="book-link">Book an appointment</a>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    container.innerHTML = upcomingAppts.map(appt => `
        <div class="upcoming-card">
            <div class="upcoming-date">
                <div class="date-number">${new Date(appt.date).getDate()}</div>
                <div class="date-month">${new Date(appt.date).toLocaleDateString('en-US', { month: 'short' })}</div>
            </div>
            <div class="upcoming-info">
                <h4>${appt.doctor.name}</h4>
                <p><i data-lucide="stethoscope"></i> ${appt.doctor.specialty}</p>
                <p class="time"><i data-lucide="clock"></i> ${appt.time}</p>
            </div>
            <div class="upcoming-actions">
                <button class="view-btn" onclick="window.location.href='myappointment.html'">
                    <i data-lucide="eye"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// Render recent activity
function renderRecentActivity() {
    const appointments = getAppointments();
    const recentAppts = appointments
        .sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt))
        .slice(0, 5);
    
    const container = document.getElementById('recentActivity');
    
    if (recentAppts.length === 0) {
        container.innerHTML = `
            <div class="no-activity">
                <i data-lucide="inbox"></i>
                <p>No recent activity</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    container.innerHTML = recentAppts.map(appt => {
        const isPast = new Date(appt.date) < new Date();
        return `
            <div class="activity-item">
                <div class="activity-icon ${isPast ? 'completed' : 'upcoming'}">
                    <i data-lucide="${isPast ? 'check-circle' : 'calendar-clock'}"></i>
                </div>
                <div class="activity-content">
                    <p class="activity-title">${isPast ? 'Completed' : 'Booked'} appointment with ${appt.doctor.name}</p>
                    <p class="activity-time">${formatDateTime(appt.date, appt.time)}</p>
                </div>
            </div>
        `;
    }).join('');
    
    lucide.createIcons();
}

// Render quick actions
function renderQuickActions() {
    const quickActionsContainer = document.getElementById('quickActions');
    
    quickActionsContainer.innerHTML = `
        <a href="doctors.html" class="quick-action-card">
            <div class="action-icon" style="background: #e8f5e9;">
                <i data-lucide="user-plus" style="color: #4CAF50;"></i>
            </div>
            <h3>Find Doctor</h3>
            <p>Search and book appointments</p>
        </a>
        <a href="schedule.html" class="quick-action-card">
            <div class="action-icon" style="background: #e3f2fd;">
                <i data-lucide="calendar-plus" style="color: #2196F3;"></i>
            </div>
            <h3>Schedule</h3>
            <p>Book a new appointment</p>
        </a>
        <a href="myappointment.html" class="quick-action-card">
            <div class="action-icon" style="background: #fff3e0;">
                <i data-lucide="list-checks" style="color: #FF9800;"></i>
            </div>
            <h3>My Appointments</h3>
            <p>View all appointments</p>
        </a>
        <a href="profile.html" class="quick-action-card">
            <div class="action-icon" style="background: #f3e5f5;">
                <i data-lucide="settings" style="color: #9C27B0;"></i>
            </div>
            <h3>Profile</h3>
            <p>Manage your profile</p>
        </a>
    `;
    
    lucide.createIcons();
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    renderWelcome();
    renderStats();
    renderUpcomingAppointments();
    renderRecentActivity();
    renderQuickActions();
});
