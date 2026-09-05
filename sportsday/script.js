// ═══════════════════════════════════
// EDIT ME — Google Apps Script Web App URL (same project as the main
// site's RSVP; this page sends event: 'sportsday' so it's routed to
// its own sheet tab).
// ═══════════════════════════════════
const SPORTS_DAY_CONFIG = {
  sheetEndpoint: 'https://script.google.com/macros/s/AKfycbxjrysLOBNZeQrVaRZr76PkRlxhKT8TJNlvnySAhO5ijafLjPkPL-J8SF4hupm6gZm-gQ/exec',
};

const SIZE_OPTIONS = [
  { group: 'Kids', values: ['Kids S', 'Kids M', 'Kids L'] },
  { group: 'Adult', values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
];

function sizeSelectMarkup(id) {
  const groups = SIZE_OPTIONS.map(({ group, values }) => {
    const options = values.map((v) => `<option value="${v}"${v === 'M' ? ' selected' : ''}>${v}</option>`).join('');
    return `<optgroup label="${group}">${options}</optgroup>`;
  }).join('');
  return `<select id="${id}" class="size-select">${groups}</select>`;
}

function renderSizeFields(count) {
  const container = document.getElementById('rsvpSizes');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const label = i === 1 ? 'Your size' : `Guest ${i} size`;
    const id = `size${i}`;
    const wrapper = document.createElement('div');
    wrapper.className = 'size-field';
    wrapper.innerHTML = `<label for="${id}">${label}</label>${sizeSelectMarkup(id)}`;
    container.appendChild(wrapper);
  }
}

function initRsvp() {
  const { sheetEndpoint } = SPORTS_DAY_CONFIG;

  const form = document.getElementById('rsvpForm');
  const formWrap = document.getElementById('rsvpFormWrap');
  const success = document.getElementById('rsvpSuccess');
  const guestRow = document.getElementById('rsvpGuestRow');
  const sizesRow = document.getElementById('rsvpSizesRow');
  const guestsInput = document.getElementById('rsvpGuests');
  const submitBtn = document.getElementById('rsvpSubmitBtn');

  if (!form) return;

  function syncSizeFields() {
    const count = Math.max(1, Math.min(10, Number(guestsInput.value) || 1));
    renderSizeFields(count);
  }
  syncSizeFields();
  guestsInput.addEventListener('input', syncSizeFields);

  form.querySelectorAll('input[name="rsvpAttend"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      const attending = radio.value === 'yes' && radio.checked;
      guestRow.classList.toggle('visible', attending);
      sizesRow.classList.toggle('visible', attending);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!sheetEndpoint) {
      alert('Add your Google Apps Script Web App URL to SPORTS_DAY_CONFIG.sheetEndpoint in script.js to enable this form.');
      return;
    }

    const name = document.getElementById('rsvpName').value.trim();
    const attending = form.querySelector('input[name="rsvpAttend"]:checked').value;
    const guests = attending === 'yes' ? guestsInput.value : 0;
    const sizes = attending === 'yes'
      ? Array.from(document.querySelectorAll('.size-select')).map((s) => s.value)
      : [];

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    fetch(sheetEndpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ event: 'sportsday', name, attending, guests, sizes }),
    })
      .then(() => {
        document.getElementById('rsvpSuccessName').textContent = name || 'Friend';
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

document.addEventListener('DOMContentLoaded', initRsvp);
