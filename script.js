/* ========= Hearts Background ========= */
(function createHearts() {
  const heartBg = document.getElementById("heartBackground");
  if (!heartBg) return;

  const n = 22;
  for (let i = 0; i < n; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.style.left = Math.random() * 100 + "%";
    h.style.top = Math.random() * 100 + "%";
    h.style.animationDelay = Math.random() * 6 + "s";
    h.style.animationDuration = 3 + Math.random() * 5 + "s";
    heartBg.appendChild(h);
  }
})();

/* ========= Music Autoplay on First Interaction ========= */
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

/* ========= Page Routing ========= */
function showConfessionPage() {
  const urlParams = new URLSearchParams(location.search);
  const name =
    urlParams.get("name") ||
    localStorage.getItem("crushName") ||
    "Beautiful";

  if (location.hash === "#confession") {
    const nameEl = document.getElementById("displayName");
    if (nameEl) nameEl.textContent = name;

    document.getElementById("page1")?.classList.remove("active");
    document.getElementById("page2")?.classList.add("active");
  }
}

function goBack() {
  history.pushState({}, "", location.pathname);
  document.getElementById("page2")?.classList.remove("active");
  document.getElementById("page1")?.classList.add("active");
}

document.addEventListener("DOMContentLoaded", showConfessionPage);
window.addEventListener("hashchange", showConfessionPage);

document.getElementById("btnBack")?.addEventListener("click", () => {
  burstFrom(document.getElementById("btnBack"), { count: 16 });
  goBack();
});

/* ========= WhatsApp Link Generation ========= */
const form = document.getElementById("formGen");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("userName");
  const name = (input?.value || "").trim();

  if (!name) {
    input?.focus();
    burstFrom(form.querySelector(".btn"), { count: 12 });
    return;
  }

  const message = `Hey! I have something special to share with you, ${name}. Open this ✨ ${location.origin}/game.html?name=${encodeURIComponent(
    name
  )}#confession`;

  const wa = `https://wa.me/?text=${encodeURIComponent(message)}`;

  const a = document.getElementById("whatsappLink");
  if (a) a.href = wa;
  document.getElementById("whatsappContainer").style.display = "block";

  localStorage.setItem("crushName", name);
});

/* ========= Flower Petal Burst ========= */
function burstFrom(el, opts = {}) {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const count = opts.count || 24;
  const minDist = 120,
    maxDist = 280;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "petal";

    const angle = Math.random() * 360 * (Math.PI / 180);
    const dist = minDist + Math.random() * (maxDist - minDist);
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - (60 + Math.random() * 60);

    const rot = (Math.random() * 720 - 360).toFixed(1) + "deg";
    const dur = (700 + Math.random() * 700).toFixed(0) + "ms";

    p.style.left = cx + "px";
    p.style.top = cy + "px";
    p.style.setProperty("--dx", dx.toFixed(2) + "px");
    p.style.setProperty("--dy", dy.toFixed(2) + "px");
    p.style.setProperty("--rot", rot);
    p.style.setProperty("--dur", dur);

    const s = 0.8 + Math.random() * 0.8;
    p.style.transform += ` scale(${s}) rotate(${(
      Math.random() * 40 -
      20
    ).toFixed(1)}deg)`;

    document.body.appendChild(p);
    p.addEventListener("animationend", () => p.remove(), { once: true });
  }

  el.classList.remove("sweep");
  void el.offsetWidth; // reflow
  el.classList.add("sweep");
}

/* ========= Attach bursts to buttons ========= */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn[data-burst]");
  if (btn) burstFrom(btn);
});

/* ========= Hover Scene Parallax ========= */
(function parallaxHover() {
  const scenes = document.querySelectorAll(".hover-scene");
  scenes.forEach((scene) => {
    const base = scene.querySelector(".scene.base");
    const alt = scene.querySelector(".scene.alt");
    if (!base || !alt) return;

    const onMove = (e) => {
      const r = scene.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const rx = (y - 0.5) * 6;
      const ry = (x - 0.5) * -6;
      const tx = (x - 0.5) * 18;
      const ty = (y - 0.5) * 14;

      scene.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(-8px)`;
      base.style.transform = `translateZ(0) translate(${tx * 0.3}px, ${
        ty * 0.3
      }px)`;
      alt.style.transform = `translateZ(-60px) scale(1.03) translate(${
        tx * -0.2
      }px, ${ty * -0.2}px)`;
    };

    const reset = () => {
      scene.style.transform = `translateZ(-10px) scale(.985)`;
      base.style.transform = `translateZ(0)`;
      alt.style.transform = `translateZ(-60px) scale(1.03)`;
    };

    scene.addEventListener("mousemove", onMove);
    scene.addEventListener("mouseleave", reset);
  });
})();

/* ========= Flower Burst on Hover ========= */
function createFlowerBurst(x, y, count = 6) {
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "petal";
    p.style.left = x + "px";
    p.style.top = y + "px";

    const angle = Math.random() * 2 * Math.PI;
    const dx = Math.cos(angle) * (80 + Math.random() * 100);
    const dy = Math.sin(angle) * (80 + Math.random() * 100);

    p.style.setProperty("--dx", dx + "px");
    p.style.setProperty("--dy", dy + "px");
    p.style.setProperty("--rot", Math.random() * 360 + "deg");
    p.style.setProperty("--dur", 800 + Math.random() * 800 + "ms");

    document.body.appendChild(p);
    p.addEventListener("animationend", () => p.remove(), { once: true });
  }
}

// Safe hover events
document.querySelector(".photo-box img")?.addEventListener("mouseenter", () => {
  createFlowerBurst(window.innerWidth / 2, window.innerHeight / 2);
});

document.querySelector(".whatsapp-icon")?.addEventListener("mouseenter", (e) => {
  const rect = e.target.getBoundingClientRect();
  createFlowerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
});

document.querySelector(".credit-text")?.addEventListener("mouseenter", (e) => {
  const rect = e.target.getBoundingClientRect();
  createFlowerBurst(rect.left + rect.width / 2, rect.top - 10, 1);
});
