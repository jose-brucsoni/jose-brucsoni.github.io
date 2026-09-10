function getTechEntry(slug, catalog) {
  const entry = catalog[slug];
  if (typeof entry === 'string') {
    return { label: entry, icon: 'generic' };
  }
  if (entry && typeof entry === 'object') {
    return {
      label: entry.label || slug,
      icon: entry.icon || 'generic',
    };
  }
  return { label: slug, icon: 'generic' };
}

function createTechIcon(icon) {
  const iconKey = icon || 'generic';

  if (iconKey === 'generic') {
    const el = document.createElement('i');
    el.className = 'ti-package tech-tag-icon';
    el.setAttribute('aria-hidden', 'true');
    return el;
  }

  const img = document.createElement('img');
  img.className = 'tech-tag-icon';
  img.src = iconKey;
  img.alt = '';
  img.setAttribute('aria-hidden', 'true');
  return img;
}

function renderTechTags(slugs, techCatalog) {
  const container = document.createElement('div');
  container.className = 'flex flex-wrap gap-2 mb-5';

  (slugs || []).forEach((slug) => {
    const { label, icon } = getTechEntry(slug, techCatalog);
    const tag = document.createElement('span');
    tag.className = 'tech-tag';
    tag.appendChild(createTechIcon(icon));

    const labelEl = document.createElement('span');
    labelEl.className = 'tech-tag-label';
    labelEl.textContent = label;
    tag.appendChild(labelEl);

    container.appendChild(tag);
  });

  return container;
}

function fillTechContainers(catalog, root) {
  const scope = root || document;

  scope.querySelectorAll('[data-tech]').forEach((el) => {
    const slugs = el
      .getAttribute('data-tech')
      .split(',')
      .map((slug) => slug.trim())
      .filter(Boolean);

    el.innerHTML = '';

    slugs.forEach((slug) => {
      const { label, icon } = getTechEntry(slug, catalog);
      const tag = document.createElement('span');
      tag.className = 'tech-tag';
      tag.appendChild(createTechIcon(icon));

      const labelEl = document.createElement('span');
      labelEl.className = 'tech-tag-label';
      labelEl.textContent = label;
      tag.appendChild(labelEl);

      el.appendChild(tag);
    });
  });
}

async function loadTechCatalog() {
  const res = await fetch('assets/data/tech.json');
  if (!res.ok) {
    throw new Error('Failed to load tech catalog');
  }
  return res.json();
}

window.tech = {
  getTechEntry,
  createTechIcon,
  renderTechTags,
  fillTechContainers,
  loadTechCatalog,
};
