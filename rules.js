document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("goGame");
  btn.addEventListener("click", () => {
    btn.innerText = "Loading... 💫";
    btn.style.transform = "scale(1.15)";
    setTimeout(() => {
      window.location.href = "game.html"; // redirect to game page
    }, 1000);
  });
});
