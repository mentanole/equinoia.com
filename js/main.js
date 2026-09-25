// Intro decode
const introEl = document.getElementById('intro');
if (introEl && !document.documentElement.classList.contains('no-intro')) {
  document.body.classList.add('intro-lock');
  document.body.style.overflow = 'hidden';

  const target = 'EQUINOIA';
  const textEl = document.getElementById('intro-text');
  const chars = '!<>-_\\/[]{}=+*^?#0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const finishIntro = () => {
    introEl.classList.add('intro-done');
    document.body.style.overflow = '';
    document.body.classList.remove('intro-lock');
    setTimeout(() => introEl.remove(), 380);
  };

  if (reduceMotion) {
    textEl.textContent = target;
    setTimeout(finishIntro, 200);
  } else {
    const duration = 850;
    const lockPoints = target.split('').map((_, i) => (i / target.length) * 0.55 + Math.random() * 0.45);
    const start = performance.now();

    const frame = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      let out = '';
      for (let i = 0; i < target.length; i++) {
        out += progress >= lockPoints[i] ? target[i] : chars[Math.floor(Math.random() * chars.length)];
      }
      textEl.textContent = out;
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        textEl.textContent = target;
        setTimeout(finishIntro, 200);
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
