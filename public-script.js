// ========================================
// NAVIGATION & MOBILE MENU
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translateY(10px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-10px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        const spans = mobileMenuToggle.querySelectorAll('span');
                        spans.forEach(span => {
                            span.style.transform = '';
                            span.style.opacity = '';
                        });
                    }

                    // Update active link
                    updateActiveLink(this);
                }
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;

            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });

        // Add shadow to navbar on scroll
        const navbar = document.querySelector('.navbar');
        if (window.pageYOffset > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            navbar.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
        }
    });

    function updateActiveLink(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
});

// ========================================
// CONTACT FORM HANDLING
// ========================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            industry: document.getElementById('industry').value,
            message: document.getElementById('message').value
        };

        // In a real application, this would send to a backend
        console.log('Form submitted:', formData);

        // Show success message
        showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');

        // Reset form
        contactForm.reset();
    });
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    // Add animation
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
    `;
    document.head.appendChild(style);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and sections
    const animatedElements = document.querySelectorAll('.service-card, .benefit-card, .industry-card, .testimonial-card, .sustainability-feature, .pricing-tier');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Initialize scroll animations when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

// ========================================
// DYNAMIC STATS COUNTER ANIMATION
// ========================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));

                if (!isNaN(number)) {
                    statNumber.textContent = '0';
                    animateCounter(statNumber, number);

                    // Add any non-numeric suffix back
                    if (text.includes('%')) {
                        setTimeout(() => {
                            statNumber.textContent += '%';
                        }, 2000);
                    } else if (text.includes('+')) {
                        setTimeout(() => {
                            statNumber.textContent += '+';
                        }, 2000);
                    } else if (text.includes('/')) {
                        setTimeout(() => {
                            const parts = text.split('/');
                            statNumber.textContent = parts[0] + '/' + parts[1];
                        }, 2000);
                    }
                }

                entry.target.dataset.animated = 'true';
            }
        }
    });
}, { threshold: 0.5 });

// Observe stat items
document.querySelectorAll('.stat-item, .sustainability-stat, .about-stat').forEach(stat => {
    statsObserver.observe(stat);
});

// ========================================
// SERVICE CARD INTERACTIONS
// ========================================

const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================================
// PRICING TIER INTERACTIONS
// ========================================

const pricingTiers = document.querySelectorAll('.pricing-tier:not(.featured)');
pricingTiers.forEach(tier => {
    tier.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    });

    tier.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    });
});

// ========================================
// INDUSTRY CAROUSEL
// ========================================

function initIndustryCarousel() {
    const track = document.querySelector('.industries-track');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');

    if (!track || !prevBtn || !nextBtn) return;

    let scrollAmount = 0;
    const cardWidth = 280 + 32; // card width + gap

    // Manual navigation
    nextBtn.addEventListener('click', () => {
        scrollAmount += cardWidth * 2;
        smoothScroll(scrollAmount);
    });

    prevBtn.addEventListener('click', () => {
        scrollAmount -= cardWidth * 2;
        smoothScroll(scrollAmount);
    });

    function smoothScroll(amount) {
        track.style.animation = 'none';
        track.style.transform = `translateX(-${amount}px)`;

        // Resume animation after manual scroll
        setTimeout(() => {
            track.style.animation = 'scroll-horizontal 30s linear infinite';
        }, 500);
    }

    // Pause on hover
    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });

    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });

    // Click events for industry cards
    const industryCards = document.querySelectorAll('.industry-card');
    industryCards.forEach(card => {
        card.addEventListener('click', function() {
            const industryName = this.querySelector('h3').textContent;
            showNotification(`Learn more about our ${industryName} solutions by starting your journey!`, 'info');

            setTimeout(() => {
                const ctaSection = document.querySelector('.cta-section');
                if (ctaSection) {
                    ctaSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 2000);
        });
    });
}

// Initialize carousel
if (document.querySelector('.industries-carousel')) {
    initIndustryCarousel();
}

// ========================================
// TESTIMONIAL ROTATION (Optional Enhancement)
// ========================================

function rotateTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length === 0) return;

    let currentIndex = 0;

    // Add featured class to first testimonial
    testimonials[0].style.border = '2px solid #10b981';

    setInterval(() => {
        // Remove featured style from current
        testimonials[currentIndex].style.border = '';

        // Move to next testimonial
        currentIndex = (currentIndex + 1) % testimonials.length;

        // Add featured style to new current
        testimonials[currentIndex].style.border = '2px solid #10b981';

        // Scroll to testimonial on mobile
        if (window.innerWidth < 768) {
            testimonials[currentIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }, 5000);
}

// Initialize testimonial rotation
rotateTestimonials();

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy load images if any are added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ========================================
// ANALYTICS TRACKING (Ready for integration)
// ========================================

function trackEvent(category, action, label) {
    // Ready for Google Analytics or other tracking
    console.log('Event tracked:', { category, action, label });

    // Example: gtag('event', action, { 'event_category': category, 'event_label': label });
}

// Track CTA clicks
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        trackEvent('CTA', 'Click', buttonText);
    });
});

// Track form submissions
if (contactForm) {
    contactForm.addEventListener('submit', function() {
        trackEvent('Form', 'Submit', 'Contact Form');
    });
}

// Track industry card clicks
industryCards.forEach(card => {
    card.addEventListener('click', function() {
        const industryName = this.querySelector('h3').textContent;
        trackEvent('Industry', 'Click', industryName);
    });
});

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Add keyboard navigation for cards
document.querySelectorAll('.service-card, .industry-card').forEach(card => {
    card.setAttribute('tabindex', '0');

    card.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// Focus visible styles
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// Add focus visible styles
const style = document.createElement('style');
style.textContent = `
    .keyboard-nav *:focus {
        outline: 3px solid #10b981;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// ========================================
// INTERACTIVE PRICING CALCULATOR
// ========================================

function initPricingCalculator() {
    const checkboxes = document.querySelectorAll('.service-checkbox input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updatePricing);
    });
}

function updatePricing() {
    const checkboxes = document.querySelectorAll('.service-checkbox input[type="checkbox"]:checked');
    let selectedCount = checkboxes.length;

    // Service name mapping
    const serviceNames = {
        'landscaping': { name: 'Landscaping & Grounds', icon: '🌳' },
        'plants': { name: 'Indoor Plants', icon: '🪴' },
        'coffee': { name: 'Coffee & Water', icon: '☕' },
        'amenities': { name: 'Custom Amenities', icon: '🧴' },
        'laundry': { name: 'Commercial Laundry', icon: '🧺' },
        'garments': { name: 'Garment Rental', icon: '👔' }
    };

    // Update selected services list
    const selectedServicesContainer = document.getElementById('selected-services-items');
    if (selectedCount > 0) {
        const selectedServices = Array.from(checkboxes).map(checkbox => {
            const serviceValue = checkbox.value;
            const service = serviceNames[serviceValue];
            return `
                <div class="service-tag">
                    <span class="service-tag-icon">${service.icon}</span>
                    <span class="service-tag-name">${service.name}</span>
                </div>
            `;
        }).join('');
        selectedServicesContainer.innerHTML = selectedServices;
    } else {
        selectedServicesContainer.innerHTML = '<p class="no-services">No services selected yet</p>';
    }

    // Calculate tier
    let tierName = '-';
    let tierClass = '';
    let savingsLevel = 'Standard';
    let benefits = [];

    if (selectedCount >= 6) {
        tierName = 'Platinum Partner';
        tierClass = 'platinum';
        savingsLevel = 'Maximum Benefits';
        benefits = [
            '✓ Priority scheduling across all services',
            '✓ Dedicated account manager',
            '✓ Quarterly business reviews',
            '✓ Maximum bundle savings',
            '✓ VIP customer support',
            '✓ Free sustainability reports',
            '✓ Strategic partnership status',
            '✓ Co-branded marketing opportunities'
        ];
    } else if (selectedCount >= 4) {
        tierName = 'Gold Partner';
        tierClass = 'gold';
        savingsLevel = 'Premium Benefits';
        benefits = [
            '✓ Priority scheduling',
            '✓ Dedicated account manager',
            '✓ Quarterly business reviews',
            '✓ Premium bundle savings',
            '✓ Priority customer support',
            '✓ Sustainability impact reports'
        ];
    } else if (selectedCount >= 2) {
        tierName = 'Silver Partner';
        tierClass = 'silver';
        savingsLevel = 'Enhanced Benefits';
        benefits = [
            '✓ Coordinated scheduling',
            '✓ Single point of contact',
            '✓ Bundle savings',
            '✓ Enhanced customer support',
            '✓ Basic sustainability tracking'
        ];
    } else if (selectedCount === 1) {
        tierName = 'Bronze Partner';
        tierClass = 'bronze';
        savingsLevel = 'Entry Level';
        benefits = [
            '✓ Standard scheduling',
            '✓ Customer support',
            '✓ Service quality guarantee',
            '✓ Flexible service times'
        ];
    } else {
        benefits = ['Select services to see your benefits'];
    }

    // Update UI with animations
    const selectedCountElement = document.getElementById('selected-count');
    const tierNameElement = document.getElementById('tier-name');
    const discountElement = document.getElementById('discount-percent');

    if (selectedCountElement) {
        selectedCountElement.style.transition = 'all 0.3s ease';
        selectedCountElement.style.transform = 'scale(1.3)';
        selectedCountElement.style.color = 'var(--primary-green)';
        selectedCountElement.textContent = selectedCount;

        setTimeout(() => {
            selectedCountElement.style.transform = 'scale(1)';
            selectedCountElement.style.color = '';
        }, 300);
    }

    if (tierNameElement) {
        tierNameElement.textContent = tierName;
    }

    if (discountElement) {
        discountElement.textContent = savingsLevel;
    }

    // Update benefits list
    const benefitItems = document.getElementById('benefit-items');
    benefitItems.innerHTML = benefits.map(benefit => `<li>${benefit}</li>`).join('');

    // Animate the results with more noticeable effect
    const resultCard = document.querySelector('.result-card');
    if (resultCard) {
        resultCard.style.transition = 'all 0.3s ease';
        resultCard.style.transform = 'scale(1.03)';
        resultCard.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.3)';

        setTimeout(() => {
            resultCard.style.transform = 'scale(1)';
            resultCard.style.boxShadow = '';
        }, 300);
    }

    // Update tier display with color coding
    const tierNameElement = document.getElementById('tier-name');
    if (tierNameElement) {
        tierNameElement.style.transition = 'all 0.3s ease';
        tierNameElement.style.color = getTierColor(tierClass);
        tierNameElement.style.fontWeight = '700';
    }

    // Highlight matching tier in pricing section
    highlightMatchingTier(tierClass);
}

function getTierColor(tierClass) {
    const colors = {
        'platinum': '#94a3b8',
        'gold': '#ffd700',
        'silver': '#c0c0c0',
        'bronze': '#cd7f32'
    };
    return colors[tierClass] || 'var(--gray-700)';
}

function highlightMatchingTier(tierClass) {
    // Remove all previous highlights
    const allTiers = document.querySelectorAll('.pricing-tier');
    allTiers.forEach(tier => {
        tier.classList.remove('tier-active');
        tier.style.transform = '';
        tier.style.boxShadow = '';
    });

    if (!tierClass) return;

    // Find and highlight the matching tier
    const tierHeaders = document.querySelectorAll('.tier-header');
    tierHeaders.forEach(header => {
        if (header.classList.contains(tierClass)) {
            const tierCard = header.closest('.pricing-tier');
            tierCard.classList.add('tier-active');
            tierCard.style.transform = 'scale(1.05)';
            tierCard.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.3)';

            // Scroll tier into view (smooth)
            setTimeout(() => {
                tierCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 300);
        }
    });
}

// Initialize calculator
function initCalculatorOnLoad() {
    if (document.querySelector('.pricing-calculator-section')) {
        initPricingCalculator();
        // Trigger initial state
        updatePricing();
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculatorOnLoad);
} else {
    initCalculatorOnLoad();
}

// ========================================
// PROJECT GALLERY FILTERING
// ========================================

function initGalleryFiltering() {
    const tabs = document.querySelectorAll('.gallery-tab');
    const items = document.querySelectorAll('.gallery-item');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            items.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Gallery item click to show larger view
    items.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h4').textContent;
            const description = this.querySelector('p').textContent;

            showImageModal(img.src, title, description);
        });
    });
}

function showImageModal(src, title, description) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 2rem;
        animation: fadeIn 0.3s ease-out;
    `;

    modal.innerHTML = `
        <div style="max-width: 1200px; width: 100%; position: relative;">
            <button class="modal-close" style="position: absolute; top: -40px; right: 0; background: white; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 20px; z-index: 10001;">×</button>
            <img src="${src}" style="width: 100%; height: auto; border-radius: 1rem; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);">
            <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; margin-top: 1rem;">
                <h3 style="margin: 0 0 0.5rem 0; color: #111827;">${title}</h3>
                <p style="margin: 0; color: #6b7280;">${description}</p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close modal on click
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-close')) {
            modal.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    });

    // Close on escape key
    const closeOnEscape = (e) => {
        if (e.key === 'Escape') {
            modal.click();
            document.removeEventListener('keydown', closeOnEscape);
        }
    };
    document.addEventListener('keydown', closeOnEscape);
}

// Initialize gallery filtering
if (document.querySelector('.gallery-tabs')) {
    initGalleryFiltering();
}

// ========================================
// VIDEO PLAYER
// ========================================

function initVideoPlayers() {
    const videoCards = document.querySelectorAll('.video-card');

    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const thumbnail = this.querySelector('img').src;

            showVideoModal(title, thumbnail);
        });
    });
}

function showVideoModal(title, thumbnail) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 2rem;
        animation: fadeIn 0.3s ease-out;
    `;

    modal.innerHTML = `
        <div style="max-width: 1200px; width: 100%; position: relative;">
            <button class="modal-close" style="position: absolute; top: -40px; right: 0; background: white; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 20px; z-index: 10001;">×</button>
            <div style="background: #111; border-radius: 1rem; overflow: hidden; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);">
                <div style="position: relative; padding-bottom: 56.25%; background: url('${thumbnail}') center/cover;">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: white;">
                        <div style="font-size: 80px; margin-bottom: 1rem;">▶</div>
                        <p style="font-size: 1.25rem;">Video: ${title}</p>
                        <p style="font-size: 0.9rem; opacity: 0.8; margin-top: 0.5rem;">In a production environment, this would play the actual video</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-close')) {
            modal.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    });
}

if (document.querySelector('.video-card')) {
    initVideoPlayers();
}

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c🌱 Bidvest Living - Integrated Services Platform', 'color: #10b981; font-size: 18px; font-weight: bold;');
console.log('%cWebsite loaded successfully!', 'color: #059669; font-size: 14px;');
console.log('%cInterested in our services? Visit: onboarding.html', 'color: #6b7280; font-size: 12px;');

// ========================================
// CHATBOT FUNCTIONALITY
// ========================================

function initChatbot() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const notificationBadge = document.querySelector('.chatbot-notification-badge');

    if (!chatbotToggle || !chatbotContainer) return;

    // Track if this is the first time opening
    let isFirstOpen = true;

    // Toggle chatbot
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
        chatbotToggle.style.display = chatbotContainer.classList.contains('active') ? 'none' : 'flex';

        // Hide notification badge when opened
        if (chatbotContainer.classList.contains('active') && notificationBadge) {
            notificationBadge.style.display = 'none';
        }

        // Auto focus input when opened
        if (chatbotContainer.classList.contains('active')) {
            setTimeout(() => {
                chatbotInput.focus();
            }, 300);

            // Send greeting on first open
            if (isFirstOpen) {
                isFirstOpen = false;
                setTimeout(() => {
                    sendGreetingMessage();
                }, 800);
            }
        }
    });

    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function() {
            chatbotContainer.classList.remove('active');
            chatbotToggle.style.display = 'flex';
        });
    }

    // Send message on button click
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }

    // Send message on Enter key
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Quick reply buttons
    const quickReplyButtons = document.querySelectorAll('.quick-reply-btn');
    quickReplyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            sendMessage(message);
        });
    });

    function sendMessage(customMessage = null) {
        const message = customMessage || chatbotInput.value.trim();

        if (!message) return;

        // Add user message
        addMessage(message, 'user');

        // Clear input
        if (!customMessage) {
            chatbotInput.value = '';
        }

        // Show typing indicator
        showTypingIndicator();

        // Simulate bot response after delay
        setTimeout(() => {
            hideTypingIndicator();
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.textContent = sender === 'user' ? '👤' : '🤖';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        const messagePara = document.createElement('p');
        messagePara.textContent = text;

        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = getCurrentTime();

        contentDiv.appendChild(messagePara);
        contentDiv.appendChild(timeSpan);

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);

        // Remove quick replies if they exist
        const quickReplies = chatbotMessages.querySelector('.chatbot-quick-replies');
        if (quickReplies && sender === 'user') {
            quickReplies.remove();
        }

        chatbotMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="chatbot-typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = chatbotMessages.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    function sendGreetingMessage() {
        // Get time of day for personalized greeting
        const hour = new Date().getHours();
        let timeGreeting = 'Hello';

        if (hour < 12) {
            timeGreeting = 'Good morning';
        } else if (hour < 18) {
            timeGreeting = 'Good afternoon';
        } else {
            timeGreeting = 'Good evening';
        }

        const greetings = [
            `${timeGreeting}! 👋 I'm the Bidvest Living Assistant. I'm here to help you learn about our integrated facility management services. What would you like to know?`,
            `${timeGreeting}! Welcome to Bidvest Living! 🌱 I can help you explore our 6 integrated services, understand our pricing, or get started with onboarding. How can I assist you today?`,
            `${timeGreeting}! Thanks for reaching out! 💬 I'm here to answer questions about our landscaping, plants, coffee, amenities, laundry, and garment services. What interests you?`
        ];

        // Randomly select a greeting
        const greeting = greetings[Math.floor(Math.random() * greetings.length)];

        // Show typing indicator
        showTypingIndicator();

        // Send greeting after a delay
        setTimeout(() => {
            hideTypingIndicator();
            addMessage(greeting, 'bot');
        }, 1200);
    }

    function getBotResponse(userMessage) {
        const message = userMessage.toLowerCase();

        // Knowledge base responses
        const responses = {
            'services': 'We offer 6 integrated services: Landscaping & Grounds Maintenance, Indoor Plant Solutions, Coffee & Water, Custom Amenities, Commercial Laundry, and Garment Rental. Would you like to know more about any specific service?',

            'pricing': 'Our pricing is based on partnership tiers: Bronze (1-2 services), Silver (2-3 services), Gold (4-5 services), and Platinum (all 6 services). The more services you bundle, the more you save! Would you like to start building your custom package?',

            'started': 'Great! I\'d be happy to help you get started. You can click the "Get Started" button on this page to begin your onboarding journey, or I can answer any questions you have first. What would you prefer?',

            'contact': 'You can reach us at:\n📞 0800 BIDVEST (243 837) - 24/7 Support\n✉️ hello@bidvestliving.co.za\n📍 Bidvest House, 18 Crescent Drive, Melrose Arch, Johannesburg\n\nWould you like to schedule a consultation?',

            'landscaping': 'Our Landscaping & Grounds Maintenance service includes weekly scheduled maintenance, smart irrigation systems, seasonal planting programs, and professional turf management. It\'s provided by Bidvest Top Turf, our trusted division.',

            'plants': 'Indoor Plant Solutions feature AI health monitoring, predictive maintenance alerts, custom design consultation, and air purification solutions. Our IoT-enabled system ensures your plants are always healthy!',

            'coffee': 'Our Coffee & Water Solutions, powered by Aquazania, include premium coffee beans, auto-replenishment systems, professional equipment, and filtered water solutions to keep your team energized.',

            'amenities': 'Custom Amenities & Supplies from Hotel Amenities Suppliers offers branded packaging, eco-friendly products, automatic inventory management, and premium quality supplies.',

            'laundry': 'Commercial Laundry Services include pickup and delivery, RFID tracking, eco-friendly cleaning, and 24-hour turnaround. Perfect for hotels, hospitals, and large facilities.',

            'garments': 'Garment Rental & Management provides uniform supply & rotation, maintenance included, professional attire options, and complete inventory management.',

            'sustainability': 'We\'re committed to sustainability! We save an average of 340kg CO₂ weekly, achieve 24% carbon reduction, use 100% eco-friendly products, and have deployed 350+ IoT sensors. Our electric fleet and circular economy approach set us apart.',

            'industries': 'We serve 7 key industries: Hospitality (150+ clients), Healthcare (85+ clients), Corporate (120+ clients), Education (65+ clients), Retail (45+ clients), Industrial (30+ clients), and Residential (25+ clients).',

            'benefits': 'Bundling services gives you: Up to 20% savings, one unified dashboard, reduced carbon footprint, AI-powered optimization, priority scheduling, dedicated account management, and more. The more services, the better the benefits!'
        };

        // Check for keywords and return appropriate response
        for (const [keyword, response] of Object.entries(responses)) {
            if (message.includes(keyword)) {
                return response;
            }
        }

        // Greeting responses
        if (message.match(/\b(hi|hello|hey|good morning|good afternoon|good evening)\b/)) {
            return 'Hello! Welcome to Bidvest Living. How can I assist you today? I can help you learn about our services, pricing, or get you started with onboarding.';
        }

        // Thanks responses
        if (message.match(/\b(thank|thanks|appreciate)\b/)) {
            return 'You\'re very welcome! Is there anything else I can help you with today?';
        }

        // Help responses
        if (message.match(/\b(help|assist|support)\b/)) {
            return 'I\'m here to help! I can assist you with:\n- Learning about our 6 integrated services\n- Understanding our pricing and partnership tiers\n- Getting started with onboarding\n- Contacting our team\n- Industry-specific solutions\n\nWhat would you like to know more about?';
        }

        // Default response
        return 'I\'m here to help! You can ask me about our services, pricing, getting started, or contact information. Would you like to speak with a human agent? You can reach us at 0800 BIDVEST (243 837) or hello@bidvestliving.co.za';
    }

    // Proactive engagement: Show notification and preview message
    setTimeout(() => {
        if (!chatbotContainer.classList.contains('active')) {
            // Show notification badge
            if (notificationBadge) {
                notificationBadge.style.display = 'flex';
            }

            // Show preview greeting notification
            showPreviewGreeting();
        }
    }, 5000);

    // Show a second proactive message after more time
    setTimeout(() => {
        if (!chatbotContainer.classList.contains('active')) {
            showPreviewGreeting(true);
        }
    }, 15000);

    function showPreviewGreeting(isSecondMessage = false) {
        // Create a preview notification bubble
        const preview = document.createElement('div');
        preview.className = 'chatbot-preview-greeting';
        preview.style.cssText = `
            position: fixed;
            bottom: 6rem;
            right: 2rem;
            background: white;
            padding: 1rem 1.25rem;
            border-radius: 1rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            max-width: 280px;
            z-index: 998;
            animation: slideInUp 0.4s ease-out;
            cursor: pointer;
            border: 2px solid #10b981;
        `;

        const messages = [
            '👋 Hi! Need help with facility management?',
            '💬 Have questions about our services?',
            '🌱 Looking to transform your facility?',
            '☕ Want to learn about our integrated solutions?'
        ];

        const secondMessages = [
            '🤔 Still thinking? I\'m here to help!',
            '💡 Let me know if you have any questions!',
            '✨ Ready to explore our services?'
        ];

        const messageText = isSecondMessage
            ? secondMessages[Math.floor(Math.random() * secondMessages.length)]
            : messages[Math.floor(Math.random() * messages.length)];

        preview.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0;">
                    🤖
                </div>
                <div style="flex: 1;">
                    <div style="font-weight: 600; color: #111827; font-size: 0.9rem; margin-bottom: 0.25rem;">Bidvest Living Assistant</div>
                    <div style="color: #4b5563; font-size: 0.85rem; line-height: 1.4;">${messageText}</div>
                </div>
                <button style="background: none; border: none; color: #9ca3af; cursor: pointer; font-size: 1.25rem; padding: 0; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">×</button>
            </div>
        `;

        document.body.appendChild(preview);

        // Open chat when preview is clicked
        preview.addEventListener('click', function(e) {
            if (e.target.tagName !== 'BUTTON') {
                preview.remove();
                chatbotToggle.click();
            }
        });

        // Close button
        const closeBtn = preview.querySelector('button');
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            preview.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => preview.remove(), 300);
        });

        // Auto remove after 8 seconds
        setTimeout(() => {
            if (preview.parentElement) {
                preview.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => preview.remove(), 300);
            }
        }, 8000);
    }
}

// Initialize chatbot
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}

// ========================================
// AUTOMATION STAT COUNTER ANIMATION
// ========================================

function animateStatCounters() {
    const statValues = document.querySelectorAll('.stat-value');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseFloat(entry.target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        // Format numbers appropriately
                        if (target >= 1000) {
                            entry.target.textContent = Math.floor(current).toLocaleString();
                        } else if (target % 1 !== 0) {
                            entry.target.textContent = current.toFixed(1);
                        } else {
                            entry.target.textContent = Math.floor(current);
                        }
                        requestAnimationFrame(updateCounter);
                    } else {
                        // Final value with proper formatting
                        if (target >= 1000) {
                            entry.target.textContent = target.toLocaleString();
                        } else if (target % 1 !== 0) {
                            entry.target.textContent = target.toFixed(1);
                        } else {
                            entry.target.textContent = target;
                        }
                    }
                };

                updateCounter();
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(stat => observer.observe(stat));
}

// Initialize automation animations
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateStatCounters);
} else {
    animateStatCounters();
}
