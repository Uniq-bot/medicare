document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Smooth scroll for quick access cards
    const quickCards = document.querySelectorAll('.quick-card');
    quickCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = card.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Download form buttons
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const formTitle = button.closest('.form-card').querySelector('h3').textContent;
            alert(`Downloading ${formTitle}... PDF download will be available soon!`);
        });
    });
    
    // View guide buttons
    const viewGuideButtons = document.querySelectorAll('.view-guide-btn');
    viewGuideButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const guideTitle = button.closest('.guide-card').querySelector('h3').textContent;
            alert(`${guideTitle} will open soon. Check back for downloadable patient education guides!`);
        });
    });
    
    // Portal login and signup buttons
    const portalLoginBtn = document.querySelector('.portal-login-btn');
    if (portalLoginBtn) {
        portalLoginBtn.addEventListener('click', () => {
            alert('Patient portal login coming soon! You will be able to access your health records 24/7.');
        });
    }
    
    const portalSignupBtn = document.querySelector('.portal-signup-btn');
    if (portalSignupBtn) {
        portalSignupBtn.addEventListener('click', () => {
            alert('Patient portal signup will be available soon! Check back to create your account.');
        });
    }
    
    // Add scroll animation
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
    
    // Observe form cards
    const formCards = document.querySelectorAll('.form-card');
    formCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(card);
    });
    
    // Observe guide cards
    const guideCards = document.querySelectorAll('.guide-card');
    guideCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(card);
    });
});
