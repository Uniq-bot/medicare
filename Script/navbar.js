const sidebar = document.getElementById('sidebar');

sidebar.innerHTML = `
    <div class="sidebar-header">
        <h2>
        <a class="sidebar-link" href="index.html" id="medicareLink">MediCare</a>
        </h2>
    </div>
    <nav class="sidebar-nav">
        <a href="dashboard.html" class="sidebar-link">
            <span class="icon"><i data-lucide="layout-dashboard"></i></span>
            <span>Dashboard</span>
        </a>
        <a href="schedule.html" class="sidebar-link">
            <span class="icon"><i data-lucide="calendar"></i></span>
            <span>Schedule</span>
        </a>
        <a href="myappointment.html" class="sidebar-link">
            <span class="icon"><i data-lucide="clipboard-list"></i></span>
            <span>My Appointment</span>
        </a>
        <a href="doctors.html" class="sidebar-link">
            <span class="icon"><i data-lucide="stethoscope"></i></span>
            <span>Doctors</span>
        </a>
        <a href="profile.html" class="sidebar-link">
            <span class="icon"><i data-lucide="user"></i></span>
            <span>Profile</span>
        </a>
    </nav>
`;

// Get current page filename
const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';

// Add active class to current page link
const sidebarLinks = document.querySelectorAll('.sidebar-link');
sidebarLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});

// Initialize Lucide icons
lucide.createIcons();