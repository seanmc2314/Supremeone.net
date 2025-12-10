// Main JavaScript for Supreme One Website

// ============================================
// SCRAPE PROTECTION - Basic anti-scraping measures
// ============================================

// Disable right-click context menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Disable text selection
document.addEventListener('selectstart', function(e) {
    // Allow selection in input fields and textareas
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return true;
    }
    e.preventDefault();
    return false;
});

// Disable copy
document.addEventListener('copy', function(e) {
    // Allow copy in input fields and textareas
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return true;
    }
    e.preventDefault();
    return false;
});

// Disable keyboard shortcuts for viewing source/dev tools
document.addEventListener('keydown', function(e) {
    // Ctrl+U (view source)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+I (dev tools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+J (console)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+C (inspect element)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
    }
    // F12 (dev tools)
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    // Ctrl+S (save page)
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
    }
});

// Disable drag
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
});

// Console warning
console.log('%c⚠️ WARNING', 'color: red; font-size: 40px; font-weight: bold;');
console.log('%cThis is a protected website. Unauthorized scraping or copying of content is prohibited.', 'color: red; font-size: 16px;');
console.log('%c© 2025 Supreme One. All rights reserved. Patent Pending.', 'font-size: 14px;');

// ============================================
// END SCRAPE PROTECTION
// ============================================

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;

    if (mobileMenuToggle && navMenu) {
        // Toggle mobile menu
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';

            // Change hamburger icon
            const icon = this.textContent === '☰' ? '✕' : '☰';
            this.textContent = icon;
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
                body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
                body.style.overflow = '';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const navbarHeight = document.getElementById('navbar').offsetHeight;

                window.scrollTo({
                    top: target.offsetTop - navbarHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
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

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Animated counters for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateStats = () => {
        if (hasAnimated) return;

        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible) {
            hasAnimated = true;
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const hasPercent = text.includes('%');
                const hasDollar = text.includes('$');
                const hasPlus = text.includes('+');
                const hasSlash = text.includes('/');

                if (hasSlash) {
                    // For "24/7" type stats, just animate in
                    stat.style.opacity = '0';
                    setTimeout(() => {
                        stat.style.transition = 'opacity 0.5s ease-in';
                        stat.style.opacity = '1';
                    }, 100);
                } else {
                    // Extract number
                    let numStr = text.replace(/[^0-9.]/g, '');
                    let targetNum = parseFloat(numStr);

                    if (isNaN(targetNum)) return;

                    let currentNum = 0;
                    const increment = targetNum / 50;
                    const duration = 2000;
                    const stepTime = duration / 50;

                    stat.textContent = '0';

                    const counter = setInterval(() => {
                        currentNum += increment;
                        if (currentNum >= targetNum) {
                            currentNum = targetNum;
                            clearInterval(counter);
                        }

                        let displayNum = Math.floor(currentNum);
                        let displayText = displayNum.toString();

                        if (hasDollar) {
                            displayText = '$' + displayNum + 'K';
                        } else if (hasPercent) {
                            displayText = displayNum + '%';
                        }

                        if (hasPlus && currentNum >= targetNum) {
                            displayText += '+';
                        }

                        stat.textContent = displayText;
                    }, stepTime);
                }
            });
        }
    };

    window.addEventListener('scroll', animateStats);
    animateStats(); // Check on load

    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function highlightNavigation() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Form validation and submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Basic validation
            let isValid = true;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (data.email && !emailRegex.test(data.email)) {
                alert('Please enter a valid email address');
                isValid = false;
                return;
            }

            if (data.phone && !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(data.phone)) {
                alert('Please enter a valid phone number');
                isValid = false;
                return;
            }

            if (isValid) {
                // Show success message
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = '✓ Sent!';
                    form.reset();

                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 2000);

                    // Show success notification
                    showNotification('Thank you! We\'ll be in touch shortly.', 'success');
                }, 1000);
            }
        });
    });

    // Notification system
    window.showNotification = function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 2rem;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#dc2626' : '#1e40af'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    };

    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        @media (max-width: 768px) {
            .nav-menu.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                padding: 1rem;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            }
        }
    `;
    document.head.appendChild(style);

    // Video play on hover for preview sections
    const previewVideos = document.querySelectorAll('.preview-video');
    previewVideos.forEach(video => {
        video.addEventListener('mouseenter', function() {
            this.play();
        });
        video.addEventListener('mouseleave', function() {
            this.pause();
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Copy to clipboard functionality
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Failed to copy', 'error');
        });
    };

    // Print page functionality
    window.printPage = function() {
        window.print();
    };

    // Share functionality
    window.sharePage = async function() {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    text: 'Check out Supreme One Training Program',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share failed:', err);
            }
        } else {
            copyToClipboard(window.location.href);
        }
    };

    console.log('Supreme One website initialized');
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance monitoring
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            console.log('Performance:', entry.name, entry.startTime);
        }
    });

    perfObserver.observe({ entryTypes: ['navigation', 'resource'] });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});
