// ===== Industry-based Service Recommendations =====
const industryData = {
    hospitality: {
        name: 'Hospitality & Tourism',
        icon: '🏨',
        recommendedServices: [
            { id: 'landscaping', name: 'Landscaping & Grounds Maintenance', icon: '🌳', priority: 'high', reason: 'Essential for curb appeal and guest experience' },
            { id: 'indoor-plants', name: 'Indoor Plant Solutions', icon: '🪴', priority: 'high', reason: 'Creates welcoming atmosphere for guests' },
            { id: 'coffee', name: 'Coffee & Water Solutions', icon: '☕', priority: 'high', reason: 'Critical for guest satisfaction and F&B operations' },
            { id: 'amenities', name: 'Custom Amenities & Supplies', icon: '🧴', priority: 'high', reason: 'Branded amenities enhance guest experience' },
            { id: 'laundry', name: 'Commercial Laundry Services', icon: '🧺', priority: 'high', reason: 'Essential for linens, towels, and robes' },
            { id: 'garments', name: 'Garment Rental & Management', icon: '👔', priority: 'medium', reason: 'Professional uniforms for staff' }
        ],
        startingPrice: 'R8,500'
    },
    healthcare: {
        name: 'Healthcare',
        icon: '🏥',
        recommendedServices: [
            { id: 'landscaping', name: 'Landscaping & Grounds Maintenance', icon: '🌳', priority: 'medium', reason: 'Healing gardens improve patient outcomes' },
            { id: 'indoor-plants', name: 'Indoor Plant Solutions', icon: '🪴', priority: 'high', reason: 'Air purification and stress reduction for patients' },
            { id: 'coffee', name: 'Coffee & Water Solutions', icon: '☕', priority: 'medium', reason: 'Staff and visitor refreshments' },
            { id: 'amenities', name: 'Custom Amenities & Supplies', icon: '🧴', priority: 'high', reason: 'Medical-grade sanitization and patient care supplies' },
            { id: 'laundry', name: 'Commercial Laundry Services', icon: '🧺', priority: 'high', reason: 'Critical for hospital linens and infection control' },
            { id: 'garments', name: 'Garment Rental & Management', icon: '👔', priority: 'high', reason: 'Medical scrubs and protective garments' }
        ],
        startingPrice: 'R9,200'
    },
    corporate: {
        name: 'Corporate Offices',
        icon: '🏢',
        recommendedServices: [
            { id: 'landscaping', name: 'Landscaping & Grounds Maintenance', icon: '🌳', priority: 'medium', reason: 'Professional campus appearance' },
            { id: 'indoor-plants', name: 'Indoor Plant Solutions', icon: '🪴', priority: 'high', reason: 'Boosts productivity and air quality' },
            { id: 'coffee', name: 'Coffee & Water Solutions', icon: '☕', priority: 'high', reason: 'Employee satisfaction and meeting rooms' },
            { id: 'amenities', name: 'Custom Amenities & Supplies', icon: '🧴', priority: 'medium', reason: 'Restroom and pantry supplies' },
            { id: 'laundry', name: 'Commercial Laundry Services', icon: '🧺', priority: 'low', reason: 'Optional for branded linens and towels' },
            { id: 'garments', name: 'Garment Rental & Management', icon: '👔', priority: 'low', reason: 'Uniform programs for security/reception' }
        ],
        startingPrice: 'R5,800'
    },
    education: {
        name: 'Education',
        icon: '🎓',
        recommendedServices: [
            { id: 'landscaping', name: 'Landscaping & Grounds Maintenance', icon: '🌳', priority: 'high', reason: 'Safe, attractive campus environment' },
            { id: 'indoor-plants', name: 'Indoor Plant Solutions', icon: '🪴', priority: 'medium', reason: 'Classroom air quality and learning environment' },
            { id: 'coffee', name: 'Coffee & Water Solutions', icon: '☕', priority: 'medium', reason: 'Staff rooms and administrative areas' },
            { id: 'amenities', name: 'Custom Amenities & Supplies', icon: '🧴', priority: 'high', reason: 'Sanitization and hygiene for students' },
            { id: 'laundry', name: 'Commercial Laundry Services', icon: '🧺', priority: 'medium', reason: 'Sports uniforms and facility linens' },
            { id: 'garments', name: 'Garment Rental & Management', icon: '👔', priority: 'low', reason: 'Optional for staff uniforms' }
        ],
        startingPrice: 'R6,200'
    },
    retail: {
        name: 'Retail & Shopping',
        icon: '🛍️',
        recommendedServices: [
            { id: 'landscaping', name: 'Landscaping & Grounds Maintenance', icon: '🌳', priority: 'high', reason: 'Attracts customers and enhances shopping experience' },
            { id: 'indoor-plants', name: 'Indoor Plant Solutions', icon: '🪴', priority: 'high', reason: 'Creates inviting retail atmosphere' },
            { id: 'coffee', name: 'Coffee & Water Solutions', icon: '☕', priority: 'low', reason: 'Staff break rooms' },
            { id: 'amenities', name: 'Custom Amenities & Supplies', icon: '🧴', priority: 'high', reason: 'Restroom supplies for customer satisfaction' },
            { id: 'laundry', name: 'Commercial Laundry Services', icon: '🧺', priority: 'low', reason: 'Optional for promotional textiles' },
            { id: 'garments', name: 'Garment Rental & Management', icon: '👔', priority: 'medium', reason: 'Branded staff uniforms' }
        ],
        startingPrice: 'R6,800'
    },
    industrial: {
        name: 'Industrial & Manufacturing',
        icon: '🏭',
        recommendedServices: [
            { id: 'landscaping', name: 'Landscaping & Grounds Maintenance', icon: '🌳', priority: 'low', reason: 'Basic grounds upkeep and compliance' },
            { id: 'indoor-plants', name: 'Indoor Plant Solutions', icon: '🪴', priority: 'low', reason: 'Office areas only' },
            { id: 'coffee', name: 'Coffee & Water Solutions', icon: '☕', priority: 'medium', reason: 'Break rooms and canteens' },
            { id: 'amenities', name: 'Custom Amenities & Supplies', icon: '🧴', priority: 'high', reason: 'Industrial cleaning and safety supplies' },
            { id: 'laundry', name: 'Commercial Laundry Services', icon: '🧺', priority: 'high', reason: 'Work clothes and industrial textiles' },
            { id: 'garments', name: 'Garment Rental & Management', icon: '👔', priority: 'high', reason: 'Safety workwear and PPE management' }
        ],
        startingPrice: 'R7,400'
    },
    residential: {
        name: 'Residential Estates',
        icon: '🏘️',
        recommendedServices: [
            { id: 'landscaping', name: 'Landscaping & Grounds Maintenance', icon: '🌳', priority: 'high', reason: 'Common areas and property value' },
            { id: 'indoor-plants', name: 'Indoor Plant Solutions', icon: '🪴', priority: 'medium', reason: 'Lobby and common area beautification' },
            { id: 'coffee', name: 'Coffee & Water Solutions', icon: '☕', priority: 'low', reason: 'Clubhouse or amenity centers' },
            { id: 'amenities', name: 'Custom Amenities & Supplies', icon: '🧴', priority: 'medium', reason: 'Common restrooms and facilities' },
            { id: 'laundry', name: 'Commercial Laundry Services', icon: '🧺', priority: 'low', reason: 'Optional for amenity centers' },
            { id: 'garments', name: 'Garment Rental & Management', icon: '👔', priority: 'medium', reason: 'Security and maintenance staff uniforms' }
        ],
        startingPrice: 'R5,500'
    },
    other: {
        name: 'Other',
        icon: '🏛️',
        recommendedServices: [
            { id: 'landscaping', name: 'Landscaping & Grounds Maintenance', icon: '🌳', priority: 'medium', reason: 'Professional appearance' },
            { id: 'indoor-plants', name: 'Indoor Plant Solutions', icon: '🪴', priority: 'medium', reason: 'Indoor environment enhancement' },
            { id: 'coffee', name: 'Coffee & Water Solutions', icon: '☕', priority: 'medium', reason: 'Staff and visitor refreshments' },
            { id: 'amenities', name: 'Custom Amenities & Supplies', icon: '🧴', priority: 'medium', reason: 'Facility supplies' },
            { id: 'laundry', name: 'Commercial Laundry Services', icon: '🧺', priority: 'low', reason: 'As needed' },
            { id: 'garments', name: 'Garment Rental & Management', icon: '👔', priority: 'low', reason: 'Staff uniforms' }
        ],
        startingPrice: 'R6,500'
    }
};

// ===== Global State =====
let currentStep = 'step-welcome';
let selectedIndustry = null;
let selectedServices = new Set();

// ===== Navigation Functions =====
function nextStep(stepId) {
    // Hide current step
    const currentElement = document.getElementById(currentStep);
    if (currentElement) {
        currentElement.classList.remove('active');
    }

    // Show next step
    const nextElement = document.getElementById(stepId);
    if (nextElement) {
        nextElement.classList.add('active');
        currentStep = stepId;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function prevStep(stepId) {
    nextStep(stepId);
}

// ===== Industry Selection =====
function selectIndustry(industryKey) {
    selectedIndustry = industryKey;
    const industry = industryData[industryKey];

    // Pre-select high priority services
    selectedServices.clear();
    industry.recommendedServices.forEach(service => {
        if (service.priority === 'high') {
            selectedServices.add(service.id);
        }
    });

    // Update recommendations page
    updateRecommendationsPage(industry);

    // Navigate to recommendations
    nextStep('step-recommendations');
}

function updateRecommendationsPage(industry) {
    // Update industry badge
    const badge = document.getElementById('selected-industry-badge');
    if (badge) {
        badge.innerHTML = `
            <span class="badge-icon">${industry.icon}</span>
            <span class="badge-text">${industry.name}</span>
        `;
    }

    // Update package title
    const packageHeader = document.querySelector('.recommended-package .package-header h3');
    if (packageHeader) {
        const packageName = getPackageName(industry.name);
        packageHeader.textContent = packageName;
    }

    // Update recommended services
    const servicesContainer = document.getElementById('recommended-services');
    if (servicesContainer) {
        servicesContainer.innerHTML = industry.recommendedServices
            .filter(service => service.priority === 'high')
            .map(service => `
                <div class="package-service">
                    <div class="package-service-icon">${service.icon}</div>
                    <div class="package-service-info">
                        <h4>${service.name}</h4>
                        <p>${service.reason}</p>
                    </div>
                    <span class="priority-badge priority-${service.priority}">${service.priority === 'high' ? 'Recommended' : 'Optional'}</span>
                </div>
            `).join('');
    }

    // Update price
    const priceElement = document.getElementById('package-price');
    if (priceElement) {
        priceElement.textContent = industry.startingPrice + '/month';
    }

    // Update service toggles
    updateServiceToggles(industry);

    // Update summary
    updateSummary();
}

function getPackageName(industryName) {
    const packageNames = {
        'Hospitality & Tourism': 'Complete Hospitality Package',
        'Healthcare': 'Healthcare Essentials Package',
        'Corporate Offices': 'Professional Office Package',
        'Education': 'Campus Care Package',
        'Retail & Shopping': 'Retail Excellence Package',
        'Industrial & Manufacturing': 'Industrial Solutions Package',
        'Residential Estates': 'Community Living Package',
        'Other': 'Custom Solutions Package'
    };
    return packageNames[industryName] || 'Custom Package';
}

function updateServiceToggles(industry) {
    const togglesContainer = document.getElementById('service-toggles');
    if (!togglesContainer) return;

    togglesContainer.innerHTML = industry.recommendedServices.map(service => {
        const isSelected = selectedServices.has(service.id);
        return `
            <div class="service-toggle ${isSelected ? 'selected' : ''}">
                <div class="toggle-header">
                    <div class="toggle-info">
                        <span class="toggle-icon">${service.icon}</span>
                        <span class="toggle-name">${service.name}</span>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox"
                               ${isSelected ? 'checked' : ''}
                               onchange="toggleService('${service.id}')"
                               data-service-id="${service.id}">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <p class="toggle-description">${service.reason}</p>
            </div>
        `;
    }).join('');
}

function toggleService(serviceId) {
    if (selectedServices.has(serviceId)) {
        selectedServices.delete(serviceId);
    } else {
        selectedServices.add(serviceId);
    }

    // Update visual state
    const toggleElement = document.querySelector(`[data-service-id="${serviceId}"]`).closest('.service-toggle');
    if (toggleElement) {
        toggleElement.classList.toggle('selected');
    }

    // Update summary
    updateSummary();
}

function updateSummary() {
    const serviceCount = selectedServices.size;

    // Update service count
    const countElement = document.getElementById('service-count');
    if (countElement) {
        countElement.textContent = `${serviceCount} service${serviceCount !== 1 ? 's' : ''}`;
    }

    // Calculate discount tier
    let discount = 0;
    let tier = 'No discount';

    if (serviceCount >= 6) {
        discount = 20;
        tier = 'Platinum Tier (20%)';
    } else if (serviceCount >= 4) {
        discount = 15;
        tier = 'Gold Tier (15%)';
    } else if (serviceCount >= 3) {
        discount = 10;
        tier = 'Silver Tier (10%)';
    } else if (serviceCount >= 2) {
        discount = 5;
        tier = 'Bronze Tier (5%)';
    }

    // Update discount display
    const discountElement = document.getElementById('discount-tier');
    if (discountElement) {
        discountElement.textContent = tier;
    }

    // Update savings badge
    const savingsBadge = document.querySelector('.savings-badge');
    if (savingsBadge && discount > 0) {
        savingsBadge.textContent = `Save ${discount}%`;
    }

    // Update total estimate (simplified calculation)
    const basePrice = parseInt(industryData[selectedIndustry].startingPrice.replace(/[^0-9]/g, ''));
    const adjustedPrice = Math.round(basePrice * (serviceCount / 6));
    const finalPrice = Math.round(adjustedPrice * (1 - discount / 100));

    const totalElement = document.getElementById('total-estimate');
    if (totalElement) {
        totalElement.textContent = `R${finalPrice.toLocaleString()}/month`;
    }
}

// ===== Login/Registration =====
function showLogin() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function hideLogin() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function handleLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    // Simulate login validation
    console.log('Login attempt:', { email });

    // For demo purposes, check if it's the demo account
    if (email === 'demo@luxuryresort.com' && password === 'demo123') {
        // Redirect to main dashboard
        window.location.href = 'index.html';
    } else {
        // In production, this would call your authentication API
        alert('Invalid credentials. Try: demo@luxuryresort.com / demo123');
    }
}

function handleRegistration(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    // Validate password match
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    // Validate password strength
    if (!validatePassword(password)) {
        alert('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
        return;
    }

    // Collect registration data
    const registrationData = {
        businessInfo: {
            name: formData.get('businessName'),
            industry: formData.get('industry'),
            facilitySize: formData.get('facilitySize'),
            address: formData.get('address'),
            city: formData.get('city'),
            province: formData.get('province')
        },
        contactPerson: {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            jobTitle: formData.get('jobTitle'),
            email: formData.get('email'),
            phone: formData.get('phone')
        },
        selectedServices: Array.from(selectedServices),
        selectedIndustry: selectedIndustry,
        marketingOptIn: formData.get('marketing') === 'on'
    };

    console.log('Registration data:', registrationData);

    // In production, this would:
    // 1. Call your registration API
    // 2. Send confirmation email
    // 3. Create user account
    // 4. Generate quote

    // For demo, show success message and redirect
    showSuccessModal(registrationData);
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
}

function showSuccessModal(data) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="success-content">
                <div class="success-icon">✓</div>
                <h2>Welcome to Bidvest Living!</h2>
                <p class="success-message">
                    Thank you for registering, ${data.contactPerson.firstName}! Your account has been created successfully.
                </p>
                <div class="next-steps">
                    <h3>What's Next?</h3>
                    <ul>
                        <li>Check your email (${data.contactPerson.email}) for account activation</li>
                        <li>Our team is preparing your personalized quote</li>
                        <li>You'll receive a call within 24 hours to schedule a consultation</li>
                    </ul>
                </div>
                <div class="selected-services-summary">
                    <h4>Your Selected Services (${data.selectedServices.length})</h4>
                    <div class="services-icons">
                        ${getServiceIcons(data.selectedServices).join('')}
                    </div>
                </div>
                <button class="btn-primary-large" onclick="completeRegistration()">Go to Dashboard</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Add styles for success modal
    const style = document.createElement('style');
    style.textContent = `
        .success-modal .modal-content {
            max-width: 600px;
        }
        .success-content {
            padding: 48px;
            text-align: center;
        }
        .success-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            color: white;
            margin: 0 auto 24px;
        }
        .success-content h2 {
            font-size: 2rem;
            margin-bottom: 12px;
            color: #111827;
        }
        .success-message {
            font-size: 1.125rem;
            color: #6b7280;
            margin-bottom: 32px;
        }
        .next-steps {
            background: #f9fafb;
            border-radius: 12px;
            padding: 24px;
            text-align: left;
            margin-bottom: 24px;
        }
        .next-steps h3 {
            font-size: 1.125rem;
            margin-bottom: 12px;
            color: #111827;
        }
        .next-steps ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .next-steps li {
            padding: 8px 0;
            color: #374151;
            display: flex;
            align-items: flex-start;
        }
        .next-steps li:before {
            content: "✓";
            color: #10b981;
            font-weight: bold;
            margin-right: 12px;
        }
        .selected-services-summary {
            margin-bottom: 32px;
        }
        .selected-services-summary h4 {
            font-size: 1rem;
            color: #6b7280;
            margin-bottom: 12px;
        }
        .services-icons {
            display: flex;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
        }
        .services-icons span {
            font-size: 32px;
        }
    `;
    document.head.appendChild(style);
}

function getServiceIcons(serviceIds) {
    const allServices = {
        'landscaping': '🌳',
        'indoor-plants': '🪴',
        'coffee': '☕',
        'amenities': '🧴',
        'laundry': '🧺',
        'garments': '👔'
    };

    return serviceIds.map(id => `<span>${allServices[id] || '🔧'}</span>`);
}

function completeRegistration() {
    // Redirect to main dashboard
    window.location.href = 'index.html';
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌿 Bidvest Living Onboarding Platform Loaded');

    // Close modal on outside click
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('login-modal');
        if (e.target === modal) {
            hideLogin();
        }
    });

    // Handle ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideLogin();
        }
    });

    // Auto-populate industry in registration form if already selected
    const industrySelect = document.getElementById('industry');
    if (industrySelect && selectedIndustry) {
        industrySelect.value = selectedIndustry;
    }
});

// Export functions for global access
window.nextStep = nextStep;
window.prevStep = prevStep;
window.selectIndustry = selectIndustry;
window.toggleService = toggleService;
window.showLogin = showLogin;
window.hideLogin = hideLogin;
window.handleLogin = handleLogin;
window.handleRegistration = handleRegistration;
window.completeRegistration = completeRegistration;
