// ===== Admin Panel JavaScript =====

// Initialize admin features
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminFeatures();
    simulateRealTimeData();
    setupAdminInteractions();
    setupDropdownNavigation();
});

// ===== Admin Features Initialization =====
function initializeAdminFeatures() {
    // Add live timestamp
    updateTimestamp();
    setInterval(updateTimestamp, 60000); // Update every minute

    // Animate KPI cards on load
    animateKPICards();

    // Setup notification system
    setupNotifications();
}

function updateTimestamp() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    // You can add a timestamp element to the admin nav if desired
    console.log('Admin Dashboard Updated:', timeString);
}

function animateKPICards() {
    const kpiCards = document.querySelectorAll('.kpi-card');
    kpiCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'all 0.3s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// ===== Real-Time Data Simulation =====
function simulateRealTimeData() {
    // Update service counts every 30 seconds
    setInterval(updateServiceCounts, 30000);

    // Simulate new service requests
    setInterval(simulateNewServiceRequest, 45000);

    // Update route progress
    setInterval(updateRouteProgress, 20000);

    // Simulate IoT alerts
    setInterval(generateIoTAlert, 60000);
}

function updateServiceCounts() {
    const completedStat = document.querySelector('.stat-card.success .stat-value');
    const inProgressStat = document.querySelector('.stat-card.warning .stat-value');

    if (completedStat && inProgressStat) {
        const currentCompleted = parseInt(completedStat.textContent);
        const currentInProgress = parseInt(inProgressStat.textContent);

        // Randomly update counts (simulate service completion)
        if (Math.random() > 0.6 && currentInProgress > 0) {
            completedStat.textContent = currentCompleted + 1;
            inProgressStat.textContent = currentInProgress - 1;

            // Notification disabled
            // showAdminNotification('Service completed successfully! ✓', 'success');
        }
    }
}

function simulateNewServiceRequest() {
    const services = [
        '🌳 Landscaping',
        '🪴 Indoor Plants',
        '☕ Coffee Delivery',
        '🧺 Laundry Pickup',
        '👔 Garment Service',
        '🧴 Amenities Restock'
    ];

    const customers = [
        'Seaside Hotel',
        'Tech Campus North',
        'Downtown Medical',
        'Business Tower',
        'Resort & Spa'
    ];

    if (Math.random() > 0.7) {
        const service = services[Math.floor(Math.random() * services.length)];
        const customer = customers[Math.floor(Math.random() * customers.length)];

        // Notification disabled
        // showAdminNotification(`New request: ${service} - ${customer}`, 'info');

        // Update notification badge
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            const current = parseInt(badge.textContent);
            badge.textContent = current + 1;
        }
    }
}

function updateRouteProgress() {
    const progressBars = document.querySelectorAll('.route-card .progress-fill');

    progressBars.forEach(bar => {
        const currentWidth = parseInt(bar.style.width);

        // Only update if route is in progress (0-99%)
        if (currentWidth > 0 && currentWidth < 100) {
            const newWidth = Math.min(currentWidth + Math.floor(Math.random() * 10), 100);
            bar.style.width = newWidth + '%';

            const label = bar.parentElement.nextElementSibling;
            if (label && label.classList.contains('progress-label')) {
                label.textContent = newWidth + '% Complete';
            }

            if (newWidth === 100) {
                // Notification disabled
                // showAdminNotification('Route completed! All stops visited.', 'success');
            }
        }
    });
}

function generateIoTAlert() {
    const alerts = [
        {
            type: 'info',
            icon: '💡',
            title: 'Optimization Opportunity',
            message: 'Consolidate 2 nearby deliveries tomorrow for 15% fuel savings',
            action: 'Review Schedule'
        },
        {
            type: 'warning',
            icon: '⚠️',
            title: 'Soil Moisture Low',
            message: 'Office Complex B - 5 plants need attention within 24 hours',
            action: 'Auto-Schedule'
        },
        {
            type: 'success',
            icon: '✓',
            title: 'Target Achieved',
            message: 'Weekly carbon reduction goal exceeded by 8%',
            action: 'View Report'
        }
    ];

    if (Math.random() > 0.6) {
        const alert = alerts[Math.floor(Math.random() * alerts.length)];
        // Notification disabled
        // showAdminNotification(`${alert.icon} ${alert.title}: ${alert.message}`, alert.type);
    }
}

// ===== Notifications =====
function setupNotifications() {
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', showNotificationPanel);
    }
}

function showNotificationPanel() {
    // Create notification panel modal
    const panel = document.createElement('div');
    panel.className = 'notification-panel';
    panel.innerHTML = `
        <div class="panel-header">
            <h3>Notifications</h3>
            <button class="btn-link" onclick="this.closest('.notification-panel').remove()">Close</button>
        </div>
        <div class="panel-content">
            <div class="notification-item unread">
                <div class="notification-dot"></div>
                <div class="notification-text">
                    <strong>New urgent service request</strong>
                    <p>City Medical Center - Water service needed ASAP</p>
                    <span class="notification-time">5 minutes ago</span>
                </div>
            </div>
            <div class="notification-item unread">
                <div class="notification-dot"></div>
                <div class="notification-text">
                    <strong>IoT Alert: Low soil moisture</strong>
                    <p>Corporate Plaza - 3 plants need attention</p>
                    <span class="notification-time">15 minutes ago</span>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-text">
                    <strong>Route optimization completed</strong>
                    <p>Tomorrow's routes optimized - 32% fuel savings projected</p>
                    <span class="notification-time">1 hour ago</span>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-text">
                    <strong>Customer feedback received</strong>
                    <p>Luxury Resort Group rated service 10/10</p>
                    <span class="notification-time">2 hours ago</span>
                </div>
            </div>
        </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification-panel {
            position: fixed;
            top: 80px;
            right: 20px;
            width: 400px;
            max-width: 90vw;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            max-height: 600px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .panel-header {
            padding: 20px;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .panel-header h3 {
            margin: 0;
            font-size: 1.25rem;
            color: #111827;
        }
        .panel-content {
            overflow-y: auto;
            max-height: 500px;
        }
        .notification-item {
            padding: 16px 20px;
            border-bottom: 1px solid #f3f4f6;
            display: flex;
            gap: 12px;
            transition: background 0.2s;
        }
        .notification-item:hover {
            background: #f9fafb;
        }
        .notification-item.unread {
            background: #eff6ff;
        }
        .notification-dot {
            width: 8px;
            height: 8px;
            background: #3b82f6;
            border-radius: 50%;
            margin-top: 6px;
            flex-shrink: 0;
        }
        .notification-text {
            flex: 1;
        }
        .notification-text strong {
            display: block;
            color: #111827;
            margin-bottom: 4px;
        }
        .notification-text p {
            color: #6b7280;
            font-size: 0.875rem;
            margin: 0 0 4px 0;
        }
        .notification-time {
            font-size: 0.75rem;
            color: #9ca3af;
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(panel);

    // Reset notification badge
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        setTimeout(() => {
            badge.textContent = '0';
            badge.style.display = 'none';
        }, 300);
    }
}

function showAdminNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `admin-notification notification-${type}`;

    const icons = {
        success: '✓',
        warning: '⚠️',
        error: '✕',
        info: 'ℹ'
    };

    const colors = {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6'
    };

    notification.innerHTML = `
        <span class="notification-icon">${icons[type]}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;

    Object.assign(notification.style, {
        position: 'fixed',
        top: '80px',
        right: '20px',
        background: colors[type],
        color: 'white',
        padding: '16px 20px',
        borderRadius: '8px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: '9999',
        maxWidth: '400px',
        animation: 'slideIn 0.3s ease-out',
        fontSize: '0.875rem',
        fontWeight: '500'
    });

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ===== Admin Interactions =====
function setupAdminInteractions() {
    // Auto-schedule button handlers
    document.querySelectorAll('.alert-card .btn-primary-sm').forEach(btn => {
        if (btn.textContent.includes('Auto-Schedule')) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const alertCard = this.closest('.alert-card');
                const title = alertCard.querySelector('h3').textContent;

                // Notification disabled
                // showAdminNotification(`Service auto-scheduled: ${title}`, 'success');

                // Remove alert card after scheduling
                setTimeout(() => {
                    alertCard.style.transition = 'all 0.3s ease-out';
                    alertCard.style.opacity = '0';
                    alertCard.style.transform = 'translateX(100px)';
                    setTimeout(() => alertCard.remove(), 300);
                }, 500);
            });
        }
    });

    // Apply AI suggestions
    document.querySelectorAll('.suggestion-card .btn-primary-sm').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.suggestion-card');
            const title = card.querySelector('h3').textContent;

            if (this.textContent === 'Apply') {
                // Notification disabled
                // showAdminNotification(`Applied: ${title}`, 'success');
                this.textContent = 'Applied ✓';
                this.disabled = true;
                this.style.background = '#10b981';
            } else {
                // Notification disabled
                // showAdminNotification(`Reviewing: ${title}`, 'info');
            }
        });
    });

    // Table row interactions
    document.querySelectorAll('.service-table tbody tr').forEach(row => {
        row.style.cursor = 'pointer';
        row.addEventListener('click', function(e) {
            if (e.target.tagName !== 'BUTTON') {
                const serviceId = this.querySelector('td').textContent;
                showServiceDetails(serviceId);
            }
        });
    });

    // Customer card interactions
    document.querySelectorAll('.customer-card').forEach(card => {
        const viewBtn = card.querySelector('.btn-secondary-sm');
        if (viewBtn) {
            viewBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const customerName = card.querySelector('h3').textContent;
                showCustomerDetails(customerName);
            });
        }
    });
}

function showServiceDetails(serviceId) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Service Details - ${serviceId}</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="detail-section">
                    <h3>Customer Information</h3>
                    <p><strong>Name:</strong> Luxury Resort Group</p>
                    <p><strong>Tier:</strong> Gold (15% discount)</p>
                    <p><strong>Contact:</strong> operations@luxuryresort.com</p>
                </div>
                <div class="detail-section">
                    <h3>Service Details</h3>
                    <p><strong>Type:</strong> Landscaping - Main Entrance</p>
                    <p><strong>Status:</strong> <span class="status-badge status-progress">In Progress</span></p>
                    <p><strong>Priority:</strong> High</p>
                    <p><strong>Assigned Team:</strong> Team Alpha (Marcus Chen)</p>
                </div>
                <div class="detail-section">
                    <h3>Timeline</h3>
                    <p><strong>Scheduled:</strong> Oct 14, 2025 - 8:00 AM</p>
                    <p><strong>Started:</strong> Oct 14, 2025 - 8:05 AM</p>
                    <p><strong>Est. Completion:</strong> Oct 14, 2025 - 11:00 AM</p>
                </div>
                <div class="detail-section">
                    <h3>Notes</h3>
                    <p>Focus on main entrance flower beds. Customer requested vibrant seasonal colors.</p>
                </div>
                <div class="form-actions">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Close</button>
                    <button class="btn-primary">Update Status</button>
                </div>
            </div>
        </div>
    `;

    // Add detail section styles
    const style = document.createElement('style');
    style.textContent = `
        .detail-section {
            margin-bottom: 24px;
            padding-bottom: 20px;
            border-bottom: 1px solid #e5e7eb;
        }
        .detail-section:last-of-type {
            border-bottom: none;
        }
        .detail-section h3 {
            font-size: 1rem;
            font-weight: 600;
            color: #111827;
            margin-bottom: 12px;
        }
        .detail-section p {
            margin: 8px 0;
            color: #4b5563;
            line-height: 1.5;
        }
        .detail-section strong {
            color: #1f2937;
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(modal);
}

function showCustomerDetails(customerName) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h2>${customerName}</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="detail-section">
                    <h3>Account Overview</h3>
                    <p><strong>Customer Type:</strong> Luxury Hotels</p>
                    <p><strong>Tier:</strong> Gold (15% discount)</p>
                    <p><strong>Member Since:</strong> January 2023</p>
                    <p><strong>Account Manager:</strong> Sarah Chen</p>
                </div>
                <div class="detail-section">
                    <h3>Active Services</h3>
                    <p>🌳 Landscaping - Weekly maintenance</p>
                    <p>🪴 Indoor Plants - 47 units monitored</p>
                    <p>☕ Coffee & Water - Auto-replenishment enabled</p>
                    <p>🧴 Hotel Amenities - Custom branded line</p>
                    <p>🧺 Laundry Service - 3x weekly pickup</p>
                    <p>👔 Garment Rental - 32 uniforms in rotation</p>
                </div>
                <div class="detail-section">
                    <h3>Financial Summary</h3>
                    <p><strong>Monthly Revenue:</strong> $12,450</p>
                    <p><strong>Savings (Gold Tier):</strong> $2,197/month</p>
                    <p><strong>Payment Method:</strong> Auto-pay (Net 30)</p>
                    <p><strong>Outstanding Balance:</strong> $0</p>
                </div>
                <div class="detail-section">
                    <h3>Performance Metrics</h3>
                    <p><strong>Satisfaction Score:</strong> 9.8/10</p>
                    <p><strong>On-time Service Rate:</strong> 98%</p>
                    <p><strong>Carbon Reduction:</strong> -28% YoY</p>
                </div>
                <div class="form-actions">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Close</button>
                    <button class="btn-primary">Send Message</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// ===== Dropdown Navigation Setup =====
function setupDropdownNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    const mainNavLinks = document.querySelectorAll('.nav-item:not(.nav-dropdown) .nav-link');

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('mobile-active');
            mobileOverlay.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            navMenu.classList.remove('mobile-active');
            mobileOverlay.classList.remove('active');
            // Close all dropdowns
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        });
    }

    // Dropdown toggle functionality (for mobile click behavior)
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // On mobile, toggle the dropdown
            if (window.innerWidth <= 1024) {
                const dropdown = this.closest('.nav-dropdown');
                const wasActive = dropdown.classList.contains('active');

                // Close all dropdowns
                document.querySelectorAll('.nav-dropdown').forEach(d => {
                    d.classList.remove('active');
                });

                // Toggle current dropdown
                if (!wasActive) {
                    dropdown.classList.add('active');
                }
            }
        });
    });

    // Handle dropdown link clicks - Navigate to page
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const pageName = this.dataset.page;
            if (pageName) {
                navigateToPage(pageName);

                // Close mobile menu if open
                navMenu.classList.remove('mobile-active');
                mobileOverlay.classList.remove('active');

                // Update active state for dropdown links
                dropdownLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                // Log navigation
                const pageNames = {
                    'logistics': 'Logistics & Route Optimization',
                    'scheduling': 'Scheduling & Calendar',
                    'analytics': 'Analytics Dashboard',
                    'customers': 'Customer Management',
                    'loyalty-mgmt': 'Loyalty Program Management',
                    'marketing': 'Marketing & Business Development',
                    'sustainability-mgmt': 'Sustainability Opportunities'
                };
                console.log(`✓ Navigated to: ${pageNames[pageName] || pageName}`);
            }
        });
    });

    // Handle main nav link clicks (non-dropdown)
    mainNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const pageName = this.dataset.page;
            if (pageName) {
                navigateToPage(pageName);

                // Close mobile menu if open
                navMenu.classList.remove('mobile-active');
                mobileOverlay.classList.remove('active');

                // Update active state for main nav
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                // Clear dropdown link active states
                dropdownLinks.forEach(l => l.classList.remove('active'));

                console.log(`✓ Navigated to: ${pageName}`);
            }
        });
    });

    // Close dropdowns when clicking outside (desktop only)
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 1024) {
            if (!e.target.closest('.nav-dropdown')) {
                document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });

    // Handle window resize - close mobile menu if resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            navMenu.classList.remove('mobile-active');
            mobileOverlay.classList.remove('active');
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Helper function to navigate between pages
function navigateToPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.classList.add('active');

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });

        return true;
    } else {
        console.error(`Page not found: ${pageName}`);
        return false;
    }
}

// ===== Export Functions =====
window.showAdminNotification = showAdminNotification;
window.showServiceDetails = showServiceDetails;
window.showCustomerDetails = showCustomerDetails;

console.log('🔧 Allied Environments Operations Dashboard Loaded');
console.log('📊 Real-time monitoring active');
