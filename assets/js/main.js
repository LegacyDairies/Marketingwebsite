/**
 * Main Application JavaScript
 * Handles core functionality including modal interactions,
 * scrolling behavior, and navigation
 */

// ===== MODULE: Login Modal Management =====
const LoginModal = {
    // DOM Elements
    backdrop: null,
    modal: null,
    loginBtn: null,
    closeBtn: null,
    cancelBtn: null,
    loginForm: null,

    /**
     * Initialize login modal functionality
     */
    init() {
        this.cacheElements();
        this.bindEvents();
    },

    /**
     * Cache DOM elements for better performance
     */
    cacheElements() {
        this.backdrop = document.getElementById('loginBackdrop');
        this.modal = document.getElementById('loginModal');
        this.loginBtn = document.getElementById('loginBtn');
        this.closeBtn = document.getElementById('closeLoginBtn');
        this.cancelBtn = document.getElementById('cancelLoginBtn');
        this.loginForm = document.getElementById('loginForm');
    },

    /**
     * Bind event listeners to modal elements
     */
    bindEvents() {
        if (this.loginBtn) {
            this.loginBtn.addEventListener('click', () => this.open());
        }

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        if (this.cancelBtn) {
            this.cancelBtn.addEventListener('click', () => this.close());
        }

        if (this.backdrop) {
            this.backdrop.addEventListener('click', (e) => {
                // Close modal only if clicking on backdrop, not modal content
                if (e.target === this.backdrop) {
                    this.close();
                }
            });
        }

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.backdrop && this.backdrop.classList.contains('active')) {
                this.close();
            }
        });

        // Prevent form submission
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Show coming soon message (already displayed in modal)
            });
        }
    },

    /**
     * Open login modal with animation
     */
    open() {
        if (!this.backdrop) return;

        this.backdrop.classList.add('active');
        this.backdrop.classList.remove('closing');
        document.body.style.overflow = 'hidden';

        // Announce to screen readers
        this.modal?.setAttribute('aria-hidden', 'false');
        this.closeBtn?.focus();
    },

    /**
     * Close login modal with animation
     */
    close() {
        if (!this.backdrop) return;

        this.backdrop.classList.add('closing');
        
        setTimeout(() => {
            this.backdrop.classList.remove('active');
            this.backdrop.classList.remove('closing');
            document.body.style.overflow = '';
            
            // Announce to screen readers
            this.modal?.setAttribute('aria-hidden', 'true');
            this.loginBtn?.focus();
        }, 300); // Match CSS animation duration
    }
};

// ===== MODULE: Scroll & Header Management =====
const ScrollManager = {
    header: null,
    indicator: null,
    lastScrollY: 0,

    /**
     * Initialize scroll behavior
     */
    init() {
        this.header = document.getElementById('mainHeader') || document.querySelector('header');
        this.indicator = document.querySelector('.scroll-indicator');
        
        window.addEventListener('scroll', () => this.onScroll());
        // Trigger once on load
        this.onScroll();
    },

    /**
     * Handle scroll events
     */
    onScroll() {
        this.lastScrollY = window.scrollY;

        // Add/remove scrolled class on header
        if (this.header) {
            if (this.lastScrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        }

        // Scroll reveal animation
        this.revealOnScroll();

        // Hide scroll indicator after scroll
        if (this.indicator) {
            if (this.lastScrollY > 100) {
                this.indicator.style.opacity = '0';
                this.indicator.style.pointerEvents = 'none';
            } else {
                this.indicator.style.opacity = '1';
                this.indicator.style.pointerEvents = 'auto';
            }
        }
    },

    /**
     * Reveal elements as they come into view
     */
    revealOnScroll() {
        const reveals = document.querySelectorAll('.scroll-reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
};

// ===== MODULE: Navigation =====
const Navigation = {
    /**
     * Initialize smooth scrolling for anchor links
     */
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleAnchorClick(e));
        });
    },

    /**
     * Handle smooth scroll to anchor
     */
    handleAnchorClick(e) {
        const href = e.currentTarget.getAttribute('href');
        
        // Skip if it's the login modal
        if (href === '#loginBackdrop') {
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
};

// ===== MODULE: Button Interactions =====
const ButtonHandler = {
    /**
     * Initialize button event handlers
     */
    init() {
        const buttons = document.querySelectorAll('.btn:not(#closeLoginBtn):not(#cancelLoginBtn):not([disabled])');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => this.handleButtonClick(e, button));
        });
    },

    /**
     * Handle button click with visual feedback
     */
    handleButtonClick(e, button) {
        // Log button action for analytics/debugging
        console.log('Button clicked:', button.textContent.trim());

        // Add active state feedback
        button.style.transform = 'scale(0.98)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
};

// ===== MODULE: Form Validation (Future Enhancement) =====
const FormValidator = {
    /**
     * Validate email format
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Validate password strength
     */
    isValidPassword(password) {
        return password && password.length >= 8;
    },

    /**
     * Add error state to form group
     */
    addError(formGroup, message) {
        formGroup.classList.add('has-error');
        const errorEl = formGroup.querySelector('.form-error');
        if (errorEl) {
            errorEl.textContent = message;
        }
    },

    /**
     * Remove error state from form group
     */
    removeError(formGroup) {
        formGroup.classList.remove('has-error');
    }
};

// ===== MODULE: Atelier Engine (RoughJS, GSAP, Lenis) =====
const AtelierEngine = {
    lenis: null,
    
    init() {
        this.initLenis();
        this.bindSketchButtons();
        this.bindPillarCards();
        // Delay GSAP reveals slightly to let rough.js render
        setTimeout(() => this.initScrollReveals(), 200);
    },
    
    initLenis() {
        if (typeof Lenis !== 'undefined') {
            this.lenis = new Lenis({
                lerp: 0.08,
                smoothWheel: true,
                direction: 'vertical',
            });
            
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);
                this.lenis.on('scroll', ScrollTrigger.update);
                gsap.ticker.add((time) => {
                    this.lenis.raf(time * 1000);
                });
                gsap.ticker.lagSmoothing(0);
            }
            
            // Override native smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = e.currentTarget.getAttribute('href');
                    if (href !== '#loginBackdrop' && href !== '#') {
                        e.preventDefault();
                        this.lenis.scrollTo(href);
                    }
                });
            });
        }
    },
    
    bindSketchButtons() {
        if (typeof rough === 'undefined') return;
        
        const buttons = document.querySelectorAll('.btn-sketch');
        buttons.forEach(btn => {
            const baseContainer = btn.querySelector('.rough-canvas-base');
            const fillContainer = btn.querySelector('.rough-canvas-fill');
            const color = btn.getAttribute('data-color') || '#5c544d';
            
            const createSVG = (container) => {
                if (!container) return null;
                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("width", "100%");
                svg.setAttribute("height", "100%");
                svg.style.position = "absolute";
                svg.style.inset = "0";
                container.appendChild(svg);
                return { svg, rc: rough.svg(svg) };
            };

            const baseSet = baseContainer ? createSVG(baseContainer) : null;
            const fillSet = createSVG(fillContainer);
            if (!fillSet) return;
            
            setTimeout(() => {
                if (baseSet) {
                    const w = baseContainer.offsetWidth;
                    const h = baseContainer.offsetHeight;

                    const baseSketch = baseSet.rc.rectangle(5, 5, w - 10, h - 10, {
                        roughness: 2,
                        stroke: '#2a2421',
                        strokeWidth: 1.5,
                        fill: 'transparent',
                        bowing: 1,
                        disableMultiStroke: true
                    });
                    baseSet.svg.appendChild(baseSketch);
                    
                    const basePaths = Array.from(baseSet.svg.querySelectorAll('path'));
                    basePaths.forEach(p => {
                        const len = p.getTotalLength();
                        p.style.strokeDasharray = `${len}px`;
                        p.style.strokeDashoffset = `${len}px`;
                        p.style.transition = 'none';
                    });
                    
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            basePaths.forEach((p, i) => {
                                const delay = i * 0.3;
                                p.style.transition = `stroke-dashoffset 0.8s ease-out ${delay}s`;
                                p.style.strokeDashoffset = '0px';
                            });
                        });
                    });
                }

                // Helper to draw dynamic underline
                function generateUnderline(svg, rc, btn, cx) {
                    const textSpan = btn.querySelector('.btn-text');
                    if (!textSpan) return;
                    
                    const textRect = textSpan.getBoundingClientRect();
                    const btnRect = btn.getBoundingClientRect();
                    
                    const textX = textRect.left - btnRect.left;
                    const textY = (textRect.bottom - btnRect.top) - 2; 
                    const textW = textRect.width;
                    
                    // Force the pencil color to be graphite/charcoal
                    const pencilColor = '#2a2421';
                    const opts = { stroke: pencilColor, strokeWidth: 1.8, roughness: 1.5, bowing: 1.2, disableMultiStroke: true };
                    
                    // Draw a single line for the hover effect
                    const startX = cx;
                    const textCenter = textX + textW / 2;
                    let pt1, pt2;
                    
                    if (startX < textCenter) {
                        pt1 = [textX - 4, textY + 2];
                        pt2 = [textX + textW + 8, textY + 2];
                    } else {
                        pt1 = [textX + textW + 8, textY + 2];
                        pt2 = [textX - 4, textY + 2];
                    }
                    
                    svg.appendChild(rc.linearPath([[startX, textY], pt1, pt2], opts));
                }

                btn.addEventListener('mouseenter', (e) => {
                    if (btn.isHovered) return;
                    btn.isHovered = true;
                    btn.classList.add('is-filled');
                    
                    const rect = btn.getBoundingClientRect();
                    const cx = e.clientX - rect.left;
                    
                    fillSet.svg.innerHTML = '';
                    generateUnderline(fillSet.svg, fillSet.rc, btn, cx);
                    
                    // Setup SVG paths for animation
                    const paths = fillSet.svg.querySelectorAll('path');
                    paths.forEach(p => {
                        const len = p.getTotalLength();
                        p.style.strokeDasharray = `${len}px`;
                        p.style.strokeDashoffset = `${len}px`;
                        p.style.transition = 'none';
                    });
                    
                    // Force a single reflow for all paths
                    fillSet.svg.getBoundingClientRect();
                    
                    // Directly animate the generated path elements sequentially
                    const elements = Array.from(fillSet.svg.children);
                    elements.forEach((el, index) => {
                        const delay = index * 0.45; // Wait for Stroke 1 to almost finish before Stroke 2
                        if (el.tagName.toLowerCase() === 'path' || el.tagName.toLowerCase() === 'g') {
                            const subPaths = el.tagName.toLowerCase() === 'path' ? [el] : el.querySelectorAll('path');
                            subPaths.forEach(p => {
                                p.style.transition = `stroke-dashoffset 0.6s ease-out ${delay}s`;
                                p.style.strokeDashoffset = '0px';
                            });
                        }
                    });
                });

                btn.addEventListener('mouseleave', () => {
                    btn.isHovered = false;
                    btn.classList.remove('is-filled');
                    
                    const paths = fillSet.svg.querySelectorAll('path');
                    paths.forEach((p) => {
                        const len = p.getTotalLength();
                        p.style.transition = `stroke-dashoffset 0.25s ease-in`;
                        p.style.strokeDashoffset = `${len}px`;
                    });
                });
                
                btn.addEventListener('click', () => {
                    btn.classList.add('is-filled');
                    const paths = fillSet.svg.querySelectorAll('path');
                    paths.forEach(p => {
                        p.style.transition = `stroke-dashoffset 0.1s ease-out`;
                        p.style.strokeDashoffset = '0px';
                    });
                });
            }, 100);
        });
    },
    
    bindPillarCards() {
        if (typeof rough === 'undefined' || typeof gsap === 'undefined') return;
        
        const cards = document.querySelectorAll('.pillar-card, .contact-card, .story-doodle-visual');
        cards.forEach(card => {
            const bg = card.querySelector('.card-bg');
            if (!bg) return;
            
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("width", "100%");
            svg.setAttribute("height", "100%");
            bg.appendChild(svg);
            const rc = rough.svg(svg);
            
            setTimeout(() => {
                const w = bg.offsetWidth;
                const h = bg.offsetHeight;
                const sketch = rc.rectangle(10, 10, w - 20, h - 20, {
                    roughness: 1.5,
                    fill: 'rgba(255, 255, 255, 0.2)',
                    fillStyle: 'solid',
                    stroke: '#4a3628',
                    strokeWidth: 1.5,
                    bowing: 2
                });
                
                const paths = sketch.querySelectorAll('path');
                paths.forEach(path => {
                    const length = path.getTotalLength();
                    path.style.strokeDasharray = length;
                    path.style.strokeDashoffset = length;
                });
                svg.appendChild(sketch);
                
                gsap.to(paths, {
                    strokeDashoffset: 0,
                    duration: 1.5,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            }, 100);
        });
    },
    
    initScrollReveals() {
        if (typeof gsap === 'undefined') return;
        
        // Setup polaroid parallax
        const polaroid = document.querySelector('.polaroid-wrapper');
        if (polaroid) {
            gsap.to(polaroid, {
                y: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: polaroid,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            gsap.fromTo(el, 
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }
};

// ===== LIVE SKETCH ENGINE (Global Outlines) =====
const LiveSketchEngine = {
    init() {
        if (typeof rough === 'undefined') return;

        const components = document.querySelectorAll('.sketch-component');
        if (components.length === 0) return;

        // Intersection Observer for scroll-triggered drawing
        const observer = new IntersectionObserver((entries) => {
            let delayOffset = 0; // Stagger elements entering simultaneously
            
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    if (el.hasAttribute('data-sketched')) return; // Draw only once
                    el.setAttribute('data-sketched', 'true');
                    
                    // Stagger the drawing of multiple components
                    setTimeout(() => {
                        this.drawComponent(el);
                    }, delayOffset * 400); 
                    
                    delayOffset++;
                }
            });
        }, {
            threshold: 0.15, // Trigger when 15% visible
            rootMargin: "0px 0px -50px 0px"
        });

        components.forEach(c => observer.observe(c));
    },

    drawComponent(el) {
        // Create SVG canvas container
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.pointerEvents = 'none';
        svg.style.zIndex = '1'; // Above the background, doesn't block clicks
        svg.classList.add('live-sketch-canvas');
        
        el.appendChild(svg);
        
        const rc = rough.svg(svg);
        const type = el.getAttribute('data-sketch-type') || 'rectangle';
        const strokeColor = '#2a2421'; // Graphite
        const opts = {
            stroke: strokeColor,
            strokeWidth: 2,
            roughness: 1.5,
            bowing: 1,
            disableMultiStroke: true // Exactly 2 physical lines (or 1 continuous path) for clean sketchy look
        };
        
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        
        let shape;
        if (type === 'rectangle') {
            // Draw slightly inset so the stroke isn't clipped by overflow
            shape = rc.rectangle(2, 2, w - 4, h - 4, opts);
        }
        
        svg.appendChild(shape);
        
        // Setup Animation
        const allPaths = Array.from(svg.querySelectorAll('path'));
        allPaths.forEach(p => {
            const len = p.getTotalLength();
            p.style.strokeDasharray = `${len}px`;
            p.style.strokeDashoffset = `${len}px`;
            p.style.transition = 'none';
        });
        
        // Force reflow
        svg.getBoundingClientRect();
        
        // Double requestAnimationFrame ensures the initial hidden state is rendered before the transition begins
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                allPaths.forEach((p, i) => {
                    const delay = i * 0.4;
                    p.style.transition = `stroke-dashoffset 1.2s ease-out ${delay}s`;
                    p.style.strokeDashoffset = '0px';
                });
            });
        });
        
        // Add a simple resize observer to redraw instantly on window resize
        const resizeObserver = new ResizeObserver(() => {
            if (el.offsetWidth !== w || el.offsetHeight !== h) {
                // Instantly redraw without animation
                svg.innerHTML = '';
                const newShape = rc.rectangle(2, 2, el.offsetWidth - 4, el.offsetHeight - 4, opts);
                svg.appendChild(newShape);
                // No dash offsets needed for resize
            }
        });
        resizeObserver.observe(el);
    }
};

// ===== APP INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    LoginModal.init();
    ScrollManager.init();
    Navigation.init();
    ButtonHandler.init();
    AtelierEngine.init();
    LiveSketchEngine.init();

    // Log app initialization
    console.log('Legacy Dairies - Application Initialized');
});

// ===== UTILITY: Debounce function for future use =====
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

// ===== UTILITY: Throttle function for future use =====
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
