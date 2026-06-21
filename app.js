/* ═══════════════════════════════════════════════
   AIIRS — main.js
   Lenis smooth scroll · GSAP animations · Interactive timeline
═══════════════════════════════════════════════ */

/* ── Timeline data ────────────────────────────── */
const PHASES = [
  {
    phase: 'Phase 1 — Now',
    title: 'Germany · Enterprise Core',
    desc: 'Target mid-market German enterprises in fintech, automotive, and manufacturing. Java and .NET teams with existing SRE practices and GDPR compliance requirements. We focus on companies that already generate structured incident postmortems but have no AI-powered way to search them.',
    tags: [
      { label: 'Java', primary: true },
      { label: '.NET / C#', primary: true },
      { label: 'Spring Boot', primary: false },
      { label: 'Azure', primary: false },
      { label: 'GDPR-first', primary: false },
    ],
  },
  {
    phase: 'Phase 2 — 6–12 Months',
    title: 'DACH + Nordics · Cloud-Native Expansion',
    desc: 'Expand to Austria, Switzerland, and Scandinavian markets. Include Go and Python teams — infrastructure-heavy companies with cloud-native stacks and strong DevOps culture. Introduce the federated multi-org query layer for industry consortia.',
    tags: [
      { label: 'Go', primary: true },
      { label: 'Python', primary: true },
      { label: 'Kubernetes', primary: false },
      { label: 'GCP / AWS', primary: false },
      { label: 'Federated (beta)', primary: false },
    ],
  },
  {
    phase: 'Phase 3 — 18–24 Months',
    title: 'Europe-Wide · Full Federated Scale',
    desc: 'UK, Benelux, and broader European markets. Full polyglot stack support including Kotlin, Rust, and Node.js. Cross-organisation federated incident knowledge pools — multiple companies share patterns across attested CVMs via Flower FL without any raw data exposure.',
    tags: [
      { label: 'Kotlin', primary: true },
      { label: 'Rust', primary: true },
      { label: 'Flower FL', primary: true },
      { label: 'Multi-org', primary: false },
      { label: 'ISO 27001', primary: false },
    ],
  },
];

/* ═══════════════════════════════════════════════
   LENIS SMOOTH SCROLL
═══════════════════════════════════════════════ */
const lenis = new Lenis({
  duration: 1.3,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

/* ═══════════════════════════════════════════════
   GSAP SETUP
═══════════════════════════════════════════════ */
gsap.registerPlugin(ScrollTrigger);

/* ── Hero entrance ── */
gsap.timeline({ delay: 0.15 })
  .to('.hero-tag', { opacity: 1, duration: 0.6, ease: 'power2.out' })
  .to('.hero-headline .line span', {
    y: '0%',
    duration: 0.9,
    stagger: 0.13,
    ease: 'power3.out',
  }, '-=0.25')
  .to('.hero-sub',     { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.4')
  .to('.hero-actions', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.35')
  .to('.scroll-hint',  { opacity: 1, duration: 0.6 }, '-=0.2');

/* ── Helper: scroll-triggered fade-up ── */
function fadeUp(selector, options = {}) {
  const els = typeof selector === 'string'
    ? gsap.utils.toArray(selector)
    : [selector];

  els.forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: options.duration || 0.55,
      delay: options.stagger ? i * options.stagger : (options.delay || 0),
      ease: options.ease || 'power2.out',
      scrollTrigger: {
        trigger: options.trigger || el,
        start: options.start || 'top 86%',
      },
    });
  });
}

/* ── Eyebrows ── */
fadeUp('.eyebrow', { stagger: 0 });

/* ── Problem cards ── */
fadeUp('.problem-card', { stagger: 0.1, trigger: '.problem-grid', start: 'top 85%' });

/* ── Terminal ── */
gsap.to('.terminal-window', {
  opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
  scrollTrigger: { trigger: '.terminal-window', start: 'top 80%' },
});

/* ── Solution copy ── */
gsap.to('.solution-copy h2', {
  opacity: 1, duration: 0.6, ease: 'power2.out',
  scrollTrigger: { trigger: '.solution-copy', start: 'top 80%' },
});
gsap.utils.toArray('.solution-copy p').forEach((p, i) => {
  gsap.to(p, {
    opacity: 1, duration: 0.5, delay: i * 0.12, ease: 'power2.out',
    scrollTrigger: { trigger: '.solution-copy', start: 'top 76%' },
  });
});
fadeUp('.feature-list li', { stagger: 0.08, trigger: '.feature-list', start: 'top 86%' });

/* ── Stats ── */
fadeUp('.stat-cell', { stagger: 0.1, trigger: '.stat-strip', start: 'top 82%' });

/* ── Architecture ── */
gsap.to('.arch-diagram', {
  opacity: 1, duration: 0.75, ease: 'power2.out',
  scrollTrigger: { trigger: '.arch-diagram', start: 'top 82%' },
});

/* ── Federated nodes ── */
fadeUp('.fed-node', { stagger: 0.14, trigger: '.fed-grid', start: 'top 82%' });
fadeUp('.fed-connector', { trigger: '.fed-connector', start: 'top 85%' });

/* ── Security pillars ── */
fadeUp('.pillar', { stagger: 0.14, trigger: '.pillar-grid', start: 'top 82%' });

/* ── CTA ── */
gsap.to('#cta h2', {
  opacity: 1, duration: 0.7, ease: 'power2.out',
  scrollTrigger: { trigger: '#cta', start: 'top 76%' },
});
gsap.to('#cta p', {
  opacity: 1, duration: 0.6, delay: 0.15, ease: 'power2.out',
  scrollTrigger: { trigger: '#cta', start: 'top 76%' },
});
gsap.to('.cta-actions', {
  opacity: 1, duration: 0.5, delay: 0.3, ease: 'power2.out',
  scrollTrigger: { trigger: '#cta', start: 'top 76%' },
});

/* ── Team cards ── */
fadeUp('.team-card', { stagger: 0.12, trigger: '.team-grid', start: 'top 86%' });

/* ── Nav active state ── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

ScrollTrigger.create({
  trigger: 'body',
  start: 'top top',
  end: 'bottom bottom',
  onUpdate: () => {
    let current = '';
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 130 && rect.bottom >= 130) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  },
});

/* ═══════════════════════════════════════════════
   INTERACTIVE TIMELINE
═══════════════════════════════════════════════ */
(function initTimeline() {
  const track      = document.getElementById('timelineTrack');
  const tlFill     = document.getElementById('tlFill');
  const popup      = document.getElementById('tlPopup');
  const closeBtn   = document.getElementById('tlPopupClose');
  const popPhase   = document.getElementById('popPhase');
  const popTitle   = document.getElementById('popTitle');
  const popDesc    = document.getElementById('popDesc');
  const popTags    = document.getElementById('popTags');
  const dots       = [
    document.getElementById('dot0'),
    document.getElementById('dot1'),
    document.getElementById('dot2'),
  ];
  const nodeEls    = document.querySelectorAll('.tl-node');

  // Node positions as % of track width (matching CSS left values)
  const NODE_POS   = [0.15, 0.45, 0.75];

  let activeIndex  = -1;
  let isDragging   = false;
  let dragStartX   = 0;
  let dragStartScroll = 0;
  let didDrag      = false;

  /* ── Animate timeline in on scroll ── */
  ScrollTrigger.create({
    trigger: '.timeline-section',
    start: 'top 80%',
    onEnter: () => {
      // Stagger the dots appearing
      dots.forEach((dot, i) => {
        gsap.to(dot.parentElement, {
          opacity: 1,
          duration: 0.5,
          delay: i * 0.18,
          ease: 'power2.out',
        });
      });
      // Auto-select first node after dots appear
      setTimeout(() => selectNode(0), 600);
    },
  });

  // Hide node labels initially so they fade in
  nodeEls.forEach(n => { n.style.opacity = 0; });

  /* ── Select a node ── */
  function selectNode(index) {
    if (index === activeIndex) return;
    activeIndex = index;

    // Update dot states
    dots.forEach((dot, i) => {
      dot.classList.remove('active', 'visited');
      if (i === index)      dot.classList.add('active');
      else if (i < index)   dot.classList.add('visited');
    });

    // Update node label colours
    nodeEls.forEach((n, i) => {
      n.classList.toggle('active', i === index);
    });

    // Animate fill line to node position
    const targetPct = (NODE_POS[index] / NODE_POS[NODE_POS.length - 1]) * 100;
    gsap.to(tlFill, {
      width: targetPct + '%',
      duration: 0.55,
      ease: 'power2.out',
    });

    // Update and show popup
    const data = PHASES[index];
    popPhase.textContent = data.phase;
    popTitle.textContent = data.title;
    popDesc.textContent  = data.desc;

    popTags.innerHTML = '';
    data.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tl-tag' + (tag.primary ? ' primary' : '');
      span.textContent = tag.label;
      popTags.appendChild(span);
    });

    popup.classList.add('visible');
  }

  /* ── Close popup ── */
  function closePopup() {
    popup.classList.remove('visible');
    activeIndex = -1;
    dots.forEach(d => d.classList.remove('active', 'visited'));
    nodeEls.forEach(n => n.classList.remove('active'));
    gsap.to(tlFill, { width: '0%', duration: 0.4, ease: 'power2.out' });
  }

  closeBtn.addEventListener('click', closePopup);

  /* ── Click on nodes ── */
  nodeEls.forEach((node) => {
    node.addEventListener('click', (e) => {
      if (didDrag) return; // don't fire click after drag
      const index = parseInt(node.dataset.index, 10);
      if (index === activeIndex) {
        closePopup();
      } else {
        selectNode(index);
      }
    });

    // Hover glow
    node.addEventListener('mouseenter', () => {
      const idx = parseInt(node.dataset.index, 10);
      if (idx !== activeIndex) {
        gsap.to(node.querySelector('.tl-node-dot'), {
          boxShadow: '0 0 0 3px rgba(255,111,197,.12)',
          borderColor: 'rgba(255,111,197,.5)',
          duration: 0.2,
        });
      }
    });
    node.addEventListener('mouseleave', () => {
      const idx = parseInt(node.dataset.index, 10);
      if (idx !== activeIndex) {
        const dot = node.querySelector('.tl-node-dot');
        if (!dot.classList.contains('visited')) {
          gsap.to(dot, {
            boxShadow: 'none',
            borderColor: 'rgba(255,111,197,.3)',
            duration: 0.2,
          });
        }
      }
    });
  });

  /* ── Drag to scrub timeline ── */
  track.addEventListener('pointerdown', (e) => {
    isDragging  = true;
    didDrag     = false;
    dragStartX  = e.clientX;
    track.setPointerCapture(e.pointerId);
  });

  track.addEventListener('pointermove', (e) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStartX;
    if (Math.abs(dx) > 6) didDrag = true;

    // Find which node is closest to pointer
    const rect    = track.getBoundingClientRect();
    const pct     = (e.clientX - rect.left) / rect.width;
    const closest = NODE_POS.reduce((best, pos, i) => {
      return Math.abs(pos - pct) < Math.abs(NODE_POS[best] - pct) ? i : best;
    }, 0);

    // Only snap to new node if pointer is reasonably within range
    if (pct >= NODE_POS[0] - 0.08 && pct <= NODE_POS[NODE_POS.length - 1] + 0.1) {
      if (closest !== activeIndex) selectNode(closest);
    }
  });

  track.addEventListener('pointerup', () => {
    isDragging = false;
    setTimeout(() => { didDrag = false; }, 50);
  });

  track.addEventListener('pointercancel', () => {
    isDragging = false;
  });

  /* ── Keyboard accessibility ── */
  nodeEls.forEach((node, i) => {
    node.setAttribute('tabindex', '0');
    node.setAttribute('role', 'button');
    node.setAttribute('aria-label', PHASES[i].title);
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectNode(i);
      }
    });
  });

})();