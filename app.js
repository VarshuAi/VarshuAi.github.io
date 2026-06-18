/* ══════════════════════════════════════════════
   VARSHAN GOWDA SR — PORTFOLIO APP v2
   Custom Cursor · Particles · Spotlight · Smooth
   ══════════════════════════════════════════════ */

const GITHUB_USERNAME = 'VarshuAi';
const GITHUB_API      = `https://api.github.com/users/${GITHUB_USERNAME}`;
const REPOS_API       = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`;

/* ─── CUSTOM CURSOR ─── */
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursorDot) {
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  }
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if (cursorRing) {
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* ─── PARTICLE SYSTEM ─── */
const canvas  = document.getElementById('particles-canvas');
const ctx     = canvas ? canvas.getContext('2d') : null;
let particles = [];
let animFrame;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticle() {
  return {
    x:     Math.random() * canvas.width,
    y:     Math.random() * canvas.height,
    r:     Math.random() * 1.5 + 0.5,
    vx:    (Math.random() - 0.5) * 0.3,
    vy:    (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.4 + 0.1,
    color: Math.random() > 0.5 ? '79,70,229' : '124,58,237',
  };
}

function initParticles() {
  if (!canvas || !ctx) return;
  resizeCanvas();
  particles = Array.from({ length: 70 }, createParticle);
  drawParticles();
}

function drawParticles() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });

  // Draw connections
  particles.forEach((a, i) => {
    particles.slice(i + 1).forEach(b => {
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(79,70,229,${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    });
  });

  animFrame = requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', resizeCanvas, { passive: true });

// Only init particles on desktop
if (window.matchMedia('(min-width: 768px)').matches) {
  initParticles();
}

/* ─── TYPEWRITER ─── */
const phrases = [
  'Builder by instinct.',
  'Tinkerer by nature.',
  'Creator by choice.',
  'Open source contributor.',
  'Always shipping something.',
  'Code. Break. Fix. Repeat.',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typeText');

function typeWriter() {
  if (!typeEl) return;
  const current = phrases[phraseIdx];
  if (!deleting) {
    typeEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeWriter, 2000);
      return;
    }
  } else {
    typeEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeWriter, deleting ? 40 : 75);
}
typeWriter();

/* ─── NAV ─── */
const navbar   = document.getElementById('navbar');
const progress = document.getElementById('navProgress');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${docHeight > 0 ? (scrollTop / docHeight) * 100 : 0}%`;
  navbar.classList.toggle('scrolled', scrollTop > 40);

  // Active nav link
  document.querySelectorAll('section[id]').forEach(sec => {
    const top = sec.offsetTop - 110;
    if (scrollTop >= top && scrollTop < top + sec.offsetHeight) {
      navLinks.forEach(a => a.classList.remove('active'));
      const match = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}, { passive: true });

/* ─── HAMBURGER ─── */
const hamburger  = document.getElementById('navHamburger');
const navDrawer  = document.getElementById('navDrawer');
const navOverlay = document.getElementById('navOverlay');

function toggleMenu(open) {
  hamburger.classList.toggle('open', open);
  navDrawer.classList.toggle('open', open);
  navOverlay.classList.toggle('visible', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

hamburger?.addEventListener('click', () => toggleMenu(!hamburger.classList.contains('open')));
navOverlay?.addEventListener('click', () => toggleMenu(false));
document.querySelectorAll('.nav-mobile-drawer a').forEach(a => {
  a.addEventListener('click', () => toggleMenu(false));
});

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealEls.forEach(el => revealObs.observe(el));

/* ─── COUNTER ANIMATION ─── */
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target, 10);
    let current = 0;
    const duration = 1200;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease out cubic
      current = Math.round(ease * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

/* ─── PROJECT CARD SPOTLIGHT ─── */
function addSpotlightToCards() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
}

/* ─── LANGUAGE COLORS ─── */
const langColors = {
  Python:'#3776AB', JavaScript:'#F7DF1E', TypeScript:'#007ACC',
  Rust:'#CE422B', HTML:'#E34F26', CSS:'#264DE4', Go:'#00ADD8',
  Shell:'#4EAA25', 'C++':'#00599C', 'C#':'#178600', Java:'#b07219',
  PHP:'#4F5D95', Ruby:'#CC342D', Swift:'#FA7343', Kotlin:'#A97BFF',
};

/* ─── BUILD PROJECT CARD ─── */
function buildProjectCard(repo, idx) {
  const isFork = repo.fork;
  const lang   = repo.language;
  const desc   = repo.description || 'No description provided.';
  const stars  = repo.stargazers_count || 0;
  const forks  = repo.forks_count || 0;
  const color  = langColors[lang] || '#8b8b8b';

  const card = document.createElement('a');
  card.href = repo.html_url;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  card.className = `project-card reveal-up ${isFork ? 'is-fork' : 'is-original'}`;
  card.style.transitionDelay = `${(idx % 6) * 0.06}s`;
  card.id = `project-${repo.name}`;

  card.innerHTML = `
    <div class="project-header">
      <div class="project-icon">
        <svg viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8z"/>
        </svg>
      </div>
      <div class="project-name">${repo.name}</div>
      ${isFork ? '<span class="project-fork-badge">Fork</span>' : ''}
    </div>
    <p class="project-desc">${desc.length > 110 ? desc.slice(0, 110) + '…' : desc}</p>
    <div class="project-footer">
      <div class="project-lang">
        ${lang
          ? `<span class="lang-dot" style="background:${color}"></span><span>${lang}</span>`
          : '<span style="color:var(--text-3)">—</span>'}
      </div>
      <div class="project-stats">
        <span>⭐ ${stars}</span>
        <span>🍴 ${forks}</span>
      </div>
      <span class="project-link">View ↗</span>
    </div>
  `;
  return card;
}

/* ─── FETCH & RENDER PROJECTS ─── */
let allRepos = [];
let currentFilter = 'all';

async function fetchRepos() {
  const grid    = document.getElementById('projectsGrid');
  const moreBtn = document.getElementById('projectsMore');
  try {
    const res   = await fetch(REPOS_API);
    if (!res.ok) throw new Error();
    const repos = await res.json();
    allRepos = repos.filter(r => r.name !== GITHUB_USERNAME);
    renderProjects(currentFilter);
    if (moreBtn) moreBtn.style.display = 'block';
  } catch {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--text-3)">
        <div style="font-size:2.5rem;margin-bottom:1rem">⚠️</div>
        <p>Couldn't fetch repos right now.</p>
        <a href="https://github.com/VarshuAi" target="_blank" style="color:var(--accent);font-weight:700">View on GitHub ↗</a>
      </div>`;
  }
}

function renderProjects(filter) {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';

  let repos = allRepos;
  if (filter === 'original') repos = allRepos.filter(r => !r.fork);
  if (filter === 'forked')   repos = allRepos.filter(r => r.fork);

  if (!repos.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-3)">No repos in this category.</div>`;
    return;
  }

  repos.forEach((repo, idx) => {
    const card = buildProjectCard(repo, idx);
    grid.appendChild(card);
  });

  // Re-observe new cards + add spotlight
  grid.querySelectorAll('.reveal-up').forEach(el => revealObs.observe(el));
  addSpotlightToCards();
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderProjects(currentFilter);
  });
});

/* ─── FETCH GITHUB PROFILE ─── */
async function fetchGitHubProfile() {
  try {
    const res  = await fetch(GITHUB_API);
    if (!res.ok) return;
    const data = await res.json();

    // Update stat counters
    const repoEl     = document.querySelector('#stat-repos .counter');
    const followerEl = document.querySelector('#stat-followers .counter');
    const followingEl= document.querySelector('#stat-following .counter');
    if (repoEl)      repoEl.dataset.target      = data.public_repos;
    if (followerEl)  followerEl.dataset.target   = data.followers;
    if (followingEl) followingEl.dataset.target  = data.following;

    // Update floating badges
    const badgeRepo = document.getElementById('badge-repo-count');
    const badgeFol  = document.getElementById('badge-follower-count');
    if (badgeRepo) badgeRepo.textContent = data.public_repos + '+';
    if (badgeFol)  badgeFol.textContent  = data.followers;
  } catch(e) {
    console.warn('GitHub profile fetch failed:', e);
  }
}

/* ─── PARALLAX ORBS ─── */
let lastParallaxX = 0, lastParallaxY = 0;
window.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 40;
  const y = (e.clientY / window.innerHeight - 0.5) * 40;
  lastParallaxX += (x - lastParallaxX) * 0.04;
  lastParallaxY += (y - lastParallaxY) * 0.04;
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  const orb3 = document.querySelector('.orb-3');
  if (orb1) orb1.style.transform = `translate(${lastParallaxX * 0.5}px, ${lastParallaxY * 0.5}px)`;
  if (orb2) orb2.style.transform = `translate(${-lastParallaxX * 0.35}px, ${-lastParallaxY * 0.35}px)`;
  if (orb3) orb3.style.transform = `translate(${lastParallaxX * 0.2}px, ${lastParallaxY * 0.2}px)`;
}, { passive: true });

/* ─── SMOOTH DOOM-SCROLL MOMENTUM ─── */
if (window.matchMedia('(pointer: fine)').matches) {
  let targetY = window.scrollY;
  let currentY = window.scrollY;
  let scrolling = false;

  window.addEventListener('wheel', e => {
    targetY = Math.max(0, Math.min(
      document.documentElement.scrollHeight - window.innerHeight,
      targetY + e.deltaY * 1.2
    ));
    if (!scrolling) {
      scrolling = true;
      smoothStep();
    }
  }, { passive: true });

  function smoothStep() {
    currentY += (targetY - currentY) * 0.09;
    window.scrollTo(0, currentY);
    if (Math.abs(targetY - currentY) > 0.5) {
      requestAnimationFrame(smoothStep);
    } else {
      currentY = targetY;
      scrolling = false;
    }
  }
}

/* ─── INIT ─── */
fetchGitHubProfile();
fetchRepos();

// Immediately reveal hero
setTimeout(() => {
  document.querySelectorAll('.hero-section .reveal-up, .hero-section .reveal-right').forEach(el => {
    el.classList.add('visible');
  });
}, 80);

// Skill pill hover ripple (micro-delight)
document.querySelectorAll('.skill-pill').forEach(pill => {
  pill.addEventListener('mouseenter', () => {
    pill.style.transition = 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });
});
