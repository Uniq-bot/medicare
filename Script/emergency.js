document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Button functionality for alternatives
    const findLocationBtns = document.querySelectorAll('.find-location-btn');
    findLocationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Urgent care location finder coming soon! Call (555) 123-4567 for nearest location.');
        });
    });
    
    const callBtns = document.querySelectorAll('.call-btn');
    callBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Calling nurse advice line... Feature coming soon!');
        });
    });
    
    const scheduleBtns = document.querySelectorAll('.schedule-btn');
    scheduleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Telemedicine scheduling coming soon! Book your virtual visit online.');
        });
    });
    
    // Simulate wait time updates
    function updateWaitTime() {
        const timeDisplay = document.querySelector('.time');
        if (timeDisplay) {
            const currentMinutes = parseInt(timeDisplay.textContent);
            // Randomly fluctuate wait time by ±5 minutes
            const change = Math.floor(Math.random() * 11) - 5;
            const newTime = Math.max(10, Math.min(60, currentMinutes + change));
            timeDisplay.textContent = `${newTime} mins`;
            
            const lastUpdated = document.querySelector('.wait-time-card p');
            if (lastUpdated) {
                lastUpdated.textContent = 'Last updated: Just now';
            }
        }
    }
    
    // Update wait time every 2 minutes
    setInterval(updateWaitTime, 120000);
    
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
    
    // Observe symptom cards
    const symptomCards = document.querySelectorAll('.symptom-card');
    symptomCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(card);
    });
    
    // Pulse animation for emergency banner
    const alertBanner = document.querySelector('.alert-banner');
    if (alertBanner) {
        setInterval(() => {
            alertBanner.style.transform = 'scale(1.02)';
            setTimeout(() => {
                alertBanner.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
        alertBanner.style.transition = 'transform 0.2s ease';
    }
});
