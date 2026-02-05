const LANGUAGE_CONFIG = {
  en: {
    name: 'English',
    code: 'en',
  },
  pl: {
    name: 'Polski',
    code: 'pl',
  },
  ua: {
    name: 'Українська',
    code: 'ua',
  },
};

const DEFAULT_LANGUAGE = 'en';
const STORAGE_KEY = 'language';

class LanguageManager {
  constructor() {
    this.currentLang = null;
    this.init();
  }

  init() {
    if (!navigator.cookieEnabled) {
      this.currentLang = DEFAULT_LANGUAGE;
      return;
    }

    const savedLang = this.getSavedLanguage();

    if (savedLang && LANGUAGE_CONFIG[savedLang]) {
      this.currentLang = savedLang;
    } else {
      const browserLang = this.detectBrowserLanguage();
      this.currentLang = browserLang;
      this.saveLanguage(browserLang);
    }
  }

  detectBrowserLanguage() {
    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    return LANGUAGE_CONFIG[browserLang] ? browserLang : DEFAULT_LANGUAGE;
  }

  getSavedLanguage() {
    return localStorage.getItem(STORAGE_KEY);
  }

  saveLanguage(lang) {
    if (navigator.cookieEnabled && LANGUAGE_CONFIG[lang]) {
      localStorage.setItem(STORAGE_KEY, lang);
      this.currentLang = lang;
    }
  }

  changeLanguage(lang) {
    if (LANGUAGE_CONFIG[lang]) {
      this.saveLanguage(lang);
    }
  }

  getCurrentLanguage() {
    return this.currentLang || DEFAULT_LANGUAGE;
  }
}

const languageManager = new LanguageManager();
let currentLang = languageManager.getCurrentLanguage();

let cachedArticlesData = null;
let cachedSectionsData = null;
let splideInstance = null;

const initApp = async () => {
  try {
    const [articlesData, sectionsData] = await Promise.all([getData(), getSectionsData()]);

    cachedArticlesData = articlesData;
    cachedSectionsData = sectionsData;

    const path = window.location.pathname;
    const isArticlePage = path.includes('/article');
    const isBlogPage = path.includes('/blog');

    const select = document.querySelector('.custom-select');
    if (select) {
      const customSelect = new CustomSelect(select);
      customSelect.setSelected(currentLang);

      select.addEventListener('selectChange', (e) => {
        const newLang = e.detail.value;
        languageManager.changeLanguage(newLang);
        currentLang = newLang;

        if (isArticlePage) {
          renderArticleContent(cachedArticlesData, newLang);
        }

        if (isBlogPage) {
          renderSliderContent(cachedArticlesData, newLang);
          renderBlogContent(cachedArticlesData, newLang);
        }

        renderSectionsContent(cachedSectionsData[newLang]);
      });
    }

    if (isArticlePage) {
      renderArticleContent(cachedArticlesData, currentLang);
    }

    if (isBlogPage) {
      renderSliderContent(cachedArticlesData, currentLang);
      renderBlogContent(cachedArticlesData, currentLang);
    }

    renderSectionsContent(cachedSectionsData[currentLang]);
  } catch (error) {
    console.error('Помилка ініціалізації:', error);
  }
};

initApp();
