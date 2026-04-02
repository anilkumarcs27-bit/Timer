
const totalTime = 10;


const circle = document.querySelector(".circle");
const timeText = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");


let startTime = null;
let animationId = null;
let running = false;

// Animation function
function animate(timestamp) {
  if (!startTime) startTime = timestamp;

  let elapsed = (timestamp - startTime) / 1000;
  let progress = Math.min(elapsed / totalTime, 1);

  let degrees = progress * 360;

  // Update circle
  circle.style.background =
    `conic-gradient(green ${degrees}deg, #333 ${degrees}deg)`;

  // Remaining time
  let remaining = Math.max(totalTime - elapsed, 0);

  let minutes = Math.floor(remaining / 60);
  let seconds = Math.floor(remaining % 60);

  timeText.innerText =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Continue if not finished
  if (progress < 1 && running) {
    animationId = requestAnimationFrame(animate);
  } else {
    running = false;
    timeText.innerText = "Done!";
  }
}

startBtn.addEventListener("click", () => {
  if (!running) {
    running = true;
    startTime = null; // reset start time
    animationId = requestAnimationFrame(animate);
  }
});


restartBtn.addEventListener("click", () => {
  // Stop current animation
  cancelAnimationFrame(animationId);

  // Reset values
  startTime = null;
  running = false;

  // Reset UI
  circle.style.background =
    `conic-gradient(green 0deg, #333 0deg)`;

  timeText.innerText = "00:10"; // initial display

  console.log("Timer restarted");
});
