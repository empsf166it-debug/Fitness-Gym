/* ==========================================================================
   FITFORGE - Main JavaScript Core System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Theme Engine
  initThemeEngine();

  // Initialize RTL Engine
  initRTLEngine();

  // Initialize Header Scroll Behavior
  initHeaderScroll();

  // Initialize Mobile Drawer
  initMobileDrawer();

  // Initialize Scroll-Triggered Animations (Intersection Observer)
  initScrollAnimations();

  // Initialize Counter Animation
  initCounters();

  // Initialize Back-to-Top Button
  initBackToTop();
});

/* --------------------------------------------------------------------------
   THEME ENGINE (DARK / LIGHT)
   -------------------------------------------------------------------------- */
function initThemeEngine() {
  const themeToggleBtns = document.querySelectorAll('.js-theme-toggle');
  const savedTheme = localStorage.getItem('fitforge_theme') || 'dark';

  setTheme(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('fitforge_theme', newTheme);
    });
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcons = document.querySelectorAll('.js-theme-toggle i');
  
  themeIcons.forEach(icon => {
    if (theme === 'light') {
      icon.className = 'fas fa-moon';
    } else {
      icon.className = 'fas fa-sun';
    }
  });
}

/* --------------------------------------------------------------------------
   RTL ENGINE (LTR / RTL)
   -------------------------------------------------------------------------- */
function initRTLEngine() {
  const rtlToggleBtns = document.querySelectorAll('.js-rtl-toggle');
  const savedDir = localStorage.getItem('fitforge_dir') || 'ltr';

  setDirection(savedDir);

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      setDirection(newDir);
      localStorage.setItem('fitforge_dir', newDir);
    });
  });
}

function setDirection(dir) {
  document.documentElement.setAttribute('dir', dir);
  const rtlIcons = document.querySelectorAll('.js-rtl-toggle i');
  
  rtlIcons.forEach(icon => {
    if (dir === 'rtl') {
      icon.className = 'fas fa-globe-americas';
    } else {
      icon.className = 'fas fa-globe';
    }
  });
}

/* --------------------------------------------------------------------------
   HEADER SCROLL BEHAVIOR
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   MOBILE DRAWER NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const openBtns = document.querySelectorAll('.js-drawer-open');
  const closeBtns = document.querySelectorAll('.js-drawer-close');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');

  if (!drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('show');
    overlay.classList.add('show');
    document.body.classList.add('drawer-open');
  }

  function closeDrawer() {
    drawer.classList.remove('show');
    overlay.classList.remove('show');
    document.body.classList.remove('drawer-open');
  }

  openBtns.forEach(btn => btn.addEventListener('click', openDrawer));
  closeBtns.forEach(btn => btn.addEventListener('click', closeDrawer));
  overlay.addEventListener('click', closeDrawer);

  // Close drawer on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('show')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   SCROLL REVEAL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!elements.length) return;

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target); // Trigger only once
      }
    });
  }, observerOptions);

  elements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   VANILLA JS STAT COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.js-counter');
  if (!counters.length) return;

  const observerOptions = { threshold: 0.4 };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(counterEl) {
  const target = parseInt(counterEl.getAttribute('data-target'), 10) || 0;
  const suffix = counterEl.getAttribute('data-suffix') || '';
  const duration = 2000;
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.floor(easeProgress * target);

    counterEl.textContent = currentVal + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      counterEl.textContent = target + suffix;
    }
  }

  requestAnimationFrame(updateCount);
}

/* --------------------------------------------------------------------------
   BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.js-back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
