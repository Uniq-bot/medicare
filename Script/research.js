document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Learn more button functionality for clinical trials
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn:not(.disabled)');
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const trialTitle = button.closest('.trial-card').querySelector('h3').textContent;
            alert(`For more information about "${trialTitle}", please contact our research department at research@medicare.com or call (555) 123-4567.`);
        });
    });
    
    // Contact research button
    const contactResearchBtn = document.querySelector('.contact-research-btn');
    if (contactResearchBtn) {
        contactResearchBtn.addEventListener('click', () => {
            alert('Thank you for your interest in collaboration! Please email research@medicare.com with your proposal.');
        });
    }
    
    // Read article links
    const readLinks = document.querySelectorAll('.read-link');
    readLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Full publication access coming soon! Contact our library for current access.');
        });
    });
    
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
    
    // Observe area cards
    const areaCards = document.querySelectorAll('.area-card');
    areaCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe trial cards
    const trialCards = document.querySelectorAll('.trial-card');
    trialCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe publication cards
    const publicationCards = document.querySelectorAll('.publication-card');
    publicationCards.forEach(card => {
        observer.observe(card);
    });
});
