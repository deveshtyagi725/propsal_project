/* game.js
   - creates hearts (same approach as your main script)
   - coin toss logic, rose bloom + petal spread
   - Next button navigates to rules.html (you can change)
*/

document.addEventListener("DOMContentLoaded", () => {
  // 1) Create hearts background (same as main page)
  (function createHearts(){
    const heartBg = document.getElementById('heartBackground');
    if(!heartBg) return;
    const n = 22;
    for (let i=0;i<n;i++){
      const h = document.createElement('div');
      h.className='heart';
      h.style.left = Math.random()*100 + '%';
      h.style.top  = Math.random()*100 + '%';
      h.style.animationDelay = (Math.random()*6)+'s';
      h.style.animationDuration = (3+Math.random()*5)+'s';
      heartBg.appendChild(h);
    }
  })();

  // 2) Page elements
  const coin = document.getElementById('coin');
  const result = document.getElementById('result');
  const rulesBtn = document.getElementById('rulesBtn');
  const retryBtn = document.getElementById('retryBtn');

  // helper to spawn many petals
  function spawnPetals(x, y, count = 400) {
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'petal';
      // start roughly near x,y with tiny random offset
      const sx = x + (Math.random()*80 - 40);
      const sy = y + (Math.random()*40 - 20);
      p.style.left = sx + 'px';
      p.style.top  = sy + 'px';
      const dx = (Math.random()*300 - 150).toFixed(1) + 'px';
      const dy = (Math.random()*300 + 200).toFixed(1) + 'px';
      const rot = (Math.random()*720 - 360).toFixed(1) + 'deg';
      const dur = (1400 + Math.random()*1200) | 0;
      p.style.setProperty('--dx', dx);
      p.style.setProperty('--dy', dy);
      p.style.setProperty('--rot', rot);
      p.style.setProperty('--dur', dur + 'ms');
      // random small scale
      const s = 0.7 + Math.random()*0.9;
      p.style.transform = `translate(-50%,-50%) scale(${s}) rotate(${(Math.random()*40-20).toFixed(1)}deg)`;
      document.body.appendChild(p);
      // remove when done
      setTimeout(()=> p.remove(), dur + 800);
    }
  }

  // show result with rose bloom + petals
  function showTossResult(side) {
    // show big rose bloom
    const bloom = document.createElement('div');
    bloom.className = 'rose-bloom';
    bloom.textContent = '🌹';
    document.body.appendChild(bloom);
    setTimeout(()=> bloom.remove(), 1100);

    // spawn petals from top center
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.35;
    spawnPetals(cx, cy, 200);

    // display result text
    result.textContent = `Result: ${side}`;
    result.classList.add('show');

    // show controls
    rulesBtn.style.display = 'inline-block';
    retryBtn.style.display = 'inline-block';
  }

  // coin toss handler
  function tossCoin() {
    if(!coin) return;
    // visually spin the coin
    coin.classList.remove('spin');
    void coin.offsetWidth;
    coin.classList.add('spin');

    // hide previous result
    result.classList.remove('show');
    result.textContent = '';

    // determine result after spin ends (900ms)
    setTimeout(()=>{
      const side = Math.random() < 0.5 ? 'Heads' : 'Tails';
      showTossResult(side);
    }, 920);
  }

  // events
  if(coin){
    coin.addEventListener('click', tossCoin);
    // keyboard accessible (Enter / Space)
    coin.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tossCoin(); }
    });
  }

  // rules button (change destination as needed)
  rulesBtn.addEventListener('click', ()=>{
    // navigate to rules page. create rules.html or change path.
    window.location.href = 'rules.html';
  });

  // retry toss
  retryBtn.addEventListener('click', ()=>{
    // reset UI and toss again
    result.classList.remove('show');
    rulesBtn.style.display = 'none';
    retryBtn.style.display = 'none';
    setTimeout(()=> tossCoin(), 250);
  });

});
const coin = document.querySelector('.coin');
const resultEl = document.querySelector('.result');

coin.addEventListener('click', () => {
  // Reset result state
  resultEl.classList.remove('show');
  
  // Trigger coin spin
  coin.classList.remove('spin');
  void coin.offsetWidth; // force reflow (to restart animation)
  coin.classList.add('spin');

  // After spin, decide Heads/Tails
  setTimeout(() => {
    const result = Math.random() < 0.5 ? "Heads 🌟" : "Tails 🌙";
    resultEl.textContent = result;
    resultEl.classList.add('show');

    // Add rose bloom
    const rose = document.createElement('div');
    rose.className = 'rose-bloom';
    rose.textContent = '🌹';
    document.body.appendChild(rose);

    setTimeout(() => rose.remove(), 1200);

    // Add falling petals (5-8 random)
    for (let i = 0; i < 6; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = Math.random() * 100 + 'vw';
      petal.style.top = '-20px';
      petal.style.setProperty('--dur', (1800 + Math.random() * 1000) + 'ms');

      // rose color shades
      petal.style.setProperty('--rose', '#ff85a2');
      petal.style.setProperty('--rose-deep', '#ff4d6d');
      petal.style.setProperty('--rose-dark', '#e60039');

      document.body.appendChild(petal);
      setTimeout(() => petal.remove(), 2500);
    }

  }, 900); // match spin duration
});
