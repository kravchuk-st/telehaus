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
    let submitBtn = thisForm.querySelector('button[type="submit"]');
    let originalBtnHTML = submitBtn.innerHTML;

    const messages = {
      en: 'Message sent',
      pl: 'Wiadomość została wysłana',
      ua: 'Повідомлення надіслано',
    };

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

    submitBtn.disabled = true;
    submitBtn.innerHTML = messages[currentLang] + " <span style='color: green;'>✔</span>";

    setTimeout(() => {
      submitBtn.innerHTML = originalBtnHTML;
      submitBtn.disabled = false;
    }, 5000);

    return false;
  },
});
