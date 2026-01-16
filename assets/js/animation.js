const options = document.querySelector('.options');
const optionsOffset = options.offsetTop - 300;

const handleScroll = () => {
  const windowOffset = window.pageYOffset;

  if (windowOffset > optionsOffset) {
    options.classList.add('visible');
    window.removeEventListener('scroll', handleScroll);
  }
};

window.addEventListener('scroll', handleScroll);

handleScroll();
