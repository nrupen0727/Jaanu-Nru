// ═══════════════════════════════════
// EDIT ME — all real content lives here
// ═══════════════════════════════════
const WEDDING_CONFIG = {
  couple: {
    bride: 'Jainee',
    groom: 'Nrupen',
    date: '2027-02-07', // YYYY-MM-DD, used for the countdown + calendar links
    dateDisplay: '7th February 2027',
    venue: 'Ahmedabad, Gujarat, India',
  },
  invite: {
    brideParents: 'daughter of Mr. Deepak and Neela Chaudhary',
    groomParents: 'son of Mr. Dinesh and Mrs. Jigisha Patel',
  },
  // First 2 entries render as row 1, remaining 3 as row 2 (see renderEvents)
  events: [
    { name: "Nrupen's Grahshanti / Mameru", time: '1:30 PM onwards', date: '4th February 2027', venue: "Nrupen's Home", icon: 'grahshanti', mapQuery: "Nrupen's Home, Ahmedabad, Gujarat, India", dress: 'Traditional Indian attire' },
    { name: "Jaanu's Grahshanti", time: '7:00 AM onwards', date: '4th February 2027', venue: "Jaanu's Home", icon: 'grahshanti', mapQuery: "Jaanu's Home, Ahmedabad, Gujarat, India", dress: 'Traditional Indian attire' },
    { name: 'Mehendi', time: '5:00 PM onwards', date: '3rd February 2027', venue: 'Ahmedabad', icon: 'mehendi', mapQuery: 'Ahmedabad, Gujarat, India', dress: 'Yellow & green — festive colors' },
    { name: 'Garba', time: '7:00 PM onwards', date: '5th February 2027', venue: 'Madhuban Party Plot, Koba', note: 'ft. Bhumik Shah', icon: 'garba', mapQuery: 'Madhuban Party Plot, Koba, Gujarat, India', dress: 'Chaniya choli / kurta — traditional Garba wear' },
    { name: 'Wedding — Baarat & Rituals', time: 'Baarat 2:00 PM · Rituals 5:30 PM', date: '7th February 2027', venue: 'Infocity Club and Resort', icon: 'ceremony', mapQuery: 'Infocity Club and Resort, Gujarat, India', dress: 'Traditional formal Indian attire' },
  ],
  story: "Add your story here — how you met, your favorite memory together, and the moment you knew. This placeholder text can be swapped for your real story whenever you're ready.",
  gallery: {
    // Replace with real photo URLs (e.g. "assets/gallery/photo1.jpg") when ready.
    photos: [],
    placeholderCount: 4,
  },
  rsvp: {
    whatsapp: '', // e.g. "911234567890" (country code + number, no + or spaces)
    message: "Yes, I'll be there!",
  },
};

// ═══════════════════════════════════
// Hand-drawn line icons (no external images) — 24x24, stroke = currentColor
// ═══════════════════════════════════
const ICONS = {
  mehendi: '<path d="M12 4c4.2 0 7.5 3.2 7.5 7.3 0 5.3-4.2 8.4-7 11.7-1.1-3-.2-5.4.3-7.6.4-1.8-.9-3.4-2.8-3.4-1.7 0-3 1.3-3 3 0 .9.4 1.7 1 2.2C6 16.3 4.5 14 4.5 11.3 4.5 7.2 7.8 4 12 4z"/>',
  grahshanti: '<path d="M12 4c1.3 1.8 2.2 3.3 2.2 4.6a2.2 2.2 0 01-4.4 0C9.8 7.3 10.7 5.8 12 4z"/><ellipse cx="12" cy="17" rx="7" ry="2.4"/><path d="M5 17c0-2.8 3.1-5 7-5s7 2.2 7 5"/>',
  garba: '<path d="M5 5l14 14"/><path d="M19 5L5 19"/><circle cx="5" cy="5" r="1.3"/><circle cx="19" cy="5" r="1.3"/><circle cx="5" cy="19" r="1.3"/><circle cx="19" cy="19" r="1.3"/>',
  ceremony: '<circle cx="9" cy="14.5" r="5.8"/><circle cx="15" cy="14.5" r="5.8"/>',
  camera: '<path d="M4 8.5A1.5 1.5 0 015.5 7h2l1-2h7l1 2h2A1.5 1.5 0 0120 8.5v9A1.5 1.5 0 0118.5 19h-13A1.5 1.5 0 014 17.5v-9z"/><circle cx="12" cy="13" r="3.6"/>',
  pin: '<path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.3"/>',
};

function iconMarkup(name, extraClass) {
  const path = ICONS[name] || ICONS.camera;
  return `<span class="icon-badge${extraClass ? ' ' + extraClass : ''}" aria-hidden="true">
    <svg class="icon-badge-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${path}</svg>
  </span>`;
}

function staggerDelay(i) {
  return `style="transition-delay:${Math.min(i, 6) * 90}ms"`;
}

// ═══════════════════════════════════
// Populate content from config
// ═══════════════════════════════════
function textAll(selector, value) {
  document.querySelectorAll(selector).forEach((el) => { el.textContent = value; });
}

function populateCouple() {
  const { bride, groom, dateDisplay, venue } = WEDDING_CONFIG.couple;
  textAll('#introBride, #heroBride, #inviteBride, #ftBride', bride);
  textAll('#introGroom, #heroGroom, #inviteGroom, #ftGroom', groom);
  textAll('#introDate, #heroDate, #inviteDate, #ftDate', dateDisplay);
  textAll('#heroVenue, #inviteVenue', venue);

  const brideParents = document.getElementById('inviteBrideParents');
  const groomParents = document.getElementById('inviteGroomParents');
  if (brideParents) brideParents.textContent = WEDDING_CONFIG.invite.brideParents;
  if (groomParents) groomParents.textContent = WEDDING_CONFIG.invite.groomParents;

  const storyBody = document.getElementById('storyBody');
  if (storyBody) storyBody.textContent = WEDDING_CONFIG.story;
}

function eventCardHtml(evt, i) {
  return `
    <div class="event-card reveal-item" role="listitem" ${staggerDelay(i)}>
      ${iconMarkup(evt.icon, i % 2 ? 'icon-badge--emerald' : '')}
      <p class="event-name">${evt.name}</p>
      <svg viewBox="0 0 60 8" class="event-rule" aria-hidden="true"><path d="M0 4h24M36 4h24"/><circle cx="30" cy="4" r="2.5"/></svg>
      <p class="event-time">${evt.time}</p>
      <p class="event-date">${evt.date}</p>
      <p class="event-venue">${evt.venue}</p>
      ${evt.note ? `<p class="event-note">${evt.note}</p>` : ''}
      ${evt.dress ? `<p class="event-dress">Dress code: ${evt.dress}</p>` : ''}
      ${evt.mapQuery ? `
        <a class="event-map-link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(evt.mapQuery)}" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS.pin}</svg>
          Get Directions
        </a>
      ` : ''}
    </div>
  `;
}

function renderEvents() {
  const list = document.getElementById('eventsList');
  if (!list) return;
  const events = WEDDING_CONFIG.events;
  const row1 = events.slice(0, 2).map((evt, i) => eventCardHtml(evt, i)).join('');
  const row2 = events.slice(2).map((evt, i) => eventCardHtml(evt, i + 2)).join('');
  list.innerHTML = `
    <div class="events-row">${row1}</div>
    <div class="events-row">${row2}</div>
  `;
}

// ═══════════════════════════════════
// Gallery — single framed carousel (works with real photo URLs or placeholder frames)
// ═══════════════════════════════════
let galleryPhotos = [];
let galleryIndex = 0;

function renderGallery() {
  const frame = document.getElementById('galleryFrame');
  const dots = document.getElementById('galleryDots');
  if (!frame || !dots) return;
  const { photos, placeholderCount } = WEDDING_CONFIG.gallery;
  galleryPhotos = photos.length ? photos : Array.from({ length: placeholderCount }, () => null);

  dots.innerHTML = galleryPhotos.map((_, i) => `
    <button class="gallery-dot" data-index="${i}" role="tab" aria-label="Go to photo ${i + 1}"></button>
  `).join('');
  dots.querySelectorAll('.gallery-dot').forEach((dot) => {
    dot.addEventListener('click', () => showGallerySlide(Number(dot.dataset.index)));
  });

  showGallerySlide(0);
}

function showGallerySlide(index) {
  const frame = document.getElementById('galleryFrame');
  if (!frame || !galleryPhotos.length) return;
  galleryIndex = (index + galleryPhotos.length) % galleryPhotos.length;
  const src = galleryPhotos[galleryIndex];

  frame.classList.remove('is-visible');
  window.setTimeout(() => {
    frame.innerHTML = src
      ? `<img src="${src}" alt="" loading="lazy" decoding="async" />`
      : `${iconMarkup('camera')}<span class="gallery-frame-placeholder">Add photo ${galleryIndex + 1}</span>`;
    frame.classList.add('is-visible');
  }, 200);

  document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
    dot.classList.toggle('is-active', i === galleryIndex);
  });
}

function stepGallery(delta) {
  showGallerySlide(galleryIndex + delta);
}

function initGalleryControls() {
  document.getElementById('galleryPrev')?.addEventListener('click', () => stepGallery(-1));
  document.getElementById('galleryNext')?.addEventListener('click', () => stepGallery(1));
  document.addEventListener('keydown', (e) => {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    const rect = gallery.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;
    if (e.key === 'ArrowLeft') stepGallery(-1);
    if (e.key === 'ArrowRight') stepGallery(1);
  });
}

// ═══════════════════════════════════
// RSVP + calendar links
// ═══════════════════════════════════
function initRsvp() {
  const { whatsapp, message } = WEDDING_CONFIG.rsvp;
  const { dateDisplay, venue, bride, groom, date } = WEDDING_CONFIG.couple;

  const rsvpBtn = document.getElementById('rsvpBtn');
  if (rsvpBtn) {
    const text = encodeURIComponent(message);
    rsvpBtn.href = whatsapp
      ? `https://wa.me/${whatsapp}?text=${text}`
      : '#';
    if (!whatsapp) {
      rsvpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Add your WhatsApp number to WEDDING_CONFIG.rsvp.whatsapp in script.js to enable this button.');
      });
    }
  }

  const [y, m, d] = date.split('-');
  const gcalBtn = document.getElementById('rsvpGcalBtn');
  if (gcalBtn) {
    const start = `${y}${m}${d}`;
    const endDate = new Date(Number(y), Number(m) - 1, Number(d) + 1);
    const end = `${endDate.getFullYear()}${String(endDate.getMonth() + 1).padStart(2, '0')}${String(endDate.getDate()).padStart(2, '0')}`;
    gcalBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(bride + ' weds ' + groom)}&dates=${start}/${end}&location=${encodeURIComponent(venue)}`;
  }

  const icalBtn = document.getElementById('rsvpIcalBtn');
  if (icalBtn) {
    const start = `${y}${m}${d}`;
    const endDate = new Date(Number(y), Number(m) - 1, Number(d) + 1);
    const end = `${endDate.getFullYear()}${String(endDate.getMonth() + 1).padStart(2, '0')}${String(endDate.getDate()).padStart(2, '0')}`;
    const ics = `BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART;VALUE=DATE:${start}%0ADTEND;VALUE=DATE:${end}%0ASUMMARY:${encodeURIComponent(bride + ' weds ' + groom)}%0ALOCATION:${encodeURIComponent(venue)}%0AEND:VEVENT%0AEND:VCALENDAR`;
    icalBtn.href = `data:text/calendar;charset=utf8,${ics}`;
  }

  void dateDisplay;
}

// ═══════════════════════════════════
// Countdown
// ═══════════════════════════════════
function initCountdown() {
  const target = new Date(WEDDING_CONFIG.couple.date + 'T00:00:00').getTime();
  const els = {
    days: document.getElementById('cdDays'),
    hours: document.getElementById('cdHours'),
    mins: document.getElementById('cdMins'),
    secs: document.getElementById('cdSecs'),
  };
  if (!els.days) return;

  function tick() {
    const diff = Math.max(0, target - Date.now());
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    els.days.textContent = String(days).padStart(2, '0');
    els.hours.textContent = String(hours).padStart(2, '0');
    els.mins.textContent = String(mins).padStart(2, '0');
    els.secs.textContent = String(secs).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);
}

// ═══════════════════════════════════
// RSVP fireworks — lightweight canvas particle bursts, only while in view
// ═══════════════════════════════════
function initFireworks() {
  const canvas = document.getElementById('rsvpFireworks');
  const section = document.getElementById('rsvp');
  if (!canvas || !section) return;
  const ctx = canvas.getContext('2d');
  const colors = ['#d9b876', '#fffaf5', '#f2d9a0'];
  let width = 0;
  let height = 0;
  let particles = [];
  let running = false;
  let rafId = null;
  let spawnTimer = null;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    width = section.clientWidth;
    height = section.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawnBurst() {
    const cx = width * (0.15 + Math.random() * 0.7);
    const cy = height * (0.08 + Math.random() * 0.16);
    const count = 28 + Math.floor(Math.random() * 12);
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < count; i += 1) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
      const speed = 1.1 + Math.random() * 2.2;
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.007 + Math.random() * 0.006,
        color,
      });
    }
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.012;
      p.life -= p.decay;
      if (p.life > 0) {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    particles = particles.filter((p) => p.life > 0);
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (running) return;
    running = true;
    resize();
    spawnBurst();
    tick();
    spawnTimer = setInterval(spawnBurst, 1800);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    if (spawnTimer) clearInterval(spawnTimer);
    rafId = null;
    spawnTimer = null;
    particles = [];
    ctx.clearRect(0, 0, width, height);
  }

  window.addEventListener('resize', () => { if (running) resize(); });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? start() : stop()));
    }, { threshold: 0.25 });
    observer.observe(section);
  } else {
    start();
  }
}

// ═══════════════════════════════════
// Intro, scroll reveal, floating nav
// ═══════════════════════════════════
function initIntro() {
  const intro = document.getElementById('intro');
  const page = document.getElementById('page');
  if (!intro || !page) return;

  const introVideo = intro.querySelector('.intro-video');
  const PLAY_MS = 4500; // fallback in case the 'ended' event doesn't fire
  let revealed = false;

  if (introVideo) {
    introVideo.play().catch(() => {}); // muted background loop; browsers may still block until a gesture
  }

  function reveal() {
    if (revealed) return;
    revealed = true;

    intro.classList.remove('is-playing');
    intro.classList.add('is-flashing');
    requestAnimationFrame(() => {
      intro.classList.remove('is-flashing');
      document.body.classList.remove('intro-active');
      intro.setAttribute('aria-hidden', 'true');
      page.removeAttribute('aria-hidden');
    });
    intro.addEventListener('transitionend', () => intro.remove(), { once: true });
  }

  function enter() {
    if (intro.dataset.entered) return;
    intro.dataset.entered = 'true';

    if (!introVideo) {
      reveal();
      return;
    }

    intro.classList.add('is-playing');
    introVideo.loop = false; // let it play through once so 'ended' can fire
    introVideo.currentTime = 0;
    introVideo.addEventListener('ended', reveal, { once: true });
    setTimeout(reveal, PLAY_MS);

    introVideo.muted = false;
    introVideo.play().catch(() => {
      introVideo.muted = true;
      introVideo.play().catch(() => {});
    });
  }

  intro.addEventListener('click', enter);
  intro.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enter(); }
  });
}

function initScrollReveal() {
  const items = document.querySelectorAll('.reveal-item');
  if (!items.length || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach((el) => observer.observe(el));
}

function initNav() {
  const toggle = document.getElementById('navToggle');
  const panel = document.getElementById('navPanel');
  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    const open = panel.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    panel.setAttribute('aria-hidden', String(!open));
  });

  panel.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      panel.setAttribute('aria-hidden', 'true');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // initIntro runs first so the tap-to-enter always works even if a
  // later init throws (e.g. from bad placeholder content).
  const steps = [initIntro, populateCouple, renderEvents,
    renderGallery, initGalleryControls, initRsvp, initCountdown, initScrollReveal, initNav, initFireworks];
  steps.forEach((step) => {
    try { step(); } catch (err) { console.error(`${step.name} failed:`, err); }
  });
});
