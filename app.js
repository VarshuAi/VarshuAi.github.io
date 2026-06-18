/* ══════════════════════════════════════════════════
   VARSHAN GOWDA SR — PORTFOLIO APP.JS
   GitHub API Real-time Sync + All Interactions
   ══════════════════════════════════════════════════ */

const GITHUB_USERNAME = 'VarshuAi';
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}`;
const REPOS_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`;

/* ─── TYPE WRITER ─── */
const phrases = [
  'Builder by instinct.',
  'Tinkerer by nature.',
  'Creator by choice.',
  'Open Source contributor.',
  'Always shipping something.',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typeText');

function typeWriter() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typeEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    typeEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeWriter, deleting ? 45 : 80);
}
typeWriter();

/* ─── NAV SCROLL ─── */
const navbar    = document.getElementById('navbar');
const progress  = document.getElementById('navProgress');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  progress.style.width = `${pct}%`;
  navbar.classList.toggle('scrolled', scrollTop > 30);

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    const bottom = top + sec.offsetHeight;
    if (scrollTop >= top && scrollTop < bottom) {
      navLinks.forEach(a => a.classList.remove('active'));
      const match = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}, { passive: true });

/* ─── HAMBURGER MENU ─── */
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

/* ─── SCROLL REVEAL (Intersection Observer) ─── */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObs.observe(el));

/* ─── COUNTER ANIMATION ─── */
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(timer);
      }, 20);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

/* ─── GITHUB LIVE DATA FETCH ─── */
async function fetchGitHubProfile() {
  try {
    const res = await fetch(GITHUB_API);
    if (!res.ok) return;
    const data = await res.json();

    // Update stats with live data
    const repoEl = document.querySelector('#stat-repos .counter');
    const followerEl = document.querySelector('#stat-followers .counter');
    const followingEl = document.querySelector('#stat-following .counter');

    if (repoEl) repoEl.dataset.target = data.public_repos;
    if (followerEl) followerEl.dataset.target = data.followers;
    if (followingEl) followingEl.dataset.target = data.following;
  } catch (e) {
    console.warn('GitHub profile fetch failed:', e);
  }
}

/* ─── LANGUAGE COLOR MAP ─── */
const langColors = {
  Python: '#3776AB',
  JavaScript: '#F7DF1E',
  TypeScript: '#007ACC',
  Rust: '#CE422B',
  HTML: '#E34F26',
  CSS: '#264DE4',
  Go: '#00ADD8',
  Shell: '#4EAA25',
  'C++': '#00599C',
  'C#': '#178600',
  Java: '#b07219',
  PHP: '#4F5D95',
  Ruby: '#CC342D',
  Swift: '#FA7343',
  Kotlin: '#A97BFF',
};

function getLangColor(lang) {
  return langColors[lang] || '#8b8b8b';
}

/* ─── BUILD PROJECT CARD ─── */
function buildProjectCard(repo, idx) {
  const isFork = repo.fork;
  const lang = repo.language;
  const desc = repo.description || 'No description provided.';
  const stars = repo.stargazers_count || 0;
  const forks = repo.forks_count || 0;
  const color = getLangColor(lang);

  const card = document.createElement('a');
  card.href = repo.html_url;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  card.className = `project-card reveal-up ${isFork ? 'is-fork' : 'is-original'}`;
  card.style.transitionDelay = `${(idx % 6) * 0.07}s`;
  card.id = `project-card-${repo.name}`;

  card.innerHTML = `
    <div class="project-header">
      <div class="project-name">
        <svg style="width:14px;height:14px;display:inline;margin-right:6px;opacity:0.5;vertical-align:middle;" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
        </svg>
        ${repo.name}
      </div>
      ${isFork ? '<span class="project-fork-badge">Fork</span>' : ''}
    </div>
    <p class="project-desc">${desc.length > 100 ? desc.slice(0, 100) + '…' : desc}</p>
    <div class="project-footer">
      <div class="project-lang">
        ${lang ? `<span class="lang-dot" style="background:${color}"></span><span>${lang}</span>` : '<span style="color:var(--text-muted)">—</span>'}
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

/* ─── FETCH REPOS ─── */
let allRepos = [];
let currentFilter = 'all';

async function fetchRepos() {
  const grid = document.getElementById('projectsGrid');
  const moreBtn = document.getElementById('projectsMore');

  try {
    const res = await fetch(REPOS_API);
    if (!res.ok) throw new Error('GitHub API error');
    const repos = await res.json();

    allRepos = repos.filter(r => r.name !== GITHUB_USERNAME);
    renderProjects(currentFilter);

    if (moreBtn) moreBtn.style.display = 'block';
  } catch (e) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted);">
        <div style="font-size:2rem;margin-bottom:1rem;">⚠️</div>
        <p>Could not fetch repos. <a href="https://github.com/VarshuAi" target="_blank" style="color:var(--accent)">View on GitHub ↗</a></p>
      </div>`;
  }
}

function renderProjects(filter) {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';

  let repos = allRepos;
  if (filter === 'original') repos = allRepos.filter(r => !r.fork);
  if (filter === 'forked')   repos = allRepos.filter(r => r.fork);

  if (repos.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);">No repos in this category.</div>`;
    return;
  }

  repos.forEach((repo, idx) => {
    const card = buildProjectCard(repo, idx);
    grid.appendChild(card);
  });

  // Re-observe new cards for animations
  const newCards = grid.querySelectorAll('.reveal-up');
  newCards.forEach(el => revealObs.observe(el));
}

/* ─── PROJECT FILTER BUTTONS ─── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderProjects(currentFilter);
  });
});

/* ─── SMOOTH PARALLAX ON ORBS ─── */
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  if (orb1) orb1.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
  if (orb2) orb2.style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
}, { passive: true });

/* ─── SMOOTH DOOM-SCROLL MOMENTUM ─── */
let targetScroll = window.scrollY;
let currentScroll = window.scrollY;
let ticking = false;

function smoothScroll() {
  currentScroll += (targetScroll - currentScroll) * 0.1;
  if (Math.abs(targetScroll - currentScroll) < 0.5) {
    currentScroll = targetScroll;
    ticking = false;
    return;
  }
  requestAnimationFrame(smoothScroll);
}

// Only use custom smooth scroll for non-mobile
if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('wheel', (e) => {
    targetScroll = Math.max(0, Math.min(
      document.documentElement.scrollHeight - window.innerHeight,
      targetScroll + e.deltaY
    ));
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(smoothScroll);
    }
  }, { passive: true });
}

/* ─── INIT ─── */
fetchGitHubProfile();
fetchRepos();

// Trigger reveal for hero (already visible)
setTimeout(() => {
  document.querySelectorAll('.hero-section .reveal-up, .hero-section .reveal-right').forEach(el => {
    el.classList.add('visible');
  });
}, 100);
