// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle (Burger Bar)
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            
            // Burger Animation Toggle
            burger.classList.toggle('toggle');
        });
    }

    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });

                // Mobile screen par menu auto-close karne ke liye
                if (navLinks && navLinks.classList.contains('nav-active')) {
                    navLinks.classList.remove('nav-active');
                }
            }
        });
    });

    // 3. Contact Form Handling with Fetch API (AJAX - No Page Refresh)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault(); // Page refresh hone se rokta hai

            const data = new FormData(contactForm);
            
            // Button State Update: Processing Show Karein
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            if (formStatus) {
                formStatus.style.color = 'var(--accent-color)';
                formStatus.textContent = 'Sending your message...';
            }

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success Status
                    if (formStatus) {
                        formStatus.style.color = '#22c55e'; // Green Color
                        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                    }
                    contactForm.reset(); // Form clear karein
                } else {
                    // Error Response from Server
                    const responseData = await response.json();
                    if (formStatus) {
                        formStatus.style.color = '#ef4444'; // Red Color
                        if (responseData.errors) {
                            formStatus.textContent = responseData.errors.map(error => error.message).join(", ");
                        } else {
                            formStatus.textContent = 'Oops! There was a problem submitting your form.';
                        }
                    }
                }
            } catch (error) {
                // Network / General Error
                if (formStatus) {
                    formStatus.style.color = '#ef4444';
                    formStatus.textContent = 'Oops! Network error. Please try again later.';
                }
            } finally {
                // Button Reset
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    }

    // 4. Dark/Light Theme Toggle with LocalStorage
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    const themeText = themeToggleBtn ? themeToggleBtn.querySelector('.theme-text') : null;

    // Pehle se save shuda theme check karein
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
        if (themeText) themeText.textContent = 'Light';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            let theme = 'dark';
            if (document.body.classList.contains('light-theme')) {
                theme = 'light';
                if (themeIcon) themeIcon.className = 'fas fa-sun';
                if (themeText) themeText.textContent = 'Light';
            } else {
                if (themeIcon) themeIcon.className = 'fas fa-moon';
                if (themeText) themeText.textContent = 'Dark';
            }
            
            // LocalStorage mein save karein
            localStorage.setItem('theme', theme);
        });
    }

});

// ==========================================
    // DAY 11: DYNAMIC ANIMATIONS & INTERACTIONS
    // ==========================================

    // 1. Typing Effect in Hero Section
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const words = ["Web Developer", "Front-End Specialist", "Creative Problem Solver"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 1500; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }

    // 2. Scroll Reveal Animation for Sections & Cards
    const revealElements = document.querySelectorAll('.skill-item, .portfolio-item, .about-content, .contact-section');
    
    // Initial add reveal class
    revealElements.forEach(el => el.classList.add('reveal'));

    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < triggerBottom) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Trigger on page load

    // 3. Scroll To Top Button Logic
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }



