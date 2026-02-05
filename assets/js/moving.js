const sections = [...document.querySelectorAll('section'), document.querySelector('footer')];
const prevBtn = document.querySelector('.section-btn--prev');
const nextBtn = document.querySelector('.section-btn--next');

let currentSectionIndex = 0;

const updateBtns = () => {
  prevBtn.disabled = currentSectionIndex === 0;
  nextBtn.disabled = currentSectionIndex === sections.length - 1;
};

const observ = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        currentSectionIndex = sections.indexOf(entry.target);
        updateBtns();
      }
    });
  },
  {
    threshold: 0.4,
  }
);

sections.forEach((section) => observ.observe(section));

const scrollToSection = (index) => {
  if (index >= 0 && index < sections.length) {
    sections[index].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

prevBtn.addEventListener('click', () => {
  if (currentSectionIndex > 0) {
    scrollToSection(currentSectionIndex - 1);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentSectionIndex < sections.length - 1) {
    scrollToSection(currentSectionIndex + 1);
  }
});

updateBtns();
