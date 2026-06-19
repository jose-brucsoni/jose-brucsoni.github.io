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
  const elementoEdadCV = document.getElementById('edad-cv');

  if (elementoEdad) elementoEdad.textContent = edad;
  if (elementoEdadCV) elementoEdadCV.textContent = edad;
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

function getCvFilename() {
  if (window.i18n) {
    return window.i18n.t('cv.filename');
  }
  return 'CV_Jose_Carlo_Suarez_Brucsoni_EN.pdf';
}

function DescargarCV(event) {
  const element = document.getElementById('cv-pdf');
  const container = document.getElementById('cv-pdf-container');
  const btnOriginal = event ? event.currentTarget : null;
  let textoOriginal = '';

  if (btnOriginal) {
    textoOriginal = btnOriginal.innerHTML;
    const generating = window.i18n ? window.i18n.t('cv.generating') : 'Generating PDF...';
    btnOriginal.innerHTML = `<i class="ti-reload"></i> ${generating}`;
    btnOriginal.disabled = true;
  }

  if (!element || !container) {
    const msg = window.i18n ? window.i18n.t('cv.errorNotFound') : 'Error: CV content not found. Please reload the page.';
    alert(msg);
    if (btnOriginal) {
      btnOriginal.innerHTML = textoOriginal;
      btnOriginal.disabled = false;
    }
    return;
  }

  const widthInPx = 210 * 3.7795275591;

  container.style.setProperty('display', 'block', 'important');
  container.style.setProperty('position', 'fixed', 'important');
  container.style.setProperty('left', '50%', 'important');
  container.style.setProperty('top', '0', 'important');
  container.style.setProperty('transform', 'translateX(-50%)', 'important');
  container.style.setProperty('width', `${widthInPx}px`, 'important');
  container.style.setProperty('max-width', `${widthInPx}px`, 'important');
  container.style.setProperty('min-width', `${widthInPx}px`, 'important');
  container.style.setProperty('visibility', 'visible', 'important');
  container.style.setProperty('opacity', '1', 'important');
  container.style.setProperty('z-index', '9999', 'important');
  container.style.setProperty('overflow', 'visible', 'important');
  container.style.setProperty('background-color', '#ffffff', 'important');
  container.style.setProperty('height', 'auto', 'important');

  const paddingTopBottom = 12 * 3.7795275591;
  const paddingLeftRight = 15 * 3.7795275591;

  element.style.setProperty('width', `${widthInPx}px`, 'important');
  element.style.setProperty('max-width', `${widthInPx}px`, 'important');
  element.style.setProperty('margin', '0', 'important');
  element.style.setProperty('padding', `${paddingTopBottom}px ${paddingLeftRight}px`, 'important');
  element.style.setProperty('box-sizing', 'border-box', 'important');
  element.style.setProperty('overflow', 'visible', 'important');
  element.style.setProperty('position', 'relative', 'important');
  element.style.setProperty('background-color', '#ffffff', 'important');
  element.style.setProperty('display', 'block', 'important');
  element.style.setProperty('visibility', 'visible', 'important');
  element.style.setProperty('opacity', '1', 'important');

  const opt = {
    margin: 1,
    filename: getCvFilename(),
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false,
      allowTaint: false,
      backgroundColor: '#ffffff',
      removeContainer: false,
      onclone(clonedDoc) {
        const clonedElement = clonedDoc.getElementById('cv-pdf');
        if (clonedElement) {
          clonedElement.style.display = 'block';
          clonedElement.style.visibility = 'visible';
          clonedElement.style.opacity = '1';
        }
      },
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true,
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  function resetCvStyles() {
    container.style.display = 'none';
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    container.style.visibility = 'hidden';
    container.style.opacity = '0';
    container.style.width = '0';
    container.style.maxWidth = 'none';
    container.style.minWidth = 'none';
    container.style.transform = 'none';
    container.style.height = '0';

    element.style.width = '';
    element.style.maxWidth = '';
    element.style.margin = '';
    element.style.padding = '';
  }

  function restoreButton() {
    if (btnOriginal) {
      btnOriginal.innerHTML = textoOriginal;
      btnOriginal.disabled = false;
    }
  }

  setTimeout(() => {
    element.offsetHeight;
    const rect = element.getBoundingClientRect();

    if (rect.width === 0 || rect.height === 0) {
      const msg = window.i18n ? window.i18n.t('cv.errorRender') : 'Error: CV content is not rendering correctly. Please try again.';
      alert(msg);
      resetCvStyles();
      restoreButton();
      return;
    }

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        resetCvStyles();
        restoreButton();
      })
      .catch(() => {
        resetCvStyles();
        const msg = window.i18n ? window.i18n.t('cv.errorPdf') : 'Error generating PDF. Please try again.';
        alert(msg);
        restoreButton();
      });
  }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
  initEdad();
  initSmoothScroll();
  initMobileNav();
});
