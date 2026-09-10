function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
}

function initEdad() {
  const edad = calcularEdad('1999-03-15');
  const elementoEdad = document.getElementById('edad');

  if (elementoEdad) elementoEdad.textContent = edad;
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', hash);
    });
  });
}

function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isHidden = menu.classList.contains('hidden');
    menu.classList.toggle('hidden', !isHidden);
    menu.classList.toggle('flex', isHidden);
    toggle.setAttribute('aria-expanded', String(isHidden));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

function parseISODate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function diffInMonths(startDate, endDate) {
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (end.getDate() < start.getDate()) months -= 1;
  return Math.max(0, months);
}

function translateKey(key) {
  return window.i18n ? window.i18n.t(key) : key;
}

function formatDuration(totalMonths) {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [];

  if (years > 0) {
    parts.push(`${years} ${translateKey(years === 1 ? 'resume.year' : 'resume.years')}`);
  }

  if (months > 0) {
    parts.push(`${months} ${translateKey(months === 1 ? 'resume.month' : 'resume.months')}`);
  }

  if (!parts.length) {
    return `0 ${translateKey('resume.months')}`;
  }

  return parts.join(' ');
}

function updateExperienceDurations() {
  const jobs = document.querySelectorAll('.experience-job');
  if (!jobs.length) return;

  let totalMonths = 0;

  jobs.forEach((job) => {
    const startValue = job.getAttribute('data-start');
    const endValue = job.getAttribute('data-end');
    if (!startValue) return;

    const start = parseISODate(startValue);
    const end = endValue ? parseISODate(endValue) : new Date();
    const months = diffInMonths(start, end);
    totalMonths += months;

    const durationEl = job.querySelector('.experience-duration');
    if (durationEl) durationEl.textContent = ` (${formatDuration(months)})`;
  });

  const totalEl = document.getElementById('experience-total');
  if (totalEl) {
    totalEl.textContent = `${translateKey('resume.totalTechExp')}: ${formatDuration(totalMonths)}`;
  }
}

function updateToggleLabel(btn) {
  if (btn.hasAttribute('data-toggle-static')) {
    const hint = btn.querySelector('.experience-toggle-hint');
    if (hint) {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const key = expanded ? 'resume.collapse' : 'resume.expand';
      hint.setAttribute('data-i18n', key);
      hint.textContent = translateKey(key);
    }
    const title = btn.querySelector('.experience-toggle-title');
    if (title) {
      const titleKey = title.getAttribute('data-i18n');
      if (titleKey) title.textContent = translateKey(titleKey);
    }
    return;
  }
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  const key = expanded ? 'resume.readLess' : 'resume.readMore';
  btn.setAttribute('data-i18n', key);
  btn.textContent = translateKey(key);
}

function updateToggleLabels() {
  document.querySelectorAll('.experience-toggle').forEach(updateToggleLabel);
}

function initExperienceToggles() {
  document.querySelectorAll('.experience-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const job = btn.closest('.experience-job');
      if (!job) return;

      const details = job.querySelector('.experience-details');
      if (!details) return;

      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      details.classList.toggle('hidden', expanded);
      updateToggleLabel(btn);
    });
  });
}

async function initTechIcons() {
  if (!window.tech) return;

  try {
    const catalog = await window.tech.loadTechCatalog();
    window.tech.fillTechContainers(catalog);
  } catch (err) {
    console.error('Tech catalog load failed:', err);
  }
}

function initMobileNavReveal() {
  const nav = document.getElementById('site-nav');
  const hero = document.getElementById('hero');
  if (!nav || !hero) return;

  const mq = window.matchMedia('(max-width: 1023px)');

  function syncNavVisibility() {
    if (!mq.matches) {
      nav.classList.add('is-visible');
      return;
    }

    const heroBottom = hero.getBoundingClientRect().bottom;
    const isVisible = nav.classList.contains('is-visible');

    if (!isVisible && heroBottom <= 56) {
      nav.classList.add('is-visible');
    } else if (isVisible && heroBottom > 80) {
      nav.classList.remove('is-visible');
    }
  }

  let ticking = false;
  function onScrollOrResize() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      syncNavVisibility();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize);
  if (typeof mq.addEventListener === 'function') {
    mq.addEventListener('change', syncNavVisibility);
  } else if (typeof mq.addListener === 'function') {
    mq.addListener(syncNavVisibility);
  }

  syncNavVisibility();
}

function initResumeEnter() {
  const resume = document.getElementById('resume');
  if (!resume || !resume.classList.contains('section-reveal')) return;

  const mq = window.matchMedia('(max-width: 1023px)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function markEntered() {
    resume.classList.add('is-entered');
  }

  if (!mq.matches || reduceMotion.matches) {
    markEntered();
    return;
  }

  if (!('IntersectionObserver' in window)) {
    markEntered();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          markEntered();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  observer.observe(resume);

  if (typeof mq.addEventListener === 'function') {
    mq.addEventListener('change', (event) => {
      if (!event.matches) markEntered();
    });
  }
}

function initPhotoCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('.photo-carousel-slide'));
    const dotsWrap = carousel.querySelector('[data-carousel-dots]');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    if (!slides.length) return;

    let index = 0;

    slides.forEach((_, i) => {
      if (!dotsWrap) return;
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'photo-carousel-dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', `Photo ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    function goTo(nextIndex) {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === index);
      });
      if (dotsWrap) {
        dotsWrap.querySelectorAll('.photo-carousel-dot').forEach((dot, i) => {
          dot.classList.toggle('is-active', i === index);
        });
      }
    }

    goTo(0);
    if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));
  });
}

document.addEventListener('languageChanged', () => {
  updateExperienceDurations();
  updateToggleLabels();
});

document.addEventListener('DOMContentLoaded', () => {
  initEdad();
  initSmoothScroll();
  initMobileNav();
  initMobileNavReveal();
  initResumeEnter();
  initExperienceToggles();
  updateExperienceDurations();
  initTechIcons();
  initPhotoCarousels();
});
