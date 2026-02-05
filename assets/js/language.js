const LANGUAGE_CONFIG = {
  en: {
    path: '/',
    name: 'English',
    code: 'en',
  },
  pl: {
    path: '/pl',
    name: 'Polski',
    code: 'pl',
  },
  ua: {
    path: '/ua',
    name: 'Українська',
    code: 'ua',
  },
};

const DEFAULT_LANGUAGE = 'en';
const STORAGE_KEY = 'language';

class LanguageManager {
  constructor() {
    this.currentLang = this.detectCurrentPage();
    this.init();
  }

  init() {
    const savedLang = navigator.cookieEnabled ? this.getSavedLanguage() : '';

    if (!savedLang) {
      this.saveLanguage(this.currentLang);
    } else if (savedLang !== this.currentLang) {
      this.redirectToLanguage(savedLang);
      return;
    }

    this.updateDisplay();
  }

  detectCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/') || [];

    if (filename.includes('pl')) return 'pl';
    if (filename.includes('ua')) return 'ua';
    return 'en';
  }

  getSavedLanguage() {
    return localStorage.getItem(STORAGE_KEY);
  }

  saveLanguage(lang) {
    if (navigator.cookieEnabled) {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }

  redirectToLanguage(lang) {
    if (LANGUAGE_CONFIG[lang]) {
      const targetPath = LANGUAGE_CONFIG[lang].path;
      window.location.href = targetPath;
    }
  }

  changeLanguage(lang) {
    if (lang !== this.currentLang && LANGUAGE_CONFIG[lang]) {
      this.saveLanguage(lang);
      this.redirectToLanguage(lang);
    }
  }

  updateDisplay() {
    const display = document.getElementById('currentLangDisplay');
    if (display) {
      const langInfo = LANGUAGE_CONFIG[this.currentLang];
      display.textContent = `${langInfo.name} (${langInfo.code.toUpperCase()})`;
    }
  }

  getCurrentLanguage() {
    return this.currentLang;
  }
}

const languageManager = new LanguageManager();
const currentLang = languageManager.getCurrentLanguage();

// Встановлюємо поточну мову в селекті
customSelect.setSelected(languageManager.getCurrentLanguage());

// Слухаємо зміну мови
select.addEventListener('selectChange', (e) => {
  languageManager.changeLanguage(e.detail.value);
});

getData().then((data) => {
  if (data) {
    renderBlogContent(data, currentLang, 4);
  }
});
