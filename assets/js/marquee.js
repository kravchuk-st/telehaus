new Splide('.marquee-projects', {
  type: 'loop',
  drag: 'free',
  perMove: 1,
  autoWidth: true,
  fixedHeight: 300,
  gap: 20,
  clones: 10,
  cloneStatus: false,
  autoScroll: {
    speed: 0.5,
    pauseOnHover: true,
    pauseOnFocus: false,
  },
  arrows: false,
  pagination: false,
  breakpoints: {
    768: {
      fixedHeight: 250,
      gap: 10,
      autoScroll: {
        speed: 1.2,
      },
    },
  },
}).mount(window.splide.Extensions);

new Splide('.marquee-partners', {
  type: 'loop',
  drag: 'free',
  perMove: 1,
  autoWidth: true,
  fixedHeight: 80,
  gap: 80,
  clones: 10,
  cloneStatus: false,
  autoScroll: {
    speed: 0.5,
    pauseOnHover: true,
    pauseOnFocus: false,
  },
  arrows: false,
  pagination: false,
  breakpoints: {
    768: {
      fixedHeight: 50,
      gap: 35,
      autoScroll: {
        speed: 1,
      },
    },
  },
}).mount(window.splide.Extensions);
