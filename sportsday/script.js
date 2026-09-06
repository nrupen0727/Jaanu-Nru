// ═══════════════════════════════════
// EDIT ME — Google Apps Script Web App URL (same project as the main
// site's RSVP; this page sends event: 'sportsday' so it's routed to
// its own sheet tab).
// ═══════════════════════════════════
const SPORTS_DAY_CONFIG = {
  sheetEndpoint: 'https://script.google.com/macros/s/AKfycbxjrysLOBNZeQrVaRZr76PkRlxhKT8TJNlvnySAhO5ijafLjPkPL-J8SF4hupm6gZm-gQ/exec',
  eventDate: '2027-01-31T10:00:00',
};

const SIZE_OPTIONS = [
  { group: 'Kids', values: ['Kids S', 'Kids M', 'Kids L'] },
  { group: 'Adult', values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
];

function sizeSelectMarkup(id, selected) {
  const groups = SIZE_OPTIONS.map(({ group, values }) => {
    const options = values.map((v) => `<option value="${v}"${v === selected ? ' selected' : ''}>${v}</option>`).join('');
    return `<optgroup label="${group}">${options}</optgroup>`;
  }).join('');
  return `<select id="${id}">${groups}</select>`;
}

// ═══════════════════════════════════
// RSVP form — interactive guest list
// ═══════════════════════════════════
function initRsvp() {
  const { sheetEndpoint } = SPORTS_DAY_CONFIG;

  const form = document.getElementById('rsvpForm');
  const formWrap = document.getElementById('rsvpFormWrap');
  const success = document.getElementById('rsvpSuccess');
  const listEl = document.getElementById('rsvpGuestList');
  const addGuestBtn = document.getElementById('addGuestBtn');
  const submitBtn = document.getElementById('rsvpSubmitBtn');

  if (!form) return;

  let attending = 'yes';
  let guests = [{ name: '', size: 'M' }];

  function renderGuestList(focusLast) {
    const visibleCount = attending === 'yes' ? guests.length : 1;

    listEl.innerHTML = guests.slice(0, visibleCount).map((g, i) => {
      const isYou = i === 0;
      const showSize = attending === 'yes';
      const showRemove = !isYou && attending === 'yes';
      return `
        <div class="guest-row">
          <div class="guest-row-fields">
            <div class="field guest-name-field">
              <label for="guestName${i}">${isYou ? 'Your name' : `Guest ${i + 1} name`}</label>
              <input type="text" id="guestName${i}" placeholder="Full name" value="${g.name}" required>
            </div>
            ${showSize ? `
            <div class="field guest-size-field">
              <label for="guestSize${i}">${isYou ? 'Your size' : 'Size'}</label>
              ${sizeSelectMarkup(`guestSize${i}`, g.size)}
            </div>` : ''}
          </div>
          ${showRemove ? `<button type="button" class="guest-remove" data-index="${i}" aria-label="Remove guest">&times;</button>` : ''}
        </div>
      `;
    }).join('');

    guests.slice(0, visibleCount).forEach((g, i) => {
      const nameInput = document.getElementById(`guestName${i}`);
      nameInput.addEventListener('input', () => { guests[i].name = nameInput.value; });
      const sizeSelect = document.getElementById(`guestSize${i}`);
      if (sizeSelect) sizeSelect.addEventListener('change', () => { guests[i].size = sizeSelect.value; });
    });

    listEl.querySelectorAll('.guest-remove').forEach((btn) => {
      btn.addEventListener('click', () => {
        guests.splice(Number(btn.dataset.index), 1);
        renderGuestList();
      });
    });

    addGuestBtn.style.display = attending === 'yes' ? 'inline-flex' : 'none';

    if (focusLast) {
      const last = guests.length - 1;
      const el = document.getElementById(`guestName${last}`);
      if (el) el.focus();
    }
  }

  renderGuestList();

  form.querySelectorAll('input[name="rsvpAttend"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      if (!radio.checked) return;
      attending = radio.value;
      renderGuestList();
    });
  });

  addGuestBtn.addEventListener('click', () => {
    guests.push({ name: '', size: 'M' });
    renderGuestList(true);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!sheetEndpoint) {
      alert('Add your Google Apps Script Web App URL to SPORTS_DAY_CONFIG.sheetEndpoint in script.js to enable this form.');
      return;
    }

    const primaryName = (guests[0].name || '').trim();
    const guestDetails = attending === 'yes'
      ? guests.map((g) => ({ name: g.name.trim(), size: g.size }))
      : [];
    const guestCount = attending === 'yes' ? guests.length : 0;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    fetch(sheetEndpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ event: 'sportsday', name: primaryName, attending, guests: guestCount, guestDetails }),
    })
      .then(() => {
        document.getElementById('rsvpSuccessName').textContent = primaryName || 'Friend';
        document.getElementById('rsvpSuccessBody').textContent = attending === 'yes'
          ? "Can't wait to see your game face."
          : "We'll miss you out there, but thanks for letting us know.";
        formWrap.style.display = 'none';
        success.classList.add('visible');
      })
      .catch(() => {
        alert('Something went wrong sending your RSVP — please try again.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send RSVP';
      });
  });
}

// ═══════════════════════════════════
// Countdown
// ═══════════════════════════════════
function initCountdown() {
  const target = new Date(SPORTS_DAY_CONFIG.eventDate).getTime();
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
// Fireworks (behind the RSVP card, matches main site)
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
    const color = colors[Math.floor(Math.random() * colors.length)];

    particles.push({ x: cx, y: cy, vx: 0, vy: 0, life: 1, decay: 0.05, color: '#fffaf5', flash: true });

    const count = 46 + Math.floor(Math.random() * 22);
    for (let i = 0; i < count; i += 1) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.25;
      const speed = 2.2 + Math.random() * 3.6;
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.009 + Math.random() * 0.008,
        color,
      });
    }
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.985;
      p.vy += 0.014;
      p.life -= p.decay;
      if (p.life > 0) {
        ctx.globalAlpha = p.flash ? p.life * 0.8 : p.life;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.flash ? 0 : 7;
        ctx.beginPath();
        const radius = p.flash ? 26 * p.life : 1.4 + p.life * 2.2;
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
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
    spawnTimer = setInterval(spawnBurst, 1900);
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
      entries.forEach((entry) => { entry.isIntersecting ? start() : stop(); });
    }, { threshold: 0.2 });
    observer.observe(section);
  } else {
    start();
  }
}

// ═══════════════════════════════════
// Scroll reveal
// ═══════════════════════════════════
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal-item');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
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

document.addEventListener('DOMContentLoaded', () => {
  initRsvp();
  initCountdown();
  initFireworks();
  initScrollReveal();
});
