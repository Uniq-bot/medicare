// Services page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize lucide icons
    lucide.createIcons();

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

    // Observe all sections
    const sections = document.querySelectorAll('.services-overview, .primary-services, .specialty-services, .preventive-care, .emergency-services, .pricing-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Service card hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.1)';
        });
    });

    // Pricing plan buttons
    const planButtons = document.querySelectorAll('.plan-btn');
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planName = this.closest('.pricing-card').querySelector('h3').textContent;
            alert(`You selected the ${planName} plan. This would typically redirect to a checkout page.`);
        });
    });

    // Specialty card animation
    const specialtyCards = document.querySelectorAll('.specialty-card');
    specialtyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        observer.observe(card);
    });

    // Learn More buttons
    const learnMoreButtons = document.querySelectorAll('.service-btn');
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceName = this.closest('.service-card').querySelector('h3').textContent;
            alert(`Learn more about ${serviceName}. This would typically show detailed information or redirect to a service page.`);
        });
    });
});
