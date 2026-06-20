/* ==========================================
   PORTFOLIO â€” APP.JS v3
   Clean Â· Modular Â· Well-aligned
   ========================================== */

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   ANTI-DEVTOOLS SHIELD
   Multiple detection layers â€” fires oops.html
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
;(function devToolsShield() {
  const TROLL = '/oops.html';
  let fired = false;

  function bust() {
    if (fired) return;
    fired = true;
    // Blank the page instantly before redirect so nothing is readable
    document.documentElement.style.visibility = 'hidden';
    window.location.replace(TROLL);
  }

  /* â”€â”€ Layer 1: Block keyboard shortcuts â”€â”€ */
  document.addEventListener('keydown', e => {
    const K = e.key?.toUpperCase();
    if (
      e.key === 'F12' ||
      (e.ctrlKey  && e.shiftKey && ['I','J','C','K'].includes(K)) ||
      (e.metaKey  && e.altKey   && ['I','J'].includes(K)) || // Mac
      (e.ctrlKey  && K === 'U')   // View source
    ) {
      e.preventDefault();
      e.stopImmediatePropagation();
      bust();
    }
  }, true);

  /* â”€â”€ Layer 2: Disable right-click â”€â”€ */
  document.addEventListener('contextmenu', e => e.preventDefault());

  /* â”€â”€ Layer 3: Window size delta (docked DevTools) â”€â”€ */
  function sizeCheck() {
    const wDiff = window.outerWidth  - window.innerWidth;
    const hDiff = window.outerHeight - window.innerHeight;
    if (wDiff > 200 || hDiff > 200) bust();
  }
  setInterval(sizeCheck, 600);

  /* â”€â”€ Layer 4: Console getter trap (most reliable)
     DevTools auto-reads object properties when logging,
     triggering the getter even before the user types anything â”€â”€ */
  const trap = new Image();
  Object.defineProperty(trap, 'id', {
    get() { bust(); return ''; }
  });
  setInterval(() => {
    console.log('%cPortfolio protected.', 'color:transparent;font-size:0px', trap);
    console.clear();
  }, 1500);

})();
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

const GH_USER = 'VarshuAi';
const GH_API  = `https://api.github.com/users/${GH_USER}`;
const REPO_API = `https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=30`;

const LANG_COLORS = {
  Python:'#3776AB', JavaScript:'#F7DF1E', TypeScript:'#3178C6',
  Rust:'#CE422B', HTML:'#E34F26', CSS:'#264DE4', Go:'#00ADD8',
  Shell:'#4EAA25', 'C++':'#00599C', 'C#':'#178600',
  Java:'#b07219', PHP:'#4F5D95', Ruby:'#CC342D',
  Swift:'#FA7343', Kotlin:'#A97BFF',
};

/* â”€â”€ SMOOTH ANCHOR SCROLL â”€â”€ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id  = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CINEMA INTRO CONTROLLER
   Total runtime: ~4.4 seconds
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
(function introController() {
  const intro = document.getElementById('intro');
  const skip  = document.getElementById('intro-skip');
  if (!intro) return;

  // Lock scroll while intro plays
  document.body.classList.add('intro-on');

  // How long the full sequence runs before auto-exit
  const DURATION = 4400;

  function dismiss() {
    intro.classList.add('exit');
    document.body.classList.remove('intro-on');
    // Remove from DOM fully after fade transition ends
    setTimeout(() => intro.remove(), 1050);
  }

  // Auto-dismiss after full animation
  const autoTimer = setTimeout(dismiss, DURATION);

  // Skip on click anywhere on the intro or on the skip text
  intro.addEventListener('click', () => {
    clearTimeout(autoTimer);
    dismiss();
  });
})();
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

/* â”€â”€ CURSOR â€” translate3d for pixel-perfect GPU tracking â”€â”€ */
const cDot  = document.getElementById('c-dot');
const cRing = document.getElementById('c-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  // Dot follows mouse instantly â€” no lag at all
  if (cDot) cDot.style.transform = `translate3d(${mx}px,${my}px,0)`;
}, { passive: true });

// Ring follows with slight lag on its own rAF loop
(function ringLoop() {
  rx += (mx - rx) * 0.16;
  ry += (my - ry) * 0.16;
  if (cRing) cRing.style.transform = `translate3d(${rx}px,${ry}px,0)`;
  requestAnimationFrame(ringLoop);
})();

/* â”€â”€ PARTICLES â”€â”€ */
const canvas = document.getElementById('hero-canvas');
const ctx    = canvas ? canvas.getContext('2d') : null;
let pts = [];

function resizeCanvas() {
  if (!canvas) return;
  canvas.width  = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
}

function initCanvas() {
  if (!canvas || !ctx) return;
  resizeCanvas();
  pts = Array.from({ length: 40 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2 + 0.4,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    a: Math.random() * 0.3 + 0.07,
    c: Math.random() > 0.5 ? '79,70,229' : '124,58,237',
  }));
  drawCanvas();
}

let frameCount = 0;
function drawCanvas() {
  if (!ctx || !canvas) return;
  frameCount++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move particles every frame
  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.c},${p.a})`;
    ctx.fill();
  });

  // Draw connections only every 2 frames to reduce CPU load
  if (frameCount % 2 === 0) {
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(79,70,229,${0.06 * (1 - d / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  requestAnimationFrame(drawCanvas);
}

window.addEventListener('resize', resizeCanvas, { passive: true });
if (window.matchMedia('(min-width: 768px)').matches) initCanvas();

/* â”€â”€ TYPEWRITER â”€â”€ */
const phrases = [
  'Builder by instinct.',
  'Tinkerer by nature.',
  'Creator by choice.',
  'Always shipping something.',
  'Open source contributor.',
  'Code. Break. Fix. Repeat.',
];
let pIdx = 0, cIdx = 0, del = false;
const typeEl = document.getElementById('typeTarget');

function type() {
  if (!typeEl) return;
  const word = phrases[pIdx];
  typeEl.textContent = del ? word.slice(0, --cIdx) : word.slice(0, ++cIdx);
  if (!del && cIdx === word.length) { del = true; setTimeout(type, 1800); return; }
  if (del && cIdx === 0) { del = false; pIdx = (pIdx + 1) % phrases.length; }
  setTimeout(type, del ? 38 : 70);
}
setTimeout(type, 500);

/* â”€â”€ NAV â”€â”€ */
const siteNav  = document.getElementById('site-nav');
const navLine  = document.getElementById('navLine');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  const dh = document.documentElement.scrollHeight - window.innerHeight;
  navLine.style.width = dh > 0 ? `${(sy / dh) * 100}%` : '0%';
  siteNav.classList.toggle('scrolled', sy > 30);

  // Active link
  document.querySelectorAll('section[id], header[id]').forEach(sec => {
    const top = sec.offsetTop - 100;
    if (sy >= top && sy < top + sec.offsetHeight) {
      navLinks.forEach(a => a.classList.remove('active'));
      const m = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
      if (m) m.classList.add('active');
    }
  });
}, { passive: true });

/* â”€â”€ MOBILE DRAWER â”€â”€ */
const toggle  = document.getElementById('navToggle');
const drawer  = document.getElementById('drawer');
const overlay = document.getElementById('drawerOverlay');

function toggleDrawer(open) {
  toggle.classList.toggle('open', open);
  drawer.classList.toggle('open', open);
  overlay.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

toggle?.addEventListener('click', () => toggleDrawer(!toggle.classList.contains('open')));
overlay?.addEventListener('click', () => toggleDrawer(false));
drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleDrawer(false)));

/* â”€â”€ SCROLL REVEAL â”€â”€ */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* â”€â”€ COUNTER ANIMATION â”€â”€ */
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el  = e.target;
    const end = parseInt(el.dataset.target, 10);
    const dur = 1400;
    const t0  = performance.now();
    (function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const v = Math.round((1 - Math.pow(1 - p, 3)) * end); // ease-out cubic
      el.textContent = v.toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    })(performance.now());
    cntObs.unobserve(el);
  });
}, { threshold: 0.6 });

document.querySelectorAll('.counter').forEach(el => cntObs.observe(el));

/* â”€â”€ CARD SPOTLIGHT â”€â”€ */
function attachSpotlight() {
  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width)  * 100;
      const y = ((e.clientY - r.top)  / r.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });
  });
}

/* â”€â”€ PROJECTS â”€â”€ */
let repos = [], filter = 'all';

function buildCard(repo, i) {
  const lang  = repo.language;
  const desc  = repo.description || 'No description provided.';
  const color = LANG_COLORS[lang] || '#8b8b8b';
  const stars = repo.stargazers_count || 0;
  const forks = repo.forks_count || 0;

  const a = document.createElement('a');
  a.href   = repo.html_url;
  a.target = '_blank';
  a.rel    = 'noopener noreferrer';
  a.className = 'proj-card reveal';
  a.id    = `proj-${repo.name}`;
  a.style.transitionDelay = `${(i % 6) * 0.05}s`;

  a.innerHTML = `
    <div class="proj-card-head">
      <div class="proj-repo-icon">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h4v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
        </svg>
      </div>
      <span class="proj-name">${repo.name}</span>
      ${repo.fork ? '<span class="fork-badge">Fork</span>' : ''}
    </div>
    <p class="proj-desc">${desc.length > 100 ? desc.slice(0, 100) + 'â€¦' : desc}</p>
    <div class="proj-foot">
      <div class="proj-lang">
        ${lang ? `<span class="lang-dot lc-${lang}" style="background:${color}"></span><span>${lang}</span>` : '<span style="color:var(--text-3)">â€”</span>'}
      </div>
      <div class="proj-meta">
        <span class="proj-meta-item">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          ${stars}
        </span>
        <span class="proj-meta-item">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><line x1="12" y1="12" x2="12" y2="15"/></svg>
          ${forks}
        </span>
      </div>
      <span class="proj-arrow">â†—</span>
    </div>`;
  return a;
}

function renderRepos(f) {
  const grid = document.getElementById('projGrid');
  grid.innerHTML = '';
  const list = f === 'all' ? repos
    : f === 'original' ? repos.filter(r => !r.fork)
    : repos.filter(r => r.fork);

  if (!list.length) {
    grid.innerHTML = `<div class="proj-loading"><span style="color:var(--text-3)">No repos in this filter.</span></div>`;
    return;
  }
  list.forEach((r, i) => grid.appendChild(buildCard(r, i)));
  grid.querySelectorAll('.reveal').forEach(el => revObs.observe(el));
  attachSpotlight();
}

document.querySelectorAll('.pf').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pf').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filter = btn.dataset.f;
    renderRepos(filter);
  });
});

async function loadRepos() {
  const grid = document.getElementById('projGrid');
  const more = document.getElementById('projMore');
  try {
    const res  = await fetch(REPO_API);
    if (!res.ok) throw new Error('API error');
    repos = (await res.json()).filter(r => r.name !== GH_USER);
    renderRepos(filter);
    if (more) more.style.display = 'block';
  } catch {
    grid.innerHTML = `<div class="proj-loading">
      <span>Could not load repos.</span>
      <a href="https://github.com/${GH_USER}" target="_blank" style="color:var(--accent);font-weight:700">Visit GitHub â†—</a>
    </div>`;
  }
}

/* â”€â”€ GITHUB PROFILE â”€â”€ */
async function loadProfile() {
  try {
    const data = await (await fetch(GH_API)).json();
    const reposVal = data.public_repos;
    const folsVal = data.followers;
    const folgVal = data.following;

    // Update counters
    const reposCounter = document.getElementById('stat-repos-counter');
    const folsCounter = document.getElementById('stat-fols-counter');
    const folgCounter = document.getElementById('stat-folg-counter');

    if (reposCounter) {
      reposCounter.dataset.target = reposVal;
      if (reposCounter.textContent !== '0') reposCounter.textContent = reposVal.toLocaleString();
    }
    if (folsCounter) {
      folsCounter.dataset.target = folsVal;
      if (folsCounter.textContent !== '0') folsCounter.textContent = folsVal.toLocaleString();
    }
    if (folgCounter) {
      folgCounter.dataset.target = folgVal;
      if (folgCounter.textContent !== '0') folgCounter.textContent = folgVal.toLocaleString();
    }

    // Update inline dynamic values across page
    document.querySelectorAll('.github-repos-dynamic').forEach(el => el.textContent = reposVal);
    document.querySelectorAll('.github-followers-dynamic').forEach(el => el.textContent = folsVal);
    document.querySelectorAll('.github-following-dynamic').forEach(el => el.textContent = folgVal);

    // Update chips
    const rv = document.getElementById('chip-repo-val');
    const fv = document.getElementById('chip-follow-val');
    if (rv) rv.textContent = reposVal + '+';
    if (fv) fv.textContent = folsVal;
  } catch(e) { /* fail silently */ }
}

async function loadViews() {
  try {
    const res = await fetch('https://abacus.jasoncameron.dev/hit/varshuai.github.io/visits');
    if (res.ok) {
      const data = await res.json();
      const el = document.getElementById('visit-count');
      if (el) el.textContent = data.value.toLocaleString();
    }
  } catch (e) { /* fail silently */ }
}

/* â”€â”€ PARALLAX ORBS â”€â”€ */
let px = 0, py = 0, plx = 0, ply = 0;
document.addEventListener('mousemove', e => {
  px = (e.clientX / window.innerWidth  - 0.5) * 30;
  py = (e.clientY / window.innerHeight - 0.5) * 30;
}, { passive: true });
(function pLoop() {
  plx += (px - plx) * 0.04;
  ply += (py - ply) * 0.04;
  const mesh = document.querySelector('.hero-mesh');
  if (mesh) mesh.style.transform = `translate(${plx * 0.4}px, ${ply * 0.4}px)`;
  requestAnimationFrame(pLoop);
})();

/* Smooth scroll done natively via CSS â€” no JS needed */


/* â”€â”€ HERO REVEAL â”€â”€ */
setTimeout(() => {
  document.querySelectorAll('#top .reveal, #h-status, #h-name, #h-type, #h-bio, #h-ctas, #h-scroll, #h-right').forEach(el => {
    el.classList.add('visible');
  });
}, 100);

/* â”€â”€ INIT â”€â”€ */
loadProfile();
loadRepos();
loadViews();

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   EASTER EGG â€” type "varshan" anywhere
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
(function easterEgg() {
  const SECRET = 'varshan';
  let buffer = '';
  const overlay = document.getElementById('egg-overlay');
  const closeBtn = document.getElementById('eggClose');
  if (!overlay) return;

  function showEgg() {
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function hideEgg() {
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', e => {
    if (['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)) return;
    buffer += e.key.toLowerCase();
    if (buffer.length > SECRET.length) buffer = buffer.slice(-SECRET.length);
    if (buffer === SECRET) { buffer = ''; showEgg(); }
  });

  if (closeBtn) closeBtn.addEventListener('click', hideEgg);
  overlay.addEventListener('click', e => { if (e.target === overlay) hideEgg(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hideEgg(); });
})();

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SECTION TRANSITIONS â€” stagger reveal on scroll
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
(function sectionTransitions() {
  const sections = document.querySelectorAll('.section');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

  sections.forEach(sec => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(32px)';
    sec.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
    io.observe(sec);
  });
})();


/* ════════════════════════════════
   EASTER EGG FIX — DOMContentLoaded ensures
   the #egg-overlay element exists before binding
   ════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {
  var SECRET = 'varshan';
  var buf = '';
  var ov = document.getElementById('egg-overlay');
  var cl = document.getElementById('eggClose');
  if (!ov) return;

  function showEgg() { ov.classList.add('show'); document.body.style.overflow = 'hidden'; }
  function hideEgg() { ov.classList.remove('show'); document.body.style.overflow = ''; }

  document.addEventListener('keydown', function(e) {
    var tag = document.activeElement ? document.activeElement.tagName : '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    buf += (e.key || '').toLowerCase();
    if (buf.length > SECRET.length) buf = buf.slice(-SECRET.length);
    if (buf === SECRET) { buf = ''; showEgg(); }
  });

  if (cl) cl.addEventListener('click', hideEgg);
  ov.addEventListener('click', function(e) { if (e.target === ov) hideEgg(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') hideEgg(); });
});

/* ══════════════════════════════════════
   DARK / LIGHT MODE TOGGLE
   ══════════════════════════════════════ */
(function darkMode() {
  var toggle = document.getElementById('themeToggle');
  var saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  if (toggle) toggle.addEventListener('click', function() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });
})();

/* ══════════════════════════════════════
   SCROLL PROGRESS BAR
   ══════════════════════════════════════ */
(function scrollProgress() {
  var bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', function() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = h > 0 ? ((window.scrollY / h) * 100) + '%' : '0%';
  }, { passive: true });
})();

/* ══════════════════════════════════════
   COMMAND PALETTE (Ctrl+K)
   ══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function cmdPalette() {
  var overlay = document.getElementById('cmd-overlay');
  var input = document.getElementById('cmd-input');
  var results = document.getElementById('cmd-results');
  if (!overlay || !input || !results) return;

  var items = [
    { label: 'About', section: '#about', icon: 'user' },
    { label: 'Currently Building', section: '#building', icon: 'zap' },
    { label: 'Projects', section: '#projects', icon: 'code' },
    { label: 'Tech Stack', section: '#stack', icon: 'cpu' },
    { label: 'GitHub Stats', section: '#github', icon: 'git' },
    { label: 'Timeline', section: '#timeline', icon: 'clock' },
    { label: 'Skills', section: '#skills', icon: 'layers' },
    { label: 'Contact', section: '#contact', icon: 'mail' },
    { label: 'Toggle Dark Mode', action: 'theme', icon: 'moon' },
    { label: 'GitHub Profile', url: 'https://github.com/VarshuAi', icon: 'ext' },
  ];

  var activeIdx = 0;

  function open() { overlay.classList.add('open'); input.value = ''; render(''); input.focus(); activeIdx = 0; }
  function close() { overlay.classList.remove('open'); input.blur(); }

  function render(q) {
    var q2 = q.toLowerCase();
    var filtered = items.filter(function(i) { return i.label.toLowerCase().includes(q2); });
    if (activeIdx >= filtered.length) activeIdx = Math.max(0, filtered.length - 1);
    results.innerHTML = filtered.map(function(item, i) {
      return '<div class="cmd-item' + (i === activeIdx ? ' active' : '') + '" data-idx="' + i + '">' +
        '<div class="cmd-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/></svg></div>' +
        '<span class="cmd-item-text">' + item.label + '</span>' +
        (item.section ? '<span class="cmd-item-hint">' + item.section + '</span>' : '') +
        '</div>';
    }).join('');

    results.querySelectorAll('.cmd-item').forEach(function(el) {
      el.addEventListener('click', function() { go(filtered[parseInt(el.dataset.idx)]); });
    });
  }

  function go(item) {
    close();
    if (item.section) {
      var el = document.querySelector(item.section);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (item.action === 'theme') {
      var t = document.getElementById('themeToggle');
      if (t) t.click();
    } else if (item.url) {
      window.open(item.url, '_blank');
    }
  }

  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && (e.key && e.key.toLowerCase() === 'k' || e.code === 'KeyK')) {
      e.preventDefault();
      overlay.classList.contains('open') ? close() : open();
    }
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') { close(); return; }
    var q = input.value.toLowerCase();
    var filtered = items.filter(function(i) { return i.label.toLowerCase().includes(q); });
    if (e.key === 'ArrowDown') { e.preventDefault(); activeIdx = Math.min(activeIdx + 1, filtered.length - 1); render(input.value); }
    if (e.key === 'ArrowUp') { e.preventDefault(); activeIdx = Math.max(activeIdx - 1, 0); render(input.value); }
    if (e.key === 'Enter' && filtered[activeIdx]) { go(filtered[activeIdx]); }
  });

  input.addEventListener('input', function() { activeIdx = 0; render(input.value); });
  overlay.addEventListener('click', function(e) { if (e.target === overlay) close(); });
});

/* ══════════════════════════════════════
   DYNAMIC GREETING (time of day)
   ══════════════════════════════════════ */
(function greeting() {
  var el = document.getElementById('heroGreeting');
  if (!el) return;
  var h = new Date().getHours();
  var g = h < 5 ? 'Late night owl?' : h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : h < 21 ? 'Good evening' : 'Burning the midnight oil?';
  el.textContent = g + ' — welcome to my corner of the internet.';
})();

/* ══════════════════════════════════════
   3D CARD TILT (parallax hover)
   ══════════════════════════════════════ */
(function cardTilt() {
  if (window.matchMedia('(hover: none)').matches) return;
  var cards = document.querySelectorAll('.building-card, .skill-card, .gh-card, .contact-card, .tl-card, .stat-card');
  cards.forEach(function(card) {
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = card.style.transition ? card.style.transition + ', transform 0.15s ease' : 'transform 0.15s ease';
    card.addEventListener('mousemove', function(e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = 'perspective(600px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) scale(1)';
    });
  });
})();
