/* ── ADCUSA Main JS ─────────────────────────── */

document.addEventListener('DOMContentLoaded', function () {

  // ── AOS Init ──────────────────────────────
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
      offset: 60,
    });
  }

  // ── Navbar ─────────────────────────────────
  const navbar = document.getElementById('navbar');
  const isHomePage = document.body.classList.contains('home-page');

  function updateNav() {
    if (!navbar) return;
    if (isHomePage) {
      if (window.scrollY > 60) {
        navbar.classList.remove('nav-transparent');
        navbar.classList.add('nav-solid');
        // Make org name visible on solid nav
        const orgName = navbar.querySelector('.org-name');
        if (orgName) orgName.style.color = '';
      } else {
        navbar.classList.add('nav-transparent');
        navbar.classList.remove('nav-solid');
      }
    } else {
      navbar.classList.remove('nav-transparent');
      navbar.classList.add('nav-solid');
    }
  }

  if (isHomePage && navbar) {
    navbar.classList.add('nav-transparent');
    // White logo text on transparent nav
    const orgName = navbar.querySelector('.org-name');
    if (orgName) orgName.style.color = '#fff';
  }

  window.addEventListener('scroll', updateNav);
  updateNav();

  // ── Mobile Menu ─────────────────────────────
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('icon-open');
  const menuIconClose = document.getElementById('icon-close');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      if (menuIconOpen) menuIconOpen.classList.toggle('hidden', !isOpen);
      if (menuIconClose) menuIconClose.classList.toggle('hidden', isOpen);
    });
  }

  // Close mobile menu on link click
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        if (menuIconOpen) menuIconOpen.classList.remove('hidden');
        if (menuIconClose) menuIconClose.classList.add('hidden');
      });
    });
  }

  // ── Hero bg zoom ────────────────────────────
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    setTimeout(() => heroBg.classList.add('loaded'), 100);
  }

  // ── Stats Counter ────────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-counter'));
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 2200;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = prefix + target.toLocaleString() + suffix;
    }
    requestAnimationFrame(update);
  }

  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
  }

  // ── Smooth scroll for anchor links ─────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // ── Contact Form ────────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      // Simulate submission
      setTimeout(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = '#2D6A4F';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
        }, 3500);
      }, 1500);
    });
  }

  // ── Newsletter Form ─────────────────────────
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button[type="submit"]');
      if (!input || !input.value) return;
      btn.textContent = '✓ Subscribed!';
      btn.disabled = true;
      input.value = '';
      setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.disabled = false;
      }, 3500);
    });
  });

  // ── Volunteer Form ──────────────────────────
  const volunteerForm = document.getElementById('volunteer-form');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = volunteerForm.querySelector('[type="submit"]');
      btn.textContent = 'Thank You!';
      btn.disabled = true;
      volunteerForm.reset();
      setTimeout(() => {
        btn.textContent = 'Submit Application';
        btn.disabled = false;
      }, 3500);
    });
  }

  // ── Active nav link highlight ───────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Image lazy load fallback ─────────────────
  document.querySelectorAll('img[data-src]').forEach(img => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = img.getAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    observer.observe(img);
  });

});
