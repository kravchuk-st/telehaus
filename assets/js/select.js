const select = document.querySelector('.custom-select');

class CustomSelect {
  constructor(element) {
    this.element = element;
    this.trigger = element.querySelector('.select-trigger');
    this.options = element.querySelector('.select-options');
    this.selectText = element.querySelector('.select-text');
    this.optionElements = element.querySelectorAll('.select-option');
    this.isOpen = false;
    this.selectedValue = null;

    this.init();
  }

  init() {
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    this.optionElements.forEach((option) => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectOption(option);
      });
    });

    document.addEventListener('click', () => {
      if (this.isOpen) {
        this.close();
      }
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.trigger.classList.add('active');
    this.options.classList.add('active');
  }

  close() {
    this.isOpen = false;
    this.trigger.classList.remove('active');
    this.options.classList.remove('active');
  }

  selectOption(option) {
    this.optionElements.forEach((opt) => opt.classList.remove('selected'));

    option.classList.add('selected');
    this.selectedValue = option.getAttribute('data-value');
    this.selectText.textContent = option.textContent;

    this.close();
    this.onChange();
  }

  onChange() {
    const event = new CustomEvent('selectChange', {
      detail: {
        value: this.selectedValue,
        text: this.selectText.textContent,
      },
    });
    this.element.dispatchEvent(event);
  }

  setSelected(value) {
    const option = Array.from(this.optionElements).find((opt) => opt.getAttribute('data-value') === value);
    if (option) {
      this.optionElements.forEach((opt) => opt.classList.remove('selected'));
      option.classList.add('selected');
      this.selectedValue = value;
      this.selectText.textContent = option.textContent;
    }
  }
}

const customSelect = new CustomSelect(select);
