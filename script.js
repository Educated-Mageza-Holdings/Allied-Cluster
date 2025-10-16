// ===== Page Navigation =====
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Update nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName) {
            link.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Navigation Event Listeners =====
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageName = this.dataset.page;
            showPage(pageName);
        });
    });

    // Initialize charts
    initializeCharts();

    // Add interactive features
    initializeInteractivity();

    // Simulate real-time updates
    simulateRealTimeUpdates();
});

// ===== Chart Initialization =====
function initializeCharts() {
    const canvas = document.getElementById('carbonChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Sample data for carbon emissions
    const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    const currentYear = [850, 820, 780, 750, 710, 680];
    const previousYear = [920, 900, 880, 870, 860, 850];

    // Draw chart
    drawBarChart(ctx, canvas.width, canvas.height, months, currentYear, previousYear);
}

function drawBarChart(ctx, width, height, labels, data1, data2) {
    const padding = 60;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);
    const barWidth = (chartWidth / labels.length) / 3;
    const maxValue = Math.max(...data1, ...data2);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    // Draw bars
    labels.forEach((label, index) => {
        const x = padding + (chartWidth / labels.length) * index + barWidth / 2;

        // Current year bar (green)
        const height1 = (data1[index] / maxValue) * chartHeight;
        ctx.fillStyle = '#10b981';
        ctx.fillRect(x, padding + chartHeight - height1, barWidth, height1);

        // Previous year bar (gray)
        const height2 = (data2[index] / maxValue) * chartHeight;
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(x + barWidth + 5, padding + chartHeight - height2, barWidth, height2);

        // Label
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, x + barWidth / 2 + 2.5, height - padding + 20);
    });

    // Draw Y-axis labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
        const value = Math.round((maxValue / 5) * (5 - i));
        const y = padding + (chartHeight / 5) * i;
        ctx.fillText(value + ' kg', padding - 10, y + 4);
    }

    // Y-axis label
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText('Carbon Emissions (kg CO₂)', 0, 0);
    ctx.restore();
}

// ===== Interactive Features =====
function initializeInteractivity() {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = '#10b981';
        });
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'transparent';
        });
    });

    // Animate progress bars on scroll
    const progressBars = document.querySelectorAll('.progress-fill');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.width || '0%';
                setTimeout(() => {
                    const targetWidth = entry.target.getAttribute('style').match(/width:\s*(\d+)%/)[1];
                    entry.target.style.width = targetWidth + '%';
                }, 100);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        observer.observe(bar);
    });

    // Add click handlers for action cards
    addActionHandlers();
}

function addActionHandlers() {
    // Book Service
    const bookServiceBtns = document.querySelectorAll('[onclick*="services"]');
    // Already handled by onclick in HTML

    // Add smooth scroll for timeline items
    const timelineCards = document.querySelectorAll('.timeline-card');
    timelineCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName !== 'BUTTON') {
                this.classList.toggle('expanded');
            }
        });
    });
}

// ===== Real-time Updates Simulation =====
function simulateRealTimeUpdates() {
    // Simulate notification badge - DISABLED
    // setTimeout(() => {
    //     showNotification('Plant health check completed - All systems green! 🌿', 'success');
    // }, 3000);

    // Update stats periodically
    setInterval(updateLiveStats, 30000); // Update every 30 seconds
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '80px',
        right: '20px',
        background: type === 'success' ? '#10b981' : '#3b82f6',
        color: 'white',
        padding: '16px 20px',
        borderRadius: '8px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: '9999',
        maxWidth: '400px',
        animation: 'slideIn 0.3s ease-out'
    });

    // Add to page
    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function updateLiveStats() {
    // Simulate live data updates (in production, this would fetch from API)
    const carbonStat = document.querySelector('.stat-card:nth-child(3) .stat-value');
    if (carbonStat) {
        const currentValue = parseFloat(carbonStat.textContent);
        const newValue = currentValue - 0.1;
        carbonStat.textContent = newValue.toFixed(1) + '%';
    }
}

// ===== AI Recommendation Engine Simulation =====
function generatePersonalizedRecommendations() {
    const recommendations = [
        {
            icon: '🌺',
            title: 'Seasonal Landscaping Refresh',
            description: 'Based on your location and preferences, we recommend updating your seasonal plantings for spring.',
            savings: 'Save 20% when bundled'
        },
        {
            icon: '☕',
            title: 'Premium Coffee Upgrade',
            description: 'Your guests rated coffee service highly. Upgrade to our sustainable, single-origin premium blend.',
            savings: 'Trial: First month free'
        },
        {
            icon: '🪴',
            title: 'Air Purifying Plant Package',
            description: 'Enhance indoor air quality with our curated selection of NASA-approved air-purifying plants.',
            savings: 'Save 15% on package'
        },
        {
            icon: '♻️',
            title: 'Zero-Waste Program',
            description: 'Achieve 100% waste diversion with our comprehensive composting and recycling service.',
            savings: 'Carbon offset certificate included'
        }
    ];

    return recommendations.slice(0, 2); // Return 2 random recommendations
}

// ===== Service Booking Modal (Simulation) =====
function openBookingModal(serviceName) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Book ${serviceName}</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                <form class="booking-form">
                    <div class="form-group">
                        <label>Service Type</label>
                        <select class="form-input">
                            <option>Standard Maintenance</option>
                            <option>Deep Clean Service</option>
                            <option>Custom Request</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Preferred Date</label>
                        <input type="date" class="form-input" min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    <div class="form-group">
                        <label>Preferred Time</label>
                        <select class="form-input">
                            <option>Morning (8:00 AM - 12:00 PM)</option>
                            <option>Afternoon (12:00 PM - 5:00 PM)</option>
                            <option>Flexible</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Special Instructions</label>
                        <textarea class="form-input" rows="3" placeholder="Any specific requirements or notes..."></textarea>
                    </div>
                    <div class="ai-suggestion">
                        <span class="ai-badge">AI Recommendation</span>
                        <p>Based on current demand, booking for Tuesday morning will save you 10% and reduce wait time.</p>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                        <button type="submit" class="btn-primary">Confirm Booking</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.2s ease-out;
        }
        .modal-content {
            background: white;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            animation: slideUp 0.3s ease-out;
        }
        .modal-header {
            padding: 24px;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modal-header h2 {
            margin: 0;
            font-size: 1.5rem;
            color: #111827;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            color: #6b7280;
            cursor: pointer;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
        }
        .modal-close:hover {
            background: #f3f4f6;
            color: #111827;
        }
        .modal-body {
            padding: 24px;
        }
        .booking-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .form-group label {
            font-weight: 600;
            color: #374151;
            font-size: 0.875rem;
        }
        .form-input {
            padding: 10px 12px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 0.9375rem;
            font-family: inherit;
        }
        .form-input:focus {
            outline: none;
            border-color: #10b981;
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }
        .form-actions {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            margin-top: 8px;
        }
        .ai-suggestion {
            background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
            padding: 12px 16px;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .ai-suggestion p {
            margin: 0;
            font-size: 0.875rem;
            color: #374151;
        }
        @keyframes slideUp {
            from {
                transform: translateY(20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // Handle form submission
    modal.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Notification disabled
        // showNotification('Service booked successfully! Confirmation sent to your email.', 'success');
        modal.remove();
    });

    document.body.appendChild(modal);
}

// ===== Add CSS Animations =====
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .notification-close {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 24px;
        height: 24px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .notification-close:hover {
        background: rgba(255, 255, 255, 0.3);
    }

    .notification-icon {
        font-size: 20px;
        font-weight: bold;
    }

    .notification-message {
        flex: 1;
    }
`;
document.head.appendChild(styleSheet);

// ===== Export Functions for Global Use =====
window.showPage = showPage;
window.openBookingModal = openBookingModal;

// ===== Add some demo interactions =====
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to all "Schedule" and "Book" buttons
    document.querySelectorAll('.btn-secondary-sm, .btn-primary-sm').forEach(btn => {
        if (btn.textContent.includes('Schedule') || btn.textContent.includes('Book') || btn.textContent.includes('Order') || btn.textContent.includes('Reorder')) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const serviceCard = this.closest('.service-card') || this.closest('.timeline-card');
                const serviceName = serviceCard?.querySelector('h3')?.textContent ||
                                   serviceCard?.querySelector('.service-title span:last-child')?.textContent ||
                                   'Service';
                openBookingModal(serviceName);
            });
        }
    });

    // Add tooltips to AI badges
    document.querySelectorAll('.ai-badge, .ai-badge-sm').forEach(badge => {
        badge.title = 'This feature uses artificial intelligence to provide personalized recommendations';
        badge.style.cursor = 'help';
    });
});

// ===== Demo: Simulate IoT Data Updates =====
setInterval(() => {
    // Randomly update plant health indicator
    const plantHealthElements = document.querySelectorAll('.ai-insight p');
    if (plantHealthElements.length > 0 && Math.random() > 0.7) {
        const messages = [
            '3 plants showing early stress signs - preventive care included',
            'All plants healthy - optimal conditions detected',
            '2 plants need watering - scheduled for tomorrow',
            '1 plant showing rapid growth - repositioning recommended'
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        plantHealthElements[0].textContent = randomMessage;
    }
}, 15000); // Update every 15 seconds

console.log('🌿 Allied Environments Platform Loaded Successfully');
console.log('💡 Interactive prototype ready - try navigating between pages and clicking service cards!');
