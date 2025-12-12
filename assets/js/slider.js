new Splide(".slider", {
  perPage: 3,
  perMove: 1,
  type: "loop",
  autoplay: true,
  pauseOnHover: true,
  pagination: false,
  gap: 40,
  flickMaxPages: 1,
  breakpoints: {
    1500: {
      perPage: 2,
      padding: { left: 100, right: 100 },
    },
    1280: {
      padding: { left: 0, right: 0 },
    },
    992: {
      perPage: 1,
      padding: { left: 100, right: 100 },
      gap: 30,
    },
    768: {
      padding: { left: 50, right: 50 },
      gap: 50,
    },
    576: {
      padding: { left: 40, right: 40 },
      gap: 15,
    },
  },
}).mount();
