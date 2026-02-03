// Dummy doctors data with different facilities
const doctors = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        experience: "15 years",
        facility: "Heart Care Center",
        rating: 4.8,
        availability: "Mon, Wed, Fri",
        image: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=4CAF50&color=fff&size=150"
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Orthopedic Surgeon",
        experience: "12 years",
        facility: "Joint & Spine Clinic",
        rating: 4.9,
        availability: "Tue, Thu, Sat",
        image: "https://ui-avatars.com/api/?name=Michael+Chen&background=2c3e50&color=fff&size=150"
    },
    {
        id: 3,
        name: "Dr. Emily Rodriguez",
        specialty: "Pediatrician",
        experience: "10 years",
        facility: "Children's Health Center",
        rating: 4.7,
        availability: "Mon, Tue, Wed",
        image: "https://ui-avatars.com/api/?name=Emily+Rodriguez&background=e74c3c&color=fff&size=150"
    },
    {
        id: 4,
        name: "Dr. James Williams",
        specialty: "Neurologist",
        experience: "18 years",
        facility: "Brain & Nerve Institute",
        rating: 4.9,
        availability: "Wed, Thu, Fri",
        image: "https://ui-avatars.com/api/?name=James+Williams&background=3498db&color=fff&size=150"
    },
    {
        id: 5,
        name: "Dr. Aisha Patel",
        specialty: "Dermatologist",
        experience: "8 years",
        facility: "Skin Care Clinic",
        rating: 4.6,
        availability: "Mon, Wed, Sat",
        image: "https://ui-avatars.com/api/?name=Aisha+Patel&background=9b59b6&color=fff&size=150"
    },
    {
        id: 6,
        name: "Dr. Robert Brown",
        specialty: "General Surgeon",
        experience: "20 years",
        facility: "Central Surgery Hospital",
        rating: 4.8,
        availability: "Tue, Thu, Fri",
        image: "https://ui-avatars.com/api/?name=Robert+Brown&background=f39c12&color=fff&size=150"
    },
    {
        id: 7,
        name: "Dr. Lisa Thompson",
        specialty: "Gynecologist",
        experience: "14 years",
        facility: "Women's Health Center",
        rating: 4.7,
        availability: "Mon, Tue, Thu",
        image: "https://ui-avatars.com/api/?name=Lisa+Thompson&background=e91e63&color=fff&size=150"
    },
    {
        id: 8,
        name: "Dr. David Kim",
        specialty: "Ophthalmologist",
        experience: "11 years",
        facility: "Eye Care Institute",
        rating: 4.8,
        availability: "Wed, Fri, Sat",
        image: "https://ui-avatars.com/api/?name=David+Kim&background=00bcd4&color=fff&size=150"
    },
    {
        id: 9,
        name: "Dr. Maria Garcia",
        specialty: "Psychiatrist",
        experience: "13 years",
        facility: "Mental Health Center",
        rating: 4.9,
        availability: "Mon, Wed, Fri",
        image: "https://ui-avatars.com/api/?name=Maria+Garcia&background=795548&color=fff&size=150"
    },
    {
        id: 10,
        name: "Dr. Ahmed Hassan",
        specialty: "Dentist",
        experience: "9 years",
        facility: "Dental Care Clinic",
        rating: 4.7,
        availability: "Tue, Thu, Sat",
        image: "https://ui-avatars.com/api/?name=Ahmed+Hassan&background=607d8b&color=fff&size=150"
    }
];

// Function to render doctors
function renderDoctors(doctorsList = doctors) {
    const doctorsContainer = document.getElementById('doctorsGrid');
    
    if (doctorsList.length === 0) {
        doctorsContainer.innerHTML = '<p class="no-results">No doctors found matching your criteria.</p>';
        return;
    }
    
    doctorsContainer.innerHTML = doctorsList.map(doctor => `
        <div class="doctor-card">
            <img src="${doctor.image}" alt="${doctor.name}" class="doctor-image">
            <div class="doctor-info">
                <h3>${doctor.name}</h3>
                <p class="specialty"><i data-lucide="stethoscope"></i> ${doctor.specialty}</p>
                <p class="facility"><i data-lucide="building-2"></i> ${doctor.facility}</p>
                <p class="experience"><i data-lucide="award"></i> ${doctor.experience} experience</p>
                <p class="availability"><i data-lucide="calendar"></i> ${doctor.availability}</p>
                <div class="doctor-rating">
                    <i data-lucide="star"></i>
                    <span>${doctor.rating}</span>
                </div>
                <button class="book-btn" onclick="bookAppointment(${doctor.id})">
                    <i data-lucide="calendar-plus"></i>
                    <span>Book Appointment</span>
                </button>
            </div>
        </div>
    `).join('');
    
    // Reinitialize Lucide icons after rendering
    lucide.createIcons();
}

// Function to filter doctors by specialty
function filterDoctors(specialty) {
    if (specialty === 'all') {
        renderDoctors(doctors);
    } else {
        const filtered = doctors.filter(doctor => 
            doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
        );
        renderDoctors(filtered);
    }
}

// Function to search doctors
function searchDoctors(query) {
    const searchTerm = query.toLowerCase();
    const filtered = doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm) ||
        doctor.specialty.toLowerCase().includes(searchTerm) ||
        doctor.facility.toLowerCase().includes(searchTerm)
    );
    renderDoctors(filtered);
}

// Function to book appointment
function bookAppointment(doctorId) {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
        alert(`Booking appointment with ${doctor.name} (${doctor.specialty}). You will be redirected to the schedule page.`);
        // Store selected doctor in localStorage
        localStorage.setItem('selectedDoctor', JSON.stringify(doctor));
        // Redirect to schedule page
        window.location.href = 'schedule.html';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderDoctors();
    
    // Setup search functionality
    const searchInput = document.getElementById('searchDoctor');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchDoctors(e.target.value);
        });
    }
    
    // Setup filter functionality
    const filterSelect = document.getElementById('specialtyFilter');
    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            filterDoctors(e.target.value);
        });
    }
});