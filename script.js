/* ============================================================
   ANANDA ROKADE — PORTFOLIO JAVASCRIPT
   File: script.js
   Link this from index.html (before </body>):  <script src="script.js"></script>
   ============================================================ */

/* ──────────────────────────────────────────
   1. NAVBAR — scroll border effect + active link highlight
─────────────────────────────────────────── */
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {

  /* Sticky border */
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  /* Active nav link highlight */
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent2)' : '';
  });

});

/* ──────────────────────────────────────────
   2. MOBILE MENU — toggle open/close
─────────────────────────────────────────── */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

/* ──────────────────────────────────────────
   3. TYPED ROLE ANIMATION
   Add / remove strings from the `roles` array to customise.
─────────────────────────────────────────── */
const roles = [
  'Full Stack MERN Developer',
  'React.js Enthusiast',
  'Node.js Backend Dev',
  'DSA Problem Solver',
  'Open Source Learner'
];

let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;

const typedEl = document.getElementById('typed-role');

function type() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typedEl.textContent = currentRole.slice(0, ++charIndex);
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(type, 1800);   /* pause before deleting */
      return;
    }
  } else {
    typedEl.textContent = currentRole.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting  = false;
      roleIndex   = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(type, isDeleting ? 45 : 75);
}

type();

/* ──────────────────────────────────────────
   4. SCROLL-REVEAL ANIMATIONS (IntersectionObserver)
   Elements with class "fade-up" animate in when they enter the viewport.
   Elements inside a "stagger" parent get cascade delays via --i CSS variable.
─────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      /* Stagger delay if inside a .stagger container */
      const delay = entry.target.closest('.stagger')
        ? parseInt(entry.target.style.getPropertyValue('--i') || 0) * 80
        : 0;

      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

/* Observe all .fade-up elements */
document.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));

/* Also observe direct children of .stagger containers (add fade-up dynamically) */
document.querySelectorAll('.stagger > *').forEach(el => {
  el.classList.add('fade-up');
  revealObserver.observe(el);
});

/* ──────────────────────────────────────────
   5. CONTACT FORM — mailto fallback
   To use a real backend replace the mailto block below with
   Formspree / EmailJS / your own API call.
─────────────────────────────────────────── */
function handleFormSubmit(e) {
  e.preventDefault();

  const name  = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const msg   = document.getElementById('f-msg').value.trim();
  const fb    = document.getElementById('form-feedback');

  if (!name || !email || !msg) return;

  /* ── mailto fallback ── */
  const subject = encodeURIComponent(`Portfolio Message from ${name}`);
  const body    = encodeURIComponent(`Hi Ananda,\n\n${msg}\n\n— ${name} (${email})`);
  window.location.href = `mailto:anandabrokade17@gmail.com?subject=${subject}&body=${body}`;

  fb.textContent = '✓ Opening your mail client…';
  fb.style.color = 'var(--success)';
}