/**
 * IPO Trade — Ambient Particle Canvas Engine
 * High-performance lightweight interactive canvas with physics & mouse repulsion
 */

export function initParticles(canvasId = 'heroCanvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;
  let particles = [];
  const mouse = { x: null, y: null, radius: 130 };

  function resize() {
    const parent = canvas.parentElement || document.body;
    width = canvas.width = parent.offsetWidth;
    height = canvas.height = parent.offsetHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const count = Math.min(90, Math.floor((width * height) / 16000));
    
    // Palette colors (Lemongrass, Gold, Cyan, Violet)
    const colorPalette = [
      '178, 235, 118', // Lemongrass
      '201, 162, 39',  // Gold
      '51, 210, 255',  // Cyan
      '123, 94, 167'   // Violet
    ];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.6,
        speedX: (Math.random() - 0.5) * 0.45,
        speedY: (Math.random() - 0.5) * 0.45,
        baseAlpha: Math.random() * 0.45 + 0.15,
        alpha: Math.random() * 0.45 + 0.15,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)]
      });
    }
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Update position
      p.x += p.speedX;
      p.y += p.speedY;

      // Screen boundary wrap
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 2.2;
          p.y -= (dy / dist) * force * 2.2;
          p.alpha = Math.min(0.9, p.baseAlpha + force * 0.5);
        } else {
          p.alpha = p.baseAlpha;
        }
      }

      // Draw particle circle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
      ctx.fill();

      // Connect neighbor particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);

        if (dist2 < 85) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${p.color}, ${0.07 * (1 - dist2 / 85)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(render);
  }

  render();
}
