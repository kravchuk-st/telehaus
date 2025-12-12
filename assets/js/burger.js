const body = document.body;
const burger = document.querySelector(".burger");
const menu = document.querySelector(".nav");
const overlay = document.querySelector(".overlay");

const openMenu = () => {
  let paddingOffset = window.innerWidth - document.body.offsetWidth + "px";

  menu.classList.add("open");
  burger.classList.add("burger_open");
  burger.setAttribute("aria-expanded", "true");
  burger.setAttribute("aria-label", "Закрити меню");
  body.style.paddingRight = paddingOffset;
  body.classList.add("disable-scroll");
};

const closeMenu = () => {
  menu.classList.remove("open");
  burger.classList.remove("burger_open");
  burger.setAttribute("aria-expanded", "false");
  burger.setAttribute("aria-label", "Відкрити меню");
  body.style = null;
  body.classList.remove("disable-scroll");
};

burger.addEventListener("click", () => {
  if (menu.classList.contains("open")) {
    closeMenu();
  } else {
    openMenu();
  }
});

overlay.addEventListener("click", () => {
  if (menu.classList.contains("open")) {
    closeMenu();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu.classList.contains("open")) {
    closeMenu();
  }
});
