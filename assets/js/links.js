const links = [...document.querySelectorAll("a[href^='#']")];

links.forEach((el) =>
  el.addEventListener("click", (e) => {
    e.preventDefault();
    if (el.classList.contains("nav__link") || el.classList.contains("nav__btn")) {
      closeMenu();
    }

    const linkHref = el.getAttribute("href");
    const section = document.querySelector(linkHref);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  })
);
