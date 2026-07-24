// ═══════════════════════════════════
// EDIT ME — all real content lives here
// ═══════════════════════════════════
const WEDDING_CONFIG = {
  couple: {
    bride: 'Jainee',
    groom: 'Nrupen',
    date: '2026-12-12', // YYYY-MM-DD, used for the countdown + calendar links
    dateDisplay: '12th December 2026',
    venue: 'The Grand Palace, Udaipur',
  },
  invite: {
    brideParents: 'daughter of Mr. & Mrs. Bride-Parent',
    groomParents: 'son of Mr. & Mrs. Groom-Parent',
  },
  events: [
    { name: 'Mehendi', time: '4:00 PM', date: '10th December 2026', venue: 'Family Residence', motif: 'garden' },
    { name: 'Sangeet', time: '7:00 PM', date: '11th December 2026', venue: 'The Grand Palace, Lawn', motif: 'peacock' },
    { name: 'Wedding Ceremony', time: '11:00 AM', date: '12th December 2026', venue: 'The Grand Palace, Main Hall', motif: 'elephant' },
    { name: 'Reception', time: '7:00 PM', date: '12th December 2026', venue: 'The Grand Palace, Ballroom', motif: 'architecture' },
  ],
  story: "Add your story here — how you met, your favorite memory together, and the moment you knew. This placeholder text can be swapped for your real story whenever you're ready.",
  gallery: {
    // Replace with real photo URLs (e.g. "assets/gallery/photo1.jpg") when ready.
    photos: [],
    placeholderCount: 6,
  },
  thingsToKnow: [
    { title: 'Dress Code', body: 'Traditional or festive attire — think color and comfort.', motif: 'couple' },
    { title: 'Accommodation', body: 'A room block is held at the venue hotel; details to follow.', motif: 'dome' },
    { title: 'Parking', body: 'Complimentary valet parking is available on-site.', motif: 'horses' },
    { title: 'Kids', body: "We'd love to see the little ones celebrate with us.", motif: 'children' },
  ],
  rsvp: {
    whatsapp: '', // e.g. "911234567890" (country code + number, no + or spaces)
    message: "Yes, I'll be there!",
  },
};

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

function renderEvents() {
  const list = document.getElementById('eventsList');
  if (!list) return;
  list.innerHTML = WEDDING_CONFIG.events.map((evt) => `
    <div class="event-card reveal-item" role="listitem">
      <span class="event-icon motif motif--${evt.motif}" aria-hidden="true"></span>
      <p class="event-name">${evt.name}</p>
      <svg viewBox="0 0 60 8" class="event-rule" aria-hidden="true"><path d="M0 4h24M36 4h24"/><circle cx="30" cy="4" r="2.5"/></svg>
      <p class="event-time">${evt.time}</p>
      <p class="event-date">${evt.date}</p>
      <p class="event-venue">${evt.venue}</p>
    </div>
  `).join('');
}

function renderThingsToKnow() {
  const grid = document.getElementById('ttkGrid');
  if (!grid) return;
  grid.innerHTML = WEDDING_CONFIG.thingsToKnow.map((card) => `
    <li class="ttk-card reveal-item">
      <span class="ttk-icon motif motif--${card.motif}" aria-hidden="true"></span>
      <p class="ttk-card-title">${card.title}</p>
      <p class="ttk-card-body">${card.body}</p>
    </li>
  `).join('');
}

// ═══════════════════════════════════
// Gallery — grid + lightbox (works with real photo URLs or placeholder tiles)
// ═══════════════════════════════════
let galleryPhotos = [];
let galleryIndex = 0;

function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  const { photos, placeholderCount } = WEDDING_CONFIG.gallery;
  galleryPhotos = photos.length ? photos : Array.from({ length: placeholderCount }, () => null);

  grid.innerHTML = galleryPhotos.map((src, i) => `
    <button class="gallery-tile reveal-item" data-index="${i}" role="listitem" aria-label="Open photo ${i + 1}">
      ${src
        ? `<img src="${src}" alt="" loading="lazy" decoding="async" />`
        : `<span class="gallery-tile-placeholder">Add photo</span>`}
    </button>
  `).join('');

  grid.querySelectorAll('.gallery-tile').forEach((tile) => {
    tile.addEventListener('click', () => openLightbox(Number(tile.dataset.index)));
  });
}

function openLightbox(index) {
  galleryIndex = index;
  const lightbox = document.getElementById('galleryLightbox');
  const inner = document.getElementById('galleryLbInner');
  if (!lightbox || !inner) return;
  const src = galleryPhotos[galleryIndex];
  inner.innerHTML = src
    ? `<img src="${src}" alt="" />`
    : `<div class="gallery-lb-placeholder">Add photo ${galleryIndex + 1}</div>`;
  lightbox.hidden = false;
}

function closeLightbox() {
  const lightbox = document.getElementById('galleryLightbox');
  if (lightbox) lightbox.hidden = true;
}

function stepLightbox(delta) {
  galleryIndex = (galleryIndex + delta + galleryPhotos.length) % galleryPhotos.length;
  openLightbox(galleryIndex);
}

function initGalleryControls() {
  document.getElementById('galleryLbClose')?.addEventListener('click', closeLightbox);
  document.getElementById('galleryLbPrev')?.addEventListener('click', () => stepLightbox(-1));
  document.getElementById('galleryLbNext')?.addEventListener('click', () => stepLightbox(1));
  document.getElementById('galleryLightbox')?.addEventListener('click', (e) => {
    if (e.target.id === 'galleryLightbox') closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('galleryLightbox');
    if (!lightbox || lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
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
  const steps = [initIntro, populateCouple, renderEvents, renderThingsToKnow,
    renderGallery, initGalleryControls, initRsvp, initCountdown, initScrollReveal, initNav, initFireworks];
  steps.forEach((step) => {
    try { step(); } catch (err) { console.error(`${step.name} failed:`, err); }
  });
});
