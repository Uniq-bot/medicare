// About Us page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize lucide icons
    lucide.createIcons();

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
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
    const sections = document.querySelectorAll('.mission-section, .vision-section, .values-section, .team-section, .stats-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Animate stats counter
    const statCards = document.querySelectorAll('.stat-card h3');
    const animateCounter = (element) => {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const number = parseInt(target.replace(/[^0-9]/g, ''));
        let current = 0;
        const increment = number / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                if (isPercentage) {
                    element.textContent = Math.floor(current) + '%';
                } else if (number >= 1000) {
                    element.textContent = Math.floor(current).toLocaleString() + '+';
                } else {
                    element.textContent = Math.floor(current);
                }
            }
        }, 30);
    };

    // Observe stat cards for counter animation
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statCards.forEach(card => statObserver.observe(card));
});
