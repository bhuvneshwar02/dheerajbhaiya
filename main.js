(function () {
  'use strict';
  function typewriterEffect() {
    const el = document.querySelector('.typing');
    if (!el) return;

    const fullText = el.getAttribute('data-text') || el.textContent.trim();
    el.textContent = '';
    let index = 0;

    function type() {
      if (index < fullText.length) {
        el.textContent += fullText.charAt(index);
        index++;
        setTimeout(type, 80); // typing speed
      }
    }

    type();
  }


  function navbarScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  function mobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      toggle.classList.toggle('open');
    });
  }

  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach((link) => {
      const href = link.getAttribute('href');
      if (href === currentPage || (href === 'index.html' && currentPage === '')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          window.scrollTo({
            top: targetEl.offsetTop - 80,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  function backToTop() {
    const btn = document.createElement('button');
    btn.id = 'backToTop';
    btn.textContent = '↑';
    btn.title = 'Back to Top';
    btn.style.cssText = `
      position: fixed;
      right: 20px;
      bottom: 20px;
      padding: 10px 14px;
      border: none;
      border-radius: 50%;
      background: #d91818fa;
      color: #fff;
      font-size: 18px;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      display: none;
      z-index: 999;
    `;
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
      btn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
  }

  function contactForm() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('input[type="text"]')?.value.trim();
      const email = form.querySelector('input[type="email"]')?.value.trim();
      const message = form.querySelector('textarea')?.value.trim();

      if (!name || !email) {
        alert('Please fill out your name and email.');
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sending...';


      setTimeout(() => {
        btn.textContent = 'Message Sent ✅';
        btn.style.background = '#2a9d6f';

        setTimeout(() => {
          form.reset();
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 2000);
      }, 1200);
    });
  }

  function init() {
    typewriterEffect();
    navbarScroll();
    mobileNav();
    setActiveNavLink();
    smoothScroll();
    backToTop();
    contactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();