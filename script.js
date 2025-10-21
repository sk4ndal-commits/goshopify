// ===== DOM ELEMENTS =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const testimonialCarousel = document.getElementById('testimonial-carousel');
const testimonialDots = document.querySelectorAll('.dot');
const faqItems = document.querySelectorAll('.faq__item');
const langButtons = document.querySelectorAll('.lang-btn');

// ===== LANGUAGE FUNCTIONALITY =====
let currentLanguage = 'de'; // Default to German

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-de], [data-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else if (element.tagName === 'OPTION') {
                element.textContent = text;
            } else {
                // Use innerHTML instead of textContent to allow HTML formatting
                element.innerHTML = text;
            }
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update page title and meta description
    const title = lang === 'de' 
        ? 'Shopify Berater - Wir helfen lokalen Unternehmen online zu gehen'
        : 'Shopify Consultants - We Help Local Businesses Go Online';
    const description = lang === 'de'
        ? 'Professionelle Shopify-Beratung für KMU. Vom physischen Geschäft zu Online-Verkäufen in 30 Tagen - ohne technischen Stress.'
        : 'Professional Shopify consulting for SMEs. From physical shop to online sales in 30 days without tech stress.';
    
    document.title = title;
    document.querySelector('meta[name="description"]').content = description;
    
    // Update active language button
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Store language preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Update modal content if any modal is open
    updateModalLanguageOnSwitch();
}

// Language button event listeners
langButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.dataset.lang;
        switchLanguage(lang);
    });
});

// Load preferred language on page load
function loadPreferredLanguage() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && (savedLang === 'de' || savedLang === 'en')) {
        switchLanguage(savedLang);
    } else {
        // Default to German
        switchLanguage('de');
    }
}

// ===== MOBILE MENU TOGGLE =====
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        navToggle.classList.toggle('active');
    });
}

// ===== CLOSE MOBILE MENU ON LINK CLICK =====
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        navToggle.classList.remove('active');
    });
});

// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL EFFECTS =====
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    // Header background on scroll
    if (scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
    
    // Show/hide back to top button
    if (scrollY >= 560) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
    
    // Reveal animations
    revealElements();
    
    // Active nav link highlighting
    highlightActiveSection();
});

// ===== BACK TO TOP FUNCTIONALITY =====
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== FADE IN ANIMATIONS =====
function revealElements() {
    const reveals = document.querySelectorAll('.fade-in');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// ===== ACTIVE SECTION HIGHLIGHTING =====
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

// ===== FORM VALIDATION AND SUBMISSION =====
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmission);
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const companySize = formData.get('company-size');
    const industry = formData.get('industry').trim();
    const goals = formData.get('goals').trim();
    const message = formData.get('message').trim();
    
    // Clear previous errors
    clearFormErrors();
    
    let isValid = true;
    
    // Validate name
    if (name.length < 2) {
        showFormError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Validate email
    if (!isValidEmail(email)) {
        showFormError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate company size
    if (!companySize) {
        showFormError('company-size', 'Please select your company size');
        isValid = false;
    }
    
    // Validate goals
    if (goals.length < 10) {
        showFormError('goals', 'Please describe your goals (minimum 10 characters)');
        isValid = false;
    }
    
    // Industry is optional, no validation needed
    // Message is optional, no validation needed
    
    if (isValid) {
        submitForm(formData);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (field && errorElement) {
        field.classList.add('error');
        // Show error message in current language
        const errorMessages = {
            de: {
                name: 'Name muss mindestens 2 Zeichen lang sein',
                email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
                'company-size': 'Bitte wählen Sie Ihre Unternehmensgröße aus',
                goals: 'Bitte beschreiben Sie Ihre Ziele (mindestens 10 Zeichen)',
                message: 'Nachricht muss mindestens 10 Zeichen lang sein'
            },
            en: {
                name: 'Name must be at least 2 characters long',
                email: 'Please enter a valid email address',
                'company-size': 'Please select your company size',
                goals: 'Please describe your goals (minimum 10 characters)',
                message: 'Message must be at least 10 characters long'
            }
        };
        errorElement.textContent = errorMessages[currentLanguage][fieldName] || message;
    }
}

function clearFormErrors() {
    const formInputs = contactForm.querySelectorAll('.form__input');
    const errorElements = contactForm.querySelectorAll('.form__error');
    
    formInputs.forEach(input => {
        input.classList.remove('error', 'success');
    });
    
    errorElements.forEach(error => {
        error.textContent = '';
    });
}

function submitForm(formData) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.classList.add('loading');
    const loadingText = currentLanguage === 'de' ? 'Wird gesendet...' : 'Sending...';
    submitBtn.textContent = loadingText;
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Mark fields as success
        const formInputs = contactForm.querySelectorAll('.form__input');
        formInputs.forEach(input => {
            input.classList.add('success');
        });
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.classList.remove('loading');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Clear success classes after a delay
        setTimeout(() => {
            formInputs.forEach(input => {
                input.classList.remove('success');
            });
        }, 3000);
        
    }, 2000);
}

function showSuccessMessage() {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    
    const successText = currentLanguage === 'de' 
        ? '✓ Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.'
        : '✓ Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.';
    
    successMessage.innerHTML = `
        <div style="
            background-color: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
            text-align: center;
            font-weight: 500;
        ">
            ${successText}
        </div>
    `;
    
    // Insert after form
    contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// ===== TESTIMONIAL CAROUSEL =====
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current testimonial and activate corresponding dot
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
        testimonialDots[index].classList.add('active');
    }
}

// Dot click handlers
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-rotate testimonials
function autoRotateTestimonials() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Start auto-rotation
if (testimonials.length > 1) {
    setInterval(autoRotateTestimonials, 5000);
}

// ===== FAQ ACCORDION =====
faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
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

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
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

// Throttle function for scroll events
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

// ===== OPTIMIZED SCROLL HANDLER =====
const optimizedScrollHandler = throttle(() => {
    const scrollY = window.pageYOffset;
    
    // Header background on scroll
    if (scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
    
    // Show/hide back to top button
    if (scrollY >= 560) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
    
    // Active nav link highlighting
    highlightActiveSection();
}, 16); // ~60fps

// Replace the original scroll event listener
window.removeEventListener('scroll', () => {});
window.addEventListener('scroll', optimizedScrollHandler);

// ===== KEYBOARD NAVIGATION SUPPORT =====
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        navToggle.classList.remove('active');
    }
    
    // Navigate testimonials with arrow keys
    if (e.key === 'ArrowLeft' && testimonials.length > 1) {
        currentTestimonial = currentTestimonial > 0 ? currentTestimonial - 1 : testimonials.length - 1;
        showTestimonial(currentTestimonial);
    }
    
    if (e.key === 'ArrowRight' && testimonials.length > 1) {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
});

// ===== PERFORMANCE OPTIMIZATIONS =====

// Preload critical resources
function preloadResources() {
    const criticalLinks = document.querySelectorAll('a[href^="#"]');
    criticalLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const targetId = link.getAttribute('href');
            // Skip if targetId is just '#' or empty
            if (targetId && targetId !== '#' && targetId.length > 1) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                // Preload any images in the target section
                const images = targetSection.querySelectorAll('img');
                images.forEach(img => {
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                });
                }
            }
        });
    });
}

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Add ARIA labels and roles
function enhanceAccessibility() {
    // Add role to navigation
    const nav = document.querySelector('.nav');
    if (nav) {
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Main navigation');
    }
    
    // Add aria-expanded to mobile menu toggle
    if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        
        navToggle.addEventListener('click', () => {
            const isExpanded = navMenu.classList.contains('show');
            navToggle.setAttribute('aria-expanded', isExpanded.toString());
        });
    }
    
    // Add aria-labels to form inputs
    const formInputs = document.querySelectorAll('.form__input');
    formInputs.forEach(input => {
        const placeholder = input.getAttribute('placeholder');
        if (placeholder && !input.getAttribute('aria-label')) {
            input.setAttribute('aria-label', placeholder);
        }
    });
    
    // Add aria-labels to social links
    const socialLinks = document.querySelectorAll('.social__link');
    socialLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('linkedin')) {
            link.setAttribute('aria-label', 'Visit our LinkedIn profile');
        } else if (href && href.includes('mailto')) {
            link.setAttribute('aria-label', 'Send us an email');
        }
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Load preferred language first
    loadPreferredLanguage();
    
    // Initial reveal for elements in viewport
    revealElements();
    
    // Initialize accessibility enhancements
    enhanceAccessibility();
    
    // Preload resources for better performance
    preloadResources();
    
    // Set initial testimonial
    if (testimonials.length > 0) {
        showTestimonial(0);
    }
    
    // Add loading complete class to body
    document.body.classList.add('loaded');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// ===== PROGRESSIVE ENHANCEMENT =====
// Check for browser support and provide fallbacks
function checkBrowserSupport() {
    // Check for IntersectionObserver support
    if (!window.IntersectionObserver) {
        // Fallback: add visible class to all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }
    
    // Check for CSS Grid support
    if (!CSS.supports('display', 'grid')) {
        // Add fallback class for flexbox layout
        document.body.classList.add('no-grid');
    }
    
    // Check for smooth scroll support
    if (!CSS.supports('scroll-behavior', 'smooth')) {
        // Fallback is already implemented in the smooth scroll function
        console.log('Smooth scroll not supported, using JavaScript fallback');
    }
}

checkBrowserSupport();

// ===== ANALYTICS EVENTS =====
function trackEvent(eventName, eventData = {}) {
    // Example analytics tracking - replace with your analytics service
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    console.log('Event tracked:', eventName, eventData);
}

// Track important user interactions
document.addEventListener('click', (e) => {
    const target = e.target;
    
    // Track CTA button clicks
    if (target.matches('.btn--primary')) {
        trackEvent('cta_click', {
            button_text: target.textContent.trim(),
            section: target.closest('section')?.id || 'unknown'
        });
    }
    
    // Track service card interactions
    if (target.matches('.service__link')) {
        trackEvent('service_interest', {
            service: target.closest('.service__card')?.querySelector('.service__title')?.textContent.trim()
        });
    }
    
    // Track social link clicks
    if (target.matches('.social__link') || target.closest('.social__link')) {
        const link = target.closest('.social__link') || target;
        const href = link.getAttribute('href');
        trackEvent('social_click', {
            platform: href.includes('linkedin') ? 'linkedin' : 'email'
        });
    }
});

// Track form submissions
if (contactForm) {
    contactForm.addEventListener('submit', () => {
        trackEvent('form_submit', {
            form_type: 'contact'
        });
    });
}

// Track scroll depth
let maxScrollDepth = 0;
window.addEventListener('scroll', throttle(() => {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Track milestone scroll depths
        if ([25, 50, 75, 90].includes(scrollDepth)) {
            trackEvent('scroll_depth', {
                depth: scrollDepth
            });
        }
    }
}, 1000));

// ===== MODAL FUNCTIONALITY =====
const modalTriggers = document.querySelectorAll('.modal-trigger');
const modals = document.querySelectorAll('.modal');
const modalCloses = document.querySelectorAll('.modal__close');
let currentOpenModal = null;

// Update modal language when language is switched
function updateModalLanguageOnSwitch() {
    if (currentOpenModal) {
        updateModalLanguage(currentOpenModal);
    }
}

// Open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Close any currently open modal
        if (currentOpenModal) {
            closeModal(currentOpenModal.id);
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        currentOpenModal = modal;
        
        // Update modal content based on current language
        updateModalLanguage(modal);
        
        // Track modal opening
        trackEvent('modal_open', {
            modal_type: modalId.replace('-modal', '')
        });
        
        // Focus trap
        trapFocus(modal);
    }
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        currentOpenModal = null;
        
        // Track modal closing
        trackEvent('modal_close', {
            modal_type: modalId.replace('-modal', '')
        });
    }
}

// Update modal content based on current language
function updateModalLanguage(modal) {
    const elementsWithLang = modal.querySelectorAll('[data-de][data-en]');
    
    elementsWithLang.forEach(element => {
        const content = element.getAttribute(`data-${currentLanguage}`);
        if (content) {
            element.innerHTML = content;
        }
    });
}

// Focus trap for accessibility
function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Focus first element
    if (firstElement) {
        firstElement.focus();
    }
    
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// Event listeners for modal triggers
modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = trigger.getAttribute('data-modal');
        if (modalId) {
            openModal(modalId);
        }
    });
});

// Event listeners for modal close buttons
modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = closeBtn.getAttribute('data-modal');
        if (modalId) {
            closeModal(modalId);
        }
    });
});

// Close modal when clicking outside
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal.id);
        }
    });
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentOpenModal) {
        closeModal(currentOpenModal.id);
    }
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        showTestimonial,
        trackEvent,
        openModal,
        closeModal
    };
}