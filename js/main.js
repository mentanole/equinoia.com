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
    draw(-1.5, 0, 'rgba(214,196,90,0.4)');
    draw(1.5, 0, 'rgba(110,150,214,0.4)');
    draw(0, 0, 'rgba(243,242,238,0.75)');
  };

  const drawGlitchText = (text, cx, cy, size) => {
    ctx.font = `700 ${size}px ui-monospace, "SF Mono", Consolas, monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    try { ctx.letterSpacing = Math.round(size * 0.1) + 'px'; } catch (e) {}
    ctx.fillStyle = 'rgba(214,196,90,0.55)';
    ctx.fillText(text, cx - 1.5, cy);
    ctx.fillStyle = 'rgba(110,150,214,0.55)';
    ctx.fillText(text, cx + 1.5, cy);
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
  const fontSize = () => Math.max(13, Math.min(w(), h()) * 0.022);

  if (reduceMotion) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w(), h());
    drawGlitchText(target, w() / 2, h() / 2, fontSize());
    setTimeout(finishIntro, 250);
  } else {
    // Flash-safety: blocks/dots are a persistent pool where only a small,
    // independently-randomized fraction changes per frame. This keeps any
    // single screen region's flicker rate well under the WCAG 3-flashes/
    // second threshold, instead of redrawing the whole field at 60Hz.
    const duration = 900;
    const lockPoints = target.split('').map((_, i) => (i / target.length) * 0.5 + Math.random() * 0.4);
    const refreshRate = 0.025; // ~1.5 changes/sec per element at 60fps, under the 3/sec flash limit

    const makeBlock = () => ({
      x: rand(0, w()),
      y: rand(0, h()),
      s: Math.random() < 0.85 ? rand(4, 18) : rand(24, 60),
      tri: Math.random() < 0.2,
    });
    const makeDot = () => ({ x: rand(0, w()), y: rand(0, h()) });

    let blocks = Array.from({ length: 34 }, makeBlock);
    let dots = Array.from({ length: 70 }, makeDot);

    const start = performance.now();
    const frame = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const cw = w(), ch = h();

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, cw, ch);

      // density ramps down by trimming the pool, not by mass-regenerating it
      const targetBlockCount = Math.round(34 * (1 - progress * 0.85));
      const targetDotCount = Math.round(70 * (1 - progress * 0.85));
      if (blocks.length > targetBlockCount) blocks.length = targetBlockCount;
      if (dots.length > targetDotCount) dots.length = targetDotCount;

      blocks = blocks.map((b) => (Math.random() < refreshRate ? makeBlock() : b));
      dots = dots.map((d) => (Math.random() < refreshRate ? makeDot() : d));

      ctx.fillStyle = 'rgba(243,242,238,0.35)';
      dots.forEach((d) => ctx.fillRect(d.x, d.y, 2, 2));

      blocks.forEach((b) => drawGlitchShape(b.x, b.y, b.s, b.tri));

      let out = '';
      for (let i = 0; i < target.length; i++) {
        out += progress >= lockPoints[i] ? target[i] : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      }
      drawGlitchText(out, cw / 2, ch / 2, fontSize());

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        ctx.fillStyle = '#000000';
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

// Hero sphere — rotating particle globe
const sphereCanvas = document.getElementById('hero-sphere');
if (sphereCanvas) {
  const sctx = sphereCanvas.getContext('2d');
  const sDpr = Math.min(window.devicePixelRatio || 1, 2);
  const heroSection = document.getElementById('hero');
  const sphereReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let sw = 0, sh = 0;
  const resizeSphere = () => {
    const rect = heroSection.getBoundingClientRect();
    sw = rect.width;
    sh = rect.height;
    sphereCanvas.width = sw * sDpr;
    sphereCanvas.height = sh * sDpr;
    sphereCanvas.style.width = sw + 'px';
    sphereCanvas.style.height = sh + 'px';
    sctx.setTransform(sDpr, 0, 0, sDpr, 0, 0);
  };
  resizeSphere();
  window.addEventListener('resize', resizeSphere);

  // Particles evenly distributed on a sphere (Fibonacci sphere), with a
  // small per-particle jitter so the surface reads as fine grain rather
  // than a perfectly smooth shell.
  const PARTICLE_COUNT = 4200;
  const particles = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const py = 1 - (i / (PARTICLE_COUNT - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - py * py));
    const theta = goldenAngle * i;
    const jitter = 0.9 + Math.random() * 0.14;
    particles.push({
      x: Math.cos(theta) * radiusAtY * jitter,
      y: py * jitter,
      z: Math.sin(theta) * radiusAtY * jitter,
      size: 0.6 + Math.random() * 1.6,
      twinkle: Math.random() * Math.PI * 2,
    });
  }

  let sphereVisible = true;
  if ('IntersectionObserver' in window) {
    const sphereIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { sphereVisible = entry.isIntersecting; });
    }, { threshold: 0 });
    sphereIo.observe(heroSection);
  }

  const TILT = 0.16;
  const cosTilt = Math.cos(TILT), sinTilt = Math.sin(TILT);

  const drawSphere = (angle, time) => {
    const cx = sw / 2, cy = sh / 2;
    const radius = Math.min(sw, sh) * 0.44;
    const cosA = Math.cos(angle), sinA = Math.sin(angle);

    sctx.clearRect(0, 0, sw, sh);

    const projected = particles.map((p) => {
      const x = p.x * cosA + p.z * sinA;
      const zRot = -p.x * sinA + p.z * cosA;
      const y = p.y * cosTilt - zRot * sinTilt;
      const z = p.y * sinTilt + zRot * cosTilt;
      return { x, y, z, size: p.size, twinkle: p.twinkle };
    });
    projected.sort((a, b) => a.z - b.z);

    projected.forEach((p) => {
      const depth = (p.z + 1) / 2; // 0 = far side, 1 = near side
      const scale = 0.72 + depth * 0.5;
      const screenX = cx + p.x * radius * scale;
      const screenY = cy + p.y * radius * scale;
      const twinkle = 0.85 + 0.15 * Math.sin(time * 0.0015 + p.twinkle);
      const alpha = (0.18 + depth * 0.72) * twinkle;
      const size = p.size * (0.6 + depth * 0.8);
      sctx.beginPath();
      sctx.fillStyle = `rgba(243,242,238,${alpha.toFixed(3)})`;
      sctx.arc(screenX, screenY, size / 2, 0, Math.PI * 2);
      sctx.fill();
    });
  };

  if (sphereReduceMotion) {
    drawSphere(0, 0);
  } else {
    const rotationSpeed = 0.00022; // one full turn roughly every 47s
    const loop = (time) => {
      if (sphereVisible) drawSphere(time * rotationSpeed, time);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
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

// Side switcher — vertical section indicator (active + 1 neighbor each side)
const sideTrack = document.getElementById('sideSwitcherTrack');
if (sideTrack) {
  const sideItems = Array.from(sideTrack.children);
  const sectionIds = sideItems.map(li => li.dataset.target);
  const ITEM_HEIGHT = 32;
  const CONTAINER_HEIGHT = 96;

  const updateSideSwitcher = () => {
    const refLine = window.innerHeight * 0.4;
    let activeIndex = 0;
    sectionIds.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= refLine) activeIndex = i;
    });
    sideItems.forEach((li, i) => {
      li.classList.toggle('is-active', i === activeIndex);
      li.classList.toggle('is-adjacent', Math.abs(i - activeIndex) === 1);
    });
    const offset = (CONTAINER_HEIGHT / 2 - ITEM_HEIGHT / 2) - activeIndex * ITEM_HEIGHT;
    sideTrack.style.transform = `translateY(${offset}px)`;
  };

  window.addEventListener('scroll', updateSideSwitcher, { passive: true });
  window.addEventListener('resize', updateSideSwitcher);
  updateSideSwitcher();
}
