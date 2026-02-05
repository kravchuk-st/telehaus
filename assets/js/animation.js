const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -150px 0px',
};

const handleIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');

      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(handleIntersection, observerOptions);

const initAnimations = () => {
  const animatedElements = document.querySelectorAll('.animation');

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}
