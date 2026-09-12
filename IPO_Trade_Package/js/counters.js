/**
 * IPO Trade — NumberFlow & Dynamic Stat Counters
 * IntersectionObserver triggered exponential ease-out counter animations
 */

export function initCounters() {
  const elements = document.querySelectorAll('[data-counter]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  elements.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.counter || '0');
  const duration = parseInt(el.dataset.dur || '1800', 10);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const isFloat = !!el.dataset.float || el.dataset.counter.includes('.');
  const decimals = parseInt(el.dataset.decimals || (isFloat ? '1' : '0'), 10);
  const startTime = performance.now();

  function tick(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease Out Expo
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const currentValue = target * easeProgress;

    el.textContent = `${prefix}${formatNumber(currentValue, decimals)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = `${prefix}${formatNumber(target, decimals)}${suffix}`;
    }
  }

  requestAnimationFrame(tick);
}

function formatNumber(val, decimals) {
  const fixed = val.toFixed(decimals);
  const parts = fixed.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
