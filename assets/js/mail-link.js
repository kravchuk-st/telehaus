const mailIcon = document.querySelector('.link-icon');

mailIcon.addEventListener('click', async () => {
  const emailLink = mailIcon.previousElementSibling.textContent.trim();
  try {
    await navigator.clipboard.writeText(emailLink);
    mailIcon.classList.add('active');
  } catch (err) {
    console.error('Помилка копіювання:', err);
  }
});
