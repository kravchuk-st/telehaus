document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector(".banner__video-bg");

  video.play().catch(function (error) {
    console.error("Автоплей заблоковано:", error);
  });

  video.playbackRate = 1.0; // швидкість відтворення
});
