// Smooth Scrolling Navigation and Active Link Highlight
const navLinks = document.querySelectorAll('#nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Smooth scroll to section
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Highlight active link
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Contact Form JS Validation
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields!');
        return;
    }
    // Very simple email check
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Please enter a valid email!');
        return;
    }

    alert('Thank you for your message!');
    contactForm.reset();
});

// (Extra) Highlight nav links on scroll
window.addEventListener('scroll', () => {
    const fromTop = window.scrollY + 120;
    navLinks.forEach(link => {
        const section = document.querySelector(link.hash);
        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});