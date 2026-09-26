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

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

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

// Side switcher — vertical section indicator, macOS-dock-style magnify on hover
const sideSwitcher = document.getElementById('sideSwitcher');
const sideTrack = document.getElementById('sideSwitcherTrack');
if (sideSwitcher && sideTrack) {
  const sideItems = Array.from(sideTrack.children);
  const sectionIds = sideItems.map(li => li.dataset.target);
  const ITEM_HEIGHT = 32;
  const CONTAINER_HEIGHT = 96;
  const EXPANDED_HEIGHT = sideItems.length * ITEM_HEIGHT + 48;
  const MAGNIFY_RADIUS = 50; // px, falloff distance for the dock effect
  const MAX_HEIGHT_BOOST = 0.5; // li grows up to 1.5x at the cursor

  let activeIndex = 0;
  let hovering = false;

  const clearMagnify = () => {
    sideItems.forEach((li) => {
      li.style.removeProperty('--reveal');
      li.style.removeProperty('--mag');
    });
  };

  const layoutFromScroll = () => {
    if (hovering) return;
    sideItems.forEach((li, i) => {
      li.classList.toggle('is-active', i === activeIndex);
      li.classList.toggle('is-adjacent', Math.abs(i - activeIndex) === 1);
    });
    const offset = (CONTAINER_HEIGHT / 2 - ITEM_HEIGHT / 2) - activeIndex * ITEM_HEIGHT;
    sideTrack.style.transform = `translateY(${offset}px)`;
  };

  const updateActiveFromScroll = () => {
    const refLine = window.innerHeight * 0.4;
    sectionIds.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= refLine) activeIndex = i;
    });
    layoutFromScroll();
  };

  const layoutForHover = () => {
    sideItems.forEach((li) => li.classList.remove('is-adjacent'));
    const offset = (EXPANDED_HEIGHT / 2) - (sideItems.length * ITEM_HEIGHT) / 2;
    sideTrack.style.transform = `translateY(${offset}px)`;
  };

  sideSwitcher.addEventListener('mouseenter', () => {
    hovering = true;
    sideSwitcher.classList.add('is-hovering');
    layoutForHover();
  });

  sideSwitcher.addEventListener('mousemove', (e) => {
    const trackRect = sideTrack.getBoundingClientRect();
    sideItems.forEach((li, i) => {
      const itemCenter = trackRect.top + i * ITEM_HEIGHT + ITEM_HEIGHT / 2;
      const dist = Math.abs(e.clientY - itemCenter);
      const reveal = Math.max(0, 1 - dist / MAGNIFY_RADIUS);
      const eased = reveal * reveal * (3 - 2 * reveal); // smoothstep falloff, dock-like
      li.style.setProperty('--reveal', eased.toFixed(3));
      li.style.setProperty('--mag', (1 + eased * MAX_HEIGHT_BOOST).toFixed(3));
    });
  });

  sideSwitcher.addEventListener('mouseleave', () => {
    hovering = false;
    sideSwitcher.classList.remove('is-hovering');
    clearMagnify();
    layoutFromScroll();
  });

  window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
  window.addEventListener('resize', updateActiveFromScroll);
  updateActiveFromScroll();
}
