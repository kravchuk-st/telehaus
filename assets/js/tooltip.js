class Tooltip {
  constructor() {
    this.tooltip = document.querySelector('.tooltip');
    if (!this.tooltip) return;

    this.button = this.tooltip.querySelector('.tooltip__btn');
    if (!this.button) return;

    this.isOpen = false;

    this.onButtonClick = this.onButtonClick.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);

    this.init();
  }

  init() {
    this.button.addEventListener('click', this.onButtonClick);
  }

  open() {
    if (this.isOpen) return;
    this.isOpen = true;
    this.tooltip.classList.add('open');

    setTimeout(() => {
      document.addEventListener('click', this.onDocumentClick);
    }, 0);
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.tooltip.classList.remove('open');

    document.removeEventListener('click', this.onDocumentClick);
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  onButtonClick(e) {
    e.stopPropagation();
    this.toggle();
  }

  onDocumentClick(e) {
    if (!this.tooltip.contains(e.target)) {
      this.close();
    }
  }

  destroy() {
    this.close();
    this.button.removeEventListener('click', this.onButtonClick);
    document.removeEventListener('click', this.onDocumentClick);
    this.button.classList.add('send');
  }
}

const tooltipInstance = new Tooltip();

new window.JustValidate('.tooltip__form', {
  colorWrong: '#ff4f15',
  rules: {
    email: {
      required: true,
      email: true,
    },
  },
  submitHandler: function (thisForm) {
    let formData = new FormData(thisForm);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          tooltipInstance.destroy();
          console.log('Отправлено');
        }
      }
    };

    xhr.open('POST', '../assets/php/mail.php', true);
    xhr.send(formData);

    thisForm.reset();
    tooltipInstance.destroy();
  },
});
