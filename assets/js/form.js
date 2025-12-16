const form = document.querySelector(".request__form");
const nameSelector = form.querySelector('input[id="name"]');
const telSelector = form.querySelector('input[type="tel"]');
// const inputMask = new Inputmask("+7 (999) 999-99-99");
// inputMask.mask(telSelector);

new window.JustValidate(".request__form", {
  rules: {
    name: {
      required: true,
      minLength: 3,
      maxLength: 50,
      function: () => {
        const name = nameSelector.value.trim();
        return /^[\p{L}\s'-]+$/u.test(name);
      },
    },
    tel: {
      required: true,
      function: () => {
        const phone = telSelector.inputmask.unmaskedvalue();
        return Number(phone) && phone.length === 10;
      },
    },
  },
  colorWrong: "#ff4f15",
  submitHandler: function (thisForm) {
    let formData = new FormData(thisForm);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("Отправлено");
        }
      }
    };

    xhr.open("POST", "../assets/php/mail.php", true);
    xhr.send(formData);

    thisForm.reset();
  },
});
