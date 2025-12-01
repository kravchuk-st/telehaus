const accordion = document.querySelector(".accordion");
const accordionBtns = [...accordion.querySelectorAll(".accordion__btn")];

accordionBtns.forEach((el) => {
  el.addEventListener("click", (e) => {
    const accordionItem = e.currentTarget.parentElement;
    const control = accordionItem.querySelector(".accordion__btn");
    const content = accordionItem.querySelector(".accordion__content");

    accordionItem.classList.toggle("open");

    if (accordionItem.classList.contains("open")) {
      control.setAttribute("aria-expanded", true);
      content.setAttribute("aria-hidden", false);
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      control.setAttribute("aria-expanded", false);
      content.setAttribute("aria-hidden", true);
      content.style.maxHeight = null;
    }
  });
});
