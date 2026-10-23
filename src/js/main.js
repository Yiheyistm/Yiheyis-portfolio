import '../css/styles.css';

/**
 * Yiheyis Tamir Ayalew — Premium Software Engineer Portfolio
 * Architecture, interactions, dynamic project rendering, and case study modals.
 */

import {
  PROJECTS_DATA,
  FEATURED_PROJECTS as PROJECTS,
  ARCHIVED_PROJECTS,
  getProjectById
} from './projects-data.js';
/* SVG Icons */
const ICONS = {
  github: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
  external: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`,
  lock: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
  star: `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  close: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  code: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`
};

/* Module-level reference for dynamic scroll reveal */
let dynamicRevealObserver = null;

function observeDynamicElements(elements) {
  if (!elements || !elements.length) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window) || !dynamicRevealObserver) {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }
  elements.forEach(el => dynamicRevealObserver.observe(el));
}

/* ==========================================================================
   Header & Navigation
   ========================================================================== */
function initHeaderAndNavigation() {
  const header = document.getElementById('header');
  const mobileBottomNav = document.getElementById('mobile-bottom-nav');
  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  let lastScrollY = window.scrollY;
  let isNavHidden = false;
  let isNavigating = false;

  const showNav = () => {
    if (isNavHidden) {
      isNavHidden = false;
      header?.classList.remove('nav-hidden');
      mobileBottomNav?.classList.remove('nav-hidden');
      document.body.classList.remove('nav-scrolled-down');
    }
  };

  const hideNav = () => {
    if (!isNavHidden && !document.body.classList.contains('menu-open') && !isNavigating) {
      isNavHidden = true;
      header?.classList.add('nav-hidden');
      mobileBottomNav?.classList.add('nav-hidden');
      document.body.classList.add('nav-scrolled-down');
    }
  };

  // Scroll effect on header and smart auto-hide on downward scroll
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Header scrolled visual effect
    if (header) {
      if (currentScrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Ignore rubber-banding on iOS
    if (currentScrollY < 0) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (currentScrollY > maxScroll) return;

    // Always show at or near the top of the page
    if (currentScrollY <= 50) {
      showNav();
      lastScrollY = currentScrollY;
      return;
    }

    const scrollDelta = currentScrollY - lastScrollY;
    if (Math.abs(scrollDelta) < 8) return;

    if (scrollDelta > 0 && currentScrollY > 80) {
      // User is scrolling DOWN -> Hide navbar
      hideNav();
    } else if (scrollDelta < 0) {
      // User is scrolling UP -> Reveal navbar
      showNav();
    }

    lastScrollY = currentScrollY;
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  const closeMenu = () => {
    if (hamburger) {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    if (navbar) navbar.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  };

  const openMenu = () => {
    if (hamburger) {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
    }
    if (navbar) navbar.classList.add('active');
    if (navOverlay) navOverlay.classList.add('active');
    document.body.classList.add('menu-open');
  };

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  const drawerCloseBtn = document.getElementById('drawer-close');
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeMenu);
  }

  // Keyboard navigation: Close mobile menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar && navbar.classList.contains('active')) {
      closeMenu();
      hamburger?.focus();
    }
  });

  const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
  const allNavAnchors = [...navLinks, ...bottomNavItems];

  // Smooth scroll and auto-close mobile drawer with fixed header offset
  allNavAnchors.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          closeMenu();
          isNavigating = true;
          showNav();
          setTimeout(() => { isNavigating = false; }, 800);

          const headerHeight = header ? header.offsetHeight : 70;
          const topPos = target.getBoundingClientRect().top + window.scrollY - headerHeight + 5;
          const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          window.scrollTo({
            top: Math.max(0, topPos),
            behavior: prefersReduced ? 'auto' : 'smooth'
          });
          if (window.history && window.history.pushState) {
            window.history.pushState(null, null, href);
          }
        }
      }
    });
  });

  // Active section indicator via IntersectionObserver
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
          bottomNavItems.forEach(item => {
            const navTarget = item.getAttribute('data-nav') || item.getAttribute('href')?.replace('#', '');
            if (navTarget === id) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -55% 0px',
      threshold: 0
    });

    sections.forEach(sec => observer.observe(sec));
  }
}

/* ==========================================================================
   Scroll Progress Indicator
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) {
      progressBar.style.width = '0%';
      return;
    }
    const percent = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
    progressBar.style.width = `${percent}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* ==========================================================================
   Back To Top Button
   ========================================================================== */
function initBackToTop() {
  const backTop = document.getElementById('back-top');
  if (!backTop) return;

  const toggleBackTop = () => {
    if (window.scrollY > 400) {
      backTop.classList.add('is-visible');
      backTop.classList.add('visible');
    } else {
      backTop.classList.remove('is-visible');
      backTop.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleBackTop, { passive: true });
  toggleBackTop();

  backTop.addEventListener('click', () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    if (window.history && window.history.pushState) {
      window.history.pushState(null, null, ' ');
    }
  });
}

/* ==========================================================================
   Typing Effect in Hero
   ========================================================================== */
function initTypingEffect() {
  const textEl = document.getElementById('typing-text');
  if (!textEl) return;

  const roles = [
    'Software Engineer',
    'Flutter Mobile Engineer',
    'Backend Engineer (Go & Django)',
    'REST API & Systems Builder',
    'Applied AI & RAG Engineer'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  const type = () => {
    const current = roles[roleIdx];

    if (isDeleting) {
      textEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      textEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === current.length) {
      speed = 2200; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 400; // Pause before next
    }

    setTimeout(type, speed);
  };

  type();
}

/* ==========================================================================
   Animated Counters
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const startCounter = (el) => {
    const raw = el.textContent.trim();
    const target = parseFloat(raw.replace(/[^0-9.]/g, ''));
    const isDecimal = el.hasAttribute('data-decimal') || raw.includes('.');
    const duration = 1100;
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = target * easeOutCubic(progress);

      if (isDecimal) {
        el.textContent = current.toFixed(2);
      } else {
        el.textContent = Math.floor(current);
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = isDecimal ? target.toFixed(2) : Math.floor(target);
      }
    };

    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(c => observer.observe(c));
  } else {
    counters.forEach(c => startCounter(c));
  }
}

/* ==========================================================================
   Scroll Reveal Animations
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  dynamicRevealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-reveal-delay') || '0';
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, parseInt(delay, 10));
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => dynamicRevealObserver.observe(el));
}

/* ==========================================================================
   Project Detail Modal System (11-Point Detailed Case Studies)
   ========================================================================== */
let modalOverlayEl = null;

function ensureModal() {
  modalOverlayEl = document.getElementById('project-modal');
  if (!modalOverlayEl) {
    modalOverlayEl = document.createElement('div');
    modalOverlayEl.id = 'project-modal';
    modalOverlayEl.className = 'modal-overlay';
    modalOverlayEl.setAttribute('role', 'dialog');
    modalOverlayEl.setAttribute('aria-modal', 'true');
    modalOverlayEl.setAttribute('aria-hidden', 'true');
    modalOverlayEl.innerHTML = `
      <div class="modal-container" role="document">
        <button type="button" class="modal-close-btn" id="modal-close" aria-label="Close case study">
          ${ICONS.close}
        </button>
        <div id="modal-body" class="modal-body"></div>
      </div>
    `;
    document.body.appendChild(modalOverlayEl);
  }

  // Ensure close button binding
  const closeBtn = modalOverlayEl.querySelector('#modal-close') || modalOverlayEl.querySelector('.modal-close-btn');
  if (closeBtn) {
    closeBtn.onclick = closeCaseStudy;
  }

  // Close on outside click
  modalOverlayEl.onclick = (e) => {
    if (e.target === modalOverlayEl) {
      closeCaseStudy();
    }
  };

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlayEl && modalOverlayEl.classList.contains('is-active')) {
      closeCaseStudy();
    }
  });

  return modalOverlayEl;
}

function openCaseStudy(projectId) {
  const allCatalog = [...PROJECTS, ...ARCHIVED_PROJECTS];
  const project = allCatalog.find(p => p.id === projectId);
  if (!project) return;

  const modal = ensureModal();
  const body = modal.querySelector('#modal-body');
  if (!body) return;

  const cs = project.caseStudy || {};
  const overview = cs.overview || {};
  const contribution = cs.contribution || {};
  const engineering = cs.engineering || {};
  const challenges = cs.challenges || {};
  const outcome = cs.outcome || {};
  const visualEvidence = cs.visualEvidence || [];

  const overviewText = typeof overview === 'object' ? (overview.summary || project.shortDesc) : (overview || project.shortDesc);
  const problemText = typeof overview === 'object' ? (overview.problemAddressed || cs.problem) : (cs.problem || 'Address critical system scalability and reliability bottlenecks in the domain.');
  const roleText = typeof contribution === 'object' ? (contribution.verifiableRole || cs.role) : (cs.role || 'End-to-end architecture and implementation.');
  const archText = typeof engineering === 'object' ? (engineering.architectureSummary || cs.architecture) : (cs.architecture || 'Clean, modular architecture designed for high maintainability.');
  const challengesText = typeof challenges === 'object' ? (challenges.challenge || cs.challenges) : (cs.challenges || 'Handled distributed transaction coordination and edge latency constraints.');
  const outcomesText = typeof outcome === 'object' ? (outcome.verifiedCapabilities ? outcome.verifiedCapabilities.join(' · ') : cs.outcomes) : (cs.outcomes || 'Shipped to production meeting all reliability targets.');

  const decisionsHtml = (engineering.decisions || cs.decisions || []).map(d => {
    if (typeof d === 'object') {
      return `<li class="timeline-bullet"><strong>${d.decision}:</strong> ${d.rationale} <em style="color:#e2a857">(Trade-off: ${d.tradeOff})</em></li>`;
    }
    return `<li class="timeline-bullet">${d}</li>`;
  }).join('');

  const linksHtml = [];
  linksHtml.push(`
    <a href="project-detail.html?id=${project.id}" class="btn btn-primary btn-sm">
      ${ICONS.external}
      <span>Open Full-Page Case Study ↗</span>
    </a>
  `);

  if (project.live) {
    linksHtml.push(`
      <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
        ${ICONS.external}
        <span>${project.liveLabel || 'Visit Live Application'}</span>
      </a>
    `);
  }
  if (project.secondaryLive) {
    linksHtml.push(`
      <a href="${project.secondaryLive}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
        ${ICONS.external}
        <span>${project.secondaryLiveLabel || 'Visit Platform'}</span>
      </a>
    `);
  }
  if (project.github) {
    linksHtml.push(`
      <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
        ${ICONS.github}
        <span>Browse Repository</span>
      </a>
    `);
  }
  if (project.isPrivate && !project.github) {
    linksHtml.push(`
      <span class="badge badge-private" style="padding: 8px 14px; font-size: 13px;">
        ${ICONS.lock}
        <span>Proprietary / Client NDA Protected</span>
      </span>
    `);
  }

  const galleryHtml = (project.gallery && project.gallery.length)
    ? `
      <div class="modal-section">
        <h3 class="modal-section-title">Verified Visual Assets & Screenshots</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 12px;">
          ${project.gallery.map((img, i) => {
            const imgSrc = typeof img === 'object' ? img.url : img;
            const imgCaption = typeof img === 'object' ? img.caption : `${project.name} preview ${i+1}`;
            return `
              <div style="border-radius: 8px; overflow: hidden; border: 1px solid var(--border); background: var(--bg-tertiary);">
                <img src="${imgSrc}" alt="${imgCaption}" style="width: 100%; height: 200px; object-fit: cover;" loading="lazy">
                <div style="padding: 8px 12px; font-size: 12px; color: var(--text-tertiary);">${imgCaption}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `
    : '';

  // Interactive Virtual Card Simulator specifically for Bayment
  const interactiveSimHtml = (projectId === 'bayment') ? `
    <section class="modal-section">
      <h3 class="modal-section-title">9. Interactive Virtual Card &amp; P2P Simulator</h3>
      <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 12px;">Test real-time card security state management, tokenized data masking, and instant P2P ledger transfers.</p>
      <div class="bayment-container">
        <div class="bayment-grid">
          <div class="sim-panel">
            <div class="v-card" id="simCard">
              <div class="v-card-top">
                <span>BAYMENT VIRTUAL</span>
                <span class="card-network">Mastercard</span>
              </div>
              <div class="chip-icon"></div>
              <div class="card-number" id="simCardNumber">•••• •••• •••• 4291</div>
              <div class="card-details">
                <div class="detail-group"><span class="label">EXP</span><span class="val">11/29</span></div>
                <div class="detail-group"><span class="label">CVV</span><span class="val" id="simCardCvv">•••</span></div>
                <div class="detail-group"><span class="label">HOLDER</span><span class="val">YIHEYIS T.</span></div>
              </div>
              <div class="frozen-overlay">🔒 CARD FROZEN</div>
            </div>
            <div class="controls-list">
              <div class="ctrl-row">
                <span>Card Security Freeze</span>
                <label class="switch">
                  <input type="checkbox" id="simFreezeToggle">
                  <span class="slider-toggle"></span>
                </label>
              </div>
              <div class="ctrl-row">
                <span>Reveal Card Data (PAN / CVV)</span>
                <label class="switch">
                  <input type="checkbox" id="simMaskToggle">
                  <span class="slider-toggle"></span>
                </label>
              </div>
            </div>
          </div>
          <div class="sim-panel">
            <div class="balance-badge">
              <div class="bal-title">Active P2P Wallet Balance</div>
              <div class="bal-value" id="simUserBalance">$4,850.00</div>
            </div>
            <div class="p2p-form">
              <div class="input-field inline">
                <input type="number" id="simAmountInput" placeholder="Amount ($)" value="75" min="1" max="1000">
                <button type="button" class="btn-transfer" id="simSendBtn">Transfer ↗</button>
              </div>
              <div id="simStatusMsg" class="status-msg"></div>
            </div>
            <div class="tx-list" id="simTxList">
              <div class="tx-item"><div class="tx-info"><strong>Virtual Card Authorized</strong><small>AWS Cloud · 10m ago</small></div><span class="tx-amount neg">-$42.50</span></div>
              <div class="tx-item"><div class="tx-info"><strong>Wallet Funding Received</strong><small>Bank Gateway · 2h ago</small></div><span class="tx-amount pos">+$1,200.00</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ` : '';

  body.innerHTML = `
    <header class="modal-header">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
        <div class="project-badges" style="position: static; margin-bottom: 0;">
          <span class="badge badge-featured">${project.category.toUpperCase()}</span>
          ${project.isPrivate ? `<span class="badge badge-private">${ICONS.lock} Private Project</span>` : `<span class="badge" style="background: rgba(180, 244, 97, 0.15); color: var(--accent);">Open Source</span>`}
        </div>
        <a href="project-detail.html?id=${project.id}" class="btn btn-sm btn-outline" style="border-color: var(--accent); color: var(--accent); font-size: 12px; padding: 4px 10px;">
          Full-Page Case Study ↗
        </a>
      </div>
      <h2 class="modal-title">${project.name}</h2>
      <p style="font-family: var(--font-mono); font-size: 14px; color: var(--accent); margin-bottom: 8px;">${project.subtitle}</p>
      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
        ${project.tech.map(t => `<span class="skill-item">${t}</span>`).join('')}
      </div>
    </header>

    <div class="modal-body-inner" style="padding-top: 16px;">
      <!-- 1. Overview -->
      <section class="modal-section">
        <h3 class="modal-section-title">1. Project Overview</h3>
        <p style="line-height: 1.65; color: var(--text-secondary);">${overviewText}</p>
      </section>

      <!-- 2. Problem & Goals -->
      <section class="modal-section">
        <h3 class="modal-section-title">2. Problem &amp; Core Goals</h3>
        <p style="line-height: 1.65; color: var(--text-secondary);">${problemText}</p>
      </section>

      <!-- 3. Role & Responsibilities -->
      <section class="modal-section">
        <h3 class="modal-section-title">3. My Role &amp; Engineering Responsibilities</h3>
        <p style="line-height: 1.65; color: var(--text-secondary);">${roleText}</p>
      </section>

      <!-- 4. Solution & Architecture -->
      <section class="modal-section">
        <h3 class="modal-section-title">4. Solution &amp; System Architecture</h3>
        <p style="line-height: 1.65; color: var(--text-secondary);">${archText}</p>
        ${engineering.systemDiagram ? `
          <div style="margin-top: 14px; background: #080c14; border: 1px solid var(--border); border-radius: 6px; padding: 14px; overflow-x: auto; font-family: var(--font-mono); font-size: 12px; color: #b8c9e0;">
            <pre style="margin: 0;"><code>${engineering.systemDiagram}</code></pre>
          </div>
        ` : ''}
      </section>

      <!-- 5. Technical Decisions -->
      <section class="modal-section">
        <h3 class="modal-section-title">5. Key Technical Decisions</h3>
        <ul style="padding-left: 0; list-style: none;">
          ${decisionsHtml}
        </ul>
      </section>

      <!-- 6. Technologies & Integrations -->
      <section class="modal-section">
        <h3 class="modal-section-title">6. Technologies &amp; Integrations</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${project.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
        </div>
      </section>

      <!-- 7. Engineering Challenges -->
      <section class="modal-section">
        <h3 class="modal-section-title">7. Engineering Challenges &amp; Resolution</h3>
        <p style="line-height: 1.65; color: var(--text-secondary);">${challengesText}</p>
      </section>

      <!-- 8. Verified Results -->
      <section class="modal-section">
        <h3 class="modal-section-title">8. Verified Results &amp; Outcomes</h3>
        <p style="line-height: 1.65; color: var(--accent); font-weight: 500;">✓ ${outcomesText}</p>
      </section>

      <!-- 9. Interactive Showcase / Assets -->
      ${interactiveSimHtml}
      ${galleryHtml}

      <!-- 10. Links & Actions -->
      <footer class="modal-actions" style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between; margin-top: 32px; padding-top: 20px; border-top: 1px solid var(--border);">
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          ${linksHtml.join('')}
        </div>
        <!-- 11. Return to Projects Navigation -->
        <button type="button" class="btn btn-sm btn-ghost" onclick="window.closeCaseStudy()" style="border: 1px solid var(--border);">
          ← Return to Projects
        </button>
      </footer>
    </div>
  `;

  // Attach Bayment Interactive Simulator event listeners if applicable
  if (projectId === 'bayment') {
    let simState = { balance: 4850.00, frozen: false, masked: true, cardPAN: '5412 7599 3821 4291', cvv: '839' };
    const simCard = body.querySelector('#simCard');
    const simFreeze = body.querySelector('#simFreezeToggle');
    const simMask = body.querySelector('#simMaskToggle');
    const simPAN = body.querySelector('#simCardNumber');
    const simCVV = body.querySelector('#simCardCvv');
    const simBal = body.querySelector('#simUserBalance');
    const simSend = body.querySelector('#simSendBtn');
    const simAmt = body.querySelector('#simAmountInput');
    const simStatus = body.querySelector('#simStatusMsg');
    const simTx = body.querySelector('#simTxList');

    if (simFreeze && simCard) {
      simFreeze.addEventListener('change', () => {
        simState.frozen = simFreeze.checked;
        simCard.classList.toggle('frozen', simState.frozen);
      });
    }

    if (simMask && simPAN && simCVV) {
      simMask.addEventListener('change', () => {
        simState.masked = !simMask.checked;
        if (!simState.masked) {
          simPAN.textContent = simState.cardPAN;
          simCVV.textContent = simState.cvv;
        } else {
          simPAN.textContent = '•••• •••• •••• 4291';
          simCVV.textContent = '•••';
        }
      });
    }

    if (simSend && simAmt && simBal && simTx) {
      simSend.addEventListener('click', () => {
        if (simState.frozen) {
          if (simStatus) simStatus.innerHTML = '<span class="status-msg error">Transaction Blocked: Card is currently frozen!</span>';
          return;
        }
        const val = parseFloat(simAmt.value);
        if (isNaN(val) || val <= 0) {
          if (simStatus) simStatus.innerHTML = '<span class="status-msg error">Please enter a valid transfer amount.</span>';
          return;
        }
        if (val > simState.balance) {
          if (simStatus) simStatus.innerHTML = '<span class="status-msg error">Insufficient funds in P2P ledger wallet.</span>';
          return;
        }
        simState.balance -= val;
        simBal.textContent = `$${simState.balance.toFixed(2)}`;
        if (simStatus) simStatus.innerHTML = `<span class="status-msg success">✓ Settled $${val.toFixed(2)} transfer via double-entry ledger.</span>`;
        
        const newTx = document.createElement('div');
        newTx.className = 'tx-item';
        newTx.innerHTML = `
          <div class="tx-info"><strong>P2P Transfer Settled</strong><small>Just now · Ledger ID #${Math.floor(Math.random()*90000+10000)}</small></div>
          <span class="tx-amount neg">-$${val.toFixed(2)}</span>
        `;
        simTx.insertBefore(newTx, simTx.firstChild);
      });
    }
  }

  modal.classList.add('is-active');
  modal.removeAttribute('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const closeBtn = modal.querySelector('#modal-close');
  if (closeBtn) closeBtn.focus();
}

function closeCaseStudy() {
  if (!modalOverlayEl) return;
  modalOverlayEl.classList.remove('is-active');
  modalOverlayEl.setAttribute('aria-hidden', 'true');
  modalOverlayEl.setAttribute('hidden', '');
  document.body.style.overflow = '';
}
window.closeCaseStudy = closeCaseStudy;

/* ==========================================================================
   Project Grid Rendering & Category Filtering
   ========================================================================== */
/* ==========================================================================
   Project Grid Rendering & Category Filtering (Featured + Archived)
   ========================================================================== */
function initProjects() {
  const secondaryContainer = document.getElementById('secondary-projects');
  const archiveContainer = document.getElementById('archive-grid');
  const toggleArchiveBtn = document.getElementById('toggle-archive-btn');
  const archiveSection = document.getElementById('engineering-archive');
  const filterBtnsContainer = document.getElementById('filter-btns');

  // 1. Setup Filters (All, Mobile, Backend, AI)
  const filters = [
    { id: 'all', label: 'All Systems' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'backend', label: 'Backend' },
    { id: 'ai', label: 'AI & RAG' },
  ];

  if (filterBtnsContainer) {
    filterBtnsContainer.innerHTML = filters.map((f, i) => `
      <button type="button" class="filter-btn ${i === 0 ? 'active' : ''}" data-filter="${f.id}" aria-pressed="${i === 0 ? 'true' : 'false'}">
        ${f.label}
      </button>
    `).join('');
  }

  // 2. Render Secondary Featured Projects (Excluding Bayment & Mehaleq which are Flagship Spotlights)
  if (secondaryContainer) {
    const secondaryProjects = PROJECTS.filter(p => p.id !== 'bayment' && p.id !== 'mehaleq');

    secondaryContainer.innerHTML = secondaryProjects.map((p) => {
      const badges = [];
      if (p.featured) badges.push(`<span class="tag-pill" style="color: var(--accent); border-color: rgba(163, 230, 53, 0.3);">${ICONS.star} Featured</span>`);
      if (p.isPrivate) badges.push(`<span class="tag-pill" style="color: #fbbf24; border-color: rgba(251, 191, 36, 0.3);">${ICONS.lock} Client / Proprietary</span>`);
      else badges.push(`<span class="tag-pill" style="color: #38bdf8; border-color: rgba(56, 189, 248, 0.3);">${ICONS.code} Public</span>`);

      let visualMarkup = '';
      if (p.image) {
        visualMarkup = `
          <div class="card-img-frame">
            <img src="${p.image}" alt="${p.name} screenshot" class="card-visual-img" loading="lazy">
          </div>
        `;
      } else {
        // High-tech stylized architecture card for MenuMate / Go systems
        visualMarkup = `
          <div class="card-code-frame">
            <div class="code-header">
              <span class="code-dot red"></span>
              <span class="code-dot yellow"></span>
              <span class="code-dot green"></span>
              <span class="code-filename">${p.id}.go — clean_arch</span>
            </div>
            <pre class="code-snippet"><code><span class="c-kw">type</span> MenuService <span class="c-kw">struct</span> {
    repo  repository.MenuRepository
    ocr   ocr.VisionExtractor
}
<span class="c-kw">func</span> (s *MenuService) <span class="c-fn">Digitize</span>(
    ctx Context,
) (*Menu, error)</code></pre>
            <div class="code-meta-pill">65+ Shipped Production APIs</div>
          </div>
        `;
      }

      const githubBtn = p.github ? `
        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline card-link-btn" onclick="event.stopPropagation()" aria-label="View source code on GitHub">
          ${ICONS.github}
          <span>Code</span>
        </a>
      ` : '';

      const liveBtn = p.live ? `
        <a href="${p.live}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline card-link-btn" onclick="event.stopPropagation()" aria-label="Visit live app">
          ${ICONS.external}
          <span>${p.liveShortLabel || 'Live'}</span>
        </a>
      ` : '';

      const secondaryLiveBtn = p.secondaryLive ? `
        <a href="${p.secondaryLive}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline card-link-btn" onclick="event.stopPropagation()" aria-label="Visit secondary live app">
          ${ICONS.external}
          <span>${p.secondaryLiveShortLabel || 'Tapela'}</span>
        </a>
      ` : '';

      const externalLinksHtml = (githubBtn || liveBtn || secondaryLiveBtn) ? `
        <div class="card-links-row">
          ${githubBtn}
          ${liveBtn}
          ${secondaryLiveBtn}
        </div>
      ` : '';

      return `
        <article class="project-card" data-category="${p.category}" data-id="${p.id}" data-reveal tabindex="0" role="button" aria-haspopup="dialog" aria-label="Open case study for ${p.name}">
          <div class="card-visual-header">
            ${visualMarkup}
            <div class="card-badges-overlay">
              ${badges.join('')}
            </div>
          </div>
          <div class="card-body">
            <span class="project-meta">${p.category.toUpperCase()} · ${p.tech[0]}</span>
            <h3 class="card-title">${p.name}</h3>
            <div class="card-subtitle">${p.subtitle}</div>
            <p class="card-desc">${p.shortDesc}</p>
            <div class="spotlight-tags" style="margin-bottom: 20px;">
              ${p.tech.map(t => `<span class="tag-pill">${t}</span>`).join('')}
            </div>
            <div class="card-footer">
              <a href="project-detail.html?id=${p.id}" class="btn btn-sm btn-primary card-cta-btn">
                Explore Case Study →
              </a>
              ${externalLinksHtml}
            </div>
          </div>
        </article>
      `;
    }).join('');

    observeDynamicElements(secondaryContainer.querySelectorAll('[data-reveal]'));

    // Bind secondary card clicks
    secondaryContainer.querySelectorAll('.project-card').forEach(card => {
      const pid = card.getAttribute('data-id');
      card.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        window.location.href = `project-detail.html?id=${pid}`;
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.target.closest('a') || e.target.closest('button')) return;
          e.preventDefault();
          window.location.href = `project-detail.html?id=${pid}`;
        }
      });
    });
  }

  // 3. Render Engineering Archive Grid
  if (archiveContainer && typeof ARCHIVED_PROJECTS !== 'undefined') {
    archiveContainer.innerHTML = ARCHIVED_PROJECTS.map(p => {
      let visualMarkup = '';
      if (p.image) {
        visualMarkup = `<div class="archive-img-thumb"><img src="${p.image}" alt="${p.name} preview" loading="lazy"></div>`;
      } else {
        visualMarkup = `<div class="archive-icon-thumb">⚙️</div>`;
      }

      const githubBtn = p.github ? `
        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="archive-ext-btn" onclick="event.stopPropagation()" aria-label="GitHub Repository">
          ${ICONS.github}
          <span>Code</span>
        </a>
      ` : '';

      const liveBtn = p.live ? `
        <a href="${p.live}" target="_blank" rel="noopener noreferrer" class="archive-ext-btn" onclick="event.stopPropagation()" aria-label="Live Platform">
          ${ICONS.external}
          <span>Live</span>
        </a>
      ` : '';

      return `
        <div class="archive-card" data-category="${p.category}" data-id="${p.id}" tabindex="0" role="button" onclick="window.location.href='project-detail.html?id=${p.id}'">
          <div class="archive-main">
            ${visualMarkup}
            <div class="archive-text">
              <div class="archive-title-row">
                <h4 class="archive-title">${p.name}</h4>
                <span class="archive-cat">${p.category.toUpperCase()}</span>
              </div>
              <p class="archive-desc">${p.shortDesc}</p>
              <div class="archive-tech-row">
                ${p.tech.slice(0, 4).map(t => `<span class="tech-tag-sm">${t}</span>`).join('')}
              </div>
            </div>
          </div>
          <div class="archive-actions" onclick="event.stopPropagation()">
            <a href="project-detail.html?id=${p.id}" class="btn btn-sm btn-outline archive-cta-btn">
              Explore Case Study →
            </a>
            ${(githubBtn || liveBtn) ? `
              <div class="archive-ext-links">
                ${githubBtn}
                ${liveBtn}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  // 4. Archive Section Toggle
  if (toggleArchiveBtn && archiveSection) {
    toggleArchiveBtn.addEventListener('click', () => {
      const isExpanded = archiveSection.classList.toggle('is-expanded');
      toggleArchiveBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      toggleArchiveBtn.innerHTML = isExpanded 
        ? 'Hide Engineering Archive ↑' 
        : 'Browse Engineering Archive (7 Systems) ↓';
    });
  }

  // 5. Filter Button Interactions across spotlights, secondary cards, and archive cards
  if (filterBtnsContainer) {
    const buttons = filterBtnsContainer.querySelectorAll('.filter-btn');
    const baymentSpotlight = document.querySelector('.spotlight-card[data-id="bayment"]');
    const mehaleqSpotlight = document.querySelector('.mehaleq-card[data-id="mehaleq"]');
    const secondaryCards = secondaryContainer ? secondaryContainer.querySelectorAll('.project-card') : [];
    const archiveCards = archiveContainer ? archiveContainer.querySelectorAll('.archive-card') : [];

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = btn.getAttribute('data-filter');
        buttons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        // Filter Bayment Spotlight
        if (baymentSpotlight) {
          const showBayment = (selected === 'all' || selected === 'mobile' || selected === 'backend');
          baymentSpotlight.classList.toggle('filter-hidden', !showBayment);
        }

        // Filter Mehaleq Spotlight
        if (mehaleqSpotlight) {
          const showMehaleq = (selected === 'all' || selected === 'ai');
          mehaleqSpotlight.classList.toggle('filter-hidden', !showMehaleq);
        }

        // Filter Secondary Cards
        secondaryCards.forEach(card => {
          const cat = card.getAttribute('data-category');
          const pid = card.getAttribute('data-id');
          let show = false;
          if (selected === 'all') {
            show = true;
          } else if (selected === 'mobile') {
            show = (cat === 'mobile' || pid === 'fitawrari' || pid === 'guadaye');
          } else if (selected === 'backend') {
            show = (cat === 'backend' || pid === 'taxi-fare' || pid === 'menumate' || pid === 'fitawrari' || pid === 'seri-lms' || pid === 'social-gebeya' || pid === 'deshet-stream');
          } else if (selected === 'ai') {
            show = (cat === 'ai');
          }
          card.classList.toggle('filter-hidden', !show);
        });

        // Filter Archive Cards
        archiveCards.forEach(card => {
          const cat = card.getAttribute('data-category');
          let show = false;
          if (selected === 'all') {
            show = true;
          } else if (selected === 'mobile') {
            show = (cat === 'mobile');
          } else if (selected === 'backend') {
            show = (cat === 'backend');
          } else if (selected === 'ai') {
            show = (cat === 'ai');
          }
          card.classList.toggle('filter-hidden', !show);
        });
      });
    });
  }
}


/* ==========================================================================
   Verified Certificate Lightbox Modal (GDSC & Academic Honors)
   ========================================================================== */
function openCertificate() {
  let certModal = document.getElementById('cert-modal');
  if (!certModal) {
    certModal = document.createElement('div');
    certModal.id = 'cert-modal';
    certModal.className = 'modal-overlay cert-overlay';
    certModal.setAttribute('role', 'dialog');
    certModal.setAttribute('aria-modal', 'true');
    certModal.setAttribute('aria-label', 'Google Developer Student Clubs Certificate of Participation');
    certModal.innerHTML = `
      <div class="modal-container cert-container" role="document">
        <button type="button" class="modal-close-btn" onclick="window.closeCertificate()" aria-label="Close certificate">
          ${ICONS.close}
        </button>
        <div class="cert-modal-body">
          <div class="cert-header">
            <span class="tag-pill" style="color: var(--accent); border-color: rgba(163, 230, 53, 0.3);">
              ${ICONS.star} Verified Credential
            </span>
            <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: #fff; margin: 8px 0 4px;">
              Google Developer Student Clubs — Hackathon Participation
            </h3>
            <p style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 16px;">
              Awarded to <strong style="color: #fff;">Yiheyis Tamir</strong> · Addis Ababa Science and Technology University (AASTU)
            </p>
          </div>
          <div class="cert-img-wrapper" style="border-radius: 12px; overflow: hidden; border: 1px solid var(--border-hover); background: #000; box-shadow: 0 10px 40px rgba(0,0,0,0.6);">
            <img src="/images/certificate-1.png" alt="Google Developer Student Clubs Certificate of Participation for Yiheyis Tamir" style="width: 100%; height: auto; display: block;" loading="lazy">
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; flex-wrap: wrap; gap: 10px;">
            <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-tertiary);">Issued by GDSC Lead Lydia A Firew · Date: 1/06/2024</span>
            <button type="button" class="btn btn-sm btn-ghost" onclick="window.closeCertificate()" style="border: 1px solid var(--border);">
              Close Viewer ✕
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(certModal);

    certModal.onclick = (e) => {
      if (e.target === certModal) closeCertificate();
    };
  }

  certModal.classList.add('is-active');
  certModal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCertificate() {
  const certModal = document.getElementById('cert-modal');
  if (certModal) {
    certModal.classList.remove('is-active');
    certModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }
}

window.openCertificate = openCertificate;
window.closeCertificate = closeCertificate;


/* ==========================================================================
   Hero Console Tabs Switcher
   ========================================================================== */
function initHeroConsoleTabs() {
  const tabs = document.querySelectorAll('.console-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const targetId = `panel-${tab.getAttribute('data-tab')}`;
      document.querySelectorAll('.console-panel').forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('active');
          panel.style.display = 'block';
        } else {
          panel.classList.remove('active');
          panel.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   Subtle 3D Card Tilt Effect
   ========================================================================== */
function initCardTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const tiltCards = document.querySelectorAll('.spotlight-card, .mehaleq-card, .project-card, .achievement-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -2.5;
      const rotateY = ((x - centerX) / centerX) * 2.5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

window.triggerCaseStudy = (projectId) => {
  window.location.href = `project-detail.html?id=${projectId}`;
};

/* ==========================================================================
   Contact Form Validation & Real Formspree Submission
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit');
  const statusEl = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameEl = form.querySelector('#name');
    const emailEl = form.querySelector('#email');
    const messageEl = form.querySelector('#message');

    const name = nameEl?.value.trim();
    const email = emailEl?.value.trim();
    const message = messageEl?.value.trim();

    if (!name) {
      if (statusEl) statusEl.innerHTML = `<span style="color: #ef4444;" role="alert">Please provide your name.</span>`;
      nameEl?.focus();
      return;
    }

    if (!email) {
      if (statusEl) statusEl.innerHTML = `<span style="color: #ef4444;" role="alert">Please provide your email address.</span>`;
      emailEl?.focus();
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (statusEl) {
        statusEl.innerHTML = `<span style="color: #ef4444;" role="alert">Please enter a valid email address (e.g. name@company.com).</span>`;
      }
      emailEl?.focus();
      return;
    }

    if (!message) {
      if (statusEl) statusEl.innerHTML = `<span style="color: #ef4444;" role="alert">Please write a brief message about your project or role.</span>`;
      messageEl?.focus();
      return;
    }

    // Set loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      const textSpan = submitBtn.querySelector('.btn-text');
      const loadSpan = submitBtn.querySelector('.btn-loading');
      const iconSvg = submitBtn.querySelector('svg');
      if (textSpan) textSpan.hidden = true;
      if (loadSpan) loadSpan.hidden = false;
      if (iconSvg) iconSvg.style.display = 'none';
    }
    if (statusEl) statusEl.innerHTML = '';

    // Telegram Bot & Notification Configuration
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8976632987:AAF8SL5vwjWu_ZUQ1t1llhIkuG8XUNz1IU8';
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || '5768676840';

    const escapeHtml = (str) => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const telegramText = 
      `📬 <b>New Portfolio Inquiry</b>\n\n` +
      `👤 <b>Name:</b> ${escapeHtml(name)}\n` +
      `📧 <b>Email:</b> <code>${escapeHtml(email)}</code>\n\n` +
      `💬 <b>Message:</b>\n${escapeHtml(message)}\n\n` +
      `📅 <i>${new Date().toLocaleString()}</i>`;

    try {
      let delivered = false;

      // 1. First attempt: Secure backend endpoint (/api/contact on Vercel/Netlify)
      try {
        const apiResponse = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });
        if (apiResponse.ok) {
          delivered = true;
        }
      } catch (apiErr) {
        // Not running on a serverless host or local static preview
      }

      // 2. Direct Telegram Bot API (if /api/contact is unavailable)
      if (!delivered && botToken && chatId) {
        try {
          const tgResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: telegramText,
              parse_mode: 'HTML',
              disable_web_page_preview: true
            })
          });

          const tgData = await tgResponse.json().catch(() => ({}));
          if (tgData.ok) {
            delivered = true;
          } else {
            console.warn('Telegram delivery notice:', tgData);
          }
        } catch (tgErr) {
          console.warn('Telegram request error:', tgErr);
        }
      }

      // 3. Fallback: Formspree endpoint
      if (!delivered) {
        const fsResponse = await fetch('https://formspree.io/f/mldednpz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ name, email, message })
        });
        if (fsResponse.ok) {
          delivered = true;
        }
      } else {
        // Mirror to Formspree in background for email inbox archive
        fetch('https://formspree.io/f/mldednpz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ name, email, message })
        }).catch(() => {});
      }

      if (delivered) {
        if (statusEl) {
          statusEl.innerHTML = `<span style="color: var(--accent); font-weight: 500;">✓ Message delivered successfully. I will get back to you shortly!</span>`;
        }
        form.reset();
      } else {
        if (statusEl) {
          statusEl.innerHTML = `<span style="color: #ef4444;">✗ Unable to deliver message. Please reach out directly via <a href="mailto:yiheyisyt23@gmail.com" style="color:var(--accent);">yiheyisyt23@gmail.com</a> or Telegram <a href="https://t.me/Abetobr" target="_blank" rel="noopener noreferrer" style="color:var(--accent);">@Abetobr</a></span>`;
        }
      }
    } catch {
      if (statusEl) {
        statusEl.innerHTML = `<span style="color: #ef4444;">✗ Network error. Please email me directly at <a href="mailto:yiheyisyt23@gmail.com" style="color:var(--accent);">yiheyisyt23@gmail.com</a></span>`;
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        const textSpan = submitBtn.querySelector('.btn-text');
        const loadSpan = submitBtn.querySelector('.btn-loading');
        const iconSvg = submitBtn.querySelector('svg');
        if (textSpan) textSpan.hidden = false;
        if (loadSpan) loadSpan.hidden = true;
        if (iconSvg) iconSvg.style.display = '';
      }
    }
  });
}

/* ==========================================================================
   Footer Current Year
   ========================================================================== */
function initFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   Interactive Screenshot View Switchers
   ========================================================================== */
window.switchPhoneScreen = function(btn, imgId, newSrc) {
  const img = document.getElementById(imgId);
  if (img) img.src = newSrc;
  const parent = btn.parentElement;
  if (parent) {
    parent.querySelectorAll('.phone-tab-btn').forEach(b => {
      b.classList.remove('active', 'btn-primary');
      b.classList.add('btn-outline');
    });
  }
  btn.classList.add('active', 'btn-primary');
  btn.classList.remove('btn-outline');
};

window.switchScreen = function(btn, imgId, newSrc) {
  const img = document.getElementById(imgId);
  if (img) img.src = newSrc;
  const parent = btn.parentElement;
  if (parent) {
    parent.querySelectorAll('.mehaleq-tab-btn').forEach(b => {
      b.classList.remove('active', 'btn-primary');
      b.classList.add('btn-outline');
    });
  }
  btn.classList.add('active', 'btn-primary');
  btn.classList.remove('btn-outline');
};

/* ==========================================================================
   Theme Switcher (Dark / Light)
   ========================================================================== */
export function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');

  const getPreferredTheme = () => {
    try {
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch (e) {}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch (e) {}

    if (toggleBtn) {
      const isLight = theme === 'light';
      toggleBtn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
      toggleBtn.setAttribute('title', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    }
  };

  const initialTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
  applyTheme(initialTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // Listen for system theme preference changes if user hasn't explicitly set preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      try {
        if (!localStorage.getItem('portfolio-theme')) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      } catch (err) {}
    });
  }
}

/* ==========================================================================
   Ambient Cursor Glow & Card Spotlight Follower
   ========================================================================== */
function initCursorGlow() {
  // Only enable on desktop/mouse devices and when reduced motion is not requested
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const glowEl = document.getElementById('cursor-glow');
  if (!glowEl) return;

  let mouseX = -1000;
  let mouseY = -1000;
  let currentX = -1000;
  let currentY = -1000;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isVisible) {
      isVisible = true;
      glowEl.style.opacity = '1';
      if (currentX === -1000) {
        currentX = mouseX;
        currentY = mouseY;
      }
    }
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    isVisible = false;
    glowEl.style.opacity = '0';
  });

  window.addEventListener('mouseenter', () => {
    isVisible = true;
    glowEl.style.opacity = '1';
  });

  // Smooth lerp loop with requestAnimationFrame
  function updatePosition() {
    if (isVisible) {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      glowEl.style.transform = `translate3d(${currentX - 325}px, ${currentY - 325}px, 0)`;
    }
    requestAnimationFrame(updatePosition);
  }
  requestAnimationFrame(updatePosition);

  // Card interactive spotlight: update local coordinates on hover
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest(
      '.spotlight-card, .mehaleq-card, .project-card, .archive-card, .skill-card, .achievement-card, .timeline-card, .contact-info-card, .contact-form-card, .metric-card'
    );
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, { passive: true });
}

/* ==========================================================================
   DOM Ready Orchestration
   ========================================================================== */
function onReady() {
  initThemeToggle();
  initHeaderAndNavigation();
  initScrollProgress();
  initCursorGlow();
  initBackToTop();
  initTypingEffect();
  initCounters();
  initScrollReveal();
  initHeroConsoleTabs();
  initCardTilt();
  initProjects();
  initContactForm();
  initFooterYear();
  ensureModal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onReady);
} else {
  onReady();
}
