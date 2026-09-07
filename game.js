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
let coins = Number(localStorage.getItem("tapMasterCoins")) || 0;
let level = Number(localStorage.getItem("tapMasterLevel")) || 1;
let best = Number(localStorage.getItem("tapMasterBest")) || 0;

let timer = null;
let playing = false;

coinsEl.textContent = coins;
levelEl.textContent = level;
bestEl.textContent = best;

function moveTarget() {
  const maxX = Math.max(0, arena.clientWidth - target.offsetWidth);
  const maxY = Math.max(0, arena.clientHeight - target.offsetHeight);

  target.style.left = Math.random() * maxX + "px";
  target.style.top = Math.random() * maxY + "px";
}

function startGame() {
  clearInterval(timer);

  score = 0;
  time = 30;
  playing = true;

  scoreEl.textContent = score;
  timeEl.textContent = time;
  messageEl.textContent = "🎯 Tap the target!";
  progressBar.style.width = "0%";

  startBtn.disabled = true;
  target.style.display = "block";

  moveTarget();

  timer = setInterval(function () {
    time--;
    timeEl.textContent = time;

    if (time <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timer);
  playing = false;

  target.style.display = "none";
  startBtn.disabled = false;

  if (score > best) {
    best = score;
    localStorage.setItem("tapMasterBest", best);
    bestEl.textContent = best;
  }

  messageEl.textContent = "🏁 Game Over! Score: " + score;
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
    localStorage.setItem("tapMasterLevel", level);
    levelEl.textContent = level;
    messageEl.textContent = "⭐ Level " + level + "!";
  }

  moveTarget();
});

startBtn.addEventListener("click", startGame);
