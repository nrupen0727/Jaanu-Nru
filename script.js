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
  // Row 1: grouped multi-event ritual cards (one per household)
  ritualCards: [
    {
      name: "Nrupen's Rituals",
      venue: "Nrupen's Home",
      mapQuery: "Nrupen's Home, Ahmedabad, Gujarat, India",
      events: [
        { name: 'Kankotri', time: '10:00 AM', date: '1st February 2027' },
        { name: 'Grahshanti & Mameru', time: '1:30 PM onwards', date: '4th February 2027' },
        { name: 'Haldi', time: '6:00 PM onwards', date: '6th February 2027' },
      ],
    },
    {
      name: "Jaanu's Rituals",
      venue: "Jaanu's Home",
      mapQuery: "Jaanu's Home, Ahmedabad, Gujarat, India",
      events: [
        { name: 'Grahshanti', time: '7:00 AM onwards', date: '4th February 2027' },
        { name: 'Mameru', time: '7:00 AM onwards', date: '4th February 2027' },
      ],
    },
  ],
  // Row 2: single-event cards
  events: [
    { name: 'Mehendi', time: '5:00 PM onwards', date: '3rd February 2027', venue: 'Ahmedabad', portrait: 'assets/mehendi-couple.png', portraitNudge: -9.5, mapQuery: 'Ahmedabad, Gujarat, India' },
    { name: 'Garba', time: '7:00 PM onwards', date: '5th February 2027', venue: 'Madhuban Party Plot, Koba', note: 'ft. Bhumik Shah', portrait: 'assets/sangeet-couple.png', portraitNudge: -3.2, mapQuery: 'Madhuban Party Plot, Koba, Gujarat, India' },
    { name: 'Wedding — Baarat & Rituals', time: 'Baarat 2:00 PM · Rituals 5:30 PM', date: '7th February 2027', venue: 'Infocity Club and Resort', portrait: 'assets/wedding-couple.png', portraitNudge: -2.9, mapQuery: 'Infocity Club and Resort, Gujarat, India' },
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
      <span class="card-portrait" aria-hidden="true"><img src="${evt.portrait}" alt="" loading="lazy" decoding="async" style="transform: translateX(${evt.portraitNudge || 0}%)" /></span>
      <p class="event-name">${evt.name}</p>
      <svg viewBox="0 0 60 8" class="event-rule" aria-hidden="true"><path d="M0 4h24M36 4h24"/><circle cx="30" cy="4" r="2.5"/></svg>
      <p class="event-time">${evt.time}</p>
      <p class="event-date">${evt.date}</p>
      <p class="event-venue">${evt.venue}</p>
      ${evt.note ? `<p class="event-note">${evt.note}</p>` : ''}
      ${evt.mapQuery ? `
        <a class="event-map-link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(evt.mapQuery)}" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS.pin}</svg>
          Get Directions
        </a>
      ` : ''}
    </div>
  `;
}

function ritualCardHtml(card, i) {
  return `
    <div class="event-card ritual-card reveal-item" role="listitem" ${staggerDelay(i)}>
      <span class="card-portrait card-portrait--emblem" aria-hidden="true"><img src="assets/ritual-elephant.png" alt="" loading="lazy" decoding="async" /></span>
      <p class="event-name">${card.name}</p>
      <svg viewBox="0 0 60 8" class="event-rule" aria-hidden="true"><path d="M0 4h24M36 4h24"/><circle cx="30" cy="4" r="2.5"/></svg>
      <div class="ritual-sub-list">
        ${card.events.map((sub) => `
          <div class="ritual-sub-item">
            <p class="ritual-sub-name">${sub.name}</p>
            <p class="ritual-sub-meta">${sub.time}</p>
            <p class="ritual-sub-meta">${sub.date}</p>
          </div>
        `).join('')}
      </div>
      <p class="event-venue">${card.venue}</p>
      ${card.mapQuery ? `
        <a class="event-map-link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(card.mapQuery)}" target="_blank" rel="noreferrer">
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
  const ritualCards = WEDDING_CONFIG.ritualCards;
  const events = WEDDING_CONFIG.events;
  const row1 = ritualCards.map((card, i) => ritualCardHtml(card, i)).join('');
  const row2 = events.map((evt, i) => eventCardHtml(evt, i + ritualCards.length)).join('');
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
