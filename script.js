// Smooth fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const experienceCards = document.querySelectorAll('.experience-card');

function filterExperiences(filterValue) {
    experienceCards.forEach(card => {
        const cardType = card.getAttribute('data-type');
        
        if (filterValue === 'all' || cardType === filterValue) {
            card.style.display = 'grid';
            card.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add click event listeners to filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value and apply filter
        const filterValue = button.getAttribute('data-filter');
        filterExperiences(filterValue);
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(13, 17, 23, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        nav.style.borderBottom = '1px solid rgba(39, 174, 96, 0.25)';
    } else {
        nav.style.background = 'rgba(13, 17, 23, 0.95)';
        nav.style.boxShadow = 'none';
        nav.style.borderBottom = '1px solid rgba(39, 174, 96, 0.15)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add loading states for images
document.querySelectorAll('.experience-image img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
        // Show placeholder when image fails to load
        const placeholder = this.nextElementSibling;
        if (placeholder && placeholder.classList.contains('image-placeholder')) {
            placeholder.style.display = 'block';
        }
        this.style.display = 'none';
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements that should animate
    const animatedElements = [
        '.experience-card',
        '.reflection-card',
        '.intro-section',
        '.experience-category'
    ];
    
    animatedElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    });
    
    // Set initial filter state
    filterExperiences('all');
});

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Enhanced mobile menu (if needed later)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Print functionality (for academic purposes)
function printExperienceLog() {
    window.print();
}

// Export to PDF functionality (basic implementation)
function exportToPDF() {
    // This would require a library like jsPDF or html2pdf
    // For now, we'll just trigger print dialog
    window.print();
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or overlays
        document.querySelectorAll('.modal, .overlay').forEach(el => {
            el.style.display = 'none';
        });
    }
});