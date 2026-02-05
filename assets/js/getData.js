const getData = async () => {
  try {
    const res = await fetch(`../assets/data/data.json`);

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.error('Помилка:', err);
  }
};

const getSectionsData = async () => {
  try {
    const res = await fetch(`../assets/data/sectionData.json`);

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.error('Помилка:', err);
  }
};

const renderBlogContent = (data, currentLang, articlesLimit) => {
  const blog = document.querySelector('.blog__content');

  const newData = articlesLimit ? data.toReversed().slice(0, articlesLimit) : data.toReversed();
  let blogContent = '';

  newData.forEach((el) => {
    blogContent += `<a href="/article/?id=${el.id}" class="blog__link btn-reset" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), center/cover no-repeat url('/assets/img/blog/${el.img}')">
      <div class="link__header">
        <span class="link__date">${el.createdAt}</span>
        <span class="link__icon" aria-hidden="true"></span>
      </div>
      <p class="link__title">${el[currentLang].title}</p>
      <p class="link__descr">${el[currentLang].subtitle}</p>
    </a>`;
  });

  blog.innerHTML = blogContent;
};

const renderSliderContent = (data, currentLang) => {
  const slider = document.querySelector('.splide__list');

  if (!slider) {
    console.warn('Slider element not found');
    return;
  }

  const newData = data.toReversed();
  let sliderContent = '';

  newData.forEach((el) => {
    const langData = el[currentLang] || el.ua || el.en;
    sliderContent += `<div class="slider__slide splide__slide" style="background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), center/cover no-repeat url('../assets/img/blog/${el.img}')">
      <p class="slider__title">${langData.title}</p>
      <p class="slider__descr">${langData.subtitle}</p>
    </div>`;
  });

  slider.innerHTML = sliderContent;

  requestAnimationFrame(() => {
    const existingSplide = document.querySelector('.splide.is-initialized');
    if (existingSplide) {
      const splideInstance = existingSplide.splide;
      if (splideInstance) {
        splideInstance.destroy();
      }
    }

    new Splide('.splide', {
      perPage: 1,
      perMove: 1,
      type: 'loop',
      autoplay: true,
      pauseOnHover: true,
      pagination: false,
      gap: 5,
      flickMaxPages: 1,
      fixedHeight: 420,
      arrows: false,
    }).mount();
  });
};

const renderArticleContent = (data, currentLang) => {
  const baner = document.querySelector('.banner');
  const title = baner?.querySelector('.banner__title');
  const subTitle = baner?.querySelector('.banner__descr');
  const text = document.querySelector('.article__text');
  const homeBtn = document.querySelector('.article__btn .btn-text');

  const articleBtnText = {
    en: 'Back to Previous Page',
    pl: 'Na stronę główną',
    ua: 'на головну',
  };

  const url = new URL(window.location.href);
  const articleId = url.searchParams.get('id');

  const article = data.find((el) => el.id === Number(articleId));

  baner.style.background = `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), center/cover no-repeat url("/assets/img/blog/${article.img}")`;
  title.textContent = article[currentLang].title;
  subTitle.textContent = article[currentLang].subtitle;
  text.innerHTML = article[currentLang].text.join('') + `<p class="date">${article.createdAt}</p>`;
  homeBtn.textContent = articleBtnText[currentLang];
};

const renderSectionsContent = (data) => {
  const header = document.querySelector('.header');
  const headerLinks = [...header.querySelectorAll('.nav__link')];
  const headerBtns = [...header.querySelectorAll('.btn')];
  const blog = document.querySelector('.blog');
  const blogTitle = blog?.querySelector('.title__text');
  const blogSubtext = blog?.querySelector('.title__subtext');
  const blogBtn = blog?.querySelector('.btn .btn-text');
  const footer = document.querySelector('footer');
  const footerTitle = footer.querySelector('.contacts__title');
  const footerLocation = footer.querySelector('.address__location');
  const footerPoint = footer.querySelector('.address__point');
  const footerLink = footer.querySelector('.address__link');
  const footerEmail = footer.querySelector('label[for="email"]');
  const footerTextarea = footer.querySelector('label[for="descr"]');
  const footerBtn = footer.querySelector('.form__btn .btn-text');

  headerLinks.forEach((el, i) => {
    el.textContent = data.headerLinks[i];
  });

  headerBtns.forEach((el) => (el.textContent = data.headerBtn));

  if (blog) {
    blogTitle.textContent = data.blogTitle;
    blogSubtext.textContent = data.blogSUbtext;
    blogBtn.textContent = data.blogBtn;
  }

  footerTitle.textContent = data.footerTitle;
  footerLocation.textContent = data.footerLocation;
  footerPoint.textContent = data.footerPoint;
  footerLink.textContent = data.footerLink;
  footerEmail.textContent = data.footerEmail;
  footerTextarea.textContent = data.footerTextarea;
  footerBtn.textContent = data.footerBtn;
};
