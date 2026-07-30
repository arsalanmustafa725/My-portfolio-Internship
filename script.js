
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
                if (navLinks.classList.contains('nav-active')) {
                    navLinks.classList.remove('nav-active');
                }
            }
        });
    });

    // 3. Contact Form Submission Handling
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Default page refresh ko rokta hai

            // Form Fields values
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;

            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill in all fields before submitting.');
                return;
            }

            // Success Message
            alert(`Thank you, ${name}! Your message has been sent successfully.`);
            
            // Form clear kar dein
            contactForm.reset();
        });
    }

});
