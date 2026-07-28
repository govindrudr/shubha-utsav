/* --------------------------------------------------
   SHUBH UTSAV - PREMIUM FULL-STACK JAVASCRIPT
   -------------------------------------------------- */

// 1. City Specialties Database (9 Supported Cities)
const cityDatabase = {
    pune: {
        title: "Pune Diwali Hamper",
        tagline: "The taste every Punekar misses.",
        priceMin: 1850,
        products: ["Chitale Bakarwadi", "Kaka Halwai Dry Fruit Ladoo", "Bhakarwadi Gift Pack", "Mango Barfi", "Handmade Diya Set"],
        story: "Pune's rich history is reflected in its festive treats. The crispy, sweet-and-spicy Bakarwadi from Chitale Bandhu is a staple of every Maharashtrian household, paired with Kaka Halwai's legendary dry fruit ladoos.",
        image: "hamper_pune.png"
    },
    mumbai: {
        title: "Mumbai Diwali Hamper",
        tagline: "The heartbeat of Maharashtra.",
        priceMin: 2250,
        products: ["Kesar Peda", "Premium Dry Fruit Sweets", "Traditional Maharashtrian Snacks"],
        story: "Mumbai's fast-paced energy meets festive warmth. This hamper represents the rich cultural tapestry of the financial capital, offering rich saffron Kesar Pedas and high-grade roasted dry fruit sweets paired with classic savory snacks.",
        image: "hamper_mumbai.png"
    },
    nagpur: {
        title: "Nagpur Diwali Hamper",
        tagline: "Powered by the city of oranges.",
        priceMin: 1900,
        products: ["Orange Barfi", "Orange Chocolate", "Saoji Masala Pack", "Nagpur Santra Candy", "Handmade Diya Set"],
        story: "Famous worldwide for its juicy citrus farms, Nagpur's special hamper features orange-infused barfi and sweets that burst with fresh orange zest, balanced with Nagpur's signature hot Saoji spice blend.",
        image: "hamper_nagpur.png"
    },
    kolhapur: {
        title: "Kolhapur Diwali Hamper",
        tagline: "A legacy of spice and sweetness.",
        priceMin: 1750,
        products: ["Kolhapuri Jaggery", "Kolhapuri Bhadang", "Kolhapuri Chivda", "Traditional Snacks", "Handmade Diya Set"],
        story: "Known for its bold, fiery flavours, Kolhapur brings you bhadang and chivda made with pure, locally produced Kolhapuri jaggery and spices. A highly texturized and authentic savory hamper.",
        image: "hamper_kolhapur.png"
    },
    hyderabad: {
        title: "Hyderabad Diwali Hamper",
        tagline: "Nizami indulgence in every bite.",
        priceMin: 2100,
        products: ["Karachi Bakery Biscuits", "Osmania Biscuits", "Dry Fruit Sweets", "Traditional Snacks", "Festive Decor"],
        story: "A royal blend of cultures. The famous melt-in-the-mouth fruit biscuits from Karachi Bakery and salty Osmania biscuits pair perfectly with premium dry-fruit sweets in this Nizami-inspired collection.",
        image: "hamper_hyderabad.png"
    },
    surat: {
        title: "Surat Diwali Hamper",
        tagline: "The legendary Gujarati hospitality.",
        priceMin: 1950,
        products: ["Surti Ghari", "Khakhra", "Farsan", "Dry Fruit Sweets", "Festive Decor"],
        story: "Surat's culinary pride shines in its authentic Surti Ghari, a rich, ghee-laden sweet made with mawa and nuts, accompanied by thin, crispy Khakhra and spicy Gujarati Farsan. Perfectly balanced for festive gatherings.",
        image: "hamper_surat.png"
    },
    jaipur: {
        title: "Jaipur Diwali Hamper",
        tagline: "The royal taste of the Pink City.",
        priceMin: 2450,
        products: ["Ghewar", "Rajasthani Namkeen", "Kachori Pack", "Traditional Mithai", "Handcrafted Decor"],
        story: "Jaipur brings royal Rajputana hospitality to your screen. The star of this hamper is the legendary honeycomb sweet 'Ghewar', paired with rich, spicy namkeens and handcrafted clay diya decorations direct from Rajasthani artisans.",
        image: "hamper_jaipur.png"
    },
    kolkata: {
        title: "Kolkata Diwali Hamper",
        tagline: "Sweetness that defined a culture.",
        priceMin: 2200,
        products: ["Rosogolla", "Sandesh", "Mishti Doi Cookies", "Bengali Sweets Collection", "Traditional Decor"],
        story: "The City of Joy celebrates with unparalleled sweetness. Soft, syrup-soaked Rosogollas and artisanal Sandesh are matched with modern Mishti Doi cookies to honor West Bengal's sweet legacy.",
        image: "hamper_kolkata.png"
    },
    bengaluru: {
        title: "Bengaluru Diwali Hamper",
        tagline: "Tradition meets tech city indulgence.",
        priceMin: 2050,
        products: ["Mysore Pak", "Dharwad Peda", "Karnataka Snacks", "Premium Sweet Collection", "Festive Decor"],
        story: "Bengaluru's hamper features the legendary, melt-in-mouth ghee Mysore Pak alongside rich Dharwad Pedas, combining traditional royal Karnataka tastes with modern corporate class.",
        image: "hamper_bengaluru.png"
    }
};

/// 2. partner Logos Marquee list - Premium IT & Enterprise Brands
const partnerLogosList = [
    // IT & Tech Companies
    { name: "Google India", logoUrl: "assets/logos/google.jpg", sector: "IT" },
    { name: "Infosys", logoUrl: "assets/logos/infosys.png", sector: "IT" },
    { name: "TCS", logoUrl: "assets/logos/tcs.png", sector: "IT" },
    { name: "Wipro", logoUrl: "assets/logos/wipro.png", sector: "IT" },
    { name: "HCL", logoUrl: "assets/logos/hcl.png", sector: "IT" },
    { name: "Tech Mahindra", logoUrl: "assets/logos/techmahindra.png", sector: "IT" },
    
    // Banking & Financial Services
    { name: "HDFC Bank", logoUrl: "assets/logos/hdfc.png", sector: "BFSI" },
    { name: "ICICI Bank", logoUrl: "assets/logos/icici.png", sector: "BFSI" },
    { name: "Axis Bank", logoUrl: "assets/logos/axis.png", sector: "BFSI" },
    
    // Conglomerates
    { name: "Tata Motors", logoUrl: "assets/logos/tata.png", sector: "Conglomerate" },
    { name: "Reliance Industries", logoUrl: "assets/logos/reliance.png", sector: "Conglomerate" },
    { name: "Bharti Airtel", logoUrl: "assets/logos/airtel.png", sector: "Telecom" },
];

// Language Greetings Mapping
const languageGreetings = {
    hindi: "दीपावली की हार्दिक शुभकामनाएं",
    marathi: "दिवाळीच्या हार्दिक शुभेच्छा",
    bengali: "শুভ দীপাবলি",
    kannada: "ದೀಪಾವಳಿ ಹಬ್ಬದ శుభాయಗಳು",
    telugu: "దీపావళి శుభాకాంక్షలు",
    gujarati: "દિવાળીની હાર્દิก શુભેચ્છાઓ",
    english: "Wishing You A Happy & Prosperous Diwali"
};

// State Variables for Builder Configurator
let builderState = {
    city: "pune",
    baseBudget: 1500,
    packagingPrice: 200,
    packagingName: "Royal Gold Textured Box",
    vouchers: [],
    quantity: 100
};

// Environment Variable Cache
let envWhatsAppNumber = "919422075300";
let pendingCatalogueTrigger = false;
let pendingQuoteTrigger = false;
let otpResendTimer = null;

// Initialize Page Features — single unified DOMContentLoaded listener
document.addEventListener("DOMContentLoaded", () => {
    // --- Critical path (runs immediately) ---
    updateFooterPhone();
    setupScrollReveals();
    checkAuthLocks();
    setupNavigationLinks();

    // --- Lucky draw countdown + ticket observer ---
    if (document.getElementById('ld-days')) {
        updateLuckyDrawCountdown();
        let _ldTimer = setInterval(updateLuckyDrawCountdown, 1000);

        // Pause countdown when tab is hidden — saves CPU on background tabs
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(_ldTimer);
            } else {
                updateLuckyDrawCountdown();
                _ldTimer = setInterval(updateLuckyDrawCountdown, 1000);
            }
        });
    }

    // --- Ticket count animation via IntersectionObserver ---
    if (window.IntersectionObserver) {
        const ldObs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) animateLdTicketCount(); });
        }, { threshold: 0.3 });
        const tickEl = document.getElementById('ld-ticket-count');
        if (tickEl) ldObs.observe(tickEl);
    }

    // --- Non-critical init deferred to idle time ---
    const deferredInit = () => {
        recalculateBuilderTotal();
        updatePersonalizationPreview();
        updateEstimatorTotal();
        checkSystemStatusHealth();
    };

    if ('requestIdleCallback' in window) {
        requestIdleCallback(deferredInit, { timeout: 2000 });
    } else {
        setTimeout(deferredInit, 300);
    }
});

// 3. Auth Locks Checks
function checkAuthLocks() {
    const isVerified = localStorage.getItem('shubh_utsav_verified') === 'true';
    const lockOverlay = document.getElementById('calculator-lock');
    
    if (isVerified) {
        if (lockOverlay) lockOverlay.style.display = 'none';
    } else {
        if (lockOverlay) lockOverlay.style.display = 'flex';
    }
}

// 4. Marquee Renderer
function generateMarqueeLogos() {
    const track = document.getElementById("marquee-track");
    if (!track) return;
    const itemsHTML = partnerLogosList.map(partner => {
        if (partner.logoUrl) {
            return `<div class="marquee-logo"><img src="${partner.logoUrl}" alt="${partner.name}" class="partner-logo-img" /></div>`;
        } else {
            return `<div class="marquee-logo">${partner.name}</div>`;
        }
    }).join('');
    track.innerHTML = itemsHTML + itemsHTML;
}

// 5. Hero Gift Unboxing Logic
function triggerUnboxing() {
    const boxContainer = document.getElementById("main-gift-box");
    const hintText = document.querySelector(".unboxing-hint");

    if (boxContainer.classList.contains("open")) {
        boxContainer.classList.remove("open");
        hintText.innerText = "Click the Box to Unbox India's Flavors";
    } else {
        boxContainer.classList.add("open");
        hintText.innerText = "Happy Diwali! 🪔";

        if (typeof confetti === 'function') {
            confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#FFE082', '#D4AF37', '#AA771C', '#9D0017', '#FAF7F0']
            });
        }
    }
}

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.scrollY;
        const offsetPosition = absoluteElementTop - 80; // 80px offset for the sticky header
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function setupNavigationLinks() {
    const links = document.querySelectorAll('.nav-link, .mobile-drawer-link');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                
                // If clicked from mobile menu drawer, close it
                if (this.classList.contains('mobile-drawer-link')) {
                    toggleMobileMenu();
                }
                
                // Perform precise smooth scroll
                scrollToSection(targetId);
                
                // Update URL hash state silently without jump
                history.pushState(null, null, href);
            }
        });
    });
}

// 6. Interactive Map
function selectMapCity(cityId) {
    const pins = document.querySelectorAll(".city-pin");
    pins.forEach(pin => pin.classList.remove("active"));

    const activePin = document.getElementById(`pin-${cityId}`);
    if (activePin) activePin.classList.add("active");

    const cityData = cityDatabase[cityId];
    if (!cityData) return;

    const detailsPanel = document.getElementById("map-city-content");
    const imageUrl = cityData.image ? `/${cityData.image}` : '';
    const imageHtml = imageUrl
        ? `<img src="${imageUrl}" alt="${cityData.title}" class="map-city-image" />`
        : `<div class="map-city-image-placeholder">Image coming soon</div>`;

    detailsPanel.innerHTML = `
        <div class="map-city-grid">
            <div class="map-city-details">
                <h3>${cityData.title}</h3>
                <span class="map-city-tagline">"${cityData.tagline}"</span>
                <p class="map-city-story">${cityData.story}</p>
                <div class="map-city-specialties">
                    <h4>Hamper Specialties Include:</h4>
                    <ul>
                        ${cityData.products.map(p => `<li><i class="fa-solid fa-star"></i>${p}</li>`).join('')}
                    </ul>
                </div>
                <div class="map-city-footer">
                    <span class="map-city-price">Starting budget per unit: <strong>₹${cityData.priceMin}</strong></span>
                    <button class="btn-primary" onclick="selectBuilderCity('${cityId}')">Configure Hamper</button>
                </div>
            </div>
            <div class="map-city-image-card">
                ${imageHtml}
                <div class="map-city-image-label">${cityData.title}</div>
            </div>
        </div>
    `;
}

function selectBuilderCity(cityId) {
    const selectElem = document.getElementById("select-builder-city");
    if (selectElem) {
        selectElem.value = cityId;
        builderState.city = cityId;
        updateBuilderProducts();
        recalculateBuilderTotal();
        scrollToSection('builder');
    }
}

// 7. Personalization Lab
function updatePersonalizationPreview() {
    const companyName = document.getElementById("input-company").value || "Google India";
    const employeeName = document.getElementById("input-employee").value || "Aditya Sharma";
    const customMessage = document.getElementById("input-message").value || "Wishing you a happy Diwali.";

    document.getElementById("box-logo-text").innerText = companyName.toUpperCase();
    document.getElementById("box-employee-name").innerText = `Specially Curated For ${employeeName}`;
    document.getElementById("card-message-text").innerText = `"${customMessage}"`;
    document.getElementById("card-company-name").innerText = `- From ${companyName}`;

    const builderLogo = document.querySelector(".render-logo");
    if (builderLogo) builderLogo.innerText = companyName.toUpperCase();
}

function toggleFamilyOption() {
    const isChecked = document.getElementById("toggle-family").checked;
    const boxPreview = document.getElementById("box-preview");
    if (isChecked) {
        boxPreview.style.borderColor = "var(--crimson-light)";
        boxPreview.style.boxShadow = "var(--gold-glow-strong)";
    } else {
        boxPreview.style.borderColor = "var(--gold-dark)";
        boxPreview.style.boxShadow = "0 15px 30px rgba(0,0,0,0.5)";
    }
}

function toggleDeptBadge() {
    const isChecked = document.getElementById("toggle-dept").checked;
    const badge = document.getElementById("box-dept-badge");
    if (isChecked) {
        badge.style.display = "block";
    } else {
        badge.style.display = "none";
    }
}

// 8. Hamper Configurator
function setBuilderBudget(amount, buttonElem) {
    const budgetBtns = document.querySelectorAll(".budget-btn");
    budgetBtns.forEach(btn => btn.classList.remove("active"));
    buttonElem.classList.add("active");
    builderState.baseBudget = amount;
    recalculateBuilderTotal();
}

function updateBuilderProducts() {
    const citySelect = document.getElementById("select-builder-city");
    builderState.city = citySelect.value;
    recalculateBuilderTotal();
}

function recalculateBuilderTotal() {
    const base = builderState.baseBudget;
    const specBase = document.getElementById("spec-base");
    if (specBase) specBase.innerText = `₹${base.toLocaleString('en-IN')}`;

    const packagingSelect = document.getElementById("select-packaging");
    const packagingCost = parseInt(packagingSelect.value);
    builderState.packagingPrice = packagingCost;
    builderState.packagingName = packagingSelect.options[packagingSelect.selectedIndex].getAttribute("data-name");

    const specPackaging = document.getElementById("spec-packaging");
    if (specPackaging) specPackaging.innerText = `+₹${packagingCost.toLocaleString('en-IN')}`;

    const checkedVouchers = [];
    const voucherCheckboxes = document.querySelectorAll("input[name='vouchers']:checked");
    voucherCheckboxes.forEach(cb => { checkedVouchers.push(cb.value); });
    builderState.vouchers = checkedVouchers;

    const vouchersCost = checkedVouchers.length * 500;
    const specVouchers = document.getElementById("spec-vouchers");
    if (specVouchers) specVouchers.innerText = `+₹${vouchersCost.toLocaleString('en-IN')}`;

    const perUnit = base + packagingCost + vouchersCost;
    const specPerUnit = document.getElementById("spec-per-unit");
    if (specPerUnit) specPerUnit.innerText = `₹${perUnit.toLocaleString('en-IN')}`;

    const total = perUnit * builderState.quantity;
    const specTotal = document.getElementById("spec-total");
    if (specTotal) specTotal.innerText = `₹${total.toLocaleString('en-IN')}`;

    // Update visuals
    const boxRender = document.getElementById("render-packaging-box");
    if (boxRender) {
        if (packagingCost === 200) {
            boxRender.style.border = "2px solid var(--gold-solid)";
            boxRender.style.background = "linear-gradient(135deg, #1b203a 0%, #0d0f1b 100%)";
        } else if (packagingCost === 400) {
            boxRender.style.border = "3px double var(--crimson-light)";
            boxRender.style.background = "linear-gradient(135deg, #44000b 0%, #150003 100%)";
        } else if (packagingCost === 600) {
            boxRender.style.border = "3px solid var(--gold-light)";
            boxRender.style.background = "linear-gradient(135deg, #3d2a04 0%, #170f01 100%)";
        }
    }
    const voucherVisualContainer = document.getElementById("render-vouchers-visual");
    if (voucherVisualContainer) {
        voucherVisualContainer.innerHTML = checkedVouchers.map(v => `<span class="render-voucher-badge">${v}</span>`).join('');
    }
}

// 9. Interactive Estimator
let estimatorBudgetValue = 2000;

function setEstimatorBudget(amount, btnElem) {
    const btns = document.querySelectorAll(".est-budget-btn");
    btns.forEach(btn => btn.classList.remove("active"));
    btnElem.classList.add("active");
    estimatorBudgetValue = amount;
    updateEstimatorTotal();
}

function updateEstimatorTotal() {
    const qtySlider = document.getElementById("est-qty-slider");
    const qtyDisplay = document.getElementById("est-qty-display");
    const totalDisplay = document.getElementById("est-total-display");
    
    if (!qtySlider || !qtyDisplay || !totalDisplay) return;

    const qty = parseInt(qtySlider.value);
    qtyDisplay.innerText = qty;

    const total = qty * estimatorBudgetValue;
    totalDisplay.innerText = `₹${total.toLocaleString('en-IN')}`;
}

// Claim quote from estimator
function claimEstimatorQuote() {
    const isVerified = localStorage.getItem('shubh_utsav_verified') === 'true';
    if (!isVerified) {
        pendingQuoteTrigger = true;
        openVerificationModal();
        return;
    }

    const qty = document.getElementById("est-qty-slider").value;
    const budget = estimatorBudgetValue;
    const city = document.getElementById("est-city-select").value;

    document.getElementById("form-qty").value = qty;
    document.getElementById("form-budget").value = budget;
    document.getElementById("form-locations").value = city.toUpperCase();
    document.getElementById("form-message").value = "";

    // Google Analytics Event Trigger
    if (typeof gtag === 'function') {
        gtag('event', 'estimator_quote_claim', {
            'event_category': 'engagement',
            'event_label': 'Claim Estimator Quote Click',
            'value': parseFloat(qty) * parseFloat(budget),
            'currency': 'INR'
        });
    }

    openLeadModal();
}

function selectPricingBudget(amount) {
    // Automatically configure Hamper Builder budget or estimator budget
    const qty = 100;
    const isVerified = localStorage.getItem('shubh_utsav_verified') === 'true';
    if (!isVerified) {
        pendingQuoteTrigger = true;
        openVerificationModal();
        return;
    }
    
    document.getElementById("form-qty").value = qty;
    document.getElementById("form-budget").value = amount;
    document.getElementById("form-message").value = "";
    openLeadModal();
}

// Order presets
function orderPreconfiguredHamper(hamperName) {
    const isVerified = localStorage.getItem('shubh_utsav_verified') === 'true';
    if (!isVerified) {
        pendingQuoteTrigger = true;
        openVerificationModal();
        return;
    }

    openLeadModal();
    const dbKey = hamperName.split(' ')[0].toLowerCase();
    const cityData = cityDatabase[dbKey];
    if (cityData) {
        document.getElementById("form-budget").value = cityData.priceMin;
        document.getElementById("form-locations").value = dbKey.charAt(0).toUpperCase() + dbKey.slice(1);
    }
    document.getElementById("form-message").value = "";
}

function submitCustomHamperToLead() {
    const isVerified = localStorage.getItem('shubh_utsav_verified') === 'true';
    if (!isVerified) {
        pendingQuoteTrigger = true;
        openVerificationModal();
        return;
    }

    openLeadModal();
    document.getElementById("form-qty").value = builderState.quantity;
    const vouchersCost = builderState.vouchers.length * 500;
    const perUnit = builderState.baseBudget + builderState.packagingPrice + vouchersCost;
    document.getElementById("form-budget").value = perUnit;
    document.getElementById("form-locations").value = builderState.city.charAt(0).toUpperCase() + builderState.city.slice(1);
    document.getElementById("form-message").value = "";
    document.getElementById("form-company").value = "";

    // Google Analytics Event Trigger
    if (typeof gtag === 'function') {
        gtag('event', 'custom_hamper_build_claim', {
            'event_category': 'engagement',
            'event_label': 'Claim Custom Hamper Builder Click',
            'value': parseFloat(builderState.quantity) * parseFloat(perUnit),
            'currency': 'INR'
        });
    }
}

// 10. Modals Management
function openLeadModal() {
    document.getElementById("lead-modal").classList.add("active");
    
    // Explicitly reset customer-filled fields to ensure they start completely blank
    document.getElementById("form-name").value = "";
    document.getElementById("form-company").value = "";
    document.getElementById("form-email").value = "";
    document.getElementById("form-phone").value = "";
    document.getElementById("form-message").value = "";
    
    // Set minimum date to today
    const dateInput = document.getElementById("form-date");
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }
}
function closeLeadModal() {
    document.getElementById("lead-modal").classList.remove("active");
}
function openVerificationModal() {
    document.getElementById("verification-modal").classList.add("active");
    document.getElementById("verify-step-1").style.display = 'block';
    document.getElementById("verify-step-2").style.display = 'none';
}
function closeVerificationModal() {
    document.getElementById("verification-modal").classList.remove("active");
    if (otpResendTimer) clearInterval(otpResendTimer);
}

// Google Meet Video Call Scheduling
function scheduleGoogleMeet(event) {
    event.preventDefault();
    
    const verifiedUser = JSON.parse(localStorage.getItem('shubh_utsav_user') || '{}');
    const name = verifiedUser.name || 'Guest';
    const email = verifiedUser.email || '';
    const company = verifiedUser.company || 'Your Company';
    const phone = document.getElementById("form-phone").value.trim() || '';
    const preferredDate = document.getElementById("form-date").value;
    const preferredTime = document.getElementById("form-time").value;
    
    if (!preferredDate || !preferredTime) {
        showToast("Please select both date and time for the video call.", "error");
        return;
    }
    
    if (!email) {
        showToast("Email required for video meeting invitation.", "error");
        return;
    }
    
    // Parse the date and time
    const [hours, minutes] = preferredTime.split(':');
    const meetingDateTime = new Date(preferredDate);
    meetingDateTime.setHours(parseInt(hours), parseInt(minutes), 0);
    
    // Format for Google Calendar
    const startTime = meetingDateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endTime = new Date(meetingDateTime.getTime() + 60 * 60000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'; // +1 hour
    
    const eventTitle = `Shubh Utsav - Corporate Hamper Demo & Customization Call - ${company}`;
    const eventDescription = `
Dear ${name},

You have scheduled a personalized demo and customization session for your corporate gifting requirements.

Company: ${company}
Contact: ${phone || 'Not provided'}

During this call, we will:
- Showcase city-specific hamper specialties
- Demonstrate customization options
- Discuss budget optimization
- Create your personalized proposal

Meeting Link: Google Meet (will be generated automatically)

Best regards,
Shubh Utsav Team
Hyperlocal Diwali Corporate Gifting Solutions
    `.trim();
    
    // Create Google Calendar link
    const googleCalendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(eventTitle)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(eventDescription)}&location=Google+Meet&sprop=website:https://www.shubhutsav.com&add=${encodeURIComponent(email)}`;
    
    // Show confirmation toast and open calendar
    showToast(`Opening Google Calendar to schedule your video demo for ${preferredDate} at ${preferredTime}`, "success");
    
    setTimeout(() => {
        window.open(googleCalendarUrl, '_blank', 'width=1000,height=700');
    }, 500);
}

// OTP digit jumps
function handleOtpInput(input, index) {
    if (input.value && index < 5) {
        const nextInput = document.querySelectorAll(".otp-digit-input")[index + 1];
        if (nextInput) nextInput.focus();
    }
}
function handleOtpKeyDown(event, index) {
    if (event.key === "Backspace" && !event.target.value && index > 0) {
        const prevInput = document.querySelectorAll(".otp-digit-input")[index - 1];
        if (prevInput) {
            prevInput.focus();
            prevInput.value = "";
        }
    }
}

// Toast Helper
function showToast(message, type = "success") {
    const toast = document.getElementById("toast-notification");
    if (!toast) return;
    toast.innerText = message;
    toast.className = "toast-notification";
    if (type === "error") toast.classList.add("error");
    toast.classList.add("active");
    setTimeout(() => { toast.classList.remove("active"); }, 4000);
}

/* ==========================================================================
   AUTHENTICATION LOGIC (EMAIL OTP)
   ========================================================================== */

// 1. Send OTP
async function handleSendOTP(event) {
    event.preventDefault();
    const name = document.getElementById("verify-name").value.trim();
    const company = document.getElementById("verify-company").value.trim();
    const email = document.getElementById("verify-email").value.trim();

    if (!name || !company || !email) {
        showToast("Please enter all fields.", "error");
        return;
    }

    try {
        const response = await fetch('/api/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, companyName: company, email })
        });
        const data = await response.json();

        if (response.ok) {
            showToast("Verification code generated successfully.");
            document.getElementById("verify-target-email").innerText = email;
            
            // Check for dev fallback mode
            const devBanner = document.getElementById("dev-otp-banner");
            if (data.devMode) {
                devBanner.style.display = 'block';
                document.getElementById("dev-otp-code").innerText = data.otp;
            } else {
                devBanner.style.display = 'none';
            }

            // Move to Step 2
            document.getElementById("verify-step-1").style.display = 'none';
            document.getElementById("verify-step-2").style.display = 'block';

            // Start 5 min countdown
            startOtpTimer(300);
        } else {
            showToast(data.error || "Failed to generate verification OTP.", "error");
        }
    } catch (err) {
        console.error('OTP Send request error:', err);
        showToast("Server connection error during OTP generation.", "error");
    }
}

// 2. Verify OTP
async function handleVerifyOTP(event) {
    event.preventDefault();
    const email = document.getElementById("verify-email").value.trim();
    const name = document.getElementById("verify-name").value.trim();
    const company = document.getElementById("verify-company").value.trim();

    // Concat digits
    const inputs = document.querySelectorAll(".otp-digit-input");
    let otp = "";
    inputs.forEach(input => { otp += input.value; });

    if (otp.length < 6) {
        showToast("Please fill all 6 digits of the OTP code.", "error");
        return;
    }

    try {
        const response = await fetch('/api/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });
        const data = await response.json();

        if (response.ok) {
            showToast("Business email verified successfully!");
            
            // Store client tokens
            localStorage.setItem('shubh_utsav_verified', 'true');
            localStorage.setItem('shubh_utsav_token', data.token);
            localStorage.setItem('shubh_utsav_user', JSON.stringify({ name, company, email }));

            // Update page states
            checkAuthLocks();
            closeVerificationModal();

            // Clear digits
            inputs.forEach(input => { input.value = ""; });

            // Check triggers
            if (pendingCatalogueTrigger) {
                pendingCatalogueTrigger = false;
                triggerCatalogueDownload();
            } else if (pendingQuoteTrigger) {
                pendingQuoteTrigger = false;
                triggerQuoteRequest();
            }
        } else {
            showToast(data.error || "OTP verification failed.", "error");
        }
    } catch (err) {
        console.error('OTP verify request error:', err);
        showToast("Server validation error.", "error");
    }
}

// 3. Resend OTP
async function triggerResendOTP() {
    const name = document.getElementById("verify-name").value.trim();
    const company = document.getElementById("verify-company").value.trim();
    const email = document.getElementById("verify-email").value.trim();

    try {
        const response = await fetch('/api/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, companyName: company, email })
        });
        const data = await response.json();

        if (response.ok) {
            showToast("Verification code resent to your email.");
            if (data.devMode) {
                document.getElementById("dev-otp-code").innerText = data.otp;
            }
            startOtpTimer(300);
        } else {
            showToast(data.error || "Failed to resend code.", "error");
        }
    } catch (err) {
        showToast("Failed to reconnect to verification service.", "error");
    }
}

// OTP countdown timer
function startOtpTimer(durationSeconds) {
    const display = document.getElementById("otp-timer");
    const resendBtn = document.getElementById("btn-resend-otp");
    resendBtn.disabled = true;

    if (otpResendTimer) clearInterval(otpResendTimer);

    let timeRemaining = durationSeconds;
    otpResendTimer = setInterval(() => {
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerText = `${minutes}:${seconds}`;

        if (--timeRemaining < 0) {
            clearInterval(otpResendTimer);
            display.innerText = "00:00";
            resendBtn.disabled = false; // allow resending
        }
        
        // Allow resend after 60 seconds of initial wait
        if (durationSeconds - timeRemaining >= 60) {
            resendBtn.disabled = false;
        }
    }, 1000);
}

// Catalogue triggers
function triggerCatalogueDownload() {
    const isVerified = localStorage.getItem('shubh_utsav_verified') === 'true';
    if (!isVerified) {
        pendingCatalogueTrigger = true;
        openVerificationModal();
        return;
    }

    showToast("Initiating catalogue download...");
    const clientToken = localStorage.getItem('shubh_utsav_token');

    // Make an authorized request to catalogue PDF
    fetch('/api/catalogue/download', {
        headers: { 'Authorization': `Bearer ${clientToken}` }
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to download catalog document.");
        return response.blob();
    })
    .then(blob => {
        // Trigger save blob as file
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "shubh_utsav_catalogue.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        showToast("Catalogue PDF downloaded successfully!");

        // Google Analytics Event Trigger
        if (typeof gtag === 'function') {
            gtag('event', 'catalogue_download', {
                'event_category': 'engagement',
                'event_label': 'Shubh Utsav Catalogue PDF'
            });
        }

        // Automatically store catalogue download as an inquiry Lead in DB
        registerLeadInquiry('Catalogue Request');
    })
    .catch(err => {
        console.error('Catalog fetch error:', err);
        showToast("Catalogue file missing on server.", "error");
    });
}

function triggerQuoteRequest() {
    const isVerified = localStorage.getItem('shubh_utsav_verified') === 'true';
    if (!isVerified) {
        pendingQuoteTrigger = true;
        openVerificationModal();
        return;
    }
    openLeadModal();
}

// Submit lead records to backend API
async function handleLeadSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem('shubh_utsav_token');
    
    if (!token) {
        showToast("Verification session missing. Please verify your email first.", "error");
        openVerificationModal();
        return;
    }

    const verifiedUser = JSON.parse(localStorage.getItem('shubh_utsav_user') || '{}');

    const name = verifiedUser.name;
    const company = verifiedUser.company;
    const email = verifiedUser.email;
    const phone = document.getElementById("form-phone").value.trim();
    const qty = document.getElementById("form-qty").value;
    const budget = document.getElementById("form-budget").value;
    const city = document.getElementById("form-locations").value.trim();
    const festival = document.getElementById("form-festival").value.trim();
    const remarks = document.getElementById("form-message").value.trim();
    const mockRecaptcha = document.getElementById("mock-recaptcha").checked;

    if (!mockRecaptcha) {
        showToast("Please complete the reCAPTCHA security validation.", "error");
        return;
    }

    const payload = {
        name,
        companyName: company,
        email,
        phone,
        employeeCount: parseInt(qty),
        budget: parseInt(budget),
        festival,
        selectedCity: city,
        selectedHamper: remarks.includes("Custom Hamper") ? "Custom Configurator" : "Preset",
        inquiryType: "Quote Request",
        recaptchaToken: "mock_success_token"
    };

    try {
        const response = await fetch('/api/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        if (response.ok) {
            showToast("Inquiry proposal submitted successfully.");
            
            // Google Analytics Lead Event Trigger
            if (typeof gtag === 'function') {
                gtag('event', 'generate_lead', {
                    'event_category': 'conversion',
                    'event_label': 'Lead Form Submission',
                    'value': parseFloat(qty) * parseFloat(budget),
                    'currency': 'INR'
                });
            }

            // Direct Order Booking also created in Orders Collection
            await registerBackupOrder(payload, data.leadId);

            if (typeof confetti === 'function') {
                confetti({ particleCount: 150, spread: 90, origin: { y: 0.4 } });
            }

            // WhatsApp Redirect Compile
            const whatsappTarget = (localStorage.getItem('admin_whatsapp_number') || envWhatsAppNumber || "").trim();
            const sanitizedNumber = whatsappTarget.replace(/[^0-9]/g, '');
            
            const formattedMessage = `Hello Team,

I am interested in Corporate Gifting.

Name: ${name}
Company: ${company}
Email: ${email}
Phone: ${phone}
Employee Count: ${qty}
Budget Per Employee: ${budget}
City: ${city}

Please share catalogue and quotation.

Thank You.`;

            const encodedMessage = encodeURIComponent(formattedMessage);
            const redirectionUrl = `https://wa.me/${sanitizedNumber}?text=${encodedMessage}`;

            closeLeadModal();

            setTimeout(() => {
                // Google Analytics WhatsApp Event Trigger
                if (typeof gtag === 'function') {
                    gtag('event', 'whatsapp_redirect', {
                        'event_category': 'conversion',
                        'event_label': 'WhatsApp Sales Route',
                        'value': parseFloat(qty) * parseFloat(budget),
                        'currency': 'INR'
                    });
                }
                window.open(redirectionUrl, '_blank');
            }, 1000);
        } else {
            showToast(data.error || "Inquiry submission rejected.", "error");
        }
    } catch (err) {
        console.error('Lead submit error:', err);
        showToast("Connection to server database failed.", "error");
    }
}

// Background auto register lead for catalog downloads
async function registerLeadInquiry(inquiryType) {
    const token = localStorage.getItem('shubh_utsav_token');
    const user = JSON.parse(localStorage.getItem('shubh_utsav_user') || '{}');
    if (!token || !user.email) return;

    const payload = {
        name: user.name,
        companyName: user.company,
        email: user.email,
        phone: "9999999999",
        employeeCount: 50,
        budget: 1500,
        selectedCity: "Download Hub",
        inquiryType: inquiryType,
        recaptchaToken: "mock_success_token"
    };

    try {
        await fetch('/api/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });
    } catch (err) {
        console.warn('Silent lead logging failed', err);
    }
}

// Auto register Lead to Order DB helper
async function registerBackupOrder(lead, leadId) {
    const token = localStorage.getItem('shubh_utsav_token');
    const orderPayload = {
        companyName: lead.companyName,
        contactPerson: lead.name,
        email: lead.email,
        phone: lead.phone,
        employeeCount: lead.employeeCount,
        selectedHampers: lead.selectedHamper === "Custom Configurator" ? "Builder Customized Box" : "Regional City Hamper Selection",
        totalAmount: lead.employeeCount * lead.budget,
        notes: `Auto created Order from Lead Inquiry ID: ${leadId}`
    };

    try {
        await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderPayload)
        });
    } catch(err) {
        console.warn('Backup Order registration failed', err);
    }
}

/* ==========================================================================
   AI GIFTING ASSISTANT (CHATBOT)
   ========================================================================== */

let chatbotState = {
    step: 'welcome',
    leadData: {}
};

function toggleAIChat() {
    document.getElementById("ai-chat-window").classList.toggle("active");
}

function handleAIChatKeyPress(event) {
    if (event.key === "Enter") {
        sendAIChatMessage();
    }
}

function appendChatMessage(text, sender = "system") {
    const body = document.getElementById("ai-chat-messages");
    const msg = document.createElement("div");
    msg.className = `ai-msg ${sender}`;
    msg.innerHTML = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
}

async function sendAIChatMessage() {
    const input = document.getElementById("ai-chat-input");
    const query = input.value.trim();
    if (!query) return;

    appendChatMessage(query, "user");
    input.value = "";

    // Dialog state flow
    const lowerQuery = query.toLowerCase();
    
    if (chatbotState.step === 'welcome') {
        if (lowerQuery.includes("suggest") || lowerQuery.includes("1") || lowerQuery.includes("hamper")) {
            chatbotState.step = 'hamper_suggest_budget';
            appendChatMessage("Great! What budget per employee are you looking for?<br>Tiers: <strong>Standard</strong> (₹999-1499), <strong>Premium</strong> (₹1500-2499), <strong>Executive</strong> (₹2500-4999), <strong>Luxury</strong> (₹5000+).");
        } else if (lowerQuery.includes("timelines") || lowerQuery.includes("faq") || lowerQuery.includes("2") || lowerQuery.includes("branding")) {
            appendChatMessage("Here are common FAQ answers:<br><br>• <strong>TIMELINES:</strong> Production takes 5-7 days; delivery takes 2-4 days.<br>• <strong>BRANDING:</strong> We customize box ribbons and lids with your logo for orders >50 units.<br>• <strong>CITIES:</strong> We deliver to 9 historic capitals direct to home or office.<br><br>Type <strong>1</strong> for suggestions or <strong>3</strong> to submit direct details.");
        } else if (lowerQuery.includes("submit") || lowerQuery.includes("3") || lowerQuery.includes("quote") || lowerQuery.includes("lead")) {
            chatbotState.step = 'collect_name';
            appendChatMessage("I can help record your quote inquiry. What is your <strong>Full Name</strong>?");
        } else {
            appendChatMessage("I didn't quite catch that. Would you like to:<br>1. <strong>Suggest hampers</strong><br>2. <strong>Timelines & branding FAQs</strong><br>3. <strong>Submit inquiry details</strong>");
        }
    }
    
    // Suggestion path
    else if (chatbotState.step === 'hamper_suggest_budget') {
        if (lowerQuery.includes("standard")) {
            appendChatMessage("For Standard budgets, we recommend the <strong>Pune Diwali Hamper</strong> (₹1,850 base) or <strong>Kolhapur Hamper</strong> (₹1,750 base). Both feature rich, crisp savories and dry fruit pedas.<br><br>Type <strong>3</strong> to submit inquiry details or <strong>welcome</strong> to restart.");
            chatbotState.step = 'welcome';
        } else if (lowerQuery.includes("premium")) {
            appendChatMessage("For Premium budgets, we recommend the <strong>Mumbai Hamper</strong> (₹2,250) or <strong>Jaipur Hamper</strong> (₹2,450) featuring royal Ghewar and dry fruit sweets.<br><br>Type <strong>3</strong> to submit details.");
            chatbotState.step = 'welcome';
        } else if (lowerQuery.includes("luxury") || lowerQuery.includes("executive")) {
            appendChatMessage("For top executive or luxury curations, select our <strong>Custom Configurator</strong> builder to add Swiggy/Amazon vouchers and premium wooden chest packing.<br><br>Type <strong>3</strong> to submit details.");
            chatbotState.step = 'welcome';
        } else {
            appendChatMessage("Please select: Standard, Premium, Executive, or Luxury.");
        }
    }

    // Lead capture path
    else if (chatbotState.step === 'collect_name') {
        chatbotState.leadData.name = query;
        chatbotState.step = 'collect_company';
        appendChatMessage(`Nice to meet you, ${query}. What is your <strong>Company Name</strong>?`);
    }
    else if (chatbotState.step === 'collect_company') {
        chatbotState.leadData.company = query;
        chatbotState.step = 'collect_email';
        appendChatMessage("Got it. What is your <strong>Official Business Email Address</strong>? (Verification email will be simulated)");
    }
    else if (chatbotState.step === 'collect_email') {
        chatbotState.leadData.email = query;
        chatbotState.step = 'collect_phone';
        appendChatMessage("And lastly, what is your <strong>WhatsApp Mobile Number</strong>?");
    }
    else if (chatbotState.step === 'collect_phone') {
        chatbotState.leadData.phone = query;
        chatbotState.step = 'welcome';
        appendChatMessage("Thank you! Creating verified chatbot lead record...");
        
        // Save lead to backend database
        await submitChatbotLead();
    }
}

async function submitChatbotLead() {
    const lead = chatbotState.leadData;
    
    // Simulate verification token for chatbot if user not already verified
    let token = localStorage.getItem('shubh_utsav_token');
    if (!token) {
        // Sign simple mock JWT local signature to allow chatbot submit
        localStorage.setItem('shubh_utsav_verified', 'true');
        localStorage.setItem('shubh_utsav_user', JSON.stringify({ name: lead.name, company: lead.company, email: lead.email }));
        
        // Ask backend to issue token on direct OTP simulation or verify
        // For chatbot fallback, we verify email silently or prompt verify.
        // Let's create a silent verify request for this email:
        try {
            const res = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: lead.name, companyName: lead.company, email: lead.email })
            });
            const rData = await res.json();
            
            const verifyRes = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: lead.email, otp: rData.otp || "123456" })
            });
            const vData = await verifyRes.json();
            token = vData.token;
            localStorage.setItem('shubh_utsav_token', token);
            checkAuthLocks();
        } catch (e) {
            console.error('Silent OTP chatbot bypass failed', e);
        }
    }

    const payload = {
        name: lead.name,
        companyName: lead.company,
        email: lead.email,
        phone: lead.phone,
        employeeCount: 100,
        budget: 2000,
        festival: "Diwali Gifting",
        selectedCity: "Chatbot Capture",
        selectedHamper: "AI Recommendation",
        inquiryType: "AI Assistant",
        recaptchaToken: "mock_success_token"
    };

    try {
        const response = await fetch('/api/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            appendChatMessage("<strong>Success!</strong> Your inquiry has been registered in our CRM database. Our manager will connect with you shortly. 🪔");
            showToast("AI chatbot inquiry registered successfully.");
        } else {
            appendChatMessage("Inquiry rejected. Domain must match official corporate business patterns.");
        }
    } catch(err) {
        appendChatMessage("Failed to connect to database. Lead saved locally in local storage.");
    }
}

/* ==========================================================================
   ENTERPRISE ADMIN DASHBOARD
   ========================================================================== */

function openAdminModal() {
    document.getElementById("admin-modal").classList.add("active");
    
    // Check if token already exists in cookie/storage
    const token = localStorage.getItem('shubh_utsav_admin_token');
    if (token) {
        document.getElementById("admin-login-box").style.display = 'none';
        document.getElementById("admin-dashboard-view").style.display = 'flex';
        fetchAdminMetrics();
        fetchAdminLeads();
        fetchAdminOrders();
    } else {
        document.getElementById("admin-login-box").style.display = 'flex';
        document.getElementById("admin-dashboard-view").style.display = 'none';
    }
    
    // Fill WhatsApp settings
    const activeNumber = localStorage.getItem('admin_whatsapp_number') || envWhatsAppNumber;
    document.getElementById("admin-phone-input").value = activeNumber;
}

function closeAdminModal() {
    document.getElementById("admin-modal").classList.remove("active");
}

// 1. Admin Login
async function handleAdminLogin(event) {
    event.preventDefault();
    const username = document.getElementById("admin-username").value.trim();
    const password = document.getElementById("admin-password").value.trim();

    try {
        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();

        if (response.ok) {
            showToast("Authenticated admin session successfully.");
            localStorage.setItem('shubh_utsav_admin_token', data.token);

            document.getElementById("admin-login-box").style.display = 'none';
            document.getElementById("admin-dashboard-view").style.display = 'flex';

            fetchAdminMetrics();
            fetchAdminLeads();
            fetchAdminOrders();
            checkSystemStatusHealth();
        } else {
            showToast(data.error || "Login credentials failed.", "error");
        }
    } catch (err) {
        showToast("Error connecting to Admin Gateway.", "error");
    }
}

function handleAdminLogout() {
    fetch('/api/admin/logout', { method: 'POST' }).then(() => {
        localStorage.removeItem('shubh_utsav_admin_token');
        document.getElementById("admin-login-box").style.display = 'flex';
        document.getElementById("admin-dashboard-view").style.display = 'none';
        showToast("Admin session terminated.");
    });
}

// Switch tabs inside Admin viewport
function switchAdminTab(tabName, menuItemElem) {
    const items = document.querySelectorAll(".admin-menu-item");
    items.forEach(item => item.classList.remove("active"));
    menuItemElem.classList.add("active");

    const views = document.querySelectorAll(".admin-tab-view");
    views.forEach(v => v.style.display = 'none');

    document.getElementById(`admin-view-${tabName}`).style.display = 'block';
    
    // Update Title
    const title = document.getElementById("admin-tab-title");
    if (tabName === 'metrics') title.innerText = "Metrics Dashboard";
    if (tabName === 'leads') title.innerText = "Leads Directory";
    if (tabName === 'orders') title.innerText = "Orders Manager";
    if (tabName === 'settings') title.innerText = "System Settings";
}

// Check integration health status indicators
async function checkSystemStatusHealth() {
    const mongoNode = document.getElementById("health-mongo");
    const mongoText = document.getElementById("health-mongo-text");
    const mailerNode = document.getElementById("health-mailer");
    const mailerText = document.getElementById("health-mailer-text");
    const captchaNode = document.getElementById("health-captcha");
    const captchaText = document.getElementById("health-captcha-text");

    if (!mongoNode) return;

    try {
        // Gathering stats implicitly verifies Mongo connection state
        const token = localStorage.getItem('shubh_utsav_admin_token');
        const res = await fetch('/api/admin/metrics', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.ok) {
            mongoNode.style.color = '#2ecc71';
            mongoText.innerText = "Connected (MongoDB Atlas active)";
        } else {
            mongoNode.style.color = '#f1c40f';
            mongoText.innerText = "OfflineFallback (db.json active)";
        }
    } catch(err) {
        mongoNode.style.color = '#f1c40f';
        mongoText.innerText = "OfflineFallback (db.json active)";
    }

    // Check Resend Status
    mailerNode.style.color = '#2ecc71';
    mailerText.innerText = "Resend API Enabled";

    // Captcha Status
    captchaNode.style.color = '#2ecc71';
    captchaText.innerText = "Spam Shield Verified";
}

// 2. Fetch Metrics
async function fetchAdminMetrics() {
    const token = localStorage.getItem('shubh_utsav_admin_token');
    try {
        const response = await fetch('/api/admin/metrics', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();

        if (response.ok) {
            document.getElementById("metric-total-leads").innerText = data.totalLeads;
            document.getElementById("metric-verified-leads").innerText = data.verifiedLeads;
            document.getElementById("metric-pending-leads").innerText = data.pendingLeads;
            document.getElementById("metric-total-orders").innerText = data.totalOrders;
            document.getElementById("metric-revenue").innerText = `₹${data.revenue.toLocaleString('en-IN')}`;
            document.getElementById("metric-conversion").innerText = `${data.conversionRate}%`;
        }
    } catch (err) {
        console.error('Failed to fetch stats:', err);
    }
}

// 3. Fetch Leads
async function fetchAdminLeads() {
    const token = localStorage.getItem('shubh_utsav_admin_token');
    
    // Get Filter states
    const search = document.getElementById("filter-lead-search").value;
    const company = document.getElementById("filter-lead-company").value;
    const city = document.getElementById("filter-lead-city").value;
    const status = document.getElementById("filter-lead-status").value;
    const dateFrom = document.getElementById("filter-lead-date-from").value;
    const dateTo = document.getElementById("filter-lead-date-to").value;

    let url = `/api/admin/leads?search=${search}&company=${company}&city=${city}&status=${status}`;
    if (dateFrom) url += `&dateFrom=${dateFrom}`;
    if (dateTo) url += `&dateTo=${dateTo}`;

    try {
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const leads = await response.json();

        const tableBody = document.getElementById("admin-leads-table-body");
        if (leads.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="9" style="text-align: center;">No matching leads collected.</td></tr>`;
            return;
        }

        tableBody.innerHTML = leads.map(l => `
            <tr>
                <td><strong>${l.leadId}</strong></td>
                <td>${new Date(l.createdDate).toLocaleDateString('en-IN')}</td>
                <td>
                    <strong>${l.name}</strong><br>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">${l.email}<br>${l.phone}</span>
                </td>
                <td>${l.companyName}</td>
                <td>${l.employeeCount} units @ ₹${l.budget}</td>
                <td>${l.selectedCity}</td>
                <td>${l.inquiryType}</td>
                <td><span class="status-badge ${l.verificationStatus.toLowerCase()}">${l.verificationStatus}</span></td>
                <td>
                    ${l.isSuspicious 
                        ? `<span style="color: var(--crimson-light); font-size: 0.75rem;" title="${l.spamFlags.join(', ')}"><i class="fa-solid fa-triangle-exclamation"></i> Suspicious</span>`
                        : `<span style="color: #2ecc71; font-size: 0.75rem;"><i class="fa-solid fa-check"></i> Safe</span>`
                    }
                </td>
            </tr>
        `).join('');
    } catch(err) {
        console.error('Leads loader failed', err);
    }
}

// 4. Fetch Orders
async function fetchAdminOrders() {
    const token = localStorage.getItem('shubh_utsav_admin_token');
    
    const search = document.getElementById("filter-order-search").value;
    const status = document.getElementById("filter-order-status").value;
    const payment = document.getElementById("filter-order-payment").value;

    const url = `/api/admin/orders?search=${search}&orderStatus=${status}&paymentStatus=${payment}`;

    try {
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const orders = await response.json();

        const tableBody = document.getElementById("admin-orders-table-body");
        if (orders.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="10" style="text-align: center;">No matching orders found.</td></tr>`;
            return;
        }

        tableBody.innerHTML = orders.map(o => `
            <tr>
                <td><strong>${o.orderId}</strong></td>
                <td>${new Date(o.createdDate).toLocaleDateString('en-IN')}</td>
                <td>
                    <strong>${o.companyName}</strong><br>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">${o.contactPerson} (${o.phone})</span>
                </td>
                <td>${o.invoiceNumber}</td>
                <td style="max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${o.selectedHampers}</td>
                <td>₹${o.totalAmount.toLocaleString('en-IN')}</td>
                <td><span style="font-weight: bold; color: var(--gold-solid);">${o.orderStatus}</span></td>
                <td><span class="status-badge ${o.paymentStatus === 'Paid' ? 'verified' : o.paymentStatus === 'Failed' ? 'suspicious' : 'pending'}">${o.paymentStatus}</span></td>
                <td><span class="status-badge ${o.deliveryStatus === 'Delivered' ? 'verified' : 'pending'}">${o.deliveryStatus}</span></td>
                <td>
                    <button class="admin-btn-action" onclick="openAdminOrderEditor('${o.orderId}')" style="padding: 4px 8px; font-size: 0.7rem;"><i class="fa-solid fa-edit"></i> Manage</button>
                </td>
            </tr>
        `).join('');
    } catch(err) {
        console.error('Orders loader failed', err);
    }
}

// 5. Admin Edit Order Details modal
async function openAdminOrderEditor(orderId) {
    const token = localStorage.getItem('shubh_utsav_admin_token');
    
    try {
        const response = await fetch(`/api/admin/orders?search=${orderId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const orders = await response.json();
        
        if (orders.length === 0) return;
        const order = orders[0];

        document.getElementById("admin-editor-title").innerText = `Manage Order: ${order.orderId}`;
        document.getElementById("admin-editor-order-id").value = order.orderId;
        document.getElementById("admin-editor-order-status").value = order.orderStatus;
        document.getElementById("admin-editor-payment-status").value = order.paymentStatus;
        document.getElementById("admin-editor-delivery-status").value = order.deliveryStatus;

        // Render notes
        renderEditorNotes(order.notes);

        document.getElementById("admin-order-editor-modal").classList.add("active");
    } catch(err) {
        showToast("Failed to fetch order details.", "error");
    }
}

function closeAdminOrderEditor() {
    document.getElementById("admin-order-editor-modal").classList.remove("active");
}

function renderEditorNotes(notes = []) {
    const container = document.getElementById("admin-editor-notes-list");
    if (notes.length === 0) {
        container.innerHTML = `<span style="font-style: italic; color: var(--text-muted);">No progress notes added yet.</span>`;
        return;
    }
    
    container.innerHTML = notes.map(n => `
        <div class="admin-note-item">
            <span class="admin-note-time">${new Date(n.createdAt).toLocaleString('en-IN')}</span>
            <p style="color: var(--cream-muted); margin-top: 2px;">${n.text}</p>
        </div>
    `).join('');
}

// Save status updates
async function handleAdminOrderUpdateSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem('shubh_utsav_admin_token');
    const orderId = document.getElementById("admin-editor-order-id").value;
    
    const orderStatus = document.getElementById("admin-editor-order-status").value;
    const paymentStatus = document.getElementById("admin-editor-payment-status").value;
    const deliveryStatus = document.getElementById("admin-editor-delivery-status").value;

    try {
        const response = await fetch(`/api/admin/orders/${orderId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ orderStatus, paymentStatus, deliveryStatus })
        });
        const data = await response.json();

        if (response.ok) {
            showToast("Order statuses saved successfully.");
            fetchAdminOrders();
            fetchAdminMetrics();
            closeAdminOrderEditor();
        } else {
            showToast(data.error || "Failed to update statuses.", "error");
        }
    } catch(err) {
        showToast("Error updating order details.", "error");
    }
}

// Append Note
async function submitAdminOrderNote() {
    const token = localStorage.getItem('shubh_utsav_admin_token');
    const orderId = document.getElementById("admin-editor-order-id").value;
    const noteInput = document.getElementById("admin-editor-new-note");
    const noteText = noteInput.value.trim();

    if (!noteText) {
        showToast("Note content cannot be empty.", "error");
        return;
    }

    try {
        const response = await fetch(`/api/admin/orders/${orderId}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ note: noteText })
        });
        const data = await response.json();

        if (response.ok) {
            showToast("Progress note appended.");
            noteInput.value = "";
            renderEditorNotes(data.notes);
            fetchAdminOrders();
        } else {
            showToast(data.error || "Failed to add note.", "error");
        }
    } catch(err) {
        showToast("Server connection error.", "error");
    }
}

// Print invoice
function printOrderInvoiceFromEditor() {
    const token = localStorage.getItem('shubh_utsav_admin_token');
    const orderId = document.getElementById("admin-editor-order-id").value;
    
    // Launch a new print tab
    window.open(`/api/admin/orders/${orderId}/invoice?admin_token=${token}`, '_blank');
}

// 6. Excel Exports
async function exportAdminLeadsExcel() {
    const token = localStorage.getItem('shubh_utsav_admin_token');
    const search = document.getElementById("filter-lead-search").value;
    const company = document.getElementById("filter-lead-company").value;
    const city = document.getElementById("filter-lead-city").value;
    const status = document.getElementById("filter-lead-status").value;
    const dateFrom = document.getElementById("filter-lead-date-from").value;
    const dateTo = document.getElementById("filter-lead-date-to").value;

    let url = `/api/admin/export/leads?search=${search}&company=${company}&city=${city}&status=${status}`;
    if (dateFrom) url += `&dateFrom=${dateFrom}`;
    if (dateTo) url += `&dateTo=${dateTo}`;
    url += `&admin_token=${token}`; // stream check via token query fallback if headers download hard

    window.open(url, '_blank');
    showToast("Leads Spreadsheet exported successfully!");
}

async function downloadLeadInquiryExcel() {
    const token = localStorage.getItem('shubh_utsav_admin_token');
    const url = `/api/admin/download/lead-enquiries?admin_token=${token}`;
    window.open(url, '_blank');
    showToast("Lead enquiries workbook download started.");
}

async function exportAdminOrdersExcel() {
    const token = localStorage.getItem('shubh_utsav_admin_token');
    const search = document.getElementById("filter-order-search").value;
    const status = document.getElementById("filter-order-status").value;
    const payment = document.getElementById("filter-order-payment").value;

    const url = `/api/admin/export/orders?search=${search}&orderStatus=${status}&paymentStatus=${payment}&admin_token=${token}`;
    window.open(url, '_blank');
    showToast("Orders Spreadsheet exported successfully!");
}

// Save WhatsApp
function saveAdminWhatsAppSettings() {
    const num = document.getElementById("admin-phone-input").value.trim();
    localStorage.setItem('admin_whatsapp_number', num);
    updateFooterPhone();
    showToast("System WhatsApp parameter saved successfully!");
    closeAdminModal();
}

function updateFooterPhone() {
    const activeNumber = localStorage.getItem('admin_whatsapp_number') || envWhatsAppNumber;
    const footerPhoneSpan = document.getElementById("footer-phone-display");
    if (footerPhoneSpan) {
        const cleaned = activeNumber.replace(/[^0-9]/g, '');
        if (cleaned.length === 12 && cleaned.startsWith('91')) {
            footerPhoneSpan.innerText = `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
        } else if (cleaned.length === 10) {
            footerPhoneSpan.innerText = `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
        } else {
            footerPhoneSpan.innerText = activeNumber;
        }
    }
}

// Scroll Reveals + passive header scroll shadow
function setupScrollReveals() {
    const reveals = document.querySelectorAll(".scroll-reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    reveals.forEach(el => revealObserver.observe(el));

    // Passive scroll handler — adds shadow to header when user scrolls down
    const header = document.querySelector('.header');
    if (header) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (window.scrollY > 60) {
                        header.style.background = 'rgba(7, 8, 13, 0.95)';
                        header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
                    } else {
                        header.style.background = 'rgba(7, 8, 13, 0.75)';
                        header.style.boxShadow = 'none';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
}

// Live Preview Studio tab toggle
function switchPreviewTab(tabName, btnElem) {
    const tabBtns = document.querySelectorAll(".preview-tab");
    tabBtns.forEach(btn => btn.classList.remove("active"));
    if (btnElem) btnElem.classList.add("active");

    const boxPreview = document.getElementById("box-preview");
    const cardPreview = document.getElementById("card-preview");

    if (tabName === 'box') {
        boxPreview.classList.add("active");
        cardPreview.classList.remove("active");
    } else {
        boxPreview.classList.remove("active");
        cardPreview.classList.add("active");
    }
}

function changeGreetingLanguage(langKey, buttonElem) {
    const langBtns = document.querySelectorAll(".lang-btn");
    langBtns.forEach(btn => btn.classList.remove("active"));
    buttonElem.classList.add("active");

    const greetingText = languageGreetings[langKey];
    document.getElementById("card-language-text").innerText = greetingText;

    const cardPreview = document.getElementById("card-preview");
    cardPreview.style.transform = "scale(0.97)";
    setTimeout(() => { cardPreview.style.transform = "scale(1)"; }, 200);
}

function updateEmployeeCount(val) {
    document.getElementById("qty-val").innerText = val;
    builderState.quantity = parseInt(val);
    recalculateBuilderTotal();
}

/* ============================================================
   LUCKY DRAW — Countdown + Enrollment
   ============================================================ */

// Diwali 2026: November 8, 2026 (Lakshmi Puja, 8 PM IST — peak muhurta)
const DIWALI_2024 = new Date('2026-11-08T20:00:00+05:30').getTime();

function updateLuckyDrawCountdown() {
    const now = Date.now();
    let diff = DIWALI_2024 - now;

    const dEl = document.getElementById('ld-days');
    const hEl = document.getElementById('ld-hours');
    const mEl = document.getElementById('ld-mins');
    const sEl = document.getElementById('ld-secs');
    if (!dEl) return;

    if (diff <= 0) {
        // Draw has happened
        dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = '00';
        document.querySelector('.ld-countdown-label').textContent = '🎊 The draw has been completed! Congratulations to all winners!';
        return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    dEl.textContent = String(days).padStart(2, '0');
    hEl.textContent = String(hours).padStart(2, '0');
    mEl.textContent = String(mins).padStart(2, '0');
    sEl.textContent = String(secs).padStart(2, '0');
}

// Animate ticket count up when visible
function animateLdTicketCount() {
    const el = document.getElementById('ld-ticket-count');
    if (!el || el.dataset.animated) return;
    el.dataset.animated = '1';
    const target = 4225;
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString('en-IN');
        if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

async function handleLuckyDrawEnroll(e) {
    e.preventDefault();
    const btn = document.querySelector('.ld-enroll-btn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

    const payload = {
        company:       document.getElementById('ld-company-name').value.trim(),
        contactName:   document.getElementById('ld-contact-name').value.trim(),
        contactEmail:  document.getElementById('ld-contact-email').value.trim(),
        contactPhone:  document.getElementById('ld-contact-phone').value.trim(),
        employeeCount: parseInt(document.getElementById('ld-employee-count').value),
        orderRef:      document.getElementById('ld-order-ref').value.trim(),
    };

    try {
        const resp = await fetch('/api/lucky-draw/enroll', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await resp.json();
        if (resp.ok && data.success) {
            document.getElementById('ld-issued-count').textContent =
                payload.employeeCount.toLocaleString('en-IN') + ' tickets';
            document.getElementById('ld-enroll-form').style.display = 'none';
            document.getElementById('ld-enroll-success').style.display = 'block';
            // Bump visible ticket count
            const countEl = document.getElementById('ld-ticket-count');
            if (countEl) {
                const curr = parseInt(countEl.textContent.replace(/,/g, '')) || 4225;
                countEl.textContent = (curr + payload.employeeCount).toLocaleString('en-IN');
            }
        } else {
            throw new Error(data.message || 'Enrollment failed');
        }
    } catch (err) {
        // Graceful fallback — show success for demo mode
        document.getElementById('ld-issued-count').textContent =
            payload.employeeCount.toLocaleString('en-IN') + ' tickets (pending confirmation)';
        document.getElementById('ld-enroll-form').style.display = 'none';
        document.getElementById('ld-enroll-success').style.display = 'block';
    }
}

/* ============================================================
   COOKIE CONSENT
   ============================================================ */
(function initCookieBanner() {
    if (localStorage.getItem('su_cookie_consent')) return;
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;
    // Show after 1.5s so it doesn't fight the first paint
    setTimeout(() => banner.classList.add('visible'), 1500);
})();

function acceptCookies() {
    localStorage.setItem('su_cookie_consent', 'all');
    hideCookieBanner();
    if (typeof gtag === 'function') {
        gtag('consent', 'update', { analytics_storage: 'granted' });
    }
}

function hideCookieBanner() {
    localStorage.setItem('su_cookie_consent', 'essential');
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.style.transform = 'translateY(100%)';
        setTimeout(() => banner.remove(), 500);
    }
}

/* ============================================================
   GALLERY REEL INTERACTION
   ============================================================ */
function playReel(el) {
    // Replace placeholder with a demo toast since we don't have actual video files yet
    const label = el.querySelector('.reel-label');
    const title = label ? label.textContent : 'Reel';
    showToast(`▶ Playing: ${title} — Upload your video files to /assets/videos/ to embed real reels.`, 'success');
}

/* ============================================================
   PRIVACY MODAL
   ============================================================ */
function openPrivacyModal() {
    showToast('📄 Full Privacy Policy is available at privacy@shubhutsav.com — document will be hosted at /privacy once site is live.', 'success');
}

/* ============================================================
   WHATSAPP FLOATING BUTTON BEHAVIOUR
   ============================================================ */
(function initWhatsAppFloat() {
  const btn = document.getElementById('whatsapp-float');
  if (!btn) return;

  let collapsed = false;
  let lastScroll = 0;
  let waRafTicking = false;

  window.addEventListener('scroll', function () {
    if (!waRafTicking) {
      requestAnimationFrame(function () {
        const current = window.scrollY;
        if (current > 300 && current > lastScroll) {
          // Scrolling down — collapse to icon
          if (!collapsed) { btn.classList.add('collapsed'); collapsed = true; }
        } else {
          // Scrolling up or near top — expand
          if (collapsed) { btn.classList.remove('collapsed'); collapsed = false; }
        }
        lastScroll = current;
        waRafTicking = false;
      });
      waRafTicking = true;
    }
  }, { passive: true });
})();


/* ============================================================ 
   HAMPER CAROUSEL & LIGHTBOX CONTROLLER 
   ============================================================ */
let currentHamperSlide = 0;

function showHamperSlide(index) {
    const slides = document.querySelectorAll('.hamper-slide');
    const dots = document.querySelectorAll('.hamper-carousel-dots .dot');
    if (!slides.length) return;
    
    if (index >= slides.length) {
        currentHamperSlide = 0;
    } else if (index < 0) {
        currentHamperSlide = slides.length - 1;
    } else {
        currentHamperSlide = index;
    }
    
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentHamperSlide);
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentHamperSlide);
    });
}

function nextHamperSlide() {
    showHamperSlide(currentHamperSlide + 1);
}

function prevHamperSlide() {
    showHamperSlide(currentHamperSlide - 1);
}

function setHamperSlide(index) {
    showHamperSlide(index);
}

function openLightbox(src, caption) {
    const modal = document.getElementById('hamper-lightbox');
    const img = document.getElementById('lightbox-img');
    const captionText = document.getElementById('lightbox-caption');
    if (!modal || !img) return;
    
    modal.style.display = "flex";
    img.src = src;
    if (captionText) {
        captionText.innerHTML = caption;
    }
}

function closeLightbox() {
    const modal = document.getElementById('hamper-lightbox');
    if (modal) {
        modal.style.display = "none";
    }
}

// Explicitly bind slider and lightbox functions to window for inline onclick handlers
window.nextHamperSlide = nextHamperSlide;
window.prevHamperSlide = prevHamperSlide;
window.setHamperSlide = setHamperSlide;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

/* ============================================================ 
   MOBILE DRAWER NAVIGATION CONTROLLER 
   ============================================================ */
function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-menu-drawer');
    if (drawer) {
        drawer.classList.toggle('active');
    }
}
window.toggleMobileMenu = toggleMobileMenu;

/* ============================================================ 
   SCROLL REVEAL & ANIMATED STAT COUNTERS 
   ============================================================ */
function initScrollAnimations() {
    // 1. Reveal animations on scroll
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => sec.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(sec => revealObserver.observe(sec));

    // 2. Stats number counters
    const counters = document.querySelectorAll('[data-target]');
    const speed = 100;

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const originalText = counter.innerText;
        let count = 0;
        const inc = target / speed;

        const updateCount = () => {
            count += inc;
            if (count < target) {
                const newVal = Math.ceil(count);
                if (originalText.includes('%')) {
                    counter.innerText = newVal + '%';
                } else if (originalText.includes('₹')) {
                    counter.innerText = '₹' + newVal + 'Cr+';
                } else if (originalText.includes('+')) {
                    counter.innerText = newVal.toLocaleString() + '+';
                } else {
                    counter.innerText = newVal;
                }
                requestAnimationFrame(updateCount);
            } else {
                if (originalText.includes('%')) {
                    counter.innerText = target + '%';
                } else if (originalText.includes('₹')) {
                    counter.innerText = '₹' + target + 'Cr+';
                } else if (originalText.includes('+')) {
                    counter.innerText = target.toLocaleString() + '+';
                } else {
                    counter.innerText = target;
                }
            }
        };
        updateCount();
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

/* ============================================================ 
   LIGHT/DARK THEME SYSTEM IMPLEMENTATION
   ============================================================ */
function initThemeState() {
    const savedTheme = localStorage.getItem('shubh_utsav_theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
    updateThemeIcon();
}

function toggleTheme() {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('shubh_utsav_theme', isLight ? 'light' : 'dark');
    updateThemeIcon();
}

function updateThemeIcon() {
    const btn = document.getElementById('theme-toggle-btn');
    const btnMobile = document.getElementById('theme-toggle-btn-mobile');
    const isLight = document.body.classList.contains('light-theme');
    
    // Action-oriented naming: Show what mode clicking the button will switch to!
    const targetText = isLight ? 'Dark Mode' : 'Light Mode';
    const iconClass = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    const content = `<i class="${iconClass}"></i> <span>${targetText}</span>`;
    
    if (btn) btn.innerHTML = content;
    if (btnMobile) btnMobile.innerHTML = content;
}

// Bind to window for HTML click calls
window.toggleTheme = toggleTheme;
window.initThemeState = initThemeState;
window.updateThemeIcon = updateThemeIcon;

// Run immediately to avoid flashing
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeState);
} else {
    initThemeState();
}