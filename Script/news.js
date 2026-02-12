document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Tab filtering functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const newsCards = document.querySelectorAll('.news-card');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const tab = button.getAttribute('data-tab');
            
            // Filter news cards
            newsCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (tab === 'all' || category === tab) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
    
    // Featured read more button
    const featuredReadBtn = document.querySelector('.featured-content .read-more-btn');
    if (featuredReadBtn) {
        featuredReadBtn.addEventListener('click', () => {
            alert('Full story coming soon! Check our blog for detailed articles.');
        });
    }
    
    // News card read more links
    const readLinks = document.querySelectorAll('.read-link');
    readLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Full article coming soon! Stay tuned for more updates.');
        });
    });
    
    // Event registration buttons
    const registerButtons = document.querySelectorAll('.register-btn');
    registerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const eventTitle = button.closest('.event-item').querySelector('h3').textContent;
            alert(`Thank you for your interest in "${eventTitle}"! Registration will open soon.`);
        });
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our latest news and event updates.`);
            newsletterForm.reset();
        });
    }
    
    // Social media links
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = button.querySelector('span').textContent;
            alert(`Follow us on ${platform}! Social media links coming soon.`);
        });
    });
    
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
    
    newsCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(card);
    });
    
    // Observe event items
    const eventItems = document.querySelectorAll('.event-item');
    eventItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
});
