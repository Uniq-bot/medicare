// FAQ page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize lucide icons
    lucide.createIcons();

    const categoryButtons = document.querySelectorAll('.category-btn');
    const faqSections = document.querySelectorAll('.faq-section');
    const faqItems = document.querySelectorAll('.faq-item');
    const searchInput = document.getElementById('faqSearch');

    // Category filter functionality
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Show/hide sections based on category
            faqSections.forEach(section => {
                const sectionCategory = section.getAttribute('data-category');
                
                if (category === 'all' || sectionCategory === category) {
                    section.classList.remove('hidden');
                    section.style.animation = 'fadeIn 0.5s ease';
                } else {
                    section.classList.add('hidden');
                }
            });
        });
    });

    // FAQ accordion functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            // Recreate icons to ensure chevron rotates
            lucide.createIcons();
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
                
                // Highlight search term
                if (searchTerm && searchTerm.length > 2) {
                    item.classList.add('highlight');
                } else {
                    item.classList.remove('highlight');
                }
            } else {
                item.style.display = 'none';
            }
        });

        // Show all sections if searching
        if (searchTerm) {
            faqSections.forEach(section => {
                section.classList.remove('hidden');
            });
        }
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
    faqSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Add fadeIn animation and highlight styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .faq-item.highlight {
        border-color: #4CAF50;
        box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
    }
`;
document.head.appendChild(style);
