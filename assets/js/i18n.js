const DEFAULT_LANG = 'en';
let currentLang = DEFAULT_LANG;

function getNestedValue(obj, key) {
  return key.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : null), obj);
}

function t(key, lang) {
  const activeLang = lang || currentLang;
  const value = getNestedValue(TRANSLATIONS[activeLang], key);
  if (value === null || value === undefined) {
    return getNestedValue(TRANSLATIONS.en, key) || key;
  }
  return value;
}

function getLang() {
  const stored = localStorage.getItem('lang');
  return stored === 'es' || stored === 'en' ? stored : DEFAULT_LANG;
}

function updateLangSwitcherUI(lang) {
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    const isActive = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('lang-btn-active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

function applyLanguage(lang) {
  currentLang = lang === 'es' ? 'es' : 'en';
  document.documentElement.lang = currentLang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) el.textContent = t(key);
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (key) el.innerHTML = t(key);
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    if (key) el.setAttribute('aria-label', t(key));
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) el.setAttribute('placeholder', t(key));
  });

  const titleKey = document.documentElement.getAttribute('data-meta-title') || 'meta.title';
  const descKey = document.documentElement.getAttribute('data-meta-desc') || 'meta.description';
  const title = t(titleKey);
  if (title) document.title = title;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t(descKey));

  updateLangSwitcherUI(currentLang);
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
}

function setLang(lang) {
  const nextLang = lang === 'es' ? 'es' : 'en';
  localStorage.setItem('lang', nextLang);
  applyLanguage(nextLang);
}

function initLangSwitcher() {
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setLang(btn.getAttribute('data-lang'));
    });
  });
}

function initI18n() {
  currentLang = getLang();
  applyLanguage(currentLang);
  initLangSwitcher();
}

window.i18n = { getLang, setLang, t, applyLanguage };

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  initI18n();
}
