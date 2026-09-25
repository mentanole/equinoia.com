// Intro decode: ctOS-style glitch field resolving into "EQUINOIA"
const introEl = document.getElementById('intro');
if (introEl && !document.documentElement.classList.contains('no-intro')) {
  document.body.classList.add('intro-lock');
  document.body.style.overflow = 'hidden';

  const canvas = document.getElementById('intro-canvas');
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const resizeCanvas = () => {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const target = 'EQUINOIA';
  const scrambleChars = '!<>-_\\/[]{}=+*^?#01ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rand = (a, b) => a + Math.random() * (b - a);

  const drawGlitchShape = (x, y, s, tri) => {
    const draw = (dx, dy, color) => {
      ctx.fillStyle = color;
      if (tri) {
        ctx.beginPath();
        ctx.moveTo(x + dx, y + dy);
        ctx.lineTo(x + dx + s, y + dy);
        ctx.lineTo(x + dx, y + dy + s);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillRect(x + dx, y + dy, s, s);
      }
    };
    draw(-2, 0, 'rgba(214,196,90,0.55)');
    draw(2, 0, 'rgba(110,150,214,0.55)');
    draw(0, 0, 'rgba(243,242,238,0.92)');
  };

  const drawGlitchText = (text, cx, cy, size) => {
    ctx.font = `700 ${size}px ui-monospace, "SF Mono", Consolas, monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    try { ctx.letterSpacing = Math.round(size * 0.12) + 'px'; } catch (e) {}
    ctx.fillStyle = 'rgba(214,196,90,0.6)';
    ctx.fillText(text, cx - 2, cy);
    ctx.fillStyle = 'rgba(110,150,214,0.6)';
    ctx.fillText(text, cx + 2, cy);
    ctx.fillStyle = '#F3F2EE';
    ctx.fillText(text, cx, cy);
  };

  const finishIntro = () => {
    introEl.classList.add('intro-done');
    document.body.style.overflow = '';
    document.body.classList.remove('intro-lock');
    window.removeEventListener('resize', resizeCanvas);
    setTimeout(() => introEl.remove(), 380);
  };

  const w = () => window.innerWidth;
  const h = () => window.innerHeight;
  const fontSize = () => Math.min(w(), h()) * 0.1;

  if (reduceMotion) {
    ctx.fillStyle = '#0E0E0D';
    ctx.fillRect(0, 0, w(), h());
    drawGlitchText(target, w() / 2, h() / 2, fontSize());
    setTimeout(finishIntro, 250);
  } else {
    const duration = 900;
    const lockPoints = target.split('').map((_, i) => (i / target.length) * 0.5 + Math.random() * 0.4);
    let blocks = [];

    const spawnBlocks = (count) => {
      blocks = [];
      for (let i = 0; i < count; i++) {
        blocks.push({
          x: rand(0, w()),
          y: rand(0, h()),
          s: Math.random() < 0.85 ? rand(4, 22) : rand(30, 90),
          tri: Math.random() < 0.2,
        });
      }
    };

    const start = performance.now();
    const frame = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const cw = w(), ch = h();

      ctx.fillStyle = '#0E0E0D';
      ctx.fillRect(0, 0, cw, ch);

      const density = 1 - progress * 0.85;
      spawnBlocks(Math.round(90 * density));

      ctx.fillStyle = 'rgba(243,242,238,0.5)';
      const dotCount = Math.round(140 * density);
      for (let i = 0; i < dotCount; i++) {
        ctx.fillRect(rand(0, cw), rand(0, ch), 2, 2);
      }

      blocks.forEach((b) => drawGlitchShape(b.x, b.y, b.s, b.tri));

      let out = '';
      for (let i = 0; i < target.length; i++) {
        out += progress >= lockPoints[i] ? target[i] : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      }
      drawGlitchText(out, cw / 2, ch / 2, fontSize());

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        ctx.fillStyle = '#0E0E0D';
        ctx.fillRect(0, 0, cw, ch);
        drawGlitchText(target, cw / 2, ch / 2, fontSize());
        setTimeout(finishIntro, 220);
      }
    };
    requestAnimationFrame(frame);
  }

  const skipIntro = () => { if (!introEl.classList.contains('intro-done')) finishIntro(); };
  window.addEventListener('keydown', skipIntro, { once: true });
  introEl.addEventListener('click', skipIntro, { once: true });
}

// Nav shrink + mobile menu
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Only one FAQ item open at a time
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) other.open = false;
      });
    }
  });
});
