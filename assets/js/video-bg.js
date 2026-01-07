document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".banner__video-bg");
  const muteBtn = document.querySelector(".banner__sound");

  video.play().catch(function (error) {
    console.error("Автоплей заблоковано:", error);
  });

  video.playbackRate = 1.0; // швидкість відтворення

  muteBtn.addEventListener("click", () => {
    if (video.muted) {
      video.muted = false;
      muteBtn.classList.add("active");
      muteBtn.setAttribute("aria-label", "Вимкнути звук");
    } else {
      video.muted = true;
      muteBtn.classList.remove("active");
      muteBtn.setAttribute("aria-label", "Увімкнути звук");
    }
  });
});
