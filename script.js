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
            // Close mobile menu after clicking a link
            closeMobileMenu();
        });
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
            this.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-container')) {
                closeMobileMenu();
            }
        });
    }

    // Initialize charts
    initializeCharts();

    // Add interactive features
    initializeInteractivity();

    // Simulate real-time updates
    simulateRealTimeUpdates();
});

// ===== Mobile Menu Helper Function =====
function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    if (navMenu) {
        navMenu.classList.remove('mobile-active');
    }
    if (mobileMenuToggle) {
        mobileMenuToggle.classList.remove('active');
    }
}

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

// ===== Customer Support Chatbot =====
const CustomerChatbot = {
    container: null,
    messagesContainer: null,
    input: null,
    suggestionsContainer: null,
    badge: null,

    // Customer account data (simulated - Luxury Resort Group)
    accountData: {
        name: 'Luxury Resort Group',
        tier: 'Gold Tier',
        discount: '15%',
        loyaltyPoints: 2840,
        pointsToNextTier: 1160,
        nextTier: 'Platinum',
        activeServices: ['Landscaping', 'Indoor Plants', 'Coffee Solutions', 'Laundry', 'Amenities'],
        totalServices: 5,
        monthlySpend: 'R42,350',
        accountSince: 'March 2023',
        nextService: 'Tomorrow at 8:00 AM - Landscaping Maintenance',
        upcomingServices: [
            { service: 'Landscaping', date: 'Tomorrow', time: '8:00 AM', status: 'Scheduled' },
            { service: 'Plant Care', date: 'Friday', time: '10:00 AM', status: 'Scheduled' },
            { service: 'Coffee Delivery', date: 'Monday', time: '9:00 AM', status: 'Scheduled' }
        ],
        recentInvoices: [
            { id: 'INV-2025-042', amount: 'R42,350', date: 'May 1, 2025', status: 'Paid' },
            { id: 'INV-2025-041', amount: 'R42,350', date: 'Apr 1, 2025', status: 'Paid' }
        ],
        sustainabilityImpact: {
            carbonReduced: '2,840 kg',
            waterSaved: '15,600 L',
            wasteRecycled: '89%'
        },
        accountManager: {
            name: 'Sarah Thompson',
            phone: '+27 11 234 5678',
            email: 'sarah.thompson@allied.co.za'
        }
    },

    init() {
        this.container = document.getElementById('customerChatbot');
        this.messagesContainer = document.getElementById('customerChatbotMessages');
        this.input = document.getElementById('customerChatbotInput');
        this.suggestionsContainer = document.getElementById('customerChatbotSuggestions');
        this.badge = document.getElementById('customerChatbotBadge');

        // Toggle button
        document.getElementById('customerChatbotToggle').addEventListener('click', () => {
            this.toggleChat();
        });

        // Close and minimize buttons
        document.getElementById('closeCustomerChatbot').addEventListener('click', () => {
            this.closeChat();
        });

        document.getElementById('minimizeCustomerChatbot').addEventListener('click', () => {
            this.minimizeChat();
        });

        // Send button
        document.getElementById('sendCustomerChatMessage').addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter key to send
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Suggestion chips
        document.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const query = chip.getAttribute('data-query');
                this.input.value = query;
                this.sendMessage();
            });
        });
    },

    toggleChat() {
        this.container.classList.toggle('active');
        if (this.container.classList.contains('active')) {
            this.input.focus();
            this.hideBadge();
        }
    },

    closeChat() {
        this.container.classList.remove('active');
    },

    minimizeChat() {
        this.container.classList.toggle('minimized');
    },

    hideBadge() {
        if (this.badge) {
            this.badge.style.display = 'none';
        }
    },

    sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        this.input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Process message and respond
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.processQuery(message);
            this.addMessage(response.text, 'bot', response.data);
        }, 800 + Math.random() * 800);
    },

    addMessage(text, sender, data = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? '👤' : '💬';

        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = text;

        // Add service info card if data is provided
        if (data) {
            const infoCard = this.createServiceInfoCard(data);
            content.appendChild(infoCard);
        }

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    },

    createServiceInfoCard(data) {
        const card = document.createElement('div');
        card.className = 'service-info-card';

        let html = `<h4>${data.title}</h4>`;

        data.items.forEach(item => {
            html += `
                <div class="info-row">
                    <span class="info-label">${item.label}:</span>
                    <span class="info-value">${item.value}</span>
                </div>
            `;
        });

        if (data.actions) {
            html += '<div class="chat-action-buttons">';
            data.actions.forEach(action => {
                html += `<button class="chat-action-btn">${action}</button>`;
            });
            html += '</div>';
        }

        card.innerHTML = html;
        return card;
    },

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'chat-message bot-message typing-indicator-message';
        indicator.innerHTML = `
            <div class="message-avatar">💬</div>
            <div class="message-content typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        this.messagesContainer.appendChild(indicator);
        this.scrollToBottom();
    },

    hideTypingIndicator() {
        const indicator = this.messagesContainer.querySelector('.typing-indicator-message');
        if (indicator) {
            indicator.remove();
        }
    },

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    },

    processQuery(query) {
        const lowerQuery = query.toLowerCase();
        const account = this.accountData;

        // Next service queries
        if (lowerQuery.includes('next service') || lowerQuery.includes('upcoming') || lowerQuery.includes('when is my')) {
            return {
                text: `<p>Your next scheduled service is:</p><p><strong>${account.nextService}</strong></p>`,
                data: {
                    title: 'Upcoming Services',
                    items: account.upcomingServices.map(s => ({
                        label: s.service,
                        value: `${s.date} at ${s.time}`
                    })),
                    actions: ['View Full Schedule', 'Reschedule Service']
                }
            };
        }

        // Loyalty points queries
        if (lowerQuery.includes('loyalty') || lowerQuery.includes('points') || lowerQuery.includes('rewards')) {
            return {
                text: `<p>Great news! You're a <strong>${account.tier}</strong> member with <strong>${account.loyaltyPoints} points</strong>.</p>
                      <p>You're only <strong>${account.pointsToNextTier} points</strong> away from ${account.nextTier} Tier! 🎉</p>`,
                data: {
                    title: 'Loyalty Rewards',
                    items: [
                        { label: 'Current Tier', value: account.tier },
                        { label: 'Total Points', value: account.loyaltyPoints.toLocaleString() },
                        { label: 'Current Discount', value: account.discount },
                        { label: 'To Next Tier', value: `${account.pointsToNextTier} points` }
                    ],
                    actions: ['View Rewards Catalog', 'Redeem Points']
                }
            };
        }

        // Booking queries
        if (lowerQuery.includes('book') || lowerQuery.includes('schedule') || lowerQuery.includes('new service')) {
            return {
                text: `<p>I'd be happy to help you book a service! We offer:</p>
                      <ul>
                        <li><strong>Landscaping</strong> - Weekly maintenance</li>
                        <li><strong>Plant Care</strong> - Bi-weekly with AI monitoring</li>
                        <li><strong>Coffee Solutions</strong> - Weekly delivery</li>
                        <li><strong>Laundry Services</strong> - As needed</li>
                        <li><strong>Amenities</strong> - Monthly delivery</li>
                        <li><strong>Garment Rental</strong> - Add this service</li>
                      </ul>
                      <p>Which service would you like to book?</p>`,
                data: null
            };
        }

        // Billing queries
        if (lowerQuery.includes('bill') || lowerQuery.includes('invoice') || lowerQuery.includes('payment') || lowerQuery.includes('cost')) {
            return {
                text: `<p>Here's your billing information:</p>
                      <p>Your current monthly spend is <strong>${account.monthlySpend}</strong> with a ${account.discount} ${account.tier} discount applied.</p>`,
                data: {
                    title: 'Recent Invoices',
                    items: account.recentInvoices.map(inv => ({
                        label: inv.id,
                        value: `${inv.amount} - ${inv.status}`
                    })),
                    actions: ['View All Invoices', 'Download Statement']
                }
            };
        }

        // Sustainability queries
        if (lowerQuery.includes('sustainability') || lowerQuery.includes('environmental') || lowerQuery.includes('carbon') || lowerQuery.includes('impact')) {
            return {
                text: `<p>Your partnership with Allied has made a real environmental impact! 🌱</p>`,
                data: {
                    title: 'Your Sustainability Impact',
                    items: [
                        { label: 'Carbon Reduced', value: account.sustainabilityImpact.carbonReduced },
                        { label: 'Water Saved', value: account.sustainabilityImpact.waterSaved },
                        { label: 'Waste Recycled', value: account.sustainabilityImpact.wasteRecycled }
                    ],
                    actions: ['View Full Report', 'Share Impact']
                }
            };
        }

        // Account queries
        if (lowerQuery.includes('account') || lowerQuery.includes('profile') || lowerQuery.includes('my information')) {
            return {
                text: `<p>Here's your account overview:</p>`,
                data: {
                    title: 'Account Information',
                    items: [
                        { label: 'Company', value: account.name },
                        { label: 'Member Since', value: account.accountSince },
                        { label: 'Active Services', value: `${account.totalServices} services` },
                        { label: 'Account Manager', value: account.accountManager.name },
                        { label: 'Phone', value: account.accountManager.phone }
                    ],
                    actions: ['Update Profile', 'Contact Manager']
                }
            };
        }

        // Contact queries
        if (lowerQuery.includes('contact') || lowerQuery.includes('phone') || lowerQuery.includes('email') || lowerQuery.includes('reach')) {
            return {
                text: `<p>Here's how to reach us:</p>`,
                data: {
                    title: 'Contact Information',
                    items: [
                        { label: 'Account Manager', value: account.accountManager.name },
                        { label: 'Direct Phone', value: account.accountManager.phone },
                        { label: 'Email', value: account.accountManager.email },
                        { label: '24/7 Support', value: '0800 ALLIED (243 837)' },
                        { label: 'General Email', value: 'hello@allied.co.za' }
                    ],
                    actions: ['Schedule Call', 'Send Email']
                }
            };
        }

        // Help/Services queries
        if (lowerQuery.includes('help') || lowerQuery.includes('services') || lowerQuery.includes('what can')) {
            return {
                text: `<p>I can help you with:</p>
                      <ul>
                        <li><strong>Service Scheduling</strong> - View and manage your bookings</li>
                        <li><strong>Loyalty Rewards</strong> - Check points and redeem rewards</li>
                        <li><strong>Billing</strong> - View invoices and payment history</li>
                        <li><strong>Sustainability</strong> - Track your environmental impact</li>
                        <li><strong>Account Management</strong> - Update your profile</li>
                        <li><strong>Support</strong> - Get help from your account manager</li>
                      </ul>
                      <p>What would you like to know more about?</p>`,
                data: null
            };
        }

        // Default response
        return {
            text: `<p>I'm here to help! You can ask me about:</p>
                  <ul>
                    <li>📅 "When is my next service?"</li>
                    <li>🎁 "Show me my loyalty points"</li>
                    <li>💰 "What's my current bill?"</li>
                    <li>🌱 "What's my sustainability impact?"</li>
                    <li>📞 "How do I contact my account manager?"</li>
                    <li>📅 "Book a new service"</li>
                  </ul>
                  <p>Try asking one of these questions!</p>`,
            data: null
        };
    }
};

// Initialize customer chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    CustomerChatbot.init();
});

console.log('💬 Customer Support Chatbot Ready');
