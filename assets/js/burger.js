const burger = document.querySelector(".burger");

burger.addEventListener("click", () => {
  let paddingOffset = window.innerWidth - document.body.offsetWidth + "px";
  burger.classList.toggle("burger_open");
});
