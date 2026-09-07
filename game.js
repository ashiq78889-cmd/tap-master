const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const bestEl = document.getElementById("best");
const messageEl = document.getElementById("message");
const arena = document.getElementById("arena");
const target = document.getElementById("target");
const startBtn = document.getElementById("start");

let score = 0;
let time = 30;
let timer = null;
let playing = false;

let best = Number(localStorage.getItem("tapMasterBest")) || 0;
bestEl.textContent = best;

function moveTarget() {
  const maxX = arena.clientWidth - target.offsetWidth;
  const maxY = arena.clientHeight - target.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
}

function startGame() {
  score = 0;
  time = 30;
  playing = true;

  scoreEl.textContent = score;
  timeEl.textContent = time;
  messageEl.textContent = "Tap the target as fast as you can!";
  startBtn.disabled = true;
  target.style.display = "block";

  moveTarget();

  clearInterval(timer);

  timer = setInterval(() => {
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
    messageEl.textContent = `🎉 New Best Score: ${score}!`;
  } else {
    messageEl.textContent = `Game Over! Your score: ${score}`;
  }
}

target.addEventListener("click", () => {
  if (!playing) return;

  score++;
  scoreEl.textContent = score;

  moveTarget();
});

startBtn.addEventListener("click", startGame);
