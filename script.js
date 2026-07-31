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
