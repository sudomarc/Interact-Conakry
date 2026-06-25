(function () {
    "use strict";

    // === CURRENT YEAR ===
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // === MOBILE NAV ===
    var navToggle = document.querySelector(".nav-toggle");
    var navLinks = document.querySelector(".nav-links");
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", function () {
            var open = navLinks.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", open);
        });
        // close on link click
        navLinks.querySelectorAll("a").forEach(function (a) {
            a.addEventListener("click", function () {
                navLinks.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // === FADE-IN ON SCROLL ===
    var faders = document.querySelectorAll(
        ".project-card, .team-card, .event-card, .stat-card, .member-box, .contact-info, .contact-form-wrapper, .about-text, .about-stats"
    );
    faders.forEach(function (el) { el.classList.add("fade-in"); });

    var io = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    io.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );
    faders.forEach(function (el) { io.observe(el); });

    // === PROJECT FILTER ===
    var filterBtns = document.querySelectorAll(".filter-btn");
    var projectCards = document.querySelectorAll(".project-card");
    filterBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            filterBtns.forEach(function (b) { b.classList.remove("active"); });
            btn.classList.add("active");
            var filter = btn.getAttribute("data-filter");
            projectCards.forEach(function (card) {
                if (filter === "all" || card.getAttribute("data-category") === filter) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });

    // === COUNTDOWN ===
    // Next event: July 15, 2027
    var eventDate = new Date("2027-07-15T09:00:00").getTime();
    function updateCountdown() {
        var now = Date.now();
        var diff = Math.max(0, eventDate - now);
        var d = Math.floor(diff / 86400000);
        var h = Math.floor((diff % 86400000) / 3600000);
        var m = Math.floor((diff % 3600000) / 60000);
        var s = Math.floor((diff % 60000) / 1000);
        var el;
        el = document.getElementById("cd-days");  if (el) el.textContent = String(d).padStart(2, "0");
        el = document.getElementById("cd-hours"); if (el) el.textContent = String(h).padStart(2, "0");
        el = document.getElementById("cd-mins");  if (el) el.textContent = String(m).padStart(2, "0");
        el = document.getElementById("cd-secs");  if (el) el.textContent = String(s).padStart(2, "0");
    }
    var countdownEl = document.getElementById("countdown");
    if (countdownEl) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // === STAT COUNTER ===
    var statNumbers = document.querySelectorAll(".stat-number");
    var statIO = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var target = parseInt(entry.target.getAttribute("data-target"), 10);
                    animateCounter(entry.target, target);
                    statIO.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );
    statNumbers.forEach(function (el) { statIO.observe(el); });

    function animateCounter(el, target) {
        var current = 0;
        var step = Math.max(1, Math.floor(target / 60));
        var timer = setInterval(function () {
            current += step;
            if (current >= target) {
                el.textContent = target + "+";
                clearInterval(timer);
            } else {
                el.textContent = current;
            }
        }, 25);
    }

    // === BACK TO TOP ===
    var btt = document.querySelector(".back-to-top");
    if (btt) {
        window.addEventListener("scroll", function () {
            btt.classList.toggle("visible", window.scrollY > 400);
        });
        btt.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // === HEADER SHADOW ON SCROLL ===
    var header = document.querySelector(".site-header");
    if (header) {
        window.addEventListener("scroll", function () {
            header.style.boxShadow = window.scrollY > 50
                ? "0 4px 20px rgba(0,0,0,0.1)"
                : "0 2px 10px rgba(0,0,0,0.06)";
        });
    }

    // === FORM VALIDATION ===
    function showError(input, msg) {
        var existing = input.parentNode.querySelector(".field-error");
        if (existing) existing.remove();
        var err = document.createElement("span");
        err.className = "field-error";
        err.style.cssText = "color:#e53e3e;font-size:0.8rem;margin-top:0.2rem;display:block;";
        err.textContent = msg;
        input.parentNode.appendChild(err);
        input.setAttribute("aria-invalid", "true");
    }
    function clearError(input) {
        var existing = input.parentNode.querySelector(".field-error");
        if (existing) existing.remove();
        input.removeAttribute("aria-invalid");
    }
    document.querySelectorAll(".member-form, .contact-form").forEach(function (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var valid = true;
            form.querySelectorAll("input[required], textarea[required]").forEach(function (input) {
                clearError(input);
                if (!input.value.trim()) {
                    showError(input, "Ce champ est obligatoire.");
                    valid = false;
                } else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                    showError(input, "Email invalide.");
                    valid = false;
                } else if (input.type === "number") {
                    var min = parseInt(input.getAttribute("min"), 10);
                    var max = parseInt(input.getAttribute("max"), 10);
                    var val = parseInt(input.value, 10);
                    if (min && val < min) { showError(input, "Minimum " + min + " ans."); valid = false; }
                    if (max && val > max) { showError(input, "Maximum " + max + " ans."); valid = false; }
                }
            });
            if (valid) {
                var submitBtn = form.querySelector('button[type="submit"]');
                submitBtn.textContent = "Envoyé ✓";
                submitBtn.disabled = true;
                submitBtn.style.background = "var(--primary-light)";
                submitBtn.style.color = "#fff";
                setTimeout(function () {
                    form.reset();
                    submitBtn.textContent = form.closest("#register") ? "S'inscrire" : "Se connecter";
                    submitBtn.disabled = false;
                    submitBtn.style.background = "";
                    submitBtn.style.color = "";
                }, 3000);
            }
        });
        form.querySelectorAll("input, textarea").forEach(function (input) {
            input.addEventListener("input", function () { clearError(input); });
        });
    });
})();
