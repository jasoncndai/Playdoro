let interval;
let minutes = 25;
let seconds = 0;

function startTimer() {
  interval = setInterval(updateTimer, 1000);
}

function pauseTimer() {
  clearInterval(interval);
}

function resetTimer() {
  clearInterval(interval);
  minutes = 25;
  seconds = 0;
  updateDisplay();
}

function updateTimer() {
  if (minutes === 0 && seconds === 0) {
    clearInterval(interval);
    alert("Pomodoro session completed!");
    return;
  }
  if (seconds === 0) {
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }
  updateDisplay();
}

function updateDisplay() {
  const minutesDisplay = String(minutes).padStart(2, "0");
  const secondsDisplay = String(seconds).padStart(2, "0");
  document.getElementById("minutes").textContent = minutesDisplay;
  document.getElementById("seconds").textContent = secondsDisplay;
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);