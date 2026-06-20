/* ==========================================
   PORTFOLIO — APP.JS v3
   Clean · Modular · Well-aligned
   ========================================== */

/* ══════════════════════════════════════
   ANTI-DEVTOOLS SHIELD
   Multiple detection layers — fires oops.html
   ══════════════════════════════════════ */
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

  /* ── Layer 1: Block keyboard shortcuts ── */
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

  /* ── Layer 2: Disable right-click ── */
  document.addEventListener('contextmenu', e => e.preventDefault());

  /* ── Layer 3: Window size delta (docked DevTools) ── */
  function sizeCheck() {
    const wDiff = window.outerWidth  - window.innerWidth;
    const hDiff = window.outerHeight - window.innerHeight;
    if (wDiff > 200 || hDiff > 200) bust();
  }
  setInterval(sizeCheck, 600);

  /* ── Layer 4: Console getter trap (most reliable)
     DevTools auto-reads object properties when logging,
     triggering the getter even before the user types anything ── */
  const trap = new Image();
  Object.defineProperty(trap, 'id', {
    get() { bust(); return ''; }
  });
  setInterval(() => {
    console.log('%cPortfolio protected.', 'color:transparent;font-size:0px', trap);
    console.clear();
  }, 1500);

})();

/* ── AUDIO SYSTEM (Web Audio API Synthesizer) ── */
var audioEnabled = localStorage.getItem('audio_effects') !== 'false';
var audioCtx = null;

function playSound(type) {
  if (!audioEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    var now = audioCtx.currentTime;
    
    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'hover') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.005, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);
      osc.start(now);
      osc.stop(now + 0.015);
    } else if (type === 'open') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.15);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.02, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'close') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.15);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch (e) {
    console.warn("Audio Context failed:", e);
  }
}

/* ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═  */

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

/* ── SMOOTH ANCHOR SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id  = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ═══════════════════════════════
   CINEMA INTRO CONTROLLER
   Total runtime: ~4.4 seconds
   ═══════════════════════════════ */
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
/* ═══════════════════════════════ */

/* ── CURSOR — translate3d for pixel-perfect GPU tracking ── */
const cDot  = document.getElementById('c-dot');
const cRing = document.getElementById('c-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  // Dot follows mouse instantly — no lag at all
  if (cDot) cDot.style.transform = `translate3d(${mx}px,${my}px,0)`;
}, { passive: true });

// Ring follows with slight lag on its own rAF loop
(function ringLoop() {
  rx += (mx - rx) * 0.16;
  ry += (my - ry) * 0.16;
  if (cRing) cRing.style.transform = `translate3d(${rx}px,${ry}px,0)`;
  requestAnimationFrame(ringLoop);
})();

/* ── PARTICLES ── */
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

/* ── TYPEWRITER ── */
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

/* ── NAV ── */
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

/* ── MOBILE DRAWER ── */
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

/* ── SCROLL REVEAL ── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* ── COUNTER ANIMATION ── */
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

/* ── CARD SPOTLIGHT ── */
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

/* ── PROJECTS ── */
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
    <p class="proj-desc">${desc.length > 100 ? desc.slice(0, 100) + '…' : desc}</p>
    <div class="proj-foot">
      <div class="proj-lang">
        ${lang ? `<span class="lang-dot lc-${lang}" style="background:${color}"></span><span>${lang}</span>` : '<span style="color:var(--text-3)">—</span>'}
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
      <span class="proj-arrow">↗</span>
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
      <a href="https://github.com/${GH_USER}" target="_blank" style="color:var(--accent);font-weight:700">Visit GitHub ↗</a>
    </div>`;
  }
}

/* ── GITHUB PROFILE ── */
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

/* ── PARALLAX ORBS ── */
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

/* Smooth scroll done natively via CSS — no JS needed */


/* ── HERO REVEAL ── */
setTimeout(() => {
  document.querySelectorAll('#top .reveal, #h-status, #h-name, #h-type, #h-bio, #h-ctas, #h-scroll, #h-right').forEach(el => {
    el.classList.add('visible');
  });
}, 100);

/* ── INIT ── */
loadProfile();
loadRepos();
loadViews();
loadArticles();

/* ══════════════════════════════════════
   EASTER EGG — type "varshan" anywhere
   ══════════════════════════════════════ */
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

/* ══════════════════════════════════════
   SECTION TRANSITIONS — stagger reveal on scroll
   ══════════════════════════════════════ */
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
    { label: 'Blog', section: '#blog', icon: 'book' },
    { label: 'Skills', section: '#skills', icon: 'layers' },
    { label: 'Contact', section: '#contact', icon: 'mail' },
    { label: 'Toggle Dark Mode', action: 'theme', icon: 'moon' },
    { label: 'GitHub Profile', url: 'https://github.com/VarshuAi', icon: 'ext' },
  ];

  var activeIdx = 0;

  function open() { overlay.classList.add('open'); input.value = ''; render(''); input.focus(); activeIdx = 0; if (typeof playSound === 'function') playSound('open'); }
  function close() { overlay.classList.remove('open'); input.blur(); if (typeof playSound === 'function') playSound('close'); }

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
})();

/* ══════════════════════════════════════
   INTERACTIVE TECH STACK MODAL & DATABASE
   ══════════════════════════════════════ */
var STACK_DETAILS = {
  'python': {
    title: 'Python',
    sub: 'Data pipelines, Scripting & Backend APIs',
    desc: 'Used extensively for developing automation scripts, web scrapers, data processing pipelines, and AI utility scripts. Leveraging Python for fast prototyping and high-level tool integration.',
    icon: '<svg viewBox="0 0 24 24" fill="#3776AB"><path d="M12 0C5.8 0 6.2 2.7 6.2 2.7v2.6h5.9v.8H3.9S0 5.6 0 12s3.4 6.6 3.4 6.6H6v-3.2s-.1-3.4 3.4-3.4h5.9s3.2.1 3.2-3.1V3.4S19.1 0 12 0zm-1.6 1.9c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zM12 24c6.2 0 5.8-2.7 5.8-2.7v-2.6h-5.9v-.8h8.2S24 18.4 24 12s-3.4-6.6-3.4-6.6H18v3.2s.1 3.4-3.4 3.4H8.7s-3.2-.1-3.2 3.1v5.5S4.9 24 12 24zm1.6-1.9c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/></svg>',
    color: '#3776AB',
    match: function(r) { return r.language && r.language.toLowerCase() === 'python'; }
  },
  'javascript': {
    title: 'JavaScript',
    sub: 'Interactive Web Apps & Dynamic DOM',
    desc: 'The backbone of my web layouts. I write clean, vanilla ES6+ JavaScript for rendering APIs, managing complex state and UI interactions, and creating custom page animations without heavy frameworks.',
    icon: '<svg viewBox="0 0 24 24" fill="#F7DF1E"><path d="M0 0h24v24H0V0zm22.03 18.6c-.3-1.5-1.4-2.2-2.9-2.2-.8 0-1.3.2-1.7.7v-5.9h-2.5V20c-.1 0-.1 0-.2-.1-.4-1.4-1.5-2-3-2-1.2 0-2 .5-2.5 1.3v-1.1H7v6.3h2.5v-3.7c0-.6.3-1 .9-1s.9.4.9 1v3.7h2.5v-3.7c0-.6.3-1 .9-1s.9.4.9 1v3.7h2.5V18.8c.5-.6 1.1-.9 1.8-.9.8 0 1.2.4 1.2 1.3V24H24v-4c0-1-.3-1.2-.6-1.4l.63.0z"/><path d="M11.4 9.4c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7 2.7 1.2 2.7 2.7zm8.5 0c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7 2.7 1.2 2.7 2.7z"/></svg>',
    color: '#F7DF1E',
    match: function(r) { return r.language && r.language.toLowerCase() === 'javascript'; }
  },
  'rust': {
    title: 'Rust',
    sub: 'Systems Programming & Safe Tauri Apps',
    desc: 'My absolute favorite for writing blazing fast, memory-safe backend services, desktop utilities via Tauri, and command-line interfaces. Built professional tools like Antigravity-Manager using Rust.',
    icon: '<svg viewBox="0 0 24 24" fill="#CE422B"><path d="M23.83 11.72l-1.05-.65a10.75 10.75 0 0 0-.08-1.01l.9-.8a.27.27 0 0 0-.05-.43l-1.12-.57a10.9 10.9 0 0 0-.26-.98l.72-.94a.27.27 0 0 0-.13-.42l-1.22-.37a11.2 11.2 0 0 0-.43-.9l.5-1.06a.27.27 0 0 0-.2-.38l-1.26-.13a11.4 11.4 0 0 0-.59-.79l.26-1.13a.27.27 0 0 0-.27-.33l-1.26.11a11.6 11.6 0 0 0-.73-.65l0-1.16a.27.27 0 0 0-.32-.26l-1.2.36a11.8 11.8 0 0 0-.85-.48L16 .27a.27.27 0 0 0-.36-.18l-1.1.6a12 12 0 0 0-.94-.3L13.3.17A.27.27 0 0 0 12.94 0l-.94.83a12 12 0 0 0-.97-.07L11.26 0a.27.27 0 0 0-.36.17l-.3 1.22a12 12 0 0 0-.92.31L8.61.1a.27.27 0 0 0-.36.18l-.18 1.24A12 12 0 0 0 7.24 2l-1.2-.35a.27.27 0 0 0-.32.26l0 1.16A11.8 11.8 0 0 0 5 3.72l-1.26-.1a.27.27 0 0 0-.27.33l.26 1.13a11.6 11.6 0 0 0-.59.79L1.88 6a.27.27 0 0 0-.2.38l.5 1.06a11.4 11.4 0 0 0-.43.9L.53 8.7a.27.27 0 0 0-.13.42l.72.94a10.9 10.9 0 0 0-.26.98L.74 11.6a.27.27 0 0 0-.05.43l.9.8a10.75 10.75 0 0 0-.08 1.01l1.05-.65a.27.27 0 0 0 0-.44zM12 16.5A4.5 4.5 0 1 1 12 7.5 4.5 4.5 0 0 1 12 16.5z"/></svg>',
    color: '#CE422B',
    match: function(r) { return r.language && r.language.toLowerCase() === 'rust'; }
  },
  'go': {
    title: 'Go',
    sub: 'Backend Microservices & CLI tools',
    desc: 'Leveraged for high-concurrency microservices, network servers, and cross-platform tools. Built various validators and parser CLI tools (like yaml-linter-v240) using Go.',
    icon: '<svg viewBox="0 0 24 24" fill="#00ADD8"><path d="M1.8 9.6c-.1 0-.1-.1 0 0l-.2-.2 0 0c0-.1 0-.1.1-.1h20.3c.1 0 .1 0 .1.1l-.1.2c0 .1-.1.1-.1.1H1.8zm-.7 1.5c-.1 0-.1 0 0 0l-.1-.2v-.1c0-.1 0-.1.1-.1h20.8c.1 0 .1 0 .1.1v.1c0 .1-.1.1-.1.1H1.1zm1.1 1.4s-.1 0 0 0l-.2-.1v-.1c0-.1 0-.1.1-.1h18.6c.1 0 .1 0 .1.1v.2c0 .1-.1.1-.1.1H2.2z"/></svg>',
    color: '#00ADD8',
    match: function(r) { return r.language && r.language.toLowerCase() === 'go'; }
  },
  'node.js': {
    title: 'Node.js',
    sub: 'Server-side runtime & Script tooling',
    desc: 'Extensively used for runtime operations, tooling, script writing, and integration APIs. Essential for modern server-side javascript architecture.',
    icon: '<svg viewBox="0 0 24 24" fill="#339933"><path d="M11.998 24a2.7 2.7 0 0 1-1.357-.365L7.616 21.77c-.504-.282-.258-.381-.092-.438.493-.173.592-.211 1.118-.511.055-.032.127-.02.183.014l2.276 1.352c.083.045.199.045.275 0l8.877-5.126a.28.28 0 0 0 .137-.243V7.185a.282.282 0 0 0-.138-.245l-8.875-5.122a.279.279 0 0 0-.274 0L2.226 6.94a.283.283 0 0 0-.138.244v10.25a.28.28 0 0 0 .138.242l2.432 1.406c1.32.66 2.128-.117 2.128-.9V8.322a.255.255 0 0 1 .255-.255h1.114c.14 0 .254.115.254.255v9.86c0 1.762-.96 2.773-2.629 2.773-.513 0-.917 0-2.044-.556L1.358 19.1A2.726 2.726 0 0 1 0 16.741V6.491a2.726 2.726 0 0 1 1.358-2.36l8.875-5.128a2.748 2.748 0 0 1 2.73 0l8.875 5.129A2.726 2.726 0 0 1 24 6.491v10.25a2.726 2.726 0 0 1-1.358 2.36l-8.875 5.129a2.7 2.7 0 0 1-1.369.37z"/></svg>',
    color: '#339933',
    match: function(r) { return r.language && (r.language.toLowerCase() === 'javascript' || r.language.toLowerCase() === 'typescript'); }
  },
  'react': {
    title: 'React',
    sub: 'Single Page Applications & React DOM',
    desc: 'Used for building complex dashboard apps, responsive client portals, and customizable interactive views with modular components.',
    icon: '<svg viewBox="0 0 24 24" fill="#61DAFB"><circle cx="12" cy="11.99" r="2.14"/><path d="M12 6.64c3.37 0 6.49.53 8.82 1.39 2.8 1.05 4.35 2.62 4.35 4.21 0 1.65-1.63 3.28-4.55 4.36-2.3.85-5.35 1.29-8.62 1.29-3.32 0-6.41-.43-8.73-1.3C.41 15.52-1.17 13.87-1.17 12.24c0-1.58 1.51-3.13 4.14-4.17C5.32 7.16 8.52 6.64 12 6.64m0-1C3.68 5.64-1.17 8.56-1.17 12.24s4.85 6.6 13.17 6.6 13.17-2.92 13.17-6.6S20.32 5.64 12 5.64z"/></svg>',
    color: '#61DAFB',
    match: function(r) { return r.name.toLowerCase().includes('react') || (r.description && r.description.toLowerCase().includes('react')); }
  },
  'docker': {
    title: 'Docker',
    sub: 'Containerization & DevOps Deployments',
    desc: 'Used for containerizing apps and setting up dev/production parity. Ensures that all applications run identically across environments.',
    icon: '<svg viewBox="0 0 24 24" fill="#2496ED"><path d="M13.98 11.08h2.12v-2h-2.12zm-2.95 0h2.13v-2H11zm-2.94 0h2.12v-2H8.06zm-2.95 0H7.2v-2H5.11zm5.9-2.96h2.12V6.04h-2.12zm-2.95 0h2.13V6.04H8.06zm7.02 5.92h2.12v-2h-2.12zM0 12.06s.36 2.6 4.6 2.6h14.79c1.68 0 3.61-1.15 3.61-2.6z"/></svg>',
    color: '#2496ED',
    match: function(r) { return r.name.toLowerCase().includes('docker') || (r.description && r.description.toLowerCase().includes('docker')); }
  },
  'linux': {
    title: 'Linux',
    sub: 'OS Environment & Shell Automation',
    desc: 'My main operating system environment for hosting and shell scripting. I script repetitive server operations and run containerized architectures.',
    icon: '<svg viewBox="0 0 24 24" fill="#FCC624"><path d="M12 0a12 12 0 1 0 0 24A12 12 0 0 0 12 0zm5.01 17.6c-.1.2-.4.3-.6.2-1.7-.9-3.5-1-5.1-.4-1.2.4-2.2 1.2-2.9 2.2-.1.2-.4.3-.6.2l-.3-.2c-.2-.1-.3-.4-.2-.6.8-1.2 1.9-2.1 3.3-2.6 1.8-.7 3.8-.6 5.7.4.2.1.3.4.2.6l-.5.2zm1.4-2.5c-.1.2-.4.4-.7.3-2-.8-4.3-1.3-6.3-.4-1.4.6-2.6 1.6-3.5 2.9-.2.2-.5.3-.7.2l-.3-.2c-.2-.2-.3-.5-.1-.7 1-1.5 2.4-2.7 4-3.3 2.3-1 4.8-.4 7.1.5.2.1.4.4.2.7l-.7 0zm.2-2.7c-.1.2-.3.3-.5.2-2.7-1.1-5.9-1.5-8.6-.5-1.7.7-3.1 1.8-4.1 3.4-.2.2-.5.3-.7.1l-.2-.2c-.2-.2-.2-.5 0-.7 1.1-1.7 2.7-3 4.7-3.8 3-.1.3-6.9.5-9.8 1.7.3.1.4.4.2.6l-.7.2z"/></svg>',
    color: '#FCC624',
    match: function(r) { return r.language && r.language.toLowerCase() === 'shell'; }
  },
  'git': {
    title: 'Git',
    sub: 'Version Control & GitHub Workflows',
    desc: 'Essential version control and source control. I structure commits cleanly, manage branches, and leverage GitHub Actions for automated CI/CD.',
    icon: '<svg viewBox="0 0 24 24" fill="#F05032"><path d="M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 1 1-1.1 1.027L12.76 9.175v6.617a1.838 1.838 0 1 1-1.51-.077V9.1a1.838 1.838 0 0 1-.987-2.416L7.523 3.933 1.294 10.16a1.55 1.55 0 0 0 0 2.186l10.48 10.48a1.55 1.55 0 0 0 2.186 0l9.587-9.586a1.55 1.55 0 0 0 0-2.31z"/></svg>',
    color: '#F05032',
    match: function(r) { return true; }
  },
  'html5': {
    title: 'HTML5 & CSS3',
    sub: 'Semantic Markup & Modern Layouts',
    desc: 'Used to write accessible, modern markup and beautiful custom layouts. Skilled in Flexbox, Grid, Custom Variables, CSS Keyframes, and clean designs.',
    icon: '<svg viewBox="0 0 24 24" fill="#E34F26"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>',
    color: '#E34F26',
    match: function(r) { return r.language && (r.language.toLowerCase() === 'html' || r.language.toLowerCase() === 'css'); }
  },
  'tauri': {
    title: 'Tauri',
    sub: 'Lightweight Cross-Platform Desktop Apps',
    desc: 'Utilized to build lightweight, fast desktop apps using Web technologies for the frontend and Rust for backend performance and security.',
    icon: '<svg viewBox="0 0 24 24" fill="#FFC131"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 4.5c2.1 0 3.8 1.7 3.8 3.8S14.1 12 12 12s-3.8-1.7-3.8-3.8S9.9 4.5 12 4.5zm0 15c-3.2 0-6-1.6-7.7-4 0-2.6 5.1-4 7.7-4s7.7 1.4 7.7 4c-1.7 2.4-4.5 4-7.7 4z"/></svg>',
    color: '#FFC131',
    match: function(r) { return r.name.toLowerCase().includes('tauri') || (r.description && r.description.toLowerCase().includes('tauri')); }
  },
  'shell': {
    title: 'Shell Scripting',
    sub: 'Automation & Command Line utilities',
    desc: 'Used for creating server setup scripts, local builders, automation tasks, and streamlining development workflows in Bash or PowerShell.',
    icon: '<svg viewBox="0 0 24 24" fill="#4EAA25"><path d="M15.57 17.56a.5.5 0 0 1-.35-.15l-5.07-5.06a.5.5 0 0 1 0-.7l5.07-5.06a.5.5 0 0 1 .7.7L11.2 12l4.72 4.71a.5.5 0 0 1-.35.85zM21 20H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1z"/></svg>',
    color: '#4EAA25',
    match: function(r) { return r.language && r.language.toLowerCase() === 'shell'; }
  }
};

/* ══════════════════════════════════════
   BLOG INTEGRATION (DEV.to API)
   ══════════════════════════════════════ */
async function loadArticles() {
  var grid = document.getElementById('blogGrid');
  var more = document.getElementById('blogMore');
  var moreLink = document.getElementById('blogMoreLink');
  if (!grid) return;
  
  var username = 'varshuai';
  try {
    var res = await fetch('https://dev.to/api/articles?username=' + username);
    if (!res.ok) throw new Error('API error');
    var articles = await res.json();
    
    if (articles.length === 0) {
      renderMockArticles();
      return;
    }
    
    renderArticles(articles.slice(0, 3));
    if (more) {
      more.style.display = 'flex';
      if (moreLink) moreLink.href = 'https://dev.to/' + username;
    }
  } catch (e) {
    renderMockArticles();
  }
}

function renderMockArticles() {
  var grid = document.getElementById('blogGrid');
  var more = document.getElementById('blogMore');
  if (!grid) return;
  
  var mockArticles = [
    {
      title: "Building a satisfiably fast Desktop App with Tauri and Rust",
      description: "Why Tauri is replacing Electron for my desktop development needs, and how to get started with Rust backends.",
      url: "https://dev.to",
      published_at: new Date().toISOString(),
      tag_list: ["rust", "tauri", "desktop"],
      reading_time_minutes: 5,
      cover_image: ""
    },
    {
      title: "Clean Architecture in Go: A Practical Guide for Microservices",
      description: "How to structure your Go projects for scale, testability, and clean separation of concerns without over-engineering.",
      url: "https://dev.to",
      published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      tag_list: ["go", "backend", "architecture"],
      reading_time_minutes: 7,
      cover_image: ""
    },
    {
      title: "Mastering the Command Palette Pattern in Vanilla JavaScript",
      description: "Step-by-step walkthrough of creating an accessible, keyboard-navigable command menu for your web applications.",
      url: "https://dev.to",
      published_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      tag_list: ["javascript", "webdev", "a11y"],
      reading_time_minutes: 4,
      cover_image: ""
    }
  ];
  
  renderArticles(mockArticles);
  if (more) {
    more.style.display = 'flex';
  }
}

def renderArticles(articles) {
  var grid = document.getElementById('blogGrid');
  if (!grid) return;
  
  grid.innerHTML = articles.map(function(art, i) {
    var date = new Date(art.published_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    var tagsHtml = (art.tag_list || []).map(function(t) {
      return '<span class="blog-card-tag">#' + t + '</span>';
    }).join('');
    
    var coverHtml = art.cover_image 
      ? '<img class="blog-card-img" src="' + art.cover_image + '" alt="' + art.title + '" loading="lazy" />'
      : '<div class="blog-card-placeholder"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg></div>';

    return '<a href="' + art.url + '" target="_blank" class="blog-card reveal" style="transition-delay:' + (i * 0.1) + 's">' +
      coverHtml +
      '<div class="blog-card-body">' +
        '<div class="blog-card-tags">' + tagsHtml + '</div>' +
        '<h3>' + art.title + '</h3>' +
        '<p>' + art.description + '</p>' +
        '<div class="blog-card-footer">' +
          '<span>' + date + ' &middot; ' + art.reading_time_minutes + ' min read</span>' +
          '<span class="blog-card-arrow">↗</span>' +
        '</div>' +
      '</div>' +
      '</a>';
  }).join('');
  
  if (typeof revObs !== 'undefined') {
    grid.querySelectorAll('.reveal').forEach(function(el) {
      revObs.observe(el);
    });
  }
}

/* ══════════════════════════════════════
   INTERACTIVE WORKPLACE EVENT BINDINGS
   ══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {
  // 1. Audio toggle button
  var audioToggleBtn = document.getElementById('audioToggle');
  if (audioToggleBtn) {
    if (!audioEnabled) {
      audioToggleBtn.classList.add('muted');
    }
    audioToggleBtn.addEventListener('click', function() {
      audioEnabled = !audioEnabled;
      localStorage.setItem('audio_effects', audioEnabled);
      if (audioEnabled) {
        audioToggleBtn.classList.remove('muted');
        playSound('click');
      } else {
        audioToggleBtn.classList.add('muted');
      }
    });
  }

  // 2. Play sound effects on mouse hover & click
  var elementsToSound = [
    '.nav-links a', '.theme-toggle', '.audio-toggle', 
    '.stack-item', '.proj-card', '.blog-card', 
    '.btn-solid', '.btn-ghost', '.logo', '.footer-nav a'
  ];
  
  var lastHovered = null;
  document.addEventListener('mouseover', function(e) {
    var target = e.target;
    if (target && target.closest) {
      var matchedEl = null;
      elementsToSound.forEach(function(sel) {
        var el = target.closest(sel);
        if (el) matchedEl = el;
      });
      if (matchedEl && matchedEl !== lastHovered) {
        playSound('hover');
        lastHovered = matchedEl;
      } else if (!matchedEl) {
        lastHovered = null;
      }
    }
  });

  document.addEventListener('click', function(e) {
    var target = e.target;
    if (target && target.closest) {
      var matchedEl = null;
      elementsToSound.forEach(function(sel) {
        var el = target.closest(sel);
        if (el) matchedEl = el;
      });
      if (matchedEl) {
        playSound('click');
      }
    }
  });

  // 3. Tech Stack details modal
  var stackOverlay = document.getElementById('stack-overlay');
  var stackCloseBtn = document.getElementById('stackClose');
  var stackModalIco = document.getElementById('stackModalIco');
  var stackModalTitle = document.getElementById('stackModalTitle');
  var stackModalSub = document.getElementById('stackModalSub');
  var stackModalDesc = document.getElementById('stackModalDesc');
  var stackModalProjects = document.getElementById('stackModalProjects');
  
  document.querySelectorAll('.stack-item').forEach(function(item) {
    item.addEventListener('click', function() {
      var techName = item.querySelector('span').textContent.trim();
      var details = STACK_DETAILS[techName.toLowerCase()];
      if (!details || !stackOverlay) return;
      
      playSound('open');
      stackModalIco.innerHTML = details.icon;
      stackModalIco.style.background = details.color + '22';
      stackModalIco.style.borderColor = details.color + '44';
      stackModalTitle.textContent = details.title;
      stackModalSub.textContent = details.sub;
      stackModalSub.style.color = details.color;
      stackModalDesc.textContent = details.desc;
      
      var matched = repos.filter(details.match).slice(0, 4);
      if (matched.length > 0) {
        document.getElementById('stackModalProjectsSection').style.display = 'block';
        stackModalProjects.innerHTML = matched.map(function(repo) {
          return '<a href="' + repo.html_url + '" target="_blank" class="stack-proj-link">' +
            '<div>' +
              '<div class="stack-proj-name">' + repo.name + '</div>' +
              '<div class="stack-proj-desc">' + (repo.description || 'No description provided.') + '</div>' +
            '</div>' +
            '<div class="stack-proj-arrow">↗</div>' +
            '</a>';
        }).join('');
      } else {
        document.getElementById('stackModalProjectsSection').style.display = 'none';
      }
      
      stackOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  
  if (stackCloseBtn && stackOverlay) {
    stackCloseBtn.addEventListener('click', function() {
      playSound('close');
      stackOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  
  if (stackOverlay) {
    stackOverlay.addEventListener('click', function(e) {
      if (e.target === stackOverlay) {
        playSound('close');
        stackOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
});

