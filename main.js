// Main JavaScript for Ovarna Modern Website
// Interactive components and animations

class OvarnaApp {
    constructor() {
        this.currentServiceCategory = 'private';
        this.serviceCalculatorStep = 1;
        this.init();
    }

    init() {
        this.setupServiceSelector();
        this.setupServiceCalculator();
        this.setupLiveChat();
        this.setupScrollAnimations();
        this.setupServiceFilter();
        this.setupFormValidation();
        this.initBackgroundEffects();
    }

    // Service Category Selector
    setupServiceSelector() {
        const privateBtn = document.getElementById('private-customer');
        const businessBtn = document.getElementById('business-customer');
        const privateServices = document.getElementById('private-services');
        const businessServices = document.getElementById('business-services');

        if (privateBtn && businessBtn) {
            privateBtn.addEventListener('click', () => {
                this.switchServiceCategory('private');
            });

            businessBtn.addEventListener('click', () => {
                this.switchServiceCategory('business');
            });
        }
    }

    switchServiceCategory(category) {
        const privateBtn = document.getElementById('private-customer');
        const businessBtn = document.getElementById('business-customer');
        const privateServices = document.getElementById('private-services');
        const businessServices = document.getElementById('business-services');

        this.currentServiceCategory = category;

        if (category === 'private') {
            privateBtn.classList.add('active');
            businessBtn.classList.remove('active');
            
            if (privateServices && businessServices) {
                anime({
                    targets: businessServices,
                    opacity: 0,
                    translateY: 20,
                    duration: 300,
                    complete: () => {
                        businessServices.style.display = 'none';
                        privateServices.style.display = 'grid';
                        anime({
                            targets: privateServices,
                            opacity: [0, 1],
                            translateY: [20, 0],
                            duration: 400,
                            delay: anime.stagger(100)
                        });
                    }
                });
            }
        } else {
            businessBtn.classList.add('active');
            privateBtn.classList.remove('active');
            
            if (privateServices && businessServices) {
                anime({
                    targets: privateServices,
                    opacity: 0,
                    translateY: 20,
                    duration: 300,
                    complete: () => {
                        privateServices.style.display = 'none';
                        businessServices.style.display = 'grid';
                        anime({
                            targets: businessServices,
                            opacity: [0, 1],
                            translateY: [20, 0],
                            duration: 400,
                            delay: anime.stagger(100)
                        });
                    }
                });
            }
        }
    }

    // Service Calculator
    setupServiceCalculator() {
        const calculator = document.getElementById('service-calculator');
        if (!calculator) return;

        const nextBtns = calculator.querySelectorAll('.next-step');
        const prevBtns = calculator.querySelectorAll('.prev-step');
        const steps = calculator.querySelectorAll('.calc-step');

        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.validateCalculatorStep()) {
                    this.nextCalculatorStep();
                }
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.prevCalculatorStep();
            });
        });

        this.updateCalculatorProgress();
    }

    nextCalculatorStep() {
        const currentStep = document.querySelector(`.calc-step[data-step="${this.serviceCalculatorStep}"]`);
        const nextStep = document.querySelector(`.calc-step[data-step="${this.serviceCalculatorStep + 1}"]`);

        if (nextStep) {
            anime({
                targets: currentStep,
                opacity: 0,
                translateX: -50,
                duration: 300,
                complete: () => {
                    currentStep.classList.remove('active');
                    nextStep.classList.add('active');
                    anime({
                        targets: nextStep,
                        opacity: [0, 1],
                        translateX: [50, 0],
                        duration: 400
                    });
                }
            });

            this.serviceCalculatorStep++;
            this.updateCalculatorProgress();
        }
    }

    prevCalculatorStep() {
        const currentStep = document.querySelector(`.calc-step[data-step="${this.serviceCalculatorStep}"]`);
        const prevStep = document.querySelector(`.calc-step[data-step="${this.serviceCalculatorStep - 1}"]`);

        if (prevStep) {
            anime({
                targets: currentStep,
                opacity: 0,
                translateX: 50,
                duration: 300,
                complete: () => {
                    currentStep.classList.remove('active');
                    prevStep.classList.add('active');
                    anime({
                        targets: prevStep,
                        opacity: [0, 1],
                        translateX: [-50, 0],
                        duration: 400
                    });
                }
            });

            this.serviceCalculatorStep--;
            this.updateCalculatorProgress();
        }
    }

    updateCalculatorProgress() {
        const progressBar = document.querySelector('.calc-progress-bar');
        const progressText = document.querySelector('.calc-progress-text');
        
        if (progressBar) {
            const progress = (this.serviceCalculatorStep / 4) * 100;
            anime({
                targets: progressBar,
                width: `${progress}%`,
                duration: 300,
                easing: 'easeOutQuad'
            });
        }

        if (progressText) {
            progressText.textContent = `Schritt ${this.serviceCalculatorStep} von 4`;
        }
    }

    validateCalculatorStep() {
        const currentStep = document.querySelector(`.calc-step[data-step="${this.serviceCalculatorStep}"]`);
        const requiredFields = currentStep.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showFieldError(field, 'Dieses Feld ist erforderlich');
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        });

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        let errorElement = field.parentNode.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message text-red-500 text-sm mt-1';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Live Chat Widget
    setupLiveChat() {
        const chatWidget = document.getElementById('live-chat-widget');
        const chatToggle = document.getElementById('chat-toggle');
        const chatClose = document.getElementById('chat-close');

        if (chatToggle) {
            chatToggle.addEventListener('click', () => {
                this.toggleChatWidget();
            });
        }

        if (chatClose) {
            chatClose.addEventListener('click', () => {
                this.closeChatWidget();
            });
        }
    }

    toggleChatWidget() {
        const chatWidget = document.getElementById('live-chat-widget');
        const isOpen = chatWidget.classList.contains('open');

        if (isOpen) {
            this.closeChatWidget();
        } else {
            this.openChatWidget();
        }
    }

    openChatWidget() {
        const chatWidget = document.getElementById('live-chat-widget');
        chatWidget.classList.add('open');
        
        anime({
            targets: chatWidget,
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutBack'
        });
    }

    closeChatWidget() {
        const chatWidget = document.getElementById('live-chat-widget');
        
        anime({
            targets: chatWidget,
            scale: [1, 0.8],
            opacity: [1, 0],
            duration: 200,
            complete: () => {
                chatWidget.classList.remove('open');
            }
        });
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(el => observer.observe(el));
    }

    animateElement(element) {
        const animationType = element.dataset.animation || 'fadeInUp';
        
        switch (animationType) {
            case 'fadeInUp':
                anime({
                    targets: element,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 600,
                    easing: 'easeOutQuad'
                });
                break;
            case 'fadeInLeft':
                anime({
                    targets: element,
                    opacity: [0, 1],
                    translateX: [-30, 0],
                    duration: 600,
                    easing: 'easeOutQuad'
                });
                break;
            case 'scaleIn':
                anime({
                    targets: element,
                    opacity: [0, 1],
                    scale: [0.9, 1],
                    duration: 600,
                    easing: 'easeOutBack'
                });
                break;
        }
    }

    // Service Filter
    setupServiceFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const serviceCards = document.querySelectorAll('.service-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.filterServices(filter);
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    filterServices(filter) {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            const cardCategory = card.dataset.category;
            
            if (filter === 'all' || cardCategory === filter) {
                anime({
                    targets: card,
                    opacity: [0, 1],
                    scale: [0.8, 1],
                    duration: 400,
                    complete: () => {
                        card.style.display = 'block';
                    }
                });
            } else {
                anime({
                    targets: card,
                    opacity: [1, 0],
                    scale: [1, 0.8],
                    duration: 300,
                    complete: () => {
                        card.style.display = 'none';
                    }
                });
            }
        });
    }

    // Form Validation
    setupFormValidation() {
        const forms = document.querySelectorAll('.validated-form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.validateForm(form);
            });
        });
    }

    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            this.submitForm(form);
        }
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;

        // Required field check
        if (!value) {
            this.showFieldError(field, 'Dieses Feld ist erforderlich');
            return false;
        }

        // Email validation
        if (type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
                return false;
            }
        }

        // Phone validation
        if (type === 'tel') {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                this.showFieldError(field, 'Bitte geben Sie eine gültige Telefonnummer ein');
                return false;
            }
        }

        this.clearFieldError(field);
        return true;
    }

    submitForm(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Wird gesendet...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            this.showSuccessMessage('Vielen Dank! Wir werden uns bald bei Ihnen melden.');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        successDiv.textContent = message;
        
        document.body.appendChild(successDiv);
        
        anime({
            targets: successDiv,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 400,
            complete: () => {
                setTimeout(() => {
                    anime({
                        targets: successDiv,
                        translateX: [0, 300],
                        opacity: [1, 0],
                        duration: 400,
                        complete: () => {
                            successDiv.remove();
                        }
                    });
                }, 3000);
            }
        });
    }

    // Background Effects
    initBackgroundEffects() {
        this.createFloatingParticles();
        this.initGradientFlow();
    }

    createFloatingParticles() {
        const canvas = document.getElementById('background-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    initGradientFlow() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        let gradientAngle = 0;
        
        function updateGradient() {
            gradientAngle += 0.5;
            const gradient = `linear-gradient(${gradientAngle}deg, rgba(30, 58, 138, 0.1), rgba(59, 130, 246, 0.1))`;
            heroSection.style.background = gradient;
            requestAnimationFrame(updateGradient);
        }
        
        updateGradient();
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new OvarnaApp();
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

// Smooth scrolling for anchor links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});