/**
 * IPO Trade — Interactive UI Components & Motion Engine
 * Tabs, Modals, Accordions, Copy-to-Clipboard, Scroll Reveal & Cursor
 */

export function initComponents() {
  initScrollReveal();
  initModals();
  initTabs();
  initAccordions();
  initClipboard();
  initCursor();
  initNavScroll();
}

/* ==========================================================================
   1. SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal], [data-reveal-fade], [data-reveal-scale]');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   2. MODALS & OVERLAYS
   ========================================================================== */
function initModals() {
  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-modal-open');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal-close');
      const modal = document.getElementById(modalId) || btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(modal => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  });
}

/* ==========================================================================
   3. TABS
   ========================================================================== */
function initTabs() {
  document.querySelectorAll('.ipotrade-tabs, [data-tabs-wrapper]').forEach(wrapper => {
    const tabButtons = wrapper.querySelectorAll('[data-tab]');
    const tabPanels = wrapper.querySelectorAll('[data-panel]');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');

        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        tabPanels.forEach(panel => {
          if (panel.getAttribute('data-panel') === target) {
            panel.style.display = 'block';
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(8px)';
            requestAnimationFrame(() => {
              panel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              panel.style.opacity = '1';
              panel.style.transform = 'translateY(0)';
            });
          } else {
            panel.style.display = 'none';
          }
        });
      });
    });
  });
}

/* ==========================================================================
   4. ACCORDIONS
   ========================================================================== */
function initAccordions() {
  document.querySelectorAll('.ipotrade-accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.ipotrade-accordion__item');
      const isOpen = item.classList.contains('open');

      // Close all in this group
      const parent = item.parentElement;
      parent.querySelectorAll('.ipotrade-accordion__item').forEach(i => {
        i.classList.remove('open');
        const body = i.querySelector('.ipotrade-accordion__body');
        if (body) body.style.maxHeight = '0';
        const t = i.querySelector('.ipotrade-accordion__trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        const body = item.querySelector('.ipotrade-accordion__body');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   5. CLIPBOARD & TOAST
   ========================================================================== */
function initClipboard() {
  document.querySelectorAll('.code-block__copy, [data-copy-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      let textToCopy = btn.getAttribute('data-copy-target');
      if (!textToCopy) {
        const pre = btn.closest('.code-block')?.querySelector('pre');
        if (pre) textToCopy = pre.innerText;
      }

      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('Código copiado com sucesso!');
          const orig = btn.innerHTML;
          btn.innerHTML = '✓ Copiado';
          setTimeout(() => { btn.innerHTML = orig; }, 2000);
        }).catch(() => {
          showToast('Não foi possível copiar automaticamente.');
        });
      }
    });
  });
}

export function showToast(message) {
  let toast = document.getElementById('ipotradeToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'ipotradeToast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

/* ==========================================================================
   6. CUSTOM INTERACTIVE CURSOR
   ========================================================================== */
function initCursor() {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor || !window.matchMedia('(pointer: fine)').matches) return;

  let currentX = 0, currentY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  }, { passive: true });

  function renderCursor() {
    currentX += (targetX - currentX) * 0.2;
    currentY += (targetY - currentY) * 0.2;
    cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(renderCursor);
  }

  renderCursor();

  document.querySelectorAll('a, button, input, .card, [data-modal-open]').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
}

/* ==========================================================================
   7. NAVIGATION ACTIVE TRACKING & SCROLL
   ========================================================================== */
function initNavScroll() {
  const nav = document.querySelector('.ipotrade-nav');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.ipotrade-nav__link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (nav) {
      nav.classList.toggle('scrolled', scrollY > 40);
    }

    // Active Section Tracking
    let activeId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (scrollY >= top) {
        activeId = sec.getAttribute('id');
      }
    });

    if (activeId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === `#${activeId}`);
      });
    }
  }, { passive: true });
}
