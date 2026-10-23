import '../css/styles.css';
import { PROJECTS_DATA, getProjectById } from './projects-data.js';

/**
 * Yiheyis Tamir Ayalew — Standalone Engineering Case Study Page Renderer
 * Renders complete, deep-dive 7-point case studies for both featured and secondary projects.
 * Supports deep linking, dynamic OpenGraph/SEO metadata, image lightbox, and cross-project navigation.
 */

// SVG Icons
const ICONS = {
  arrowLeft: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  arrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  external: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  github: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  lock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  copy: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  zoom: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`
};

document.addEventListener('DOMContentLoaded', () => {
  initCaseStudyPage();
});

function initCaseStudyPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const requestedId = urlParams.get('id');

  // Default to Bayment if no id specified or if project doesn't exist
  let project = requestedId ? getProjectById(requestedId) : null;
  if (!project) {
    project = PROJECTS_DATA[0]; // Bayment
  }

  // Update Page Title and SEO Meta Tags dynamically
  updatePageMetadata(project);

  // Render the case study content
  renderCaseStudy(project);

  // Initialize Theme Switcher
  initThemeToggle();

  // Initialize Ambient Cursor Glow
  initCursorGlow();

  // Initialize Scroll Progress bar
  initScrollProgress();

  // Initialize Lightbox Modal
  initLightbox();

  // Initialize Navigation Header scroll shadow
  initHeaderScroll();
}

function updatePageMetadata(project) {
  const pageTitle = `${project.name} — Engineering Case Study | Yiheyis Tamir Ayalew`;
  document.title = pageTitle;

  const desc = `${project.subtitle}. Technical case study covering architecture, personal engineering contributions, technical challenges, and verified outcomes.`;

  setMetaTag('description', desc);
  setMetaTag('og:title', pageTitle, true);
  setMetaTag('og:description', desc, true);
  setMetaTag('og:url', window.location.href, true);
  if (project.image) {
    setMetaTag('og:image', window.location.origin + project.image, true);
  }
  setMetaTag('twitter:title', pageTitle);
  setMetaTag('twitter:description', desc);
}

function setMetaTag(name, content, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let meta = document.querySelector(`meta[${attr}="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attr, name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) : 0;
    progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
  }, { passive: true });
}

function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let isNavHidden = false;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (currentScrollY < 0) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (currentScrollY > maxScroll) return;

    if (currentScrollY <= 50) {
      if (isNavHidden) {
        isNavHidden = false;
        header.classList.remove('nav-hidden');
      }
      lastScrollY = currentScrollY;
      return;
    }

    const scrollDelta = currentScrollY - lastScrollY;
    if (Math.abs(scrollDelta) < 8) return;

    if (scrollDelta > 0 && currentScrollY > 80) {
      if (!isNavHidden) {
        isNavHidden = true;
        header.classList.add('nav-hidden');
      }
    } else if (scrollDelta < 0) {
      if (isNavHidden) {
        isNavHidden = false;
        header.classList.remove('nav-hidden');
      }
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
}

function renderCaseStudy(project) {
  const container = document.getElementById('case-study-root');
  if (!container) return;

  const cs = project.caseStudy || {};
  const overview = cs.overview || {};
  const contribution = cs.contribution || {};
  const engineering = cs.engineering || {};
  const challenges = cs.challenges || {};
  const outcome = cs.outcome || {};
  const visualEvidence = cs.visualEvidence || [];
  const nextSteps = cs.nextSteps || {};

  // Find previous and next projects
  const currentIndex = PROJECTS_DATA.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? PROJECTS_DATA[currentIndex - 1] : PROJECTS_DATA[PROJECTS_DATA.length - 1];
  const nextProject = currentIndex < PROJECTS_DATA.length - 1 ? PROJECTS_DATA[currentIndex + 1] : PROJECTS_DATA[0];

  // Action links
  const actionButtons = [];
  if (project.live) {
    actionButtons.push(`
      <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
        ${ICONS.external}
        <span>${project.liveLabel || 'Visit Live Application'}</span>
      </a>
    `);
  }
  if (project.secondaryLive) {
    actionButtons.push(`
      <a href="${project.secondaryLive}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
        ${ICONS.external}
        <span>${project.secondaryLiveLabel || 'Visit Platform'}</span>
      </a>
    `);
  }
  if (project.github) {
    actionButtons.push(`
      <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
        ${ICONS.github}
        <span>Browse GitHub Repository</span>
      </a>
    `);
  }
  if (project.isPrivate && !project.github) {
    actionButtons.push(`
      <span class="badge badge-private" style="padding: 8px 16px; font-size: 13px;">
        ${ICONS.lock}
        <span>Proprietary / Client NDA Protected</span>
      </span>
    `);
  }

  // Key Technical Decisions
  const decisionsHtml = (engineering.decisions || []).map(d => `
    <article class="cs-decision-card">
      <h4 class="cs-decision-title">${d.decision}</h4>
      <p class="cs-decision-rationale"><strong>Rationale:</strong> ${d.rationale}</p>
      <div class="cs-decision-tradeoff"><strong>Trade-off:</strong> ${d.tradeOff}</div>
    </article>
  `).join('');

  // API and Data specifications
  const apiData = engineering.apiAndData || {};
  const apiCardsHtml = [
    { title: 'APIs & Protocols', val: apiData.apis },
    { title: 'Database & Schemas', val: apiData.database },
    { title: 'Auth & Security', val: apiData.authentication },
    { title: 'Integrations & Rails', val: apiData.integrations },
    { title: 'Deployment & CI/CD', val: apiData.deployment }
  ].filter(item => item.val).map(item => `
    <div class="cs-api-card">
      <div class="cs-api-title">${item.title}</div>
      <div class="cs-api-val">${item.val}</div>
    </div>
  `).join('');

  // Personal scope bullets
  const personalScopeHtml = (contribution.personalScope || []).map(b => `
    <li class="cs-bullet-item">${b}</li>
  `).join('');

  // Verified outcomes bullets
  const outcomesHtml = (outcome.verifiedCapabilities || []).map(o => `
    <li class="cs-outcome-item">
      ${ICONS.check}
      <span>${o}</span>
    </li>
  `).join('');

  // Visual Evidence Gallery
  const galleryItems = (project.gallery && project.gallery.length)
    ? project.gallery
    : visualEvidence.map(v => ({ url: v.image, caption: v.caption }));

  const validGallery = galleryItems.filter(item => item && item.url);

  const galleryHtml = validGallery.length > 0 ? `
    <div class="cs-gallery-grid">
      ${validGallery.map((item, idx) => `
        <article class="cs-gallery-card">
          <div class="cs-gallery-img-wrap" data-lightbox-src="${item.url}" data-lightbox-caption="${escapeHtml(item.caption || project.name)}">
            <img src="${item.url}" alt="${project.name} evidence ${idx + 1}" loading="lazy">
            <div class="cs-gallery-zoom-hint">${ICONS.zoom} Click to Zoom</div>
          </div>
          <div class="cs-gallery-caption">${item.caption || `${project.name} verified UI screenshot ${idx + 1}`}</div>
        </article>
      `).join('')}
    </div>
  ` : `
    <div style="background: var(--bg-surface); border: 1px dashed var(--border); border-radius: var(--radius-md); padding: 24px; text-align: center; color: var(--text-tertiary); font-size: 14px; margin: 20px 0;">
      Proprietary backend system. Visual evidence is captured via sanitized architecture diagrams and verified public repositories.
    </div>
  `;

  // Bayment Interactive Simulator
  const interactiveSimHtml = (project.id === 'bayment') ? `
    <div class="cs-subheading" style="margin-top: 36px;">Interactive Simulation: Card Lifecycle &amp; P2P Ledger</div>
    <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 16px;">Test real-time card security state management, tokenized data masking, and instant P2P ledger transfers.</p>
    <div class="bayment-container" style="margin-bottom: 24px;">
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
  ` : '';

  // Quick Switcher dropdown options
  const switcherOptions = PROJECTS_DATA.map(p => `
    <option value="${p.id}" ${p.id === project.id ? 'selected' : ''}>${p.featured ? '★ ' : ''}${p.name} (${p.category.toUpperCase()})</option>
  `).join('');

  // Other Case Studies grid
  const otherProjects = PROJECTS_DATA.filter(p => p.id !== project.id);
  const otherGridHtml = otherProjects.map(p => `
    <a href="project-detail.html?id=${p.id}" class="cs-more-card">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span class="cs-category-badge" style="font-size: 10px; padding: 2px 8px;">${p.category.toUpperCase()}</span>
        ${p.isPrivate ? `<span style="font-size: 11px; color: var(--text-tertiary);">${ICONS.lock}</span>` : ''}
      </div>
      <div class="cs-more-title">${p.name}</div>
      <div class="cs-more-sub">${p.subtitle}</div>
    </a>
  `).join('');

  container.innerHTML = `
    <!-- Top Breadcrumb & Quick Switcher -->
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
      <nav class="cs-breadcrumb" aria-label="Breadcrumb">
        <a href="index.html">Home</a>
        <span class="separator">/</span>
        <a href="index.html#work">Work</a>
        <span class="separator">/</span>
        <span class="current">${project.name}</span>
      </nav>

      <div class="cs-selector-dropdown">
        <label for="project-switcher" class="sr-only">Switch Case Study</label>
        <select id="project-switcher" class="cs-selector-select" aria-label="Switch project case study">
          ${switcherOptions}
        </select>
      </div>
    </div>

    <!-- Hero Header -->
    <header class="cs-hero">
      <div class="cs-header-meta">
        <span class="cs-category-badge">${project.category.toUpperCase()}</span>
        <span class="cs-role-badge">Role: ${contribution.verifiableRole || 'Software Engineer'}</span>
        ${project.isPrivate ? `<span class="badge badge-private">${ICONS.lock} Private Project</span>` : `<span class="badge" style="background: rgba(180, 244, 97, 0.12); color: var(--accent);">Open Source</span>`}
      </div>

      <h1 class="cs-title">${project.name}</h1>
      <p class="cs-subtitle">${project.subtitle}</p>

      <div class="cs-tech-bar">
        ${project.tech.map(t => `<span class="skill-item">${t}</span>`).join('')}
      </div>

      <div class="cs-actions-bar">
        ${actionButtons.join('')}
      </div>
    </header>

    <!-- Executive Takeaway Box (30-second overview for recruiters) -->
    <aside class="cs-executive-box" aria-label="Executive Summary">
      <div class="cs-executive-header">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <span>Executive Technical Summary</span>
      </div>
      <div class="cs-executive-grid">
        <div class="cs-exec-item">
          <span class="cs-exec-label">Product Scope &amp; Target</span>
          <span class="cs-exec-val">${overview.targetAudience || 'Emerging market digital consumers.'}</span>
        </div>
        <div class="cs-exec-item">
          <span class="cs-exec-label">Verified Contribution</span>
          <span class="cs-exec-val">${contribution.verifiableRole || 'Full-Stack Software Engineer'}</span>
        </div>
        <div class="cs-exec-item">
          <span class="cs-exec-label">Key Engineering Milestone</span>
          <span class="cs-exec-val">${outcome.verifiedCapabilities ? outcome.verifiedCapabilities[0] : 'Shipped to production under high reliability requirements.'}</span>
        </div>
      </div>
    </aside>

    <!-- Section 1: Overview & Problem -->
    <section class="cs-section" id="overview">
      <div class="cs-section-header">
        <span class="cs-section-num">01</span>
        <h2 class="cs-section-title">Product Overview &amp; Problem Statement</h2>
      </div>
      <div class="cs-text-block">
        <p><strong>What the product does:</strong> ${overview.summary || project.shortDesc}</p>
        <p><strong>Who it serves:</strong> ${overview.targetAudience || 'Target users across the African software and digital commerce ecosystem.'}</p>
        <p><strong>Problem being addressed:</strong> ${overview.problemAddressed || 'Solving reliability, latency, and integration bottlenecks in fragmented environments.'}</p>
      </div>
    </section>

    <!-- Section 2: Personal Contribution -->
    <section class="cs-section" id="contribution">
      <div class="cs-section-header">
        <span class="cs-section-num">02</span>
        <h2 class="cs-section-title">My Contribution &amp; Verifiable Scope</h2>
      </div>
      <div class="cs-text-block">
        <p><strong>Personal Engineering Responsibilities:</strong></p>
        <ul class="cs-bullets-list">
          ${personalScopeHtml}
        </ul>
        ${contribution.teamScope ? `<p style="margin-top: 14px; font-size: 0.95rem; color: var(--text-tertiary);"><strong>Team Boundaries:</strong> ${contribution.teamScope}</p>` : ''}
      </div>
    </section>

    <!-- Section 3: Engineering & Architecture -->
    <section class="cs-section" id="engineering">
      <div class="cs-section-header">
        <span class="cs-section-num">03</span>
        <h2 class="cs-section-title">System Engineering &amp; Architecture</h2>
      </div>
      <div class="cs-text-block">
        <p>${engineering.architectureSummary || 'Engineered with clean architectural separation, robust boundary contracts, and strict data validation.'}</p>
      </div>

      ${engineering.systemDiagram ? `
        <div class="cs-diagram-frame">
          <div class="cs-diagram-header">
            <span>SYSTEM ARCHITECTURE TOPOLOGY</span>
            <button type="button" class="btn btn-ghost btn-sm" id="copy-diagram-btn" style="padding: 2px 8px; font-size: 11px;">
              ${ICONS.copy} Copy Diagram
            </button>
          </div>
          <pre class="cs-diagram-pre" id="diagram-content"><code>${escapeHtml(engineering.systemDiagram)}</code></pre>
        </div>
      ` : ''}

      <div class="cs-subheading">Technical Specifications &amp; Interfaces</div>
      <div class="cs-api-grid">
        ${apiCardsHtml}
      </div>

      <div class="cs-subheading">Key Technical Decisions &amp; Trade-Offs</div>
      <div class="cs-decisions-grid">
        ${decisionsHtml}
      </div>
    </section>

    <!-- Section 4: Challenges & Solutions -->
    <section class="cs-section" id="challenges">
      <div class="cs-section-header">
        <span class="cs-section-num">04</span>
        <h2 class="cs-section-title">Engineering Challenges &amp; Investigation</h2>
      </div>
      <div class="cs-text-block">
        <p><strong>The Core Challenge:</strong> ${challenges.challenge || 'Navigating distributed transaction consistency across asynchronous partner rails.'}</p>
        <p><strong>Investigation Methodology:</strong> ${challenges.investigation || 'Instrumented trace logs and analyzed retry patterns under simulated network degradation.'}</p>
        <p><strong>The Solution:</strong> ${challenges.solution || 'Implemented idempotent state machines with deterministic client UUIDs and database constraint guards.'}</p>
        ${challenges.tradeOffs ? `<p><strong>Architectural Trade-offs:</strong> ${challenges.tradeOffs}</p>` : ''}
        ${challenges.lessonsLearned ? `<p style="color: var(--accent); font-weight: 500;"><strong>Key Takeaway:</strong> ${challenges.lessonsLearned}</p>` : ''}
      </div>
    </section>

    <!-- Section 5: Verified Outcomes -->
    <section class="cs-section" id="outcomes">
      <div class="cs-section-header">
        <span class="cs-section-num">05</span>
        <h2 class="cs-section-title">Verified Outcomes &amp; Delivery Milestones</h2>
      </div>
      <ul class="cs-outcomes-list">
        ${outcomesHtml}
      </ul>
      <p style="margin-top: 14px; font-size: 0.85rem; color: var(--text-tertiary); font-family: var(--font-mono);">
        * ${outcome.metricsNote || 'Verified engineering deliverables; strictly avoids fabricated metrics or unverified financial figures.'}
      </p>
    </section>

    <!-- Section 6: Visual Evidence & Interactive Walkthrough -->
    <section class="cs-section" id="evidence">
      <div class="cs-section-header">
        <span class="cs-section-num">06</span>
        <h2 class="cs-section-title">Visual Evidence &amp; System Walkthrough</h2>
      </div>
      <div class="cs-text-block">
        <p>Real application screenshots and architectural interfaces captured from verified builds. Click any screenshot to inspect in full resolution.</p>
      </div>

      ${interactiveSimHtml}
      ${galleryHtml}
    </section>

    <!-- Section 7: Confidentiality & Next Steps -->
    <section class="cs-section" id="confidentiality">
      <div class="cs-section-header">
        <span class="cs-section-num">07</span>
        <h2 class="cs-section-title">Next Steps, Source Access &amp; Confidentiality</h2>
      </div>
      <div class="cs-text-block">
        <p>${nextSteps.confidentialityNotice || 'All proprietary client information and banking secrets remain confidential.'}</p>
      </div>
      <div class="cs-actions-bar" style="margin-top: 20px;">
        ${actionButtons.join('')}
      </div>
    </section>

    <!-- Project Navigation Bar (Previous / Next) -->
    <nav class="cs-nav-bar" aria-label="Adjacent Projects">
      <a href="project-detail.html?id=${prevProject.id}" class="cs-nav-card prev">
        <span class="cs-nav-label">← Previous Case Study</span>
        <span class="cs-nav-title">${prevProject.name}</span>
      </a>
      <a href="project-detail.html?id=${nextProject.id}" class="cs-nav-card next">
        <span class="cs-nav-label">Next Case Study →</span>
        <span class="cs-nav-title">${nextProject.name}</span>
      </a>
    </nav>

    <!-- More Engineering Case Studies Section -->
    <section class="cs-more-section">
      <div class="cs-more-header">
        <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: var(--text-pure); margin: 0;">Explore All 15 Engineering Case Studies</h3>
        <a href="index.html#projects" class="btn btn-ghost btn-sm" style="font-size: 13px; padding-left: 0;">View on Main Portfolio →</a>
      </div>
      <p style="color: var(--text-secondary); font-size: 0.95rem;">Review deep-dive technical breakdowns across FinTech, AI/RAG, Go microservices, and mobile platforms.</p>
      <div class="cs-more-grid">
        ${otherGridHtml}
      </div>
    </section>
  `;

  // Attach project switcher listener
  const switcher = document.getElementById('project-switcher');
  if (switcher) {
    switcher.addEventListener('change', (e) => {
      window.location.href = `project-detail.html?id=${e.target.value}`;
    });
  }

  // Attach diagram copy button
  const copyBtn = document.getElementById('copy-diagram-btn');
  const diagramContent = document.getElementById('diagram-content');
  if (copyBtn && diagramContent) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(diagramContent.textContent);
        copyBtn.innerHTML = `${ICONS.check} Copied!`;
        setTimeout(() => {
          copyBtn.innerHTML = `${ICONS.copy} Copy Diagram`;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy diagram', err);
      }
    });
  }

  // Attach Bayment Interactive Simulator event handlers
  if (project.id === 'bayment') {
    initBaymentSimulator();
  }
}

function initBaymentSimulator() {
  let simState = { balance: 4850.00, frozen: false, masked: true, cardPAN: '5412 7599 3821 4291', cvv: '839' };
  const simCard = document.getElementById('simCard');
  const simFreeze = document.getElementById('simFreezeToggle');
  const simMask = document.getElementById('simMaskToggle');
  const simPAN = document.getElementById('simCardNumber');
  const simCVV = document.getElementById('simCardCvv');
  const simBal = document.getElementById('simUserBalance');
  const simSend = document.getElementById('simSendBtn');
  const simAmt = document.getElementById('simAmountInput');
  const simStatus = document.getElementById('simStatusMsg');
  const simTx = document.getElementById('simTxList');

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

  if (simSend && simAmt && simBal && simStatus && simTx) {
    simSend.addEventListener('click', () => {
      const amt = parseFloat(simAmt.value);
      if (isNaN(amt) || amt <= 0) {
        simStatus.textContent = '⚠️ Enter a valid transfer amount ($1 - $1000)';
        simStatus.className = 'status-msg err';
        return;
      }
      if (amt > simState.balance) {
        simStatus.textContent = '❌ Insufficient wallet balance for transfer';
        simStatus.className = 'status-msg err';
        return;
      }

      simState.balance -= amt;
      simBal.textContent = `$${simState.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      simStatus.textContent = `✓ P2P Ledger Settlement Complete: -$${amt.toFixed(2)}`;
      simStatus.className = 'status-msg ok';

      const newTx = document.createElement('div');
      newTx.className = 'tx-item';
      newTx.innerHTML = `
        <div class="tx-info"><strong>P2P Wallet Transfer</strong><small>Just now · Verified</small></div>
        <span class="tx-amount neg">-$${amt.toFixed(2)}</span>
      `;
      simTx.insertBefore(newTx, simTx.firstChild);
      simAmt.value = '';

      setTimeout(() => {
        if (simStatus.className.includes('ok')) {
          simStatus.textContent = '';
        }
      }, 3500);
    });
  }
}

function initLightbox() {
  let lightbox = document.getElementById('lightbox-modal');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox-modal';
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
      <div class="lightbox-content" role="dialog" aria-modal="true">
        <button type="button" class="lightbox-close" id="lightbox-close" aria-label="Close image">&times;</button>
        <img id="lightbox-img" src="" alt="Enlarged screenshot">
        <div id="lightbox-caption" class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  const closeBtn = document.getElementById('lightbox-close');
  const imgEl = document.getElementById('lightbox-img');
  const captionEl = document.getElementById('lightbox-caption');

  const closeLightbox = () => {
    lightbox.classList.remove('is-active');
  };

  closeBtn.onclick = closeLightbox;
  lightbox.onclick = (e) => {
    if (e.target === lightbox) closeLightbox();
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
      closeLightbox();
    }
  });

  // Delegate click for zoomable images
  document.addEventListener('click', (e) => {
    const wrap = e.target.closest('[data-lightbox-src]');
    if (wrap) {
      const src = wrap.getAttribute('data-lightbox-src');
      const caption = wrap.getAttribute('data-lightbox-caption') || '';
      imgEl.src = src;
      captionEl.textContent = caption;
      lightbox.classList.add('is-active');
    }
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ==========================================================================
   Theme Switcher (Dark / Light)
   ========================================================================== */
function initThemeToggle() {
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

  function updatePosition() {
    if (isVisible) {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      glowEl.style.transform = `translate3d(${currentX - 325}px, ${currentY - 325}px, 0)`;
    }
    requestAnimationFrame(updatePosition);
  }
  requestAnimationFrame(updatePosition);

  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.cs-executive-box, .cs-card, .cs-stat-card, .btn');
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, { passive: true });
}


