new window.JustValidate('.request__form', {
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
          console.log('Відправлено успішно');
        } else {
          console.error('Помилка відправки:', xhr.status);
        }
      }
    };

    xhr.open('POST', '/assets/php/mail.php', true);
    xhr.send(formData);

    thisForm.reset();
  },
});
