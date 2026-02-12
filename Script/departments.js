document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // CTA button functionality
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            alert('Thank you for your interest! Our facility tour booking system will be available soon.');
        });
    }
    
    // Smooth scroll for quick links would go here if we had internal navigation
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe department cards
    const departmentCards = document.querySelectorAll('.department-card');
    departmentCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe facility cards
    const facilityCards = document.querySelectorAll('.facility-card');
    facilityCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Hover effect for department cards
    departmentCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.department-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.department-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});
