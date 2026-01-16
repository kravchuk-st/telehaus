const sliderContent = document.querySelector('.splide__list');
const blog = document.querySelector('.blog__content');

(async () => {
  const data = await getData();

  let content = '';
  let blogContent = '';

  data.toReversed().forEach((el) => {
    content += `<div class="slider__slide splide__slide" style="background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), center/cover no-repeat url('../assets/img/blog/${el.img}')">
      <p class="slider__title">${el.title}</p>
      <p class="slider__descr">${el.subtitle}</p>
    </div>`;

    blogContent += `<a href="../article/?id=${el.id}" class="blog__link btn-reset" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), center/cover no-repeat url('../assets/img/blog/${el.img}')">
        <div class="link__header">
          <span class="link__date">${el.createdAt}</span>
          <span class="link__icon" aria-hidden="true"></span>
        </div>
        <p class="link__title">${el.title}</p>
        <p class="link__descr">${el.subtitle}</p>
      </a>`;
  });

  sliderContent.innerHTML = content;
  blog.innerHTML = blogContent;

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
})();
