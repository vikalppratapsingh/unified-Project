// Smooth scroll and active link
const navLinks = document.querySelectorAll('#nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// Scroll spy for active link
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

// Contact form validation
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !subject || !message) {
    alert('Please fill in all fields!');
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    alert('Please enter a valid email!');
    return;
  }

  alert('Thank you for your message!');
  contactForm.reset();
});

// Hamburger toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinksContainer = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinksContainer.classList.toggle('collapsed');
});
