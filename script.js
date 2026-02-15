(function () {
  'use strict';

  // ===== Jahr im Footer =====
  document.getElementById('year').textContent = new Date().getFullYear();

  // ===== Mobile Menü =====
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== Header beim Scrollen ein-/ausblenden =====
  const header = document.querySelector('.header');
  let lastScroll = 0;

  function onScroll() {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      if (currentScroll > lastScroll) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
    } else {
      header.classList.remove('hidden');
    }
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ===== Scroll-Reveal für Sektionen & Karten =====
  const revealElements = document.querySelectorAll(
    '.section-label, .section h2, .section-intro, .about-grid, .skill-card, .project-card'
  );

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Skill-Cards nacheinander animieren
        if (entry.target.classList.contains('skill-card')) {
          const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
          entry.target.style.transitionDelay = index * 0.05 + 's';
        }
        if (entry.target.classList.contains('project-card')) {
          const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
          entry.target.style.transitionDelay = index * 0.1 + 's';
        }
      }
    });
  }, observerOptions);

  revealElements.forEach(function (el) {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // ===== Sanftes Scrollen für Anker-Links (Fallback) =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
