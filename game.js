

document.addEventListener("DOMContentLoaded", () => {
  // === 0) Music setup (same as index page) ===
  const music = document.getElementById("bgMusic");
  if (music) {
    music.volume = 1.0;

    function enableMusic() {
      if (music.muted) {
        music.muted = false;
        music.play().catch(err =>
          console.warn("Music play blocked:", err)
        );
      }
    }

    // enable on first user gesture
    document.addEventListener("click", enableMusic, { once: true });
  }

  // === 1) Create hearts background (same as main page) ===
  (function createHearts() {
    const heartBg = document.getElementById('heartBackground');
    if (!heartBg) return;
    const n = 22;
    for (let i = 0; i < n; i++) {
      const h = document.createElement('div');
      h.className = 'heart';
      h.style.left = Math.random() * 100 + '%';
      h.style.top = Math.random() * 100 + '%';
      h.style.animationDelay = (Math.random() * 6) + 's';
      h.style.animationDuration = (3 + Math.random() * 5) + 's';
      heartBg.appendChild(h);
    }
  })();

  // === 2) Page elements ===
  const coin = document.getElementById('coin');
  const result = document.getElementById('result');
  const rulesBtn = document.getElementById('rulesBtn');
  const retryBtn = document.getElementById('retryBtn');

  // helper to spawn many petals
  function spawnPetals(x, y, count = 400) {
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'petal';
      const sx = x + (Math.random() * 80 - 40);
      const sy = y + (Math.random() * 40 - 20);
      p.style.left = sx + 'px';
      p.style.top = sy + 'px';
      const dx = (Math.random() * 300 - 150).toFixed(1) + 'px';
      const dy = (Math.random() * 300 + 200).toFixed(1) + 'px';
      const rot = (Math.random() * 720 - 360).toFixed(1) + 'deg';
      const dur = (1400 + Math.random() * 1200) | 0;
      p.style.setProperty('--dx', dx);
      p.style.setProperty('--dy', dy);
      p.style.setProperty('--rot', rot);
      p.style.setProperty('--dur', dur + 'ms');
      const s = 0.7 + Math.random() * 0.9;
      p.style.transform = `translate(-50%,-50%) scale(${s}) rotate(${(Math.random() * 40 - 20).toFixed(1)}deg)`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), dur + 800);
    }
  }

  // show result with rose bloom + petals
  function showTossResult(side) {
    const bloom = document.createElement('div');
    bloom.className = 'rose-bloom';
    bloom.textContent = '🌹';
    document.body.appendChild(bloom);
    setTimeout(() => bloom.remove(), 1100);

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.35;
    spawnPetals(cx, cy, 200);

    result.textContent = `Result: ${side}`;
    result.classList.add('show');

    rulesBtn.style.display = 'inline-block';
    retryBtn.style.display = 'inline-block';
  }

  // coin toss handler
  function tossCoin() {
    if (!coin) return;
    coin.classList.remove('spin');
    void coin.offsetWidth;
    coin.classList.add('spin');

    result.classList.remove('show');
    result.textContent = '';

    setTimeout(() => {
      const side = Math.random() < 0.5 ? 'Heads' : 'Tails';
      showTossResult(side);
    }, 920);
  }

  if (coin) {
    coin.addEventListener('click', tossCoin);
    coin.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tossCoin(); }
    });
  }

  rulesBtn.addEventListener('click', () => {
    window.location.href = 'rules.html';
  });

  retryBtn.addEventListener('click', () => {
    result.classList.remove('show');
    rulesBtn.style.display = 'none';
    retryBtn.style.display = 'none';
    setTimeout(() => tossCoin(), 250);
  });

});
