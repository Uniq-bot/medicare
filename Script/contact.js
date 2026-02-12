// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize lucide icons
    lucide.createIcons();

    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            category: document.getElementById('category').value,
            message: document.getElementById('message').value
        };

        // Here you would normally send the data to a server
        console.log('Form submitted:', formData);

        // Show success message
        contactForm.style.display = 'none';
        formSuccess.style.display = 'flex';

        // Reset form after 5 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'flex';
            formSuccess.style.display = 'none';
            lucide.createIcons();
        }, 5000);
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('.contact-info, .contact-form-section, .map-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Form validation
    const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#28a745';
            }
        });

        input.addEventListener('input', function() {
            if (this.value) {
                this.style.borderColor = '#28a745';
            }
        });
    });
});
