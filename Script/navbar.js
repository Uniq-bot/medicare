const sidebar = document.getElementById('sidebar');

sidebar.innerHTML = `
    <div class="sidebar-header">
        <h2>
        <a class="sidebar-link" href="../index.html" id="medicareLink">MediCare</a>
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
        <div style="border-top: 1px solid #4a5a6a; margin: 1rem 0;"></div>
        <a href="aboutus.html" class="sidebar-link">
            <span class="icon"><i data-lucide="info"></i></span>
            <span>About Us</span>
        </a>
        <a href="services.html" class="sidebar-link">
            <span class="icon"><i data-lucide="briefcase"></i></span>
            <span>Services</span>
        </a>
        <a href="portfolio.html" class="sidebar-link">
            <span class="icon"><i data-lucide="folder"></i></span>
            <span>Portfolio</span>
        </a>
        <a href="contact.html" class="sidebar-link">
            <span class="icon"><i data-lucide="mail"></i></span>
            <span>Contact</span>
        </a>
        <a href="faq.html" class="sidebar-link">
            <span class="icon"><i data-lucide="help-circle"></i></span>
            <span>FAQ</span>
        </a>
        <a href="testimonials.html" class="sidebar-link">
            <span class="icon"><i data-lucide="star"></i></span>
            <span>Testimonials</span>
        </a>
        <a href="blog.html" class="sidebar-link">
            <span class="icon"><i data-lucide="book-open"></i></span>
            <span>Health Blog</span>
        </a>
        <a href="departments.html" class="sidebar-link">
            <span class="icon"><i data-lucide="building-2"></i></span>
            <span>Departments</span>
        </a>
        <a href="insurance.html" class="sidebar-link">
            <span class="icon"><i data-lucide="shield-check"></i></span>
            <span>Insurance</span>
        </a>
        <a href="careers.html" class="sidebar-link">
            <span class="icon"><i data-lucide="briefcase-business"></i></span>
            <span>Careers</span>
        </a>
        <a href="research.html" class="sidebar-link">
            <span class="icon"><i data-lucide="microscope"></i></span>
            <span>Research</span>
        </a>
        <a href="patient-resources.html" class="sidebar-link">
            <span class="icon"><i data-lucide="file-text"></i></span>
            <span>Patient Resources</span>
        </a>
        <a href="emergency.html" class="sidebar-link">
            <span class="icon"><i data-lucide="siren"></i></span>
            <span>Emergency</span>
        </a>
        <a href="news.html" class="sidebar-link">
            <span class="icon"><i data-lucide="newspaper"></i></span>
            <span>News & Events</span>
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