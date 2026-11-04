import '../css/styles.css';

/**
 * Yiheyis Tamir Ayalew — Premium Software Engineer Portfolio
 * Architecture, interactions, dynamic project rendering, and case study modals.
 */

import { PROJECTS_DATA } from './projects-data.js';
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
   More Builds — ranked one-liner list
   ========================================================================== */
const MORE_BUILD_IDS = [
  'mehaleq', 'menumate', 'taxi-fare', 'deshet-stream', 'seri-vote',
  'guadaye', 'social-gebeya', 'disease-prediction', 'up-and-work',
  'smart-helmet'
];

function initProjects() {
  const moreBuildsContainer = document.getElementById('more-builds');
  if (!moreBuildsContainer) return;

  const items = MORE_BUILD_IDS
    .map(id => PROJECTS_DATA.find(p => p.id === id))
    .filter(Boolean);

  moreBuildsContainer.innerHTML = items.map(p => `
    <a class="more-builds-item" href="project-detail.html?id=${p.id}">
      <span class="more-builds-name">${p.name}</span>
      <span class="more-builds-line">${p.shortDesc}</span>
      <span class="more-builds-cta" aria-hidden="true">→</span>
    </a>
  `).join('');
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
  initCounters();
  initScrollReveal();
  initCardTilt();
  initProjects();
  initContactForm();
  initFooterYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onReady);
} else {
  onReady();
}
