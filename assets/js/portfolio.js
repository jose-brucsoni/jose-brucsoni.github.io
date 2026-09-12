const PAGE_SIZE = 2;

const portfolioState = {
  areas: [],
  projects: [],
  techCatalog: {},
  selectedAreaId: null,
  selectedTechs: new Set(),
  page: 1,
};

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
  if (!project.github) {
    const disabled = document.createElement('span');
    disabled.className = 'btn-github-disabled';
    disabled.setAttribute('aria-disabled', 'true');
    disabled.innerHTML = '<i class="ti-github" aria-hidden="true"></i> <i class="ti-lock" aria-hidden="true"></i> ';

    const githubLabel = document.createElement('span');
    githubLabel.setAttribute('data-i18n', 'portfolio.githubPrivate');
    githubLabel.textContent = i18nText('portfolio.githubPrivate', 'Private');
    disabled.appendChild(githubLabel);
    return disabled;
  }

  const link = document.createElement('a');
  link.href = project.github;
  link.target = '_blank';
  link.rel = 'noopener';
  link.className = isPrimaryRow ? 'btn-project-light' : 'btn-project';
  link.innerHTML = '<i class="ti-github" aria-hidden="true"></i> ';

  const githubLabel = document.createElement('span');
  githubLabel.setAttribute('data-i18n', 'portfolio.viewGithub');
  githubLabel.textContent = i18nText('portfolio.viewGithub', 'Github');
  link.appendChild(githubLabel);
  return link;
}

function renderDemo(project, isPrimaryRow) {
  if (!project.demo) {
    const disabled = document.createElement('span');
    disabled.className = 'btn-demo-disabled';
    disabled.setAttribute('aria-disabled', 'true');
    disabled.innerHTML = '<i class="ti-eye" aria-hidden="true"></i> ';

    const demoLabel = document.createElement('span');
    demoLabel.setAttribute('data-i18n', 'portfolio.demoUnavailable');
    demoLabel.textContent = i18nText('portfolio.demoUnavailable', 'Demo');
    disabled.appendChild(demoLabel);
    return disabled;
  }

  const link = document.createElement('a');
  link.href = project.demo;
  link.target = '_blank';
  link.rel = 'noopener';
  link.className = isPrimaryRow ? 'btn-project-light' : 'btn-project';
  link.innerHTML = '<i class="ti-eye" aria-hidden="true"></i> ';

  const demoLabel = document.createElement('span');
  demoLabel.setAttribute('data-i18n', 'portfolio.viewDemo');
  demoLabel.textContent = i18nText('portfolio.viewDemo', 'Demo');
  link.appendChild(demoLabel);
  return link;
}

function renderProject(project, index, techCatalog) {
  const isPrimaryRow = index % 2 === 1;
  const isImageRight = index % 2 === 1;

  const section = document.createElement('section');
  section.className = `project-row ${isPrimaryRow ? 'project-row-primary' : 'project-row-light'}`;

  const inner = document.createElement('div');
  inner.className = `project-inner ${isImageRight ? 'project-inner-reverse' : ''}`;

  const media = document.createElement('div');
  media.className = `project-media ${isImageRight ? 'project-media-right' : 'project-media-left'}`;

  const img = document.createElement('img');
  img.src = project.image;
  img.className = 'project-img';
  img.setAttribute('data-i18n-alt', project.imageAltKey);
  if (project.imageAltKey && window.i18n) {
    img.alt = window.i18n.t(project.imageAltKey);
  }

  media.appendChild(img);

  if (project.tech && project.tech.length > 0) {
    const techWrap = window.tech.renderTechTags(project.tech, techCatalog, { iconsOnly: true });
    techWrap.className = 'project-media-tech';
    techWrap.querySelectorAll('[data-tech]').forEach((tag) => {
      const slug = tag.dataset.tech;
      tag.setAttribute('role', 'button');
      tag.setAttribute('tabindex', '0');
      tag.classList.toggle('is-active', portfolioState.selectedTechs.has(slug));
      tag.addEventListener('click', (event) => {
        event.preventDefault();
        toggleTech(slug);
      });
      tag.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        toggleTech(slug);
      });
    });
    media.appendChild(techWrap);
  }

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

  if (project.noteKey) {
    const note = document.createElement('p');
    note.className = 'project-note';
    note.setAttribute('data-i18n', project.noteKey);
    note.textContent = i18nText(project.noteKey, '');
    content.appendChild(note);
  }

  const actions = document.createElement('div');
  actions.className = 'project-actions';
  actions.appendChild(renderGithub(project, isPrimaryRow));
  actions.appendChild(renderDemo(project, isPrimaryRow));
  content.appendChild(actions);

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

function renderAreaCard(area, onSelect) {
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

function setSelectedArea(areasContainer, areaId) {
  areasContainer.querySelectorAll('.area-card').forEach((card) => {
    const isSelected = card.dataset.areaId === areaId;
    card.classList.toggle('area-card-selected', isSelected);
    card.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
  });
}

function getAreaById(areaId) {
  return portfolioState.areas.find((area) => area.id === areaId) || null;
}

function getProjectsForArea(areaId) {
  return portfolioState.projects.filter((project) => project.area === areaId);
}

function collectAreaTechSlugs(area, areaProjects) {
  const seen = new Set();
  const slugs = [];

  (area.tech || []).forEach((slug) => {
    if (!seen.has(slug)) {
      seen.add(slug);
      slugs.push(slug);
    }
  });

  areaProjects.forEach((project) => {
    (project.tech || []).forEach((slug) => {
      if (!seen.has(slug)) {
        seen.add(slug);
        slugs.push(slug);
      }
    });
  });

  return slugs;
}

function getFilteredProjects() {
  const areaProjects = getProjectsForArea(portfolioState.selectedAreaId);
  if (portfolioState.selectedTechs.size === 0) return areaProjects;
  return areaProjects.filter((project) =>
    (project.tech || []).some((slug) => portfolioState.selectedTechs.has(slug))
  );
}

function scrollToFirstProject() {
  const projectsContainer = document.getElementById('portfolio-projects');
  if (!projectsContainer) return;

  const firstRow = projectsContainer.querySelector('.project-row');
  const target = firstRow || projectsContainer;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function toggleTech(slug) {
  if (portfolioState.selectedTechs.has(slug)) {
    portfolioState.selectedTechs.delete(slug);
  } else {
    portfolioState.selectedTechs.add(slug);
  }
  portfolioState.page = 1;

  const filtersContainer = document.getElementById('portfolio-filters');
  if (filtersContainer) {
    renderFilters(filtersContainer);
  }
  renderCurrentProjects();
  scrollToFirstProject();
}

function renderFilters(filtersContainer) {
  const area = getAreaById(portfolioState.selectedAreaId);
  if (!area) {
    filtersContainer.classList.add('hidden');
    filtersContainer.innerHTML = '';
    return;
  }

  const areaProjects = getProjectsForArea(portfolioState.selectedAreaId);
  const slugs = collectAreaTechSlugs(area, areaProjects);

  filtersContainer.classList.remove('hidden');
  filtersContainer.className = 'portfolio-filters';
  filtersContainer.innerHTML = '';

  const inner = document.createElement('div');
  inner.className = 'portfolio-filters-inner';

  const label = document.createElement('p');
  label.className = 'portfolio-filters-label';
  label.setAttribute('data-i18n', 'portfolio.filterByTech');
  label.textContent = i18nText('portfolio.filterByTech', 'Filter by technology');
  inner.appendChild(label);

  const tags = document.createElement('div');
  tags.className = 'portfolio-filters-tags';

  slugs.forEach((slug) => {
    const { label: techLabel, icon } = window.tech.getTechEntry(slug, portfolioState.techCatalog);
    const isActive = portfolioState.selectedTechs.has(slug);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `tech-filter${isActive ? ' is-active' : ''}`;
    btn.dataset.tech = slug;
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    btn.appendChild(window.tech.createTechIcon(icon));

    const text = document.createElement('span');
    text.textContent = techLabel;
    btn.appendChild(text);

    btn.addEventListener('click', () => {
      toggleTech(slug);
    });

    tags.appendChild(btn);
  });

  inner.appendChild(tags);
  filtersContainer.appendChild(inner);
}

function renderPagination(paginationContainer, totalItems) {
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  if (totalItems <= PAGE_SIZE) {
    paginationContainer.classList.add('hidden');
    paginationContainer.innerHTML = '';
    return;
  }

  if (portfolioState.page > totalPages) {
    portfolioState.page = totalPages;
  }

  paginationContainer.classList.remove('hidden');
  paginationContainer.className = 'portfolio-pagination';
  paginationContainer.innerHTML = '';

  const prev = document.createElement('button');
  prev.type = 'button';
  prev.className = 'pagination-btn';
  prev.setAttribute('data-i18n', 'portfolio.prev');
  prev.textContent = i18nText('portfolio.prev', 'Previous');
  prev.disabled = portfolioState.page <= 1;
  prev.addEventListener('click', () => {
    if (portfolioState.page <= 1) return;
    portfolioState.page -= 1;
    renderCurrentProjects();
  });
  paginationContainer.appendChild(prev);

  for (let page = 1; page <= totalPages; page += 1) {
    const pageBtn = document.createElement('button');
    pageBtn.type = 'button';
    pageBtn.className = `pagination-btn${portfolioState.page === page ? ' is-active' : ''}`;
    pageBtn.textContent = String(page);
    pageBtn.setAttribute('aria-current', portfolioState.page === page ? 'page' : 'false');
    pageBtn.addEventListener('click', () => {
      portfolioState.page = page;
      renderCurrentProjects();
    });
    paginationContainer.appendChild(pageBtn);
  }

  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'pagination-btn';
  next.setAttribute('data-i18n', 'portfolio.next');
  next.textContent = i18nText('portfolio.next', 'Next');
  next.disabled = portfolioState.page >= totalPages;
  next.addEventListener('click', () => {
    if (portfolioState.page >= totalPages) return;
    portfolioState.page += 1;
    renderCurrentProjects();
  });
  paginationContainer.appendChild(next);
}

function renderCurrentProjects() {
  const projectsContainer = document.getElementById('portfolio-projects');
  const paginationContainer = document.getElementById('portfolio-pagination');
  if (!projectsContainer || !paginationContainer) return;

  const filtered = getFilteredProjects();
  const start = (portfolioState.page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  projectsContainer.innerHTML = '';
  projectsContainer.classList.remove('hidden');

  if (filtered.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'text-center text-gray-500 py-12 px-4';
    empty.setAttribute('data-i18n', 'portfolio.emptyArea');
    empty.textContent = i18nText('portfolio.emptyArea', 'No projects in this area yet.');
    projectsContainer.appendChild(empty);
    paginationContainer.classList.add('hidden');
    paginationContainer.innerHTML = '';
  } else {
    pageItems.forEach((project, localIndex) => {
      const globalIndex = start + localIndex;
      projectsContainer.appendChild(
        renderProject(project, globalIndex, portfolioState.techCatalog)
      );
    });
    renderPagination(paginationContainer, filtered.length);
  }

  applyI18n();
}

function selectArea(areaId, areasContainer, filtersContainer) {
  portfolioState.selectedAreaId = areaId;
  portfolioState.selectedTechs = new Set();
  portfolioState.page = 1;

  setSelectedArea(areasContainer, areaId);
  renderFilters(filtersContainer);
  renderCurrentProjects();
  scrollToFirstProject();
}

function setProjectViewportHeight() {
  document.documentElement.style.setProperty('--project-vh', `${window.innerHeight}px`);
}

async function initPortfolio() {
  const areasContainer = document.getElementById('portfolio-areas');
  const filtersContainer = document.getElementById('portfolio-filters');
  const projectsContainer = document.getElementById('portfolio-projects');
  const paginationContainer = document.getElementById('portfolio-pagination');
  if (!areasContainer || !filtersContainer || !projectsContainer || !paginationContainer) return;

  setProjectViewportHeight();
  window.addEventListener('orientationchange', () => {
    window.setTimeout(setProjectViewportHeight, 100);
  });

  try {
    const { areas, projects, techCatalog } = await loadPortfolioData();
    portfolioState.areas = areas;
    portfolioState.projects = projects;
    portfolioState.techCatalog = techCatalog;

    areasContainer.innerHTML = '';
    filtersContainer.innerHTML = '';
    filtersContainer.classList.add('hidden');
    projectsContainer.innerHTML = '';
    projectsContainer.classList.add('hidden');
    paginationContainer.innerHTML = '';
    paginationContainer.classList.add('hidden');

    areas.forEach((area) => {
      areasContainer.appendChild(
        renderAreaCard(area, (areaId) => selectArea(areaId, areasContainer, filtersContainer))
      );
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
