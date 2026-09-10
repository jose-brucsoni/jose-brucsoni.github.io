async function loadPortfolioData() {
  const projectsRes = await fetch('assets/data/projects.json');

  if (!projectsRes.ok) {
    throw new Error('Failed to load portfolio data');
  }

  const projectsData = await projectsRes.json();
  const techCatalog = await window.tech.loadTechCatalog();

  return {
    projects: projectsData.projects || [],
    techCatalog,
  };
}

function renderGithub(project, isPrimaryRow) {
  const githubLabel = document.createElement('span');
  githubLabel.setAttribute('data-i18n', 'portfolio.viewGithub');
  githubLabel.textContent = 'View on GitHub';

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

  const desc = document.createElement('p');
  desc.className = 'project-desc';
  desc.setAttribute('data-i18n-html', project.descKey);

  content.appendChild(title);
  content.appendChild(desc);
  content.appendChild(window.tech.renderTechTags(project.tech, techCatalog));
  content.appendChild(renderGithub(project, isPrimaryRow));

  if (project.noteKey) {
    const note = document.createElement('p');
    note.className = 'project-note';
    note.setAttribute('data-i18n', project.noteKey);
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

async function initPortfolio() {
  const container = document.getElementById('portfolio-projects');
  if (!container) return;

  try {
    const { projects, techCatalog } = await loadPortfolioData();
    container.innerHTML = '';

    projects.forEach((project, index) => {
      container.appendChild(renderProject(project, index, techCatalog));
    });

    if (window.i18n) {
      window.i18n.applyLanguage(window.i18n.getLang());
      applyImageAlts();
    }

    document.addEventListener('languageChanged', applyImageAlts);
  } catch (err) {
    console.error('Portfolio load failed:', err);
    showLoadError(container);
    if (window.i18n) {
      window.i18n.applyLanguage(window.i18n.getLang());
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initPortfolio();
});
