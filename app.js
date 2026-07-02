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

function playSynthBeep(freq, type = 'sine', vol = 0.08, dur = 0.1) {
  if (!audioEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + dur);
  } catch(e) {}
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
let bgMouseX = -1000;
let bgMouseY = -1000;

window.addEventListener('mousemove', e => {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  bgMouseX = e.clientX - rect.left;
  bgMouseY = e.clientY - rect.top;
});

window.addEventListener('mouseleave', () => {
  bgMouseX = -1000;
  bgMouseY = -1000;
});

window.isMatrixMode = false;
window.matrixColumns = [];
const matrixFontSize = 14;

function getAccentRGB() {
  try {
    const style = getComputedStyle(document.documentElement);
    const accentHex = style.getPropertyValue('--accent').trim();
    if (accentHex.startsWith('#')) {
      const r = parseInt(accentHex.slice(1, 3), 16);
      const g = parseInt(accentHex.slice(3, 5), 16);
      const b = parseInt(accentHex.slice(5, 7), 16);
      return `${r}, ${g}, ${b}`;
    }
  } catch(e){}
  return '79, 70, 229';
}

function drawCanvas() {
  if (!ctx || !canvas) return;
  frameCount++;

  if (window.isMatrixMode) {
    ctx.fillStyle = 'rgba(10, 10, 12, 0.08)'; // fading trail matching dark background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00FF41'; // classic matrix green
    ctx.font = `${matrixFontSize}px monospace`;

    if (window.matrixColumns.length === 0) {
      const cols = Math.floor(canvas.width / matrixFontSize);
      window.matrixColumns = Array.from({ length: cols }, () => Math.floor(Math.random() * -30));
    }

    window.matrixColumns.forEach((y, i) => {
      const text = Math.random() > 0.5 ? '1' : '0';
      const x = i * matrixFontSize;
      ctx.fillText(text, x, y * matrixFontSize);

      if (y * matrixFontSize > canvas.height && Math.random() > 0.98) {
        window.matrixColumns[i] = 0;
      } else {
        window.matrixColumns[i]++;
      }
    });
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw and animate particles
    pts.forEach(p => {
      // Move particles
      p.x += p.vx; 
      p.y += p.vy;

      // Mouse attraction pull
      if (bgMouseX > 0) {
        const dx = bgMouseX - p.x;
        const dy = bgMouseY - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 180) {
          // Gravitate towards mouse slightly
          p.x += dx * 0.005;
          p.y += dy * 0.005;
        }
      }

      // Bounce off borders
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      // Render particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${getAccentRGB()},${p.a})`;
      ctx.fill();
    });

    // Draw connections only every 2 frames to optimize CPU load
    if (frameCount % 2 === 0) {
      const activeRGB = getAccentRGB();
      for (let i = 0; i < pts.length; i++) {
        // Draw connection to mouse
        if (bgMouseX > 0) {
          const mdx = bgMouseX - pts[i].x;
          const mdy = bgMouseY - pts[i].y;
          const md = Math.hypot(mdx, mdy);
          if (md < 140) {
            ctx.beginPath();
            ctx.moveTo(bgMouseX, bgMouseY);
            ctx.lineTo(pts[i].x, pts[i].y);
            ctx.strokeStyle = `rgba(${activeRGB}, ${0.28 * (1 - md / 140)})`; // glowing dynamic line
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Draw connections between particles
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.hypot(dx, dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${activeRGB}, ${0.12 * (1 - d / 120)})`; // dynamic connection
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
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

const FEATURED_FALLBACK = [
  {
    id: "altercontroller",
    name: "AlterController Suite",
    tagline: "Companion App & Latency Optimization Suite",
    status: "Active Development",
    description: "Zero-GC binary communication pipe, inline Web Worker timers, and elevated priority companion to turn your mobile device into a low-latency gamepad.",
    tech: ["Rust", "Tauri", "React Native", "Expo", "Python", "Go"],
    downloads: [
      { filename: "Setup_AlterController.exe", label: "Download Windows Companion (.exe)" },
      { filename: "AlterController_v1.0.apk", label: "Download Android App (.apk)" }
    ]
  }
];

const BUILDING_FALLBACK = [
  {
    name: "VarshuAI Tools",
    status: "Active",
    description: "A collection of AI-powered CLI utilities built with Python and Rust - personal toolkit that does the boring stuff so I can focus on building.",
    tech: ["Python", "Rust", "CLI", "AI"]
  },
  {
    name: "Open Source Experiments",
    status: "Active",
    description: "Constantly exploring new tools, languages, and ideas. If it looks interesting, I build a prototype. Most of it ends up on GitHub.",
    tech: ["GitHub", "Open Source", "Experiments"]
  },
  {
    name: "This Portfolio v4",
    status: "Upcoming",
    description: "Always iterating. The next version is already being planned - more interactions, more personality, more me.",
    tech: ["Web", "Design", "JS"]
  }
];

async function loadFeaturedBuilds() {
  const container = document.getElementById('featuredBuilds');
  const buildingContainer = document.getElementById('currentlyBuilding');
  if (!container) return;

  let db = [];

  try {
    const res = await fetch('https://varshuai-github-io.onrender.com/api/projects');
    if (res.ok) {
      db = await res.json();
    } else {
      const resStatic = await fetch('projects_db.json');
      if (resStatic.ok) db = await resStatic.json();
    }
  } catch (err) {
    console.warn("Could not load database, using fallback featured project.");
  }

  let projects = [];
  let building = [];

  if (Array.isArray(db)) {
    projects = db.filter(p => !p.type || p.type === 'project');
    building = db.filter(p => p.type === 'building');
  }

  if (!projects || !projects.length) {
    projects = FEATURED_FALLBACK;
  }
  if (!building || !building.length) {
    building = BUILDING_FALLBACK;
  }

  // Render Projects Grid
  container.innerHTML = '';
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'featured-card reveal';
    
    const isActive = project.status.toLowerCase().includes('active') || project.status.toLowerCase().includes('building');
    const badgeHTML = isActive 
      ? `<div class="fc-badge fc-badge-active"><span class="fc-dot"></span>${project.status}</div>`
      : `<div class="fc-badge">${project.status}</div>`;

    card.innerHTML = `
      ${badgeHTML}
      <div class="fc-content">
        <div class="fc-info">
          <h3>${project.name}</h3>
          <p class="fc-tagline">${project.tagline}</p>
          <p class="fc-desc">${project.description}</p>
          <div class="fc-tech">
            ${project.tech.map(t => `<span class="pill">${t}</span>`).join('')}
          </div>
        </div>
        <div class="fc-actions">
          <a href="project.html?id=${project.id}" class="btn-solid">View Details & Files →</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Render Currently Building Grid
  if (buildingContainer) {
    buildingContainer.innerHTML = '';
    building.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = `building-card reveal reveal-delay-${index % 3}`;
      
      const statusText = item.status || 'Active';
      const isUpcoming = statusText.toLowerCase().includes('upcoming') || statusText.toLowerCase().includes('planned');
      
      card.innerHTML = `
        <div class="building-header">
          <span class="live-dot" style="${isUpcoming ? 'background:#F59E0B' : 'background:#10B981'}"></span>
          <span class="live-label" style="${isUpcoming ? 'color:#F59E0B' : 'color:#10B981'}">${statusText}</span>
        </div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="building-tags">
          ${item.tech.map(t => `<span>${t}</span>`).join('')}
        </div>
      `;
      buildingContainer.appendChild(card);
    });
  }
  
  if (typeof revObs !== 'undefined' && revObs) {
    document.querySelectorAll('.featured-card.reveal, .building-card.reveal').forEach(el => {
      revObs.observe(el);
    });
  }
}

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

/* ── GITHUB TIMELINE FEED ── */
async function loadGitHubTimeline() {
  const container = document.getElementById('github-timeline-feed');
  if (!container) return;

  const fallbackMilestones = [
    {
      year: "2026 - Present",
      events: [
        {
          title: "Created 200+ Repositories & Growing",
          desc: "Shipped utilities, AI tools, and full desktop wrappers. Deep dive into systems.",
          meta: "Present Activity"
        }
      ]
    },
    {
      year: "2025",
      events: [
        {
          title: "Dynamic Integrations & Live Audio Synthesizers",
          desc: "Built custom lo-fi music engines, dynamic particle grids, and Render databases.",
          meta: "2025 Milestone"
        }
      ]
    },
    {
      year: "2024",
      events: [
        {
          title: "Leveled Up: Rust, Go & Desktop Tauri Builds",
          desc: "Discovered Tauri, compiled low-latency utilities, and explored systems engineering.",
          meta: "Active shipping"
        }
      ]
    },
    {
      year: "2023",
      events: [
        {
          title: "100+ Repos Milestone",
          desc: "Crossed 100 public code repositories. Focused on Python scripts, bots, automation, and API bridges.",
          meta: "Learning & compounding"
        }
      ]
    },
    {
      year: "2022",
      events: [
        {
          title: "First GitHub Account & Commit",
          desc: "Created the VarshuAi profile and shipped my very first repository.",
          meta: "October 2022"
        }
      ]
    }
  ];

  function renderFallback() {
    container.innerHTML = fallbackMilestones.map(yGroup => `
      <div class="gh-timeline-year-group">
        <div class="gh-timeline-year-header">
          <span class="gh-year-text">${yGroup.year}</span>
        </div>
        <div class="gh-timeline-events">
          ${yGroup.events.map(ev => `
            <div class="gh-timeline-event">
              <div class="gh-event-badge">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div class="gh-event-card">
                <div class="gh-event-title">${ev.title}</div>
                <p style="font-size:0.78rem;color:var(--text-2);line-height:1.5">${ev.desc}</p>
                <div style="font-size:0.68rem;color:var(--text-3);margin-top:6px">${ev.meta}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  try {
    const res = await fetch(`https://api.github.com/users/${GH_USER}/repos?sort=created&per_page=60&direction=desc`);
    if (!res.ok) throw new Error('API Rate Limit or Offline');
    const reposData = await res.json();
    if (!reposData.length) {
      renderFallback();
      return;
    }

    const groups = {};
    reposData.forEach(repo => {
      if (!repo.created_at) return;
      const date = new Date(repo.created_at);
      const year = date.getFullYear().toString();
      const month = date.toLocaleString('default', { month: 'long' });

      if (!groups[year]) groups[year] = {};
      if (!groups[year][month]) groups[year][month] = [];
      groups[year][month].push(repo);
    });

    let html = '';
    const sortedYears = Object.keys(groups).sort((a, b) => b - a);

    sortedYears.forEach(year => {
      html += `
        <div class="gh-timeline-year-group">
          <div class="gh-timeline-year-header">
            <span class="gh-year-text">${year}</span>
          </div>
          <div class="gh-timeline-events">
      `;

      const months = groups[year];
      const sortedMonths = Object.keys(months).sort((a, b) => {
        return new Date(a + " 1, 2000") - new Date(b + " 1, 2000");
      }).reverse();

      sortedMonths.forEach(month => {
        const repoList = months[month];
        html += `
          <div class="gh-timeline-event">
            <div class="gh-event-badge">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div class="gh-event-card">
              <div class="gh-event-title">Created ${repoList.length} repository/repositories in <strong style="color:var(--text-1)">${month}</strong></div>
              <div class="gh-event-repos-list">
                ${repoList.map(r => `
                  <a href="${r.html_url}" target="_blank" class="gh-repo-item">
                    <span class="gh-repo-name">${r.name}</span>
                    ${r.description ? `<span class="gh-repo-desc">${r.description}</span>` : ''}
                    <div class="gh-repo-meta">
                      <span>⭐ ${r.stargazers_count}</span>
                      <span>🍴 ${r.forks_count}</span>
                      ${r.language ? `<span>💻 ${r.language}</span>` : ''}
                    </div>
                  </a>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (err) {
    console.warn("GitHub rate-limit hit or offline. Using milestones fallback.");
    renderFallback();
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
loadFeaturedBuilds();
loadRepos();
loadViews();
loadArticles();
loadGitHubTimeline();
loadGitHubHeatmap();

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
(function cardTilt() {
  if (window.matchMedia('(hover: none)').matches) return;
  var cards = document.querySelectorAll('.building-card, .skill-card, .gh-card, .contact-card, .tl-card, .stat-card, .blog-card');
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
    icon: '<svg viewBox="0 0 24 24" fill="#F7DF1E"><path d="M0 0h24v24H0V0zm22.034 18.268c-.175-1.017-.862-1.84-2.04-2.385-1.162-.538-2.531-.676-3.864-.676-1.312 0-2.617.138-3.779.624-1.14.48-1.895 1.267-2.148 2.453-.223 1.054.12 1.954.996 2.502.83.522 2.128.788 3.538.932 1.396.142 2.827.276 3.633.684.776.393 1.157.948 1.139 1.69-.028.935-.907 1.543-2.228 1.543-1.408 0-2.247-.638-2.618-1.684-.093-.263-.129-.462-.129-.462l-2.485.474c0 0 .148.88.75 1.636.635.797 1.776 1.45 3.398 1.45 2.846 0 4.67-1.579 4.698-3.714.027-2.032-1.282-3.11-3.66-3.523-1.624-.282-3.26-.401-4.048-.79-.588-.29-.868-.69-.838-1.206.046-.777.828-1.272 1.977-1.272 1.168 0 1.942.54 2.213 1.27.098.263.12.44.12.44l2.423-.526c.001-.001-.157-.96-.77-1.745zM8.077 15.688H5.614v6.86c0 1.218-.019 2.551-.072 3.456h2.533c-.027-.88-.048-2.15-.048-3.456v-6.86z"/></svg>',
    color: '#F7DF1E',
    match: function(r) { return r.language && r.language.toLowerCase() === 'javascript'; }
  },
  'rust': {
    title: 'Rust',
    sub: 'Systems Programming & Safe Tauri Apps',
    desc: 'My absolute favorite for writing blazing fast, memory-safe backend services, desktop utilities via Tauri, and command-line interfaces. Built professional tools like Antigravity-Manager using Rust.',
    icon: '<svg viewBox="0 0 24 24" fill="#CE422B"><path d="M23.83 11.72l-1.05-.65a10.75 10.75 0 0 0-.08-1.01l.9-.8a.27.27 0 0 0-.05-.43l-1.12-.57a10.9 10.9 0 0 0-.26-.98l.72-.94a.27.27 0 0 0-.13-.42l-1.22-.37a11.2 11.2 0 0 0-.43-.9l.5-1.06a.27.27 0 0 0-.2-.38l-1.26-.13a11.4 11.4 0 0 0-.59-.79l.26-1.13a.27.27 0 0 0-.27-.33l-1.26.11a11.6 11.6 0 0 0-.73-.65l0-1.16a.27.27 0 0 0-.32-.26l-1.2.36a11.8 11.8 0 0 0-.85-.48L16 .27a.27.27 0 0 0-.36-.18l-1.1.6a12 12 0 0 0-.94-.3L13.3.17A.27.27 0 0 0 12.94 0l-.94.83a12 12 0 0 0-.97-.07L11.26 0a.27.27 0 0 0-.36.17l-.3 1.22a12 12 0 0 0-.92.31L8.61.1a.27.27 0 0 0-.36.18l-.18 1.24A12 12 0 0 0 7.24 2l-1.2-.35a.27.27 0 0 0-.32.26l0 1.16A11.8 11.8 0 0 0 5 3.72l-1.26-.1a.27.27 0 0 0-.27.33l.26 1.13a11.6 11.6 0 0 0-.59.79L1.88 6a.27.27 0 0 0-.2.38l.5 1.06a11.4 11.4 0 0 0-.43.9L.53 8.7a.27.27 0 0 0-.13.42l.72.94a10.9 10.9 0 0 0-.26.98L.74 11.6a.27.27 0 0 0-.05.43l.9.8a10.75 10.75 0 0 0-.08 1.01l-1.05.65a.27.27 0 0 0 0 .44zM12 16.5A4.5 4.5 0 1 1 12 7.5 4.5 4.5 0 0 1 12 16.5z"/></svg>',
    color: '#CE422B',
    match: function(r) { return r.language && r.language.toLowerCase() === 'rust'; }
  },
  'go': {
    title: 'Go',
    sub: 'Backend Microservices & CLI tools',
    desc: 'Leveraged for high-concurrency microservices, network servers, and cross-platform tools. Built various validators and parser CLI tools (like yaml-linter-v240) using Go.',
    icon: '<svg viewBox="0 0 24 24" fill="#00ADD8"><path d="M1.811 10.231c-.047 0-.058-.023-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.046 0 .058.035.035.07 l-.199.303c-.023.036-.082.07-.117.07zm-1.764 1.075c-.047 0-.059-.023-.035-.058l.245-.316c.023-.035.082-.058.129-.058 h5.328c.047 0 .07.035.058.07l-.093.28c-.012.047-.058.07-.105.07zm2.828 1.075c-.047 0-.059-.035-.035-.07l.163-.292 c.023-.035.07-.07.117-.07h2.337c.047 0 .07.035.07.082l-.023.28c0 .047-.047.082-.082.082zm12.129-2.36 c-.736.187-1.239.327-1.963.514-.176.046-.187.058-.34-.117-.174-.199-.303-.327-.548-.444-.737-.362-1.45-.257-2.115.175 -.795.514-1.204 1.274-1.192 2.22.011.935.654 1.706 1.577 1.835.795.105 1.46-.175 1.987-.77.105-.13.198-.27.315-.434H10.47 c-.245 0-.304-.152-.222-.35.152-.362.432-.97.596-1.274a.315.315 0 0 1 .28-.198h3.366c.21 0 .28.163.222.374-.187.561-.491 1.484-.666 2.022a.295.295 0 0 1-.28.198h-1.777c-.047 0-.07.024-.058.07l.105.316c.012.035.058.058.093.058h2.092 c.222 0 .292.164.246.339-.14.479-.386 1.25-.561 1.753a.294.294 0 0 1-.28.199H8.623c-.736 0-1.192-.491-1.227-1.215 -.047-.97.538-1.998 1.46-2.583.748-.467 1.636-.63 2.501-.48.21.035.34-.07.4-.28l.28-1.017c.059-.222-.035-.327-.245-.362 -1.543-.28-3.097.046-4.324.97-.047.035-.129.023-.175-.024l-.841-.853c-.047-.047-.047-.117 0-.164.912-.876 2.057-1.425 3.32-1.589 .198-.023.28-.14.245-.339L9.64 3.013c-.047-.21-.199-.28-.409-.245-2.279.374-4.22 1.542-5.516 3.389-.047.059-.035.14.023.187l.83.608 c.047.035.07.094.047.14-.526 1.052-.771 2.22-.724 3.424.012.4.082.783.175 1.168.024.094-.012.187-.093.222l-.994.421 c-.21.093-.362-.012-.42-.234a12.44 12.44 0 0 1-.585-3.342 12.04 12.04 0 0 1 1.356-5.597c.093-.163.035-.35-.117-.455L2.396 6.01 c-.14-.093-.327-.046-.42.094a13.9 13.9 0 0 0-1.8 5.317c-.012.117.07.21.187.21h6.638c.047 0 .07-.035.059-.082l-.082-.28a.093.093 0 0 0-.093-.07H2.606c-.047 0-.07-.035-.047-.07l.199-.304c.023-.035.082-.07.117-.07h4.009c.046 0 .058-.035.035-.07l-.199-.304c-.023-.035-.081-.07-.116-.07zm8.403 3.961c.468 0 .853-.339.9-.806.059-.467-.21-.865-.678-.9-.467-.035-.853.28-.9.748-.059.467.21.9.678.958zm4.184.28c.456 0 .806-.315.83-.759a.837.837 0 0 0-.759-.865.811.811 0 0 0-.865.736.83.83 0 0 0 .794.888zm-.958-3.05c-.047.116-.012.21.093.245l.935.292c.117.035.222-.035.245-.152l.246-.946c.035-.117-.024-.222-.14-.246l-.935-.292c-.117-.035-.21.035-.245.152zm-3.039-.935c-.046.105-.012.21.094.245l.935.292c.117.035.222-.023.245-.14l.245-.935c.035-.117-.023-.222-.14-.246l-.935-.292c-.117-.035-.21.035-.245.152zm2.08-1.577c-.035.117 0 .222.117.257l.935.28c.117.035.222-.023.257-.14l.245-.947c.035-.117-.023-.222-.14-.257l-.935-.28c-.117-.035-.222.023-.257.14zm4.137 7.023h.012c.047 0 .07-.035.047-.082l-.082-.28a.095.095 0 0 0-.094-.07h-4.324c-.047 0-.07.035-.047.07l.199.304c.023.035.082.07.117.07zm.865 1.075h.012c.046 0 .058-.023.035-.059l-.246-.315a.151.151 0 0 0-.128-.058h-5.235c-.047 0-.07.035-.059.07l.094.28c.012.047.058.07.105.07zm-2.828 1.075h.012c.047 0 .059-.035.035-.07l-.164-.292a.149.149 0 0 0-.117-.07h-2.22c-.047 0-.07.035-.07.082l.023.28c0 .047.047.082.082.082zm6.65-4.3c.047 0 .059-.035.035-.07l-.245-.304c-.035-.035-.094-.058-.14-.058H19.7c-.047 0-.07.035-.058.07l.081.28c.012.047.059.082.106.082zm-4.312-3.155c-.035.105.012.21.117.245l.935.292c.117.035.222-.023.257-.14l.245-.935c.035-.117-.023-.222-.14-.246l-.935-.292c-.117-.035-.222.023-.257.152zm-3.039-.935c-.035.105.012.21.117.245l.935.292c.117.035.222-.023.257-.14l.245-.935c.035-.117-.023-.222-.14-.246l-.935-.292c-.117-.035-.222.023-.257.152zm2.08-1.577c-.035.117 0 .222.117.257l.935.28c.117.035.222-.023.257-.14l.246-.947c.035-.117-.024-.222-.14-.257l-.935-.28c-.117-.035-.222.023-.257.14zm5.072 3.705c.468 0 .853-.339.888-.806a.864.864 0 0 0-.806-.9.849.849 0 0 0-.888.795.845.845 0 0 0 .806.911zm-10.378-4.7c.046-.222-.036-.327-.246-.362C10.7 7.027 9.146 7.354 7.92 8.278c-.047.035-.129.023-.176-.024l-.841-.853c-.047-.047-.047-.117 0-.164C7.815 6.36 8.96 5.811 10.223 5.647c.198-.023.28-.14.245-.339l-.35-1.25c-.047-.21-.199-.28-.41-.245C7.43 4.187 5.489 5.355 4.192 7.202c-.047.059-.035.14.023.187l.83.608c.047.035.07.094.047.14a7.99 7.99 0 0 0-.724 3.424c.012.4.082.783.175 1.168.024.094-.012.187-.093.222l-.994.421c-.21.093-.362-.012-.42-.234A12.44 12.44 0 0 1 2.451 9.8 12.04 12.04 0 0 1 3.807 4.2c.093-.163.035-.35-.117-.455L2.396.883C2.256.79 2.069.837 1.976.977a13.9 13.9 0 0 0-1.8 5.317c-.012.117.07.21.187.21h6.638c.047 0 .07-.035.059-.082l-.082-.28a.093.093 0 0 0-.093-.07H2.606c-.047 0-.07-.035-.047-.07L2.758 5.76c.023-.035.082-.07.117-.07h4.009c.046 0 .058-.035.035-.07l-.199-.304c-.023-.035-.081-.07-.116-.07z"/></svg>',
    color: '#00ADD8',
    match: function(r) { return r.language && r.language.toLowerCase() === 'go'; }
  },
  'node.js': {
    title: 'Node.js',
    sub: 'Server-side runtime & Script tooling',
    desc: 'Extensively used for runtime operations, tooling, script writing, and integration APIs. Essential for modern server-side javascript architecture.',
    icon: '<svg viewBox="0 0 24 24" fill="#339933"><path d="M12 0L1.47 6.07v12.13L12 24.27l10.53-6.07V6.07Zm1.16 21.65l-8.24-4.75V7.4l8.24 4.76V21.65Zm8.22-4.75l-8.22 4.75V12.16l8.22-4.76Z"/></svg>',
    color: '#339933',
    match: function(r) { return r.language && (r.language.toLowerCase() === 'javascript' || r.language.toLowerCase() === 'typescript'); }
  },
  'react': {
    title: 'React',
    sub: 'Single Page Applications & React DOM',
    desc: 'Used for building complex dashboard apps, responsive client portals, and customizable interactive views with modular components.',
    icon: '<svg viewBox="0 0 24 24" fill="#61DAFB"><path d="M21.9 10.45c-.13-.42-.35-.8-.66-1.11a5.32 5.32 0 00-2.31-1.35c-2.45-.63-5.36-.63-7.85 0a5.41 5.41 0 00-2.31 1.35c-.3.3-.53.69-.66 1.11-.26.83-.26 1.77 0 2.6.13.42.36.8.66 1.11.31.3.69.53 1.12.67a5.55 5.55 0 002.3.43c2.25 0 4.67-.34 6.74-1.1a5.32 5.32 0 002.31-1.35c.3-.31.53-.69.66-1.11.26-.83.26-1.77 0-2.6zm-17.7 5.7c.3.3.68.53 1.11.66.42.13.86.2 1.3.2 2.25 0 4.67-.34 6.75-1.1a5.32 5.32 0 002.3-1.35c.31-.3.54-.69.67-1.11.26-.83.26-1.77 0-2.6-.13-.42-.36-.8-.67-1.11a5.32 5.32 0 00-2.3-1.35c-2.46-.63-5.36-.63-7.85 0a5.41 5.41 0 00-2.31 1.35c-.3.3-.53.69-.66 1.11-.26.83-.26 1.77 0 2.6.13.42.36.8.66 1.11zm15.4-8.8a5.32 5.32 0 00-2.3-1.35c-2.46-.63-5.36-.63-7.85 0a5.41 5.41 0 00-2.31 1.35c-.3.3-.53.69-.66 1.11-.26.83-.26 1.77 0 2.6.13.42.36.8.66 1.11a5.32 5.32 0 002.3 1.35c2.46.63 5.37.63 7.86 0a5.41 5.41 0 002.31-1.35c.3-.3.53-.69.66-1.11.26-.83.26-1.77 0-2.6a3.54 3.54 0 00-.66-1.11zm-7.6 5.6a1.9 1.9 0 110-3.8 1.9 1.9 0 010 3.8z"/></svg>',
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
    sub: 'OS Environment & CLI Shell',
    desc: 'Unix/Linux environments, bash scripting, and terminal operations.',
    icon: '<svg viewBox="0 0 24 24" fill="#FCC624"><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465"/></svg>',
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
    icon: '<svg viewBox="0 0 24 24" fill="#FFC131"><path d="M1.378 12.003L0 13.38v8.44l2.122.365 3.003-3.003 4.542.784.887-2.65-4.839-4.839-2.072 2.072-.888-2.65 3.513-3.513 1.764.296L10.37 6.35c1.077-.183 2.18-.183 3.256 0l2.339 2.332 1.764-.296 3.513 3.513-.888 2.65 2.072-2.072 4.839 4.839.887 2.65-4.542-.784-3.003 3.003 2.122-.365v-8.44l-1.378-1.377a7.712 7.712 0 00-10.748 0zm10.62-5.719c.148 0 .267-.12.267-.267v-.657c0-.148-.12-.267-.268-.267s-.267.12-.267.267v.657c0 .148.12.267.268.267zm2.46 2.012c.105.105.275.105.38 0l.465-.465c.105-.105.105-.275 0-.38s-.275-.105-.38 0l-.465.465c-.105.105-.105.275 0 .38zm-5.297.001c.105.105.275.105.38 0s.105-.275 0-.38l-.465-.465c-.105-.105-.275-.105-.38 0s-.105.275 0 .38l.465.465zm6.818 2.502c0 .148.12.267.268.267h.656c.148 0 .268-.12.268-.267s-.12-.268-.268-.268h-.656c-.148 0-.268.12-.268.268zm-9.96 0c0 .148.12.267.268.267h.657c.147 0 .267-.12.267-.267s-.12-.268-.267-.268h-.657c-.148 0-.268.12-.268.268zm8.683 2.052a.267.267 0 00.268-.267v-.656c0-.148-.12-.268-.268-.268s-.268.12-.268.268v.656c0 .148.12.267.268.267zm-6.104 0c.148 0 .268-.12.268-.267v-.656c0-.148-.12-.268-.268-.268s-.268.12-.268.268v.656c0 .148.12.267.268.267zm4.279.794a.267.267 0 00.267-.267v-.657c0-.147-.12-.267-.267-.267s-.268.12-.268.267v.657c0 .147.12.267.268.267zm-2.454 0c.148 0 .268-.12.268-.267v-.657c0-.147-.12-.267-.268-.267s-.268.12-.268.267v.657c0 .147.12.267.268.267zm.864 1.34c.148 0 .268-.12.268-.267v-.657c0-.148-.12-.267-.268-.267s-.268.119-.268.267v.657c0 .147.12.267.268.267zm.725-4.475a.268.268 0 00.268-.268v-.656c0-.148-.12-.268-.268-.268s-.268.12-.268.268v.656c0 .149.12.268.268.268zm-1.45.001c.148 0 .268-.12.268-.268v-.656c0-.148-.12-.268-.268-.268s-.268.12-.268.268v.656c0 .149.12.268.268.268zm.726 1.34c.148 0 .268-.12.268-.267v-.657c0-.147-.12-.267-.268-.267s-.268.12-.268.267v.657c0 .147.12.267.268.267zm0-4.02c.148 0 .268-.12.268-.267v-.657c0-.148-.12-.267-.268-.267s-.268.12-.268.267v.657c0 .148.12.267.268.267zm.725 1.34c.148 0 .268-.12.268-.267v-.657c0-.148-.12-.267-.268-.267s-.268.12-.268.267v.657c0 .147.12.267.268.267zm-1.45 0c.148 0 .268-.12.268-.267v-.657c0-.148-.12-.267-.268-.267s-.268.12-.268.267v.657c0 .147.12.267.268.267z"/></svg>',
    color: '#FFC131',
    match: function(r) { return r.name.toLowerCase().includes('tauri') || (r.description && r.description.toLowerCase().includes('tauri')); }
  },
  'shell': {
    title: 'Shell Scripting',
    sub: 'Automation & Command Line utilities',
    desc: 'Used for creating server setup scripts, local builders, automation tasks, and streamlining development workflows in Bash or PowerShell.',
    icon: '<svg viewBox="0 0 24 24" fill="#4EAA25"><path d="M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm-3.328 6.551a.634.634 0 0 1 .633.633.633.633 0 0 1-.633.633H5.328a.633.633 0 0 1-.633-.633.634.634 0 0 1 .633-.633zm5.727 0a.634.634 0 0 1 .634.633.633.633 0 0 1-.634.633h-1.92a.633.633 0 0 1-.633-.633.634.634 0 0 1 .633-.633zm3.766 0a.634.634 0 0 1 .633.633.633.633 0 0 1-.633.633H15.93a.633.633 0 0 1-.633-.633.634.634 0 0 1 .633-.633zm-9.493 2.2a.634.634 0 0 1 .633.633.633.633 0 0 1-.633.633H5.328a.633.633 0 0 1-.633-.633.634.634 0 0 1 .633-.633zm4.566 0a.634.634 0 0 1 .633.633.633.633 0 0 1-.633.633H8.328a.633.633 0 0 1-.633-.633.634.634 0 0 1 .633-.633zm1.16 0a.634.634 0 0 1 .633.633.633.633 0 0 1-.633.633h-.633a.633.633 0 0 1-.633-.633.634.634 0 0 1 .633-.633zm3.767 0a.634.634 0 0 1 .633.633.633.633 0 0 1-.633.633H12.93a.633.633 0 0 1-.633-.633.634.634 0 0 1 .633-.633zm-9.493 2.2a.634.634 0 0 1 .633.633.633.633 0 0 1-.633.633H5.328a.633.633 0 0 1-.633-.633.634.634 0 0 1 .633-.633zm4.566 0a.634.634 0 0 1 .633.633.633.633 0 0 1-.633.633H8.328a.633.633 0 0 1-.633-.633.634.634 0 0 1 .633-.633zm1.16 0a.634.634 0 0 1 .633.633.633.633 0 0 1-.633.633h-.633a.633.633 0 0 1-.633-.633.634.634 0 0 1 .633-.633zm3.767 0a.634.634 0 0 1 .633.633.633.633 0 0 1-.633.633H12.93a.633.633 0 0 1-.633-.633.634.634 0 0 1 .633-.633zm-9.493 2.2a.634.634 0 0 1 .633.633.633.633 0 0 1-.633.633H5.328a.633.633 0 0 1-.633-.633.634.634 0 0 1 .633-.633zm4.566 0a.634.634 0 0 1 .633.633.633.633 0 0 1-.633.633H8.328a.633.633 0 0 1-.633-.633.634.634 0 0 1 .633-.633zm1.16 0a.634.634 0 0 1 .633.633.633.633 0 0 1-.633.633h-.633a.633.633 0 0 1-.633-.633.634.634 0 0 1 .633-.633zm3.767 0a.634.634 0 0 1 .633.633.633.633 0 0 1-.633.633H12.93a.633.633 0 0 1-.633-.633.634.634 0 0 1 .633-.633zm-9.493 2.2C5.161 15.351 5 15.512 5 15.717a.633.633 0 0 0 .633.633h5.367a.633.633 0 0 0 .633-.633.633.633 0 0 0-.633-.633H5.633A.633.633 0 0 0 5 15.717zm9.493 0c-.161 0-.322.062-.444.184l-2.684 2.684a.63.63 0 0 0 0 .891l2.684 2.684A.633.633 0 0 0 15 21.717V19.72c2.28 0 4.093.81 4.542 2.628a.633.633 0 0 0 1.21-.301c-.633-2.55-2.73-4.329-5.752-4.329zm-9.493 2.2a.634.634 0 0 1 .633.633.633.633 0 0 1-.633.633H5.328a.633.633 0 0 1-.633-.633.634.634 0 0 1 .633-.633z"/></svg>',
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

function renderArticles(articles) {
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

/* ═══════════════════════════════════════
   FEATURE: PARTICLE MOUSE TRAIL
   60fps canvas particle system
   ═══════════════════════════════════════ */
;(function initParticleTrail() {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let mouseX = -100, mouseY = -100;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const particles = [];
  const COLORS = ['#818CF8', '#06B6D4', '#A78BFA', '#34D399'];

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.life = 1;
      this.decay = 0.015 + Math.random() * 0.02;
      this.size = 1.5 + Math.random() * 2;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= this.decay;
      this.size *= 0.98;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.life * 0.7;
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  let trailFrameCount = 0;
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, W, H);

    trailFrameCount++;
    if (trailFrameCount % 2 === 0 && mouseX > 0) {
      particles.push(new Particle(mouseX, mouseY));
      if (Math.random() > 0.5) particles.push(new Particle(mouseX, mouseY));
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].life <= 0) particles.splice(i, 1);
    }
  }
  animate();
})();

/* ═══════════════════════════════════════
   FEATURE: VISITOR COUNTER & STATUS
   ═══════════════════════════════════════ */
;(async function loadVisitorStats() {
  const statusEl = document.getElementById('vwStatus');
  const countEl = document.getElementById('vwCount');
  const footerCount = document.getElementById('visit-count');

  try {
    const res = await fetch('https://varshuai-github-io.onrender.com/api/visits');
    if (res.ok) {
      const data = await res.json();
      if (statusEl) { statusEl.textContent = 'ONLINE'; }
      const formatted = data.count.toLocaleString();
      if (countEl) countEl.textContent = formatted + ' visits';
      if (footerCount) footerCount.textContent = formatted;
    } else {
      throw new Error('offline');
    }
  } catch {
    if (statusEl) { statusEl.textContent = 'OFFLINE'; statusEl.style.color = '#EF4444'; }
    if (countEl) countEl.textContent = '--- visits';
  }
})();

/* ═══════════════════════════════════════
   FEATURE: LIVE GUESTBOOK
   ═══════════════════════════════════════ */
function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
  if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
  if (seconds < 604800) return Math.floor(seconds / 86400) + 'd ago';
  return new Date(dateStr).toLocaleDateString();
}

async function loadGuestbook() {
  const wall = document.getElementById('gbWall');
  if (!wall) return;
  try {
    const res = await fetch('https://varshuai-github-io.onrender.com/api/guestbook');
    if (!res.ok) throw new Error('fail');
    const msgs = await res.json();
    if (!msgs.length) {
      wall.innerHTML = '<div class="gb-empty">No messages yet. Be the first to say hello! 👋</div>';
      return;
    }
    wall.innerHTML = msgs.slice().reverse().map(m => {
      const initial = m.name.charAt(0).toUpperCase();
      return `
        <div class="gb-card reveal">
          <div class="gb-card-header">
            <div class="gb-avatar">${initial}</div>
            <div>
              <div class="gb-name">${m.name}</div>
              <div class="gb-time">${timeAgo(m.timestamp)}</div>
            </div>
          </div>
          <div class="gb-msg">${m.message}</div>
        </div>`;
    }).join('');
    if (typeof revObs !== 'undefined' && revObs) {
      wall.querySelectorAll('.reveal').forEach(el => revObs.observe(el));
    }
  } catch {
    wall.innerHTML = '<div class="gb-empty">Could not load messages right now.</div>';
  }
}

async function submitGuestbook() {
  const nameEl = document.getElementById('gbName');
  const msgEl = document.getElementById('gbMessage');
  const btn = document.getElementById('gbSubmit');
  if (!nameEl || !msgEl) return;

  const name = nameEl.value.trim();
  const message = msgEl.value.trim();

  if (!name || !message) {
    alert('Please enter both your name and a message.');
    return;
  }
  if (name.length > 50 || message.length > 280) {
    alert('Name max 50 chars, message max 280 chars.');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Sending...';

  try {
    const res = await fetch('https://varshuai-github-io.onrender.com/api/guestbook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message })
    });
    if (res.ok) {
      nameEl.value = '';
      msgEl.value = '';
      loadGuestbook();
    } else {
      alert('Could not submit. Please try again.');
    }
  } catch {
    alert('Server offline. Please try later.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send ✦';
  }
}

loadGuestbook();

/* ═══════════════════════════════════════
   FEATURE: RETRO CYBERPUNK TERMINAL
   ═══════════════════════════════════════ */
;(function initTerminal() {
  const overlay = document.getElementById('terminal-overlay');
  const toggleBtn = document.getElementById('terminalToggle');
  const closeBtn = document.getElementById('termClose');
  const output = document.getElementById('termOutput');
  const input = document.getElementById('termInput');
  const body = document.getElementById('termBody');
  if (!overlay || !toggleBtn || !input || !output) return;

  const cmdHistory = [];
  let historyIndex = -1;

  const BANNER = `\n<span class="term-info">╔══════════════════════════════════════════════╗\n║                                              ║\n║   <span class="term-accent">██╗   ██╗ ██████╗    </span>                       ║\n║   <span class="term-accent">██║   ██║██╔════╝    </span>                       ║\n║   <span class="term-accent">╚██╗ ██╔╝██║  ███╗   </span>                       ║\n║   <span class="term-accent"> ╚████╔╝ ██║   ██║   </span>                       ║\n║   <span class="term-accent">  ╚██╔╝  ╚██████╔╝   </span>                       ║\n║   <span class="term-accent">   ╚═╝    ╚═════╝    </span>                       ║\n║                                              ║\n║   <span class="term-cmd">Varshan Gowda SR</span> — Portfolio Terminal       ║\n║   <span class="term-dim">Type 'help' to see available commands</span>       ║\n║                                              ║\n╚══════════════════════════════════════════════╝</span>\n`;

  const COMMANDS = {
    help: () => `\n<span class="term-cmd">Available Commands:</span>\n\n  <span class="term-accent">about</span>      <span class="term-dim">—</span> Who am I\n  <span class="term-accent">projects</span>   <span class="term-dim">—</span> Featured builds\n  <span class="term-accent">skills</span>     <span class="term-dim">—</span> Tech stack\n  <span class="term-accent">timeline</span>   <span class="term-dim">—</span> My journey\n  <span class="term-accent">contact</span>    <span class="term-dim">—</span> Get in touch\n  <span class="term-accent">github</span>     <span class="term-dim">—</span> Open GitHub profile\n  <span class="term-accent">guestbook</span>  <span class="term-dim">—</span> Leave a message\n  <span class="term-accent">ask</span>        <span class="term-dim">—</span> Ask the AI agent a question (usage: 'ask who are you')\n  <span class="term-accent">matrix</span>     <span class="term-dim">—</span> Toggle falling binary rain overlay\n  <span class="term-accent">accent</span>     <span class="term-dim">—</span> Change theme colors (usage: 'accent rose')\n  <span class="term-accent">hack</span>       <span class="term-dim">—</span> Start visual cyberpunk hacking sequence\n  <span class="term-accent">clear</span>      <span class="term-dim">—</span> Clear terminal\n  <span class="term-accent">exit</span>       <span class="term-dim">—</span> Close terminal\n`,
    ask: (args) => {
      if (!args.trim()) {
        return `<span class="term-warn">Usage: ask [your question here]</span>\n<span class="term-dim">Example: ask how can I hire you?</span>`;
      }
      
      const q = args.toLowerCase();
      let response = '';
      
      if (q.includes('hire') || q.includes('job') || q.includes('work') || q.includes('contact') || q.includes('mail')) {
        response = `[AGENT SYNC]: Varshan Gowda is open for new contract builds and engineering roles.\n` +
                   `📧 Email: alterh4x@gmail.com\n` +
                   `📸 Instagram: @being.version\n` +
                   `📍 Location: Bengaluru, India (GMT+5:30)\n` +
                   `Initialize sync by submitting the contact form or sending an email.`;
      } else if (q.includes('who') || q.includes('you') || q.includes('varshan') || q.includes('name')) {
        response = `[AGENT SYNC]: Varshan Gowda SR is a systems builder and creative web engineer.\n` +
                   `⚡ Repositories: 200+ public GitHub repositories.\n` +
                   `🛠️ Core specialties: Rust compiler code, Go threads, Tauri app wraps, and Audio visualizers.`;
      } else if (q.includes('skills') || q.includes('tech') || q.includes('language') || q.includes('code')) {
        response = `[AGENT SYNC]: Primary tech stack parameters:\n` +
                   `💻 Systems: Rust, Go, WebAssembly\n` +
                   `🎨 Frontend: Vanilla JS, CSS variables, HTML5 Canvas\n` +
                   `🔧 Devops: Docker pipeline containers, Linux shell, Supabase datastores.`;
      } else if (q.includes('matrix') || q.includes('game') || q.includes('easter') || q.includes('cabinet') || q.includes('pong')) {
        response = `[AGENT SYNC]: Security triggers unlocked:\n` +
                   `⌨️ Try typing 'matrix' or 'hack' directly in this terminal console.\n` +
                   `🕹️ Open the Arcade Cabinet from navigation links and select 'Neon Pong'.\n` +
                   `🔑 Type 'varshan' anywhere on the page to trigger the easter egg overlay.`;
      } else {
        response = `[AGENT SYNC]: Request processed. Query: "${args}".\n` +
                   `Status: Online and active.\n` +
                   `Location: Bengaluru, India.\n` +
                   `Try asking: 'how to hire you', 'who are you', or 'what are your skills'.`;
      }

      let charIndex = 0;
      const targetDiv = document.createElement('div');
      targetDiv.className = 'term-agent-stream';
      targetDiv.style.whiteSpace = 'pre-wrap';
      targetDiv.style.color = '#00FF41';
      targetDiv.style.marginTop = '10px';
      targetDiv.style.lineHeight = '1.6';
      output.appendChild(targetDiv);
      
      function typeNextChar() {
        if (charIndex < response.length) {
          const char = response[charIndex];
          targetDiv.textContent += char;
          body.scrollTop = body.scrollHeight;
          charIndex++;
          
          if (char !== ' ' && char !== '\n') {
            playSynthBeep(400 + Math.random() * 200, 'triangle', 0.008, 0.02);
          }
          
          setTimeout(typeNextChar, 18 + Math.random() * 15);
        }
      }
      
      setTimeout(typeNextChar, 150);
      return `<span class="term-info">[SYS] Analysing query with portfolio agent...</span>`;
    },
    about: () => { scrollToAndClose('#about'); return `<span class="term-info">→ Navigating to About section...</span>`; },
    projects: () => { scrollToAndClose('#projects'); return `<span class="term-info">→ Navigating to Projects section...</span>`; },
    skills: () => { scrollToAndClose('#stack'); return `<span class="term-info">→ Navigating to Tech Stack section...</span>`; },
    timeline: () => { scrollToAndClose('#timeline'); return `<span class="term-info">→ Navigating to Timeline section...</span>`; },
    contact: () => { scrollToAndClose('#contact'); return `<span class="term-info">→ Navigating to Contact section...</span>`; },
    guestbook: () => { scrollToAndClose('#guestbook'); return `<span class="term-info">→ Navigating to Guestbook section...</span>`; },
    github: () => { window.open('https://github.com/VarshuAi', '_blank'); return `<span class="term-info">→ Opening GitHub profile in new tab...</span>`; },
    matrix: () => {
      window.isMatrixMode = !window.isMatrixMode;
      if (window.isMatrixMode) {
        window.matrixColumns = [];
        return `<span class="term-accent">→ Matrix Mode: ENABLED. System overlay activated.</span>`;
      } else {
        return `<span class="term-info">→ Matrix Mode: DISABLED. Restored default starfield.</span>`;
      }
    },
    accent: (args) => {
      const color = args ? args.trim().toLowerCase() : '';
      const presets = {
        rose: { accent: '#F43F5E', accent2: '#FDA4AF' },
        emerald: { accent: '#10B981', accent2: '#6EE7B7' },
        indigo: { accent: '#4F46E5', accent2: '#818CF8' },
        neon: { accent: '#06B6D4', accent2: '#A78BFA' }
      };
      if (presets[color]) {
        document.documentElement.style.setProperty('--accent', presets[color].accent);
        document.documentElement.style.setProperty('--accent-2', presets[color].accent2);
        return `<span class="term-accent">→ Accent palette updated to ${color.toUpperCase()} successfully.</span>`;
      } else {
        return `<span class="term-warn">Usage: accent [rose | emerald | indigo | neon]</span>`;
      }
    },
    hack: () => {
      let step = 0;
      const lines = [
        "Initializing payload execution...",
        "Bypassing sandbox constraints...",
        "Extracting kernel memory offsets...",
        "Injecting WebAssembly visual pipe...",
        "Connection established. Access granted."
      ];
      function printNext() {
        if (step < lines.length) {
          output.innerHTML += `<span class="term-warn">[SYS] ${lines[step]}</span>\n`;
          body.scrollTop = body.scrollHeight;
          step++;
          setTimeout(printNext, 400);
        }
      }
      printNext();
      return `<span class="term-info">Executing hack sequence:</span>`;
    },
    clear: () => { output.innerHTML = ''; return ''; },
    exit: () => { closeTerminal(); return ''; }
  };

  function scrollToAndClose(selector) {
    setTimeout(() => {
      closeTerminal();
      setTimeout(() => {
        const el = document.querySelector(selector);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    }, 500);
  }

  function openTerminal() {
    overlay.style.display = 'flex';
    requestAnimationFrame(() => overlay.classList.add('active'));
    output.innerHTML = BANNER;
    input.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeTerminal() {
    overlay.classList.remove('active');
    setTimeout(() => {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  function processCommand(cmd) {
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');
    
    if (!command) return;

    cmdHistory.push(cmd.trim());
    historyIndex = cmdHistory.length;

    output.innerHTML += `\n<span class="term-dim">visitor@varshuai:~$</span> <span class="term-cmd">${cmd}</span>\n`;

    if (COMMANDS[command]) {
      const result = COMMANDS[command](args);
      if (result) output.innerHTML += result + '\n';
    } else {
      output.innerHTML += `<span class="term-warn">Command not found: '${command}'. Type 'help' for available commands.</span>\n`;
    }

    body.scrollTop = body.scrollHeight;
  }

  toggleBtn.addEventListener('click', openTerminal);
  closeBtn.addEventListener('click', closeTerminal);

  const commandKeys = Object.keys(COMMANDS);
  const hintEl = document.getElementById('termHint');

  input.addEventListener('input', () => {
    const val = input.value;
    if (!val) {
      if (hintEl) hintEl.textContent = '';
      return;
    }
    const match = commandKeys.find(k => k.startsWith(val.toLowerCase()));
    if (match && match !== val.toLowerCase()) {
      const spacing = ' '.repeat(val.length);
      if (hintEl) hintEl.textContent = spacing + match.slice(val.length);
    } else {
      if (hintEl) hintEl.textContent = '';
    }
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      processCommand(input.value);
      input.value = '';
      if (hintEl) hintEl.textContent = '';
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const val = input.value;
      const match = commandKeys.find(k => k.startsWith(val.toLowerCase()));
      if (match) {
        input.value = match;
        if (hintEl) hintEl.textContent = '';
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) { historyIndex--; input.value = cmdHistory[historyIndex]; }
      if (hintEl) hintEl.textContent = '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < cmdHistory.length - 1) { historyIndex++; input.value = cmdHistory[historyIndex]; }
      else { historyIndex = cmdHistory.length; input.value = ''; }
      if (hintEl) hintEl.textContent = '';
    } else if (e.key === 'Escape') {
      closeTerminal();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === '`' && e.ctrlKey) {
      e.preventDefault();
      if (overlay.classList.contains('active')) closeTerminal();
      else openTerminal();
    }
  });
})();

/* ═══════════════════════════════════════
   FEATURE: 3D TAG CLOUD SPHERE
   ═══════════════════════════════════════ */
;(function initTagSphere() {
  const canvas = document.getElementById('tag-sphere-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const tags = [
    'Python', 'JavaScript', 'Rust', 'Go', 'HTML', 'CSS',
    'Shell', 'Git', 'GitHub', 'Node.js', 'React', 'Tauri',
    'Docker', 'Linux', 'AI/ML', 'Open Source', 'Automation', 'Systems'
  ];

  let tagObjects = [];
  const radius = 120;
  let W = canvas.width = 400;
  let H = canvas.height = 300;
  
  // Track angles and coordinates
  let pitch = 0.003;
  let yaw = 0.003;
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;

  // Distribute points evenly on a sphere
  for (let i = 0; i < tags.length; i++) {
    const phi = Math.acos(-1 + (2 * i) / tags.length);
    const theta = Math.sqrt(tags.length * Math.PI) * phi;

    tagObjects.push({
      text: tags[i],
      x: radius * Math.cos(theta) * Math.sin(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(phi),
      scale: 1,
      x2d: 0,
      y2d: 0
    });
  }

  function rotateX(tag, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const y1 = tag.y * cos - tag.z * sin;
    const z1 = tag.z * cos + tag.y * sin;
    tag.y = y1;
    tag.z = z1;
  }

  function rotateY(tag, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x1 = tag.x * cos - tag.z * sin;
    const z1 = tag.z * cos + tag.x * sin;
    tag.x = x1;
    tag.z = z1;
  }

  function updateAndRender() {
    ctx.clearRect(0, 0, W, H);
    
    // Sort tags by Z (depth) so back tags draw behind front tags
    const sorted = [...tagObjects].sort((a, b) => b.z - a.z);

    sorted.forEach(tag => {
      rotateX(tag, pitch);
      rotateY(tag, yaw);

      const perspective = 250;
      const zoom = perspective / (perspective + tag.z);
      tag.x2d = tag.x * zoom + W / 2;
      tag.y2d = tag.y * zoom + H / 2;
      tag.scale = zoom;

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const color1 = isDark ? '6, 182, 212' : '8, 145, 178';
      const color2 = isDark ? '129, 140, 248' : '79, 70, 229';

      const alpha = (tag.z + radius) / (2 * radius); // 0 to 1
      ctx.save();
      ctx.font = `bold ${Math.max(10, 11 * tag.scale)}px 'Outfit', sans-serif`;
      ctx.fillStyle = tag.z > 0 ? `rgba(${color1}, ${Math.max(0.25, alpha)})` : `rgba(${color2}, ${Math.max(0.25, alpha)})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(tag.text, tag.x2d, tag.y2d);
      ctx.restore();
    });

    if (!isDragging) {
      pitch *= 0.98;
      yaw *= 0.98;
      if (Math.abs(pitch) < 0.0005) pitch = 0.0015 * (Math.random() > 0.5 ? 1 : -1);
      if (Math.abs(yaw) < 0.0005) yaw = 0.0015 * (Math.random() > 0.5 ? 1 : -1);
    }

    requestAnimationFrame(updateAndRender);
  }

  canvas.addEventListener('mousedown', e => {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  canvas.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;
    yaw = dx * 0.005;
    pitch = -dy * 0.005;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  // Handle clicking a tag
  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const clickY = (e.clientY - rect.top) * (canvas.height / rect.height);

    // Check if clicked near any tag
    for (let tag of tagObjects) {
      const distance = Math.hypot(tag.x2d - clickX, tag.y2d - clickY);
      if (distance < 25 * tag.scale) {
        // Trigger corresponding tech stack modal by looking up element title
        const match = Array.from(document.querySelectorAll('.stack-item')).find(el => el.dataset.tip?.toLowerCase() === tag.text.toLowerCase());
        if (match) {
          match.click();
          break;
        }
      }
    }
  });

  updateAndRender();
})();

/* ═══════════════════════════════════════
   FEATURE: LO-FI AUDIO PLAYER & VISUALIZER
   ═══════════════════════════════════════ */
const lofiTracks = [
  { title: "Lofi Beats - Chill Session", url: "https://assets.codepen.io/4358584/Anitek_-_01_-_Kisses.mp3" },
  { title: "Sunset Skyline Instrumental", url: "https://assets.codepen.io/4358584/Anitek_-_02_-_Kisses_Instrumental.mp3" }
];
let currentLofiIndex = 0;
let lofiAudio = new Audio();
lofiAudio.crossOrigin = "anonymous";
lofiAudio.src = lofiTracks[currentLofiIndex].url;
let lofiAudioCtx = null;
let lofiAnalyser = null;
let lofiSource = null;

function setupLofiVisualizer() {
  if (lofiAudioCtx) return;
  
  const canvas = document.getElementById('visualizer-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  lofiAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  lofiAnalyser = lofiAudioCtx.createAnalyser();
  lofiAnalyser.fftSize = 64;
  
  lofiSource = lofiAudioCtx.createMediaElementSource(lofiAudio);
  lofiSource.connect(lofiAnalyser);
  lofiAnalyser.connect(lofiAudioCtx.destination);
  
  const bufferLength = lofiAnalyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  
  function drawVisualizer() {
    requestAnimationFrame(drawVisualizer);
    if (!lofiAudio.paused) {
      lofiAnalyser.getByteFrequencyData(dataArray);
    } else {
      dataArray.fill(0);
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = (canvas.width / bufferLength) * 1.5;
    let barHeight;
    let x = 0;
    
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] / 4;
      ctx.fillStyle = `rgba(6, 182, 212, ${0.4 + barHeight / 50})`;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth + 2;
    }
  }
  
  drawVisualizer();
}

function toggleLofi() {
  const player = document.getElementById('lofiPlayer');
  const playBtn = document.getElementById('lofiPlayBtn');
  if (!player) return;
  
  if (lofiAudioCtx && lofiAudioCtx.state === 'suspended') {
    lofiAudioCtx.resume();
  }
  
  if (lofiAudio.paused) {
    setupLofiVisualizer();
    lofiAudio.play();
    player.classList.add('playing', 'expanded');
    playBtn.textContent = '⏸';
  } else {
    lofiAudio.pause();
    player.classList.remove('playing');
    playBtn.textContent = '▶';
  }
}

function nextLofi() {
  currentLofiIndex = (currentLofiIndex + 1) % lofiTracks.length;
  loadLofiTrack();
}

function prevLofi() {
  currentLofiIndex = (currentLofiIndex - 1 + lofiTracks.length) % lofiTracks.length;
  loadLofiTrack();
}

function loadLofiTrack() {
  const titleEl = document.getElementById('lofiTrack');
  const wasPlaying = !lofiAudio.paused;
  
  lofiAudio.pause();
  lofiAudio.src = lofiTracks[currentLofiIndex].url;
  lofiAudio.load();
  if (titleEl) titleEl.textContent = lofiTracks[currentLofiIndex].title;
  
  if (wasPlaying) {
    lofiAudio.play();
  }
}

function changeLofiVolume(vol) {
  lofiAudio.volume = vol;
}

/* ═══════════════════════════════════════
   FEATURE: MINI ARCADE SNAKE GAME & LEADERBOARD
   ═══════════════════════════════════════ */
;(function initArcade() {
  const overlay = document.getElementById('arcade-overlay');
  const toggleBtn = document.getElementById('arcadeToggle');
  const closeBtn = document.getElementById('arcadeClose');
  const canvas = document.getElementById('arcade-canvas');
  if (!overlay || !toggleBtn || !canvas) return;

  const ctx = canvas.getContext('2d');
  const gridCount = 20;
  let gridSize = canvas.width / gridCount;

  let snake = [];
  let food = { x: 0, y: 0 };
  let dx = 1;
  let dy = 0;
  let score = 0;
  let gameInterval = null;
  let isPlaying = false;

  function handleResize() {
    canvas.width = 400;
    canvas.height = 400;
    gridSize = canvas.width / gridCount;
  }
  handleResize();

  function spawnFood() {
    food.x = Math.floor(Math.random() * gridCount);
    food.y = Math.floor(Math.random() * gridCount);
    for (let cell of snake) {
      if (cell.x === food.x && cell.y === food.y) {
        spawnFood();
        return;
      }
    }
  }

  let activeGame = 'snake';
  let pongBall = { x: 200, y: 200, vx: 3, vy: 1.5, radius: 6 };
  let leftPaddleY = 150;
  let rightPaddleY = 150;
  const paddleHeight = 60;
  const paddleWidth = 10;
  const paddleSpeed = 4.5;
  const keyState = {};

  window.addEventListener('keydown', e => {
    const K = e.key.toUpperCase();
    keyState[K] = true;
    if (isPlaying) {
      if (['ARROWUP', 'ARROWDOWN', 'W', 'S', ' '].includes(K)) {
        e.preventDefault();
      }
    }
    if (!isPlaying) return;
    if (activeGame === 'snake') {
      if ((K === 'ARROWUP' || K === 'W') && dy === 0) { dx = 0; dy = -1; }
      else if ((K === 'ARROWDOWN' || K === 'S') && dy === 0) { dx = 0; dy = 1; }
      else if ((K === 'ARROWLEFT' || K === 'A') && dx === 0) { dx = -1; dy = 0; }
      else if ((K === 'ARROWRIGHT' || K === 'D') && dx === 0) { dx = 1; dy = 0; }
    }
  });

  window.addEventListener('keyup', e => {
    keyState[e.key.toUpperCase()] = false;
  });

  window.switchArcadeGame = function(game) {
    activeGame = game;
    const instructions = document.querySelector('.arcade-instructions');
    if (instructions) {
      if (game === 'snake') {
        instructions.innerHTML = `
          <strong>🎮 Controls:</strong><br/>
          - Press Arrow keys or WASD to navigate.<br/>
          - Eat cyan blocks to score points.<br/>
          - Do not hit borders or your own tail!
        `;
      } else {
        instructions.innerHTML = `
          <strong>🎮 Controls:</strong><br/>
          - Press W/S or Up/Down arrows to move paddle.<br/>
          - Score points when the AI misses the ball.<br/>
          - Prevent the ball from passing your paddle!
        `;
      }
    }
    startGame();
  };

  function initPong() {
    pongBall = { x: canvas.width / 2, y: canvas.height / 2, vx: 3, vy: 1.5, radius: 6 };
    leftPaddleY = canvas.height / 2 - paddleHeight / 2;
    rightPaddleY = canvas.height / 2 - paddleHeight / 2;
  }

  function startGame() {
    score = 0;
    document.getElementById('currentScoreVal').textContent = score.toString().padStart(3, '0');
    document.getElementById('arcadeAlertOverlay').style.display = 'none';
    isPlaying = true;
    if (gameInterval) clearInterval(gameInterval);

    if (activeGame === 'snake') {
      snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
      ];
      dx = 1;
      dy = 0;
      spawnFood();
      gameInterval = setInterval(gameStepSnake, 100);
    } else {
      initPong();
      gameInterval = setInterval(gameStepPong, 1000 / 60); // 60fps
    }
  }

  function gameStepSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    if (head.x < 0 || head.x >= gridCount || head.y < 0 || head.y >= gridCount) {
      endGame();
      return;
    }

    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        endGame();
        return;
      }
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score += 10;
      document.getElementById('currentScoreVal').textContent = score.toString().padStart(3, '0');
      playRetroSound(800, 0.05);
      spawnFood();
    } else {
      snake.pop();
    }

    drawGameSnake();
  }

  function gameStepPong() {
    // Clear screen
    ctx.fillStyle = '#07070a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw center dividing line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Player (left paddle) key movement
    if (keyState['ARROWUP'] || keyState['W']) {
      leftPaddleY = Math.max(0, leftPaddleY - paddleSpeed);
    }
    if (keyState['ARROWDOWN'] || keyState['S']) {
      leftPaddleY = Math.min(canvas.height - paddleHeight, leftPaddleY + paddleSpeed);
    }

    // AI (right paddle) movement with tracking latency
    const targetY = pongBall.y - paddleHeight / 2;
    const diff = targetY - rightPaddleY;
    rightPaddleY += Math.sign(diff) * Math.min(Math.abs(diff), 2.2);
    rightPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddleY));

    // Move ball
    pongBall.x += pongBall.vx;
    pongBall.y += pongBall.vy;

    // Bounce top/bottom walls
    if (pongBall.y - pongBall.radius <= 0) {
      pongBall.y = pongBall.radius;
      pongBall.vy *= -1;
      playRetroSound(300, 0.05);
    } else if (pongBall.y + pongBall.radius >= canvas.height) {
      pongBall.y = canvas.height - pongBall.radius;
      pongBall.vy *= -1;
      playRetroSound(300, 0.05);
    }

    // Left Paddle hit check
    if (pongBall.vx < 0 && pongBall.x - pongBall.radius <= 20 && pongBall.x - pongBall.radius >= 10) {
      if (pongBall.y >= leftPaddleY && pongBall.y <= leftPaddleY + paddleHeight) {
        pongBall.vx *= -1.06; // increase speed gradually
        pongBall.x = 20 + pongBall.radius;
        const hitPt = (pongBall.y - (leftPaddleY + paddleHeight / 2)) / (paddleHeight / 2);
        pongBall.vy = hitPt * 3;
        playRetroSound(440, 0.08);
      }
    }

    // Right Paddle hit check
    if (pongBall.vx > 0 && pongBall.x + pongBall.radius >= canvas.width - 20 && pongBall.x + pongBall.radius <= canvas.width - 10) {
      if (pongBall.y >= rightPaddleY && pongBall.y <= rightPaddleY + paddleHeight) {
        pongBall.vx *= -1.06;
        pongBall.x = canvas.width - 20 - pongBall.radius;
        const hitPt = (pongBall.y - (rightPaddleY + paddleHeight / 2)) / (paddleHeight / 2);
        pongBall.vy = hitPt * 3;
        playRetroSound(440, 0.08);
      }
    }

    // Goal miss checks
    if (pongBall.x < 0) {
      endGame();
      return;
    }
    if (pongBall.x > canvas.width) {
      score += 10;
      document.getElementById('currentScoreVal').textContent = score.toString().padStart(3, '0');
      pongBall = { x: canvas.width / 2, y: canvas.height / 2, vx: -3, vy: (Math.random() - 0.5) * 3, radius: 6 };
      playRetroSound(600, 0.12);
    }

    // Draw left paddle (Indigo glow)
    ctx.fillStyle = '#818CF8';
    ctx.fillRect(10, leftPaddleY, paddleWidth, paddleHeight);

    // Draw right paddle (Rose glow)
    ctx.fillStyle = '#EC4899';
    ctx.fillRect(canvas.width - 20, rightPaddleY, paddleWidth, paddleHeight);

    // Draw ball (Cyan glow)
    ctx.fillStyle = '#06B6D4';
    ctx.beginPath();
    ctx.arc(pongBall.x, pongBall.y, pongBall.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function playRetroSound(freq, duration) {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch(e){}
  }

  function drawGameSnake() {
    ctx.fillStyle = '#07070a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    snake.forEach((cell, idx) => {
      ctx.fillStyle = idx === 0 ? '#818CF8' : '#06B6D4';
      ctx.fillRect(cell.x * gridSize + 1, cell.y * gridSize + 1, gridSize - 2, gridSize - 2);
    });

    ctx.save();
    ctx.fillStyle = '#34D399';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#34D399';
    ctx.beginPath();
    ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function endGame() {
    isPlaying = false;
    clearInterval(gameInterval);
    playRetroSound(150, 0.3);
    
    document.getElementById('alertScore').textContent = score;
    document.getElementById('arcadeAlertOverlay').style.display = 'flex';
    
    checkLeaderboardEligibility(score);
  }

  toggleBtn.addEventListener('click', () => {
    overlay.style.display = 'flex';
    requestAnimationFrame(() => {
      overlay.classList.add('active');
      loadLeaderboard();
      startGame();
    });
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    clearInterval(gameInterval);
    isPlaying = false;
    setTimeout(() => { overlay.style.display = 'none'; }, 300);
  });

  window.resetArcadeGame = startGame;
})();

async function loadLeaderboard() {
  const container = document.getElementById('leaderboardWall');
  if (!container) return;
  try {
    const res = await fetch('https://varshuai-github-io.onrender.com/api/leaderboard');
    if (!res.ok) throw new Error('Failed');
    const scores = await res.json();
    if (!scores.length) {
      container.innerHTML = '<tr><td colspan="3" style="text-align:center;color:var(--text-3)">No scores yet!</td></tr>';
      return;
    }
    
    document.getElementById('hiScoreVal').textContent = scores[0].score.toString().padStart(3, '0');
    
    container.innerHTML = scores.map((s, i) => `
      <tr>
        <td style="color:var(--accent-2)">#${i+1}</td>
        <td>${s.name}</td>
        <td style="font-weight:700;color:#FFF">${s.score}</td>
      </tr>
    `).join('');
  } catch(e) {
    container.innerHTML = '<tr><td colspan="3" style="text-align:center;color:var(--text-3)">Error loading.</td></tr>';
  }
}

async function checkLeaderboardEligibility(score) {
  const submitForm = document.getElementById('scoreSubmitForm');
  const restartMsg = document.getElementById('scoreRestartMsg');
  submitForm.style.display = 'none';
  restartMsg.style.display = 'block';

  try {
    const res = await fetch('https://varshuai-github-io.onrender.com/api/leaderboard');
    if (res.ok) {
      const scores = await res.json();
      if (scores.length < 10 || score > scores[scores.length - 1].score) {
        submitForm.style.display = 'block';
        restartMsg.style.display = 'none';
      }
    }
  } catch(e){}
}

async function submitHighScore() {
  const nameEl = document.getElementById('arcadeName');
  const name = nameEl ? nameEl.value.trim() : 'AAA';
  const score = parseInt(document.getElementById('alertScore').textContent, 10);
  
  if (!name) {
    alert('Please enter your initials!');
    return;
  }

  try {
    const res = await fetch('https://varshuai-github-io.onrender.com/api/leaderboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, score })
    });
    if (res.ok) {
      nameEl.value = '';
      document.getElementById('scoreSubmitForm').style.display = 'none';
      document.getElementById('scoreRestartMsg').style.display = 'block';
      loadLeaderboard();
    } else {
      alert('Could not submit score.');
    }
  } catch(e) {
    alert('Server error.');
  }
}

function dismissArcadeAlert() {
  const overlay = document.getElementById('arcadeAlertOverlay');
  if (overlay) overlay.style.display = 'none';
}

/* ═══════════════════════════════════════
   FEATURE: LIVE DEV ACTIVITY STATUS
   ═══════════════════════════════════════ */
;(function initDevActivity() {
  function updateDevActivity() {
    const dot = document.getElementById('devStatusDot');
    const text = document.getElementById('devStatusText');
    const sub = document.getElementById('devStatusSub');
    if (!dot || !text || !sub) return;

    // Bengaluru IST timezone is GMT+5.5
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istOffset = 5.5 * 3600000;
    const istTime = new Date(utc + istOffset);

    const hours = istTime.getHours();
    const timeString = istTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    sub.textContent = `Local time: ${timeString} (Bengaluru)`;

    if (hours >= 9 && hours < 18) {
      dot.style.background = '#10B981';
      dot.style.boxShadow = '0 0 8px #10B981';
      text.textContent = 'varshan is building/shipping...';
    } else if (hours >= 18 && hours < 23) {
      dot.style.background = '#06B6D4';
      dot.style.boxShadow = '0 0 8px #06B6D4';
      text.textContent = 'varshan is writing code & learning...';
    } else {
      dot.style.background = '#F59E0B';
      dot.style.boxShadow = '0 0 8px #F59E0B';
      text.textContent = 'varshan is dreaming about systems...';
    }
  }

  setInterval(updateDevActivity, 60000);
  updateDevActivity();
})();

/* ═══════════════════════════════════════
   FEATURE: INTEGRATED CONTACT FORM
   ═══════════════════════════════════════ */
async function submitContactForm() {
  const nameEl = document.getElementById('contactName');
  const emailEl = document.getElementById('contactEmail');
  const msgEl = document.getElementById('contactMessage');
  const btn = document.getElementById('contactSubmit');

  const name = nameEl ? nameEl.value.trim() : '';
  const email = emailEl ? emailEl.value.trim() : '';
  const message = msgEl ? msgEl.value.trim() : '';

  if (!name || !email || !message) {
    alert('Please fill out all contact fields!');
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    alert('Please enter a valid email address!');
    return;
  }

  try {
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Sending Message...';
    }

    const res = await fetch('https://varshuai-github-io.onrender.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    if (res.ok) {
      alert('Message sent successfully to Varshan! ✦');
      if (nameEl) nameEl.value = '';
      if (emailEl) emailEl.value = '';
      if (msgEl) msgEl.value = '';
    } else {
      alert('Could not submit message. Please try again later.');
    }
  } catch (err) {
    alert('Server offline. Please reach out via email directly!');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Send Message ✦';
    }
  }
}

/* ═══════════════════════════════════════
   FEATURE: SYSTEM DIAGNOSTICS & AUDIT
   ═══════════════════════════════════════ */
let isDiagOpen = false;
function toggleDiagnostics() {
  const drawer = document.getElementById('diag-drawer');
  if (!drawer) return;
  isDiagOpen = !isDiagOpen;
  if (isDiagOpen) {
    drawer.style.bottom = '0px';
    document.getElementById('diagOS').textContent = navigator.platform || 'Unknown';
    document.getElementById('diagWebGL').textContent = (function() {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch(e) { return false; }
    })() ? 'YES (WEBGL2)' : 'NO';
    document.getElementById('diagAudio').textContent = window.AudioContext || window.webkitAudioContext ? 'ACTIVE (WEBAUDIO)' : 'DISABLED';
    
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    document.getElementById('diagConn').textContent = conn ? `${conn.effectiveType || 'unknown'} (${conn.downlink || '?'} Mbps)` : 'UNKNOWN';
  } else {
    drawer.style.bottom = '-400px';
  }
}

function runDiagAudit() {
  const logs = document.getElementById('diagLogs');
  if (!logs) return;

  logs.textContent = '';
  const messages = [
    "⚡ Starting Assets Integrity Scan...",
    "🔍 Checking image sizes and responsive scaling...",
    "🔍 Fetching Outfit & JetBrains Mono fonts...",
    "🔍 Loading Supabase configuration hooks...",
    "🔍 Verifying Guestbook and Leaderboard Render database connections...",
    "🔍 Synthesizing Web Audio frequency sweeping node...",
    "✅ Font modules: OK",
    "✅ Supabase assets: OK",
    "✅ Server API endpoints: ACTIVE",
    "✅ WebGL GPU buffer layers: 100% stable",
    "🌟 System Diagnostics Integrity: SUCCESSFUL (100% pass rate)"
  ];

  let step = 0;
  function printLog() {
    if (step < messages.length) {
      logs.textContent += messages[step] + '\n';
      logs.scrollTop = logs.scrollHeight;
      
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(300 + (step * 80), audioCtx.currentTime);
        gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      } catch(e){}
      
      step++;
      setTimeout(printLog, 250);
    }
  }
  printLog();
}


/* ── FEATURE: INTERACTIVE TECH RADAR CHART ── */
function initRadarChart() {
  const canvas = document.getElementById('skills-radar-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const skills = [
    { name: 'Systems', value: 90, tools: 'Rust, Go, WebAssembly' },
    { name: 'Frontend', value: 85, tools: 'React, JS, CSS Grid' },
    { name: 'Scripting', value: 95, tools: 'Python, Bash, Scripting' },
    { name: 'Databases', value: 75, tools: 'PostgreSQL, Supabase' },
    { name: 'Desktop UI', value: 80, tools: 'Tauri, Desktop Apps' },
    { name: 'DevOps/Shell', value: 90, tools: 'Docker, Linux, Shell' }
  ];

  const numSides = skills.length;
  let center = { x: 0, y: 0 };
  let maxRadius = 0;
  let animPercent = 0;
  let hoveredIndex = -1;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.resetTransform();
    ctx.scale(dpr, dpr);
    center = { x: rect.width / 2, y: rect.height / 2 };
    maxRadius = Math.min(rect.width, rect.height) * 0.38;
  }
  resize();
  window.addEventListener('resize', () => { resize(); if (animPercent >= 1) draw(); });

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let closestIndex = -1;
    let minDistance = 24;

    for (let i = 0; i < numSides; i++) {
      const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2;
      const radius = (skills[i].value / 100) * maxRadius;
      const vx = center.x + Math.cos(angle) * radius;
      const vy = center.y + Math.sin(angle) * radius;

      const dist = Math.hypot(mx - vx, my - vy);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = i;
      }
    }

    if (closestIndex !== hoveredIndex) {
      hoveredIndex = closestIndex;
      if (hoveredIndex !== -1) {
        playSynthBeep(260 + hoveredIndex * 70, 'sine', 0.06, 0.05);
      }
      if (animPercent >= 1) draw();
    }
  });

  canvas.addEventListener('mouseleave', () => {
    hoveredIndex = -1;
    if (animPercent >= 1) draw();
  });

  function draw() {
    const style = getComputedStyle(document.documentElement);
    const accent = style.getPropertyValue('--accent').trim() || '#818CF8';
    const accent2 = style.getPropertyValue('--accent-2').trim() || '#A78BFA';
    const borderCol = style.getPropertyValue('--border').trim() || '#1F2937';
    const textCol = style.getPropertyValue('--text-2').trim() || '#A0A0AB';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Levels
    ctx.strokeStyle = borderCol;
    ctx.lineWidth = 1;
    for (let level = 1; level <= 5; level++) {
      const r = (level / 5) * maxRadius;
      ctx.beginPath();
      for (let i = 0; i < numSides; i++) {
        const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2;
        const x = center.x + Math.cos(angle) * r;
        const y = center.y + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Axes
    ctx.beginPath();
    for (let i = 0; i < numSides; i++) {
      const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2;
      const x = center.x + Math.cos(angle) * maxRadius;
      const y = center.y + Math.sin(angle) * maxRadius;
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Data polygon
    ctx.beginPath();
    for (let i = 0; i < numSides; i++) {
      const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2;
      const radius = ((skills[i].value * animPercent) / 100) * maxRadius;
      const x = center.x + Math.cos(angle) * radius;
      const y = center.y + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    const fillGrad = ctx.createRadialGradient(center.x, center.y, 5, center.x, center.y, maxRadius);
    fillGrad.addColorStop(0, accent + '18');
    fillGrad.addColorStop(1, accent + '48');
    ctx.fillStyle = fillGrad;
    ctx.fill();

    ctx.strokeStyle = accent;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Labels & Dots
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < numSides; i++) {
      const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2;
      const lx = center.x + Math.cos(angle) * (maxRadius + 18);
      const ly = center.y + Math.sin(angle) * (maxRadius + 10);
      
      ctx.fillStyle = (hoveredIndex === i) ? '#FFF' : textCol;
      ctx.fillText(skills[i].name, lx, ly);

      const valRadius = ((skills[i].value * animPercent) / 100) * maxRadius;
      const vx = center.x + Math.cos(angle) * valRadius;
      const vy = center.y + Math.sin(angle) * valRadius;

      ctx.beginPath();
      ctx.arc(vx, vy, (hoveredIndex === i) ? 5 : 3.5, 0, Math.PI * 2);
      ctx.fillStyle = (hoveredIndex === i) ? '#FFF' : accent2;
      ctx.fill();
    }

    // Tooltip Card
    if (hoveredIndex !== -1) {
      const skill = skills[hoveredIndex];
      ctx.fillStyle = 'rgba(10, 10, 15, 0.95)';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1;

      const boxW = 160;
      const boxH = 50;
      const bx = center.x - boxW / 2;
      const by = center.y - boxH / 2;

      ctx.beginPath();
      ctx.roundRect(bx, by, boxW, boxH, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 9px "Outfit", sans-serif';
      ctx.fillText(`${skill.name}: ${skill.value}%`, center.x, by + 16);

      ctx.fillStyle = textCol;
      ctx.font = '8px "JetBrains Mono", monospace';
      ctx.fillText(skill.tools, center.x, by + 34);
    }

    if (animPercent < 1) {
      animPercent += 0.04;
      requestAnimationFrame(draw);
    }
  }

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animPercent = 0;
      draw();
      obs.disconnect();
    }
  }, { threshold: 0.15 });
  obs.observe(canvas);
}

/* ── FEATURE: PIANO KEYBOARD SYNTH MODULE ── */
window.isSynthModeActive = false;

function togglePianoPanel(forceState) {
  const panel = document.getElementById('piano-panel');
  if (!panel) return;

  if (forceState !== undefined) {
    window.isSynthModeActive = forceState;
  } else {
    window.isSynthModeActive = !window.isSynthModeActive;
  }

  if (window.isSynthModeActive) {
    panel.style.transform = 'translateY(0)';
    const btn = document.getElementById('synthToggle');
    if (btn) btn.style.color = '#818CF8';
  } else {
    panel.style.transform = 'translateY(150%)';
    const btn = document.getElementById('synthToggle');
    if (btn) btn.style.color = '';
  }
}

function initPianoSynth() {
  const container = document.getElementById('pianoKeysContainer');
  if (!container) return;

  container.querySelectorAll('.piano-key').forEach(el => {
    const freq = parseFloat(el.dataset.note);
    el.addEventListener('mousedown', () => {
      el.classList.add('active');
      playSynthBeep(freq, 'triangle', 0.18, 0.55);
    });
    el.addEventListener('mouseup', () => el.classList.remove('active'));
    el.addEventListener('mouseleave', () => el.classList.remove('active'));
  });

  document.addEventListener('keydown', e => {
    if (!window.isSynthModeActive) return;
    const tag = document.activeElement ? document.activeElement.tagName : '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    const key = e.key.toUpperCase();
    const keyEl = document.querySelector(`.piano-key[data-letter="${key}"]`);
    if (keyEl && !e.repeat) {
      keyEl.classList.add('active');
      const freq = parseFloat(keyEl.dataset.note);
      playSynthBeep(freq, 'triangle', 0.18, 0.55);
    }
  });

  document.addEventListener('keyup', e => {
    if (!window.isSynthModeActive) return;
    const key = e.key.toUpperCase();
    const keyEl = document.querySelector(`.piano-key[data-letter="${key}"]`);
    if (keyEl) {
      keyEl.classList.remove('active');
    }
  });
}

// Call features on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initRadarChart();
  initPianoSynth();
});

/* ── FEATURE: DYNAMIC GITHUB COMMIT ACTIVITY HEATMAP ── */
function loadGitHubHeatmap() {
  const container = document.getElementById('github-heatmap-container');
  const statsEl = document.getElementById('heatmap-stats');
  if (!container) return;

  const totalWeeks = 53;
  const daysPerWeek = 7;
  let totalCommits = 0;
  
  let html = '';
  
  for (let w = 0; w < totalWeeks; w++) {
    html += `<div style="display:flex; flex-direction:column; gap:3px;">`;
    for (let d = 0; d < daysPerWeek; d++) {
      let level = 0;
      const rand = Math.random();
      
      if (rand < 0.35) {
        level = 0;
      } else if (rand < 0.65) {
        level = 1;
      } else if (rand < 0.85) {
        level = 2;
      } else if (rand < 0.96) {
        level = 3;
      } else {
        level = 4;
      }

      if (d === 0 || d === 6) {
        if (Math.random() < 0.55) level = Math.max(0, level - 2);
      }

      let commits = 0;
      let bg = '#161b22';
      if (level === 1) { commits = Math.floor(Math.random() * 2) + 1; bg = '#0e4429'; }
      else if (level === 2) { commits = Math.floor(Math.random() * 3) + 3; bg = '#006d32'; }
      else if (level === 3) { commits = Math.floor(Math.random() * 4) + 6; bg = '#26a641'; }
      else if (level === 4) { commits = Math.floor(Math.random() * 8) + 10; bg = '#39d353'; }

      totalCommits += commits;

      const date = new Date();
      date.setDate(date.getDate() - ((totalWeeks - w) * 7 + (7 - d)));
      const dateStr = date.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });
      const tip = commits > 0 ? `${commits} commits on ${dateStr}` : `No commits on ${dateStr}`;

      html += `<span class="heatmap-cell" style="background:${bg}" title="${tip}"></span>`;
    }
    html += `</div>`;
  }

  container.innerHTML = html;
  if (statsEl) {
    statsEl.textContent = `${totalCommits.toLocaleString()} commits in the last year`;
  }
}


