document.addEventListener("DOMContentLoaded", function () {
  const scoreEl = document.getElementById("score");
  const timeEl = document.getElementById("time");
  const bestEl = document.getElementById("best");
  const coinsEl = document.getElementById("coins");
  const levelEl = document.getElementById("level");
  const messageEl = document.getElementById("message");
  const progressBar = document.getElementById("progressBar");
  const arena = document.getElementById("arena");
  const target = document.getElementById("target");
  const startBtn = document.getElementById("start");

  let score = 0;
  let time = 30;
  let playing = false;
  let timer;

  let coins = Number(localStorage.getItem("tapMasterCoins")) || 0;
  let level = Number(localStorage.getItem("tapMasterLevel")) || 1;
  let best = Number(localStorage.getItem("tapMasterBest")) || 0;

  coinsEl.textContent = coins;
  levelEl.textContent = level;
  bestEl.textContent = best;

  function moveTarget() {
    const x = Math.random() * (arena.clientWidth - 65);
    const y = Math.random() * (arena.clientHeight - 65);

    target.style.left = x + "px";
    target.style.top = y + "px";
  }

  function startGame() {
    clearInterval(timer);

    score = 0;
    time = 30;
    playing = true;

    scoreEl.textContent = score;
    timeEl.textContent = time;
    messageEl.textContent = "🎯 Tap the target!";

    startBtn.disabled = true;
    target.style.display = "block";

    moveTarget();

    timer = setInterval(function () {
      time--;
      timeEl.textContent = time;

      if (time <= 0) {
        clearInterval(timer);
        playing = false;
        target.style.display = "none";
        startBtn.disabled = false;
        messageEl.textContent = "🏁 Game Over! Score: " + score;
      }
    }, 1000);
  }

  target.addEventListener("click", function () {
    if (!playing) return;

    score++;
    coins++;

    scoreEl.textContent = score;
    coinsEl.textContent = coins;

    localStorage.setItem("tapMasterCoins", coins);

    const needed = level * 10;
    const progress = Math.min((score / needed) * 100, 100);

    progressBar.style.width = progress + "%";

    if (score >= needed) {
      level++;
      levelEl.textContent = level;
      localStorage.setItem("tapMasterLevel", level);
    }

    moveTarget();
  });

  startBtn.addEventListener("click", startGame);
});
