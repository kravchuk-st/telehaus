const baner = document.querySelector('.banner');
const title = baner.querySelector('.banner__title');
const subTitle = baner.querySelector('.banner__descr');
const text = document.querySelector('.article .wrapper');

const url = new URL(window.location.href);
const articleId = url.searchParams.get('id');

getData().then((data) => {
  const article = data.find((el) => el.id === Number(articleId));

  baner.style.background = `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), center/cover no-repeat url("../assets/img/blog/${article.img}")`;
  title.textContent = article.title;
  subTitle.textContent = article.subtitle;
  text.innerHTML = article.text.join('') + `<p class="date">${article.createdAt}</p>`;
});
