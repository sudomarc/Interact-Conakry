// Interact Club Conakry — script.js
(function () {
    'use strict';

    function setYear() {
        var el = document.getElementById('year');
        if (el) el.textContent = new Date().getFullYear();
    }

    function initMobileNav() {
        var toggle = document.getElementById('navToggle');
        var nav = document.getElementById('primary-nav');
        if (!toggle || !nav) return;

        function closeNav() {
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Ouvrir le menu');
        }

        function openNav() {
            nav.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', 'Fermer le menu');
        }

        toggle.addEventListener('click', function () {
            var isOpen = nav.classList.contains('is-open');
            if (isOpen) closeNav(); else openNav();
        });

        // Close on link click (mobile)
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeNav);
        });

        // Close on Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeNav();
        });

        // Close when resizing to desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth >= 900) closeNav();
        });
    }

    function initForms() {
        document.querySelectorAll('form').forEach(function (form) {
            form.addEventListener('submit', function () {
                var btn = form.querySelector('button[type="submit"]');
                if (!btn) return;
                var original = btn.textContent;
                btn.setAttribute('aria-busy', 'true');
                btn.textContent = 'Envoi...';
                setTimeout(function () {
                    btn.removeAttribute('aria-busy');
                    btn.textContent = original;
                }, 1500);
            });
        });
    }

    function initHeaderShadowOnScroll() {
        var header = document.getElementById('site-header');
        if (!header) return;
        window.addEventListener('scroll', function () {
            if (window.scrollY > 8) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        }, { passive: true });
    }

    document.addEventListener('DOMContentLoaded', function () {
        setYear();
        initMobileNav();
        initForms();
        initHeaderShadowOnScroll();
    });
})();
