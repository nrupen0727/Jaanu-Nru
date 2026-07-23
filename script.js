const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const rsvpForm = document.getElementById('rsvpForm');
const rsvpMessage = document.getElementById('rsvpMessage');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });
}

if (rsvpForm && rsvpMessage) {
  rsvpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    rsvpMessage.textContent = 'Thanks! Your RSVP has been recorded. We’ll follow up soon.';
    rsvpMessage.style.color = '#3c7a47';
    rsvpForm.reset();
  });
}
