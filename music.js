(function setupMusic() {
  const audio = document.getElementById("bgMusic");
  if (!audio) return;

  const tryPlay = () => {
    audio.volume = 0.8;
    audio.play().catch(() => {});
    window.removeEventListener("pointerdown", tryPlay);
    window.removeEventListener("keydown", tryPlay);
  };
  window.addEventListener("pointerdown", tryPlay, { once: true });
  window.addEventListener("keydown", tryPlay, { once: true });
})();