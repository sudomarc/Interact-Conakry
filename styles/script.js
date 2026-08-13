// Interact Club Conakry — script.js
// Lightweight progressive enhancement

(function() {
    'use strict';

    // Set current year in footer
    function setYear() {
        const yearEl = document.getElementById('year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }

    // Form validation & submission feedback
    function initForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                // Browser native validation handles HTML5 attributes
                // Add custom feedback here if needed
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.setAttribute('aria-busy', 'true');
                    submitBtn.textContent = 'Traitement...';
                    // Reset after 2 seconds for demo
                    setTimeout(() => {
                        submitBtn.removeAttribute('aria-busy');
                        submitBtn.textContent = 'Envoyer';
                    }, 2000);
                }
            });
        });
    }

    // Smooth scroll fallback for older browsers
    function smoothScrollFallback() {
        if (!('scrollBehavior' in document.documentElement.style)) {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href !== '#') {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                });
            });
        }
    }

    // Lazy load images with fallback
    function initLazyLoad() {
        if ('IntersectionObserver' in window) {
            const images = document.querySelectorAll('img[loading="lazy"]');
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        imageObserver.unobserve(img);
                    }
                });
            });
            images.forEach(img => imageObserver.observe(img));
        }
    }

    // Accessible dropdown/navigation toggle for mobile (if needed)
    function initNav() {
        // Current nav is flex and wraps nicely, but add toggle if needed later
        const nav = document.querySelector('nav');
        if (!nav) return;

        // Add keyboard navigation support
        const links = nav.querySelectorAll('a');
        links.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight' && index < links.length - 1) {
                    e.preventDefault();
                    links[index + 1].focus();
                } else if (e.key === 'ArrowLeft' && index > 0) {
                    e.preventDefault();
                    links[index - 1].focus();
                }
            });
        });
    }

    // Analytics placeholder (replace with actual tracking)
    function trackPageView() {
        // Uncomment when ready to use analytics
        // if (window.gtag) {
        //     gtag('event', 'page_view');
        // }
    }

    // Initialize on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
        setYear();
        initForms();
        smoothScrollFallback();
        initLazyLoad();
        initNav();
        trackPageView();
    });

    // Fallback for older browsers without DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setYear();
        });
    } else {
        setYear();
    }
})();
