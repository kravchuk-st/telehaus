const blog = document.querySelector('.blog__content');

const getData = async () => {
  try {
    const res = await fetch(`../assets/data/data.json`);
    const data = await res.json();

    if (res.ok) {
      let blogContent = '';
      data.forEach((el) => {
        blogContent += `<a href="./article/?id=${el.id}" class="blog__link btn-reset" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), center/cover no-repeat url('./assets/img/blog/${el.img}')">
        <span class="link__icon" aria-hidden="true"></span>
        <p class="link__title">${el.title}</p>
        <p class="link__descr">${el.subtitle}</p>
      </a>`;
      });
      blog.innerHTML = blogContent;
    }
  } catch (err) {
    console.error('Помилка:', err);
  }
};

getData();
