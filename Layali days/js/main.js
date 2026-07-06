import { applyLanguage } from './i18n.js';

const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const langToggle = document.getElementById('langToggle');
const yearEl = document.getElementById('year');

const savedLang = localStorage.getItem('layali-lang') || 'en';
applyLanguage(savedLang);

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

langToggle?.addEventListener('click', () => {
  const next = document.documentElement.lang === 'ar' ? 'en' : 'ar';
  applyLanguage(next);
});

window.addEventListener('scroll', () => {
  header.classList.toggle('header--scrolled', window.scrollY > 40);
}, { passive: true });

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('nav__links--open');
  navToggle.classList.toggle('nav__toggle--active');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('nav__links--open');
    navToggle.classList.remove('nav__toggle--active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
revealElements.forEach((el) => revealObserver.observe(el));

document.querySelectorAll('.project-card').forEach((card, index) => {
  card.style.transitionDelay = `${(index % 3) * 0.1}s`;
});

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  contactForm.reset();
});

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav__links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach((item) => {
    item.style.color = item.getAttribute('href') === `#${current}`
      ? 'var(--gold-light)'
      : '';
  });
}, { passive: true });
