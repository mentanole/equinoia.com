// Intro: two particle hands turn, drift together and touch; the app window bursts out (timeline in CSS)
const introEl = document.getElementById('intro');
if (introEl && !document.documentElement.classList.contains('no-intro')) {
  document.body.style.overflow = 'hidden';

  const finishIntro = () => {
    if (introEl.classList.contains('intro-done')) return;
    clearTimeout(timer);
    introEl.classList.add('intro-done');
    document.body.style.overflow = '';
    setTimeout(() => introEl.remove(), 600);
  };
  const timer = setTimeout(finishIntro, 5600);

  window.addEventListener('keydown', finishIntro, { once: true });
  introEl.addEventListener('click', finishIntro, { once: true });

  // Particle hands: dots sampled from the photo's bright pixels, depth from brightness.
  // Coordinates are photo pixels inside the strip y 780–1180 (same box as .intro-stage).
  const handsCanvas = document.getElementById('intro-hands');
  const hctx = handsCanvas.getContext('2d');
  const stageEl = introEl.querySelector('.intro-stage');
  const hDpr = Math.min(window.devicePixelRatio || 1, 2);
  const STRIP_Y = 780, STRIP_W = 1179, STRIP_H = 400, SPLIT_X = 612, STEP = 3; // STEP 3 ≈ 7k dots, ~13ms/frame; STEP 2 doubled that
  const hands = [
    // dx/dy: travel from start to the touch pose; pivot: where the arm leaves the frame
    { pts: [], fromX: -208, toX: 58, toY: -9, pivotX: 0, pivotY: 140, fadeDir: 1 },
    { pts: [], fromX: 204, toX: -63, toY: 9, pivotX: STRIP_W, pivotY: 190, fadeDir: -1 },
  ];

  const resizeHands = () => {
    handsCanvas.width = innerWidth * hDpr;
    handsCanvas.height = innerHeight * hDpr;
  };
  resizeHands();
  window.addEventListener('resize', resizeHands);

  const img = new Image();
  img.src = 'assets/intro-hands.png';
  img.decode().then(() => {
    const off = document.createElement('canvas');
    off.width = STRIP_W; off.height = STRIP_H;
    const octx = off.getContext('2d');
    octx.drawImage(img, 0, -STRIP_Y);
    const data = octx.getImageData(0, 0, STRIP_W, STRIP_H).data;
    for (let y = 0; y < STRIP_H; y += STEP) {
      for (let x = 0; x < STRIP_W; x += STEP) {
        const lum = data[(y * STRIP_W + x) * 4] / 255;
        if (lum < 0.16 || Math.random() > lum * 0.9) continue;
        const hand = hands[x < SPLIT_X ? 0 : 1];
        // fade the arm where the photo crops it
        const edge = hand.fadeDir > 0 ? x / 190 : (STRIP_W - x) / 190;
        hand.pts.push({
          x: x + Math.random() * STEP,
          y: y + Math.random() * STEP,
          z: (lum - 0.5) * 110 + (Math.random() - 0.5) * 12,
          a: lum * Math.min(1, edge),
          s: 0.9 + Math.random() * 1.2,
        });
      }
    }
    requestAnimationFrame(drawHands);
  }).catch(() => {});

  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const easeInOut = (v) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);
  const easeOut = (v) => 1 - Math.pow(1 - v, 3);
  // follow the CSS clock so the touch lands exactly on the impact keyframe
  const clockAnim = handsCanvas.getAnimations().find((a) => a.animationName === 'intro-hand-out');

  const drawHands = () => {
    if (!introEl.isConnected) return;
    const t = clockAnim ? clockAnim.currentTime : 0;
    const rect = stageEl.getBoundingClientRect();
    const k = rect.width / STRIP_W;
    hctx.setTransform(hDpr, 0, 0, hDpr, 0, 0);
    hctx.clearRect(0, 0, innerWidth, innerHeight);

    const appear = easeOut(clamp01(t / 900));
    const travel = easeInOut(clamp01((t - 600) / 2000));
    // wrist turn: starts rolled over and swings counter-clockwise into the reaching pose
    const turn = 1 - easeOut(clamp01((t - 200) / 1700));
    const roll = turn * 0.7;           // around the forearm axis, reveals the wrist
    const swing = turn * 0.24;         // in-plane, positive = clockwise in canvas space
    const cosR = Math.cos(roll), sinR = Math.sin(roll);
    const cosS = Math.cos(swing), sinS = Math.sin(swing);

    hctx.fillStyle = '#F3F2EE';
    hands.forEach((h) => {
      const offX = h.fromX + (h.toX - h.fromX) * travel;
      const offY = h.toY * travel;
      h.pts.forEach((p) => {
        // roll around the horizontal axis through the pivot
        const ry = p.y - h.pivotY;
        const y3 = ry * cosR - p.z * sinR;
        const z3 = ry * sinR + p.z * cosR;
        const persp = 600 / (600 - z3);
        const px = (p.x - h.pivotX) * persp;
        const py = y3 * persp;
        // in-plane swing around the pivot
        const sx = h.pivotX + px * cosS - py * sinS + offX;
        const sy = h.pivotY + px * sinS + py * cosS + offY;
        const depth = clamp01((z3 + 50) / 100);
        hctx.globalAlpha = p.a * (0.35 + depth * 0.65) * appear;
        const size = p.s * (0.7 + depth * 0.6) * Math.max(k, 0.6);
        hctx.fillRect(rect.left + sx * k, rect.top + sy * k, size, size);
      });
    });
    hctx.globalAlpha = 1;
    if (t < 3300) requestAnimationFrame(drawHands);
  };
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

// Direct installer download: point the download links at the latest
// installer from updates/latest.json (the same manifest the in-app updater
// reads). The GitHub releases page stays as the href if this fails.
const downloadLinks = document.querySelectorAll('[data-download]');
if (downloadLinks.length) {
  const RELEASE_PREFIX = 'https://github.com/mentanole/equinoia.com/releases/download/';
  fetch('updates/latest.json', { cache: 'no-cache' })
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then((manifest) => {
      const url = manifest?.platforms?.['windows-x86_64']?.url;
      if (typeof url !== 'string' || !url.startsWith(RELEASE_PREFIX)) return;
      const version = /^\d+(\.\d+)*$/.test(manifest.version) ? manifest.version : '';
      downloadLinks.forEach((a) => {
        a.href = url;
        if (version && a.dataset.downloadLabel) {
          a.textContent = `${a.dataset.downloadLabel} · v${version}`;
        }
      });
    })
    .catch(() => {});
}
