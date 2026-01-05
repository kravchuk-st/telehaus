let lastScroll = 0;
const defaultOffset = 200;
const header = document.querySelector(".header");

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains("hide");

const fixedHeader = () => {
  window.addEventListener("scroll", () => {
    if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
      header.classList.add("hide");
    } else if (scrollPosition() < lastScroll && containHide()) {
      header.classList.remove("hide");
    }

    lastScroll = scrollPosition();
  });
};

fixedHeader();
