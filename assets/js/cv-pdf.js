function cvT(key) {
  return window.i18n ? window.i18n.t(`cv.${key}`) : key;
}

function buildCvHtml() {
  return `
    <div class="cv-pdf">
      <header class="cv-header">
        <h1>Jose Carlo Suarez Brucsoni</h1>
        <p class="cv-role">${cvT('role')}</p>
        <p class="cv-contact">
          joseca6520@gmail.com · +591 70918874 · ${cvT('city')}<br>
          linkedin.com/in/jose-carlo-suarez-brucsoni · github.com/jose-brucsoni
        </p>
      </header>

      <section class="cv-section">
        <h2 class="cv-section-title">${cvT('educationTitle')}</h2>
        <div class="cv-item">
          <div class="cv-item-head">
            <h3>${cvT('edu2Title')}</h3>
            <span class="date">${cvT('edu2Date')}</span>
          </div>
          <p class="org">${cvT('edu2School')}</p>
        </div>
        <div class="cv-item">
          <div class="cv-item-head">
            <h3>${cvT('edu3Title')}</h3>
            <span class="date">${cvT('edu3Date')}</span>
          </div>
          <p class="org">${cvT('edu3School')}</p>
          <p class="org" style="margin:0;font-size:10px;font-style:italic;">${cvT('edu3Note')}</p>
        </div>
        <div class="cv-item">
          <div class="cv-item-head">
            <h3>${cvT('edu1Title')}</h3>
            <span class="date">${cvT('edu1Date')}</span>
          </div>
          <p class="org">${cvT('edu1School')}</p>
        </div>
      </section>

      <section class="cv-section">
        <h2 class="cv-section-title">${cvT('experienceTitle')}</h2>
        <div class="cv-item">
          <div class="cv-item-head">
            <h3>${cvT('exp1Title')}</h3>
            <span class="date">${cvT('exp1Date')}</span>
          </div>
          <p class="org">${cvT('company')}</p>
        </div>
        <div class="cv-item">
          <div class="cv-item-head">
            <h3>${cvT('exp2Title')}</h3>
            <span class="date">${cvT('exp2Date')}</span>
          </div>
          <p class="org">${cvT('company')}</p>
        </div>
        <div class="cv-item">
          <div class="cv-item-head">
            <h3>${cvT('exp3Title')}</h3>
            <span class="date">${cvT('exp3Date')}</span>
          </div>
          <p class="org">${cvT('exp3Company')}</p>
        </div>
      </section>

      <section class="cv-section">
        <h2 class="cv-section-title">${cvT('teachingTitle')}</h2>
        <div class="cv-item">
          <div class="cv-item-head">
            <h3>${cvT('teachingTitle')}</h3>
            <span class="date">${cvT('teachingPeriod')}</span>
          </div>
          <p class="org">${cvT('teachingDesc')}</p>
        </div>
      </section>

      <section class="cv-section">
        <h2 class="cv-section-title">${cvT('skillsTitle')}</h2>
        <ul class="cv-list plain">
          <li>${cvT('skillOrg')}</li>
          <li>${cvT('skillMethods')}</li>
          <li>${cvT('skillCode')}</li>
          <li>${cvT('skillFrameworks')}</li>
          <li>${cvT('skillInfra')}</li>
          <li>${cvT('skillDb')}</li>
          <li>${cvT('skillCyber')}</li>
          <li>${cvT('skillData')}</li>
          <li>${cvT('skillMobile')}</li>
          <li>${cvT('skillEditors')}</li>
        </ul>
      </section>

      <section class="cv-section">
        <h2 class="cv-section-title">${cvT('languagesTitle')}</h2>
        <ul class="cv-list plain">
          <li>${cvT('langEs')}</li>
          <li>${cvT('langEn')}</li>
        </ul>
      </section>

      <section class="cv-section">
        <h2 class="cv-section-title">${cvT('competitionsTitle')}</h2>
        <ul class="cv-list">
          <li>${cvT('c1')}</li>
          <li>${cvT('c2')}</li>
          <li>${cvT('c3')}</li>
        </ul>
      </section>

      <section class="cv-section">
        <h2 class="cv-section-title">${cvT('projectsTitle')}</h2>
        <p class="org" style="margin:0;font-size:10px;">${cvT('projectsDesc')}</p>
      </section>

      <section class="cv-section">
        <h2 class="cv-section-title">${cvT('additionalTitle')}</h2>
        <p class="org" style="margin:0;font-size:10px;">${cvT('license')}</p>
      </section>
    </div>
  `;
}

function waitForStylesheet(linkEl) {
  return new Promise((resolve) => {
    if (linkEl.sheet) {
      resolve();
      return;
    }
    linkEl.addEventListener('load', () => resolve(), { once: true });
    linkEl.addEventListener('error', () => resolve(), { once: true });
    // Fallback if events already fired
    setTimeout(resolve, 400);
  });
}

async function createCvIframe(cvHtml) {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('aria-hidden', 'true');
  iframe.style.cssText =
    'position:fixed;left:-10000px;top:0;width:210mm;height:297mm;border:0;opacity:0;pointer-events:none;';
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <base href="${window.location.href}">
  <link rel="stylesheet" href="assets/css/cv-pdf.css" id="cv-pdf-stylesheet">
  <style>
    html, body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #111111;
    }
    #cv-pdf-container,
    #cv-pdf-container[data-generating="true"] {
      display: block !important;
      position: static !important;
      left: auto !important;
      top: auto !important;
      transform: none !important;
      width: 210mm !important;
      visibility: visible !important;
      opacity: 1 !important;
      z-index: auto !important;
      overflow: visible !important;
      height: auto !important;
    }
  </style>
</head>
<body>
  <div id="cv-pdf-container" data-generating="true">${cvHtml}</div>
</body>
</html>`);
  doc.close();

  const linkEl = doc.getElementById('cv-pdf-stylesheet');
  if (linkEl) await waitForStylesheet(linkEl);
  // Let layout settle after CSS apply
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

  const element = doc.querySelector('.cv-pdf');
  return { iframe, element };
}

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

function canvasToPdf(canvas) {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

  // Pixels of the source canvas that fit in one A4 page
  const pxPerMm = canvas.width / A4_WIDTH_MM;
  const pageHeightPx = Math.floor(A4_HEIGHT_MM * pxPerMm);

  let renderedPx = 0;
  let pageIndex = 0;

  while (renderedPx < canvas.height) {
    const slicePx = Math.min(pageHeightPx, canvas.height - renderedPx);

    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = canvas.width;
    pageCanvas.height = slicePx;

    const ctx = pageCanvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
    ctx.drawImage(canvas, 0, renderedPx, canvas.width, slicePx, 0, 0, canvas.width, slicePx);

    if (pageIndex > 0) pdf.addPage();
    pdf.addImage(
      pageCanvas.toDataURL('image/jpeg', 0.98),
      'JPEG',
      0,
      0,
      A4_WIDTH_MM,
      slicePx / pxPerMm
    );

    renderedPx += slicePx;
    pageIndex += 1;
  }

  return pdf;
}

const CONTACT = {
  email: 'joseca6520@gmail.com',
  phone: '+591 70918874',
  linkedin: 'https://www.linkedin.com/in/jose-carlo-suarez-brucsoni-5588ba272',
  github: 'https://github.com/jose-brucsoni',
};

const ATS_MARGIN_MM = 18;

// Plain-text, single-column PDF so applicant tracking systems can extract the content
function createAtsWriter() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - ATS_MARGIN_MM * 2;
  let y = ATS_MARGIN_MM;

  const lineHeight = (size) => size * 0.3528 * 1.32;

  function newPage() {
    doc.addPage();
    y = ATS_MARGIN_MM;
  }

  function write(content, options = {}) {
    const size = options.size || 10;
    const indent = options.indent || 0;
    doc.setFont('helvetica', options.style || 'normal');
    doc.setFontSize(size);

    const lh = lineHeight(size);
    doc.splitTextToSize(String(content), maxWidth - indent).forEach((line) => {
      if (y + lh > pageHeight - ATS_MARGIN_MM) newPage();
      doc.text(line, ATS_MARGIN_MM + indent, y);
      y += lh;
    });
  }

  function spacer(mm) {
    y += mm;
  }

  function sectionTitle(label) {
    // Avoid orphan headings at the bottom of a page
    if (y + 16 > pageHeight - ATS_MARGIN_MM) newPage();
    y += 4;
    write(label, { size: 11, style: 'bold' });
    doc.setDrawColor(90);
    doc.setLineWidth(0.3);
    doc.line(ATS_MARGIN_MM, y - 1, pageWidth - ATS_MARGIN_MM, y - 1);
    y += 2;
  }

  function entry(title, org, date) {
    write(title, { size: 10.5, style: 'bold' });
    if (org) write(org, { size: 10 });
    if (date) write(date, { size: 9.5, style: 'italic' });
  }

  function bullets(items) {
    items.forEach((item) => write(`- ${item}`, { size: 10, indent: 3 }));
  }

  return { doc, write, spacer, sectionTitle, entry, bullets };
}

function buildAtsPdf() {
  const cv = createAtsWriter();

  cv.write('Jose Carlo Suarez Brucsoni', { size: 16, style: 'bold' });
  cv.write(cvT('role'), { size: 10.5 });
  cv.spacer(1.5);
  cv.write(`${cvT('email')} ${CONTACT.email}`);
  cv.write(`${cvT('phone')} ${CONTACT.phone}`);
  cv.write(`${cvT('location')} ${cvT('city')}`);
  cv.write(`${cvT('linkedin')} ${CONTACT.linkedin}`);
  cv.write(`${cvT('github')} ${CONTACT.github}`);

  cv.sectionTitle(cvT('experienceTitle'));
  cv.entry(cvT('exp1Title'), cvT('company'), cvT('exp1Date'));
  cv.spacer(2);
  cv.entry(cvT('exp2Title'), cvT('company'), cvT('exp2Date'));
  cv.spacer(2);
  cv.entry(cvT('exp3Title'), cvT('exp3Company'), cvT('exp3Date'));

  cv.sectionTitle(cvT('educationTitle'));
  cv.entry(cvT('edu2Title'), cvT('edu2School'), cvT('edu2Date'));
  cv.spacer(2);
  cv.entry(cvT('edu3Title'), cvT('edu3School'), cvT('edu3Date'));
  cv.write(cvT('edu3Note'), { size: 9.5, style: 'italic' });
  cv.spacer(2);
  cv.entry(cvT('edu1Title'), cvT('edu1School'), cvT('edu1Date'));

  cv.sectionTitle(cvT('skillsTitle'));
  [
    'skillOrg',
    'skillMethods',
    'skillCode',
    'skillFrameworks',
    'skillInfra',
    'skillDb',
    'skillCyber',
    'skillData',
    'skillMobile',
    'skillEditors',
  ].forEach((key) => cv.write(cvT(key)));

  cv.sectionTitle(cvT('languagesTitle'));
  cv.write(cvT('langEs'));
  cv.write(cvT('langEn'));

  cv.sectionTitle(cvT('teachingTitle'));
  cv.write(cvT('teachingPeriod'), { size: 9.5, style: 'italic' });
  cv.write(cvT('teachingDesc'));

  cv.sectionTitle(cvT('competitionsTitle'));
  cv.bullets([cvT('c1'), cvT('c2'), cvT('c3')]);

  cv.sectionTitle(cvT('projectsTitle'));
  cv.write(cvT('projectsDesc'));

  cv.sectionTitle(cvT('additionalTitle'));
  cv.write(cvT('license'));

  return cv.doc;
}

async function buildHarvardPdf() {
  let iframe = null;
  try {
    const created = await createCvIframe(buildCvHtml());
    iframe = created.iframe;

    if (!created.element) {
      throw new Error('CV element not found in iframe');
    }

    const canvas = await html2canvas(created.element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    return canvasToPdf(canvas);
  } finally {
    if (iframe && iframe.parentNode) {
      iframe.parentNode.removeChild(iframe);
    }
  }
}

function openPdf(pdf, filename) {
  const url = URL.createObjectURL(pdf.output('blob'));
  const win = window.open(url, '_blank');
  if (!win) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  }
}

async function generateAndOpenCvPdf(format) {
  if (!window.jspdf || (format === 'harvard' && typeof html2canvas === 'undefined')) {
    alert(cvT('errorPdf'));
    return;
  }

  const triggers = document.querySelectorAll('[data-cv-menu-trigger]');
  const originalLabels = [];

  triggers.forEach((btn, i) => {
    const label = btn.querySelector('[data-i18n="hero.downloadCv"]') || btn.querySelector('span');
    originalLabels[i] = label ? label.textContent : '';
    btn.disabled = true;
    if (label) label.textContent = cvT('generating');
  });

  try {
    const pdf = format === 'ats' ? buildAtsPdf() : await buildHarvardPdf();
    openPdf(pdf, format === 'ats' ? cvT('filenameAts') : cvT('filename'));
  } catch (err) {
    console.error(err);
    alert(cvT('errorPdf'));
  } finally {
    triggers.forEach((btn, i) => {
      btn.disabled = false;
      const label = btn.querySelector('[data-i18n="hero.downloadCv"]') || btn.querySelector('span');
      if (label) {
        label.textContent = window.i18n
          ? window.i18n.t('hero.downloadCv')
          : originalLabels[i];
      }
    });
  }
}

function closeAllCvMenus() {
  document.querySelectorAll('[data-cv-menu-trigger]').forEach((trigger) => {
    trigger.setAttribute('aria-expanded', 'false');
    const menu = trigger.parentElement.querySelector('.cv-menu');
    if (menu) menu.classList.add('hidden');
  });
}

function initCvMenus() {
  const wraps = document.querySelectorAll('.cv-menu-wrap');
  if (!wraps.length) return;

  wraps.forEach((wrap) => {
    const trigger = wrap.querySelector('[data-cv-menu-trigger]');
    const menu = wrap.querySelector('.cv-menu');
    if (!trigger || !menu) return;

    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      closeAllCvMenus();
      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        menu.classList.remove('hidden');
      }
    });

    menu.querySelectorAll('[data-cv-format]').forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        closeAllCvMenus();
        generateAndOpenCvPdf(item.dataset.cvFormat);
      });
    });
  });

  document.addEventListener('click', closeAllCvMenus);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAllCvMenus();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCvMenus);
} else {
  initCvMenus();
}
