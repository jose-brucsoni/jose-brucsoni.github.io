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

function techInitials(label) {
  const parts = String(label || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) return '?';
  if (parts.length === 1) {
    const word = parts[0].replace(/[^A-Za-z0-9]/g, '');
    if (!word) return parts[0].slice(0, 2).toUpperCase();
    return word.slice(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function hasTechIcon(icon) {
  return Boolean(icon) && icon !== 'generic';
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

function renderTechTags(slugs, techCatalog, options = {}) {
  const iconsOnly = options.iconsOnly === true;
  const container = document.createElement('div');
  container.className = 'flex flex-wrap gap-2 mb-5';

  (slugs || []).forEach((slug) => {
    const { label, icon } = getTechEntry(slug, techCatalog);
    if (iconsOnly && (!icon || icon === 'generic')) return;

    const tag = document.createElement('span');
    tag.className = iconsOnly ? 'tech-tag tech-tag-icon-only' : 'tech-tag';
    tag.dataset.tech = slug;
    tag.appendChild(createTechIcon(icon));

    if (!iconsOnly) {
      const labelEl = document.createElement('span');
      labelEl.className = 'tech-tag-label';
      labelEl.textContent = label;
      tag.appendChild(labelEl);
    } else {
      tag.setAttribute('title', label);
      tag.setAttribute('aria-label', label);
    }

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

    const iconStyle = el.getAttribute('data-tech-style') === 'icon';

    slugs.forEach((slug) => {
      const { label, icon } = getTechEntry(slug, catalog);

      if (iconStyle) {
        const tag = document.createElement('span');
        tag.className = 'tech-icon-btn';
        tag.tabIndex = 0;
        tag.setAttribute('title', label);
        tag.setAttribute('aria-label', label);
        tag.dataset.label = label;

        if (hasTechIcon(icon)) {
          tag.appendChild(createTechIcon(icon));
        } else {
          const initials = document.createElement('span');
          initials.className = 'tech-icon-initials';
          initials.setAttribute('aria-hidden', 'true');
          initials.textContent = techInitials(label);
          tag.appendChild(initials);
        }

        el.appendChild(tag);
        return;
      }

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
  techInitials,
  renderTechTags,
  fillTechContainers,
  loadTechCatalog,
};
