async function loadPortfolioData() {
  const projectsRes = await fetch('assets/data/projects.json');

  if (!projectsRes.ok) {
    throw new Error('Failed to load portfolio data');
  }

  const projectsData = await projectsRes.json();
  const techCatalog = await window.tech.loadTechCatalog();

  return {
    areas: projectsData.areas || [],
    projects: projectsData.projects || [],
    techCatalog,
  };
}

function renderGithub(project, isPrimaryRow) {
  const githubLabel = document.createElement('span');
  githubLabel.setAttribute('data-i18n', 'portfolio.viewGithub');
  githubLabel.textContent = i18nText('portfolio.viewGithub', 'View on GitHub');

  if (!project.github) {
    const disabled = document.createElement('span');
    disabled.className = 'btn-github-disabled';
    disabled.setAttribute('aria-disabled', 'true');
    disabled.innerHTML = '<i class="ti-github"></i> ';
    disabled.appendChild(githubLabel);
    return disabled;
  }

  const link = document.createElement('a');
  link.href = project.github;
  link.target = '_blank';
  link.rel = 'noopener';
  link.className = isPrimaryRow ? 'btn-github-light' : 'btn-primary';
  link.innerHTML = '<i class="ti-github"></i> ';
  link.appendChild(githubLabel);
  return link;
}

function renderProject(project, index, techCatalog) {
  const isPrimaryRow = index % 2 === 1;
  const isImageRight = index % 2 === 1;

  const section = document.createElement('section');
  section.className = `project-row ${isPrimaryRow ? 'project-row-primary' : 'project-row-light'}`;

  const inner = document.createElement('div');
  inner.className = `project-inner ${isImageRight ? 'lg:flex-row-reverse' : 'lg:flex-row'}`;

  const media = document.createElement('div');
  media.className = `project-media ${isImageRight ? 'project-media-right' : 'project-media-left'}`;

  const img = document.createElement('img');
  img.src = project.image;
  img.className = 'project-img';
  img.setAttribute('data-i18n-alt', project.imageAltKey);
  if (project.imageAltKey && window.i18n) {
    img.alt = window.i18n.t(project.imageAltKey);
  }

  const badge = document.createElement('span');
  badge.className = 'project-badge';
  if (project.badgeKey) {
    badge.setAttribute('data-i18n', project.badgeKey);
    badge.textContent = i18nText(project.badgeKey, '');
  } else {
    badge.textContent = project.badge || '';
  }

  media.appendChild(img);
  media.appendChild(badge);

  const content = document.createElement('div');
  content.className = 'project-content';

  const title = document.createElement('h2');
  title.className = 'project-title';
  title.setAttribute('data-i18n', project.titleKey);
  title.textContent = i18nText(project.titleKey, '');

  const desc = document.createElement('p');
  desc.className = 'project-desc';
  desc.setAttribute('data-i18n-html', project.descKey);
  desc.innerHTML = i18nText(project.descKey, '');

  content.appendChild(title);
  content.appendChild(desc);
  content.appendChild(window.tech.renderTechTags(project.tech, techCatalog, { iconsOnly: true }));
  content.appendChild(renderGithub(project, isPrimaryRow));

  if (project.noteKey) {
    const note = document.createElement('p');
    note.className = 'project-note';
    note.setAttribute('data-i18n', project.noteKey);
    note.textContent = i18nText(project.noteKey, '');
    content.appendChild(note);
  }

  inner.appendChild(media);
  inner.appendChild(content);
  section.appendChild(inner);

  return section;
}

function applyImageAlts() {
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    const key = el.getAttribute('data-i18n-alt');
    if (key && window.i18n) {
      el.alt = window.i18n.t(key);
    }
  });
}

function showLoadError(container) {
  const message = window.i18n
    ? window.i18n.t('portfolio.loadError')
    : 'Could not load projects. Please reload the page.';
  container.innerHTML = `<p class="text-center text-gray-500 py-12 px-4">${message}</p>`;
}

function applyI18n() {
  if (window.i18n) {
    window.i18n.applyLanguage(window.i18n.getLang());
    applyImageAlts();
  }
}

function i18nText(key, fallback) {
  return window.i18n ? window.i18n.t(key) : fallback;
}

function createBrainIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'area-card-icon area-card-icon-svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.75');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = `
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
    <path d="M3.337 7.5a3 3 0 0 0-.278 1.4"/>
    <path d="M20.941 8.9a3 3 0 0 0-.278-1.4"/>
    <path d="M3.337 16.5a3 3 0 0 0 .278 1.4"/>
    <path d="M20.941 15.1a3 3 0 0 0 .278 1.4"/>
    <path d="M8.4 19.5a3 3 0 0 0 1.6.5"/>
    <path d="M14 20a3 3 0 0 0 1.6-.5"/>
  `;
  return svg;
}

function createAreaIcon(area) {
  if (area.icon === 'brain') {
    return createBrainIcon();
  }

  const icon = document.createElement('i');
  icon.className = `area-card-icon ${area.icon}`;
  icon.setAttribute('aria-hidden', 'true');
  return icon;
}

function renderAreaCard(area, onSelect, techCatalog) {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = `area-card ${area.enabled ? 'area-card-enabled' : 'area-card-disabled'}`;
  card.dataset.areaId = area.id;
  card.setAttribute('aria-pressed', 'false');

  if (!area.enabled) {
    card.disabled = true;
    card.setAttribute('aria-disabled', 'true');
  }

  const title = document.createElement('h3');
  title.className = 'area-card-title';
  title.setAttribute('data-i18n', area.titleKey);
  title.textContent = i18nText(area.titleKey, area.id);

  card.appendChild(createAreaIcon(area));
  card.appendChild(title);

  const tech = area.tech || [];
  if (tech.length > 0) {
    const techWrap = window.tech.renderTechTags(tech, techCatalog, { iconsOnly: true });
    techWrap.className = 'area-card-tech flex flex-wrap gap-1.5 sm:gap-2';
    card.appendChild(techWrap);
  }

  if (!area.enabled) {
    const learning = document.createElement('span');
    learning.className = 'area-card-learning';
    learning.setAttribute('data-i18n', 'portfolio.learningInProgress');
    learning.textContent = i18nText('portfolio.learningInProgress', 'Learning in progress');
    card.appendChild(learning);
  }

  if (area.enabled) {
    card.addEventListener('click', () => onSelect(area.id));
  }

  return card;
}

function renderProjectsForArea(areaId, projects, techCatalog, projectsContainer) {
  const filtered = projects.filter((project) => project.area === areaId);
  projectsContainer.innerHTML = '';
  projectsContainer.classList.remove('hidden');

  if (filtered.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'text-center text-gray-500 py-12 px-4';
    empty.setAttribute('data-i18n', 'portfolio.emptyArea');
    empty.textContent = i18nText('portfolio.emptyArea', 'No projects in this area yet.');
    projectsContainer.appendChild(empty);
  } else {
    filtered.forEach((project, index) => {
      projectsContainer.appendChild(renderProject(project, index, techCatalog));
    });
  }

  applyI18n();
  projectsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setSelectedArea(areasContainer, areaId) {
  areasContainer.querySelectorAll('.area-card').forEach((card) => {
    const isSelected = card.dataset.areaId === areaId;
    card.classList.toggle('area-card-selected', isSelected);
    card.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
  });
}

async function initPortfolio() {
  const areasContainer = document.getElementById('portfolio-areas');
  const projectsContainer = document.getElementById('portfolio-projects');
  if (!areasContainer || !projectsContainer) return;

  try {
    const { areas, projects, techCatalog } = await loadPortfolioData();
    areasContainer.innerHTML = '';
    projectsContainer.innerHTML = '';
    projectsContainer.classList.add('hidden');

    const handleSelect = (areaId) => {
      setSelectedArea(areasContainer, areaId);
      renderProjectsForArea(areaId, projects, techCatalog, projectsContainer);
    };

    areas.forEach((area) => {
      areasContainer.appendChild(renderAreaCard(area, handleSelect, techCatalog));
    });

    applyI18n();
    document.addEventListener('languageChanged', applyImageAlts);
  } catch (err) {
    console.error('Portfolio load failed:', err);
    showLoadError(areasContainer);
    applyI18n();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initPortfolio();
});
