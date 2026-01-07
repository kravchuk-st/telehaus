const baner = document.querySelector('.banner');
const title = baner.querySelector('.banner__title');
const subTitle = baner.querySelector('.banner__descr');
const text = document.querySelector('.article .wrapper');

const url = new URL(window.location.href);
const articleId = url.searchParams.get('id');

const getData = async () => {
  try {
    const res = await fetch(`../assets/data/data.json`);
    const data = await res.json();
    const article = data.find((el) => el.id === Number(articleId));

    if (res.ok) {
      baner.style.background = `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), center/cover no-repeat url("../assets/img/blog/${article.img}")`;
      title.textContent = article.title;
      subTitle.textContent = article.subtitle;
      text.innerHTML = article.text.join('');
    }
  } catch (err) {
    console.error('Помилка:', err);
  }
};

getData();
