let interval;
let minutes = 25;
let seconds = 0;
let gachaponWheel;

// Register GSAP plugin
gsap.registerPlugin('gsap');

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
    alert("Time's up!")
    spinGachapon();
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

function spinGachapon() {
  gachaponWheel.startAnimation();
  document.getElementById("gachapon").classList.remove("hidden");
  document.getElementById("gachaponCanvas").classList.remove("hidden");
  setTimeout(function() {
    document.getElementById("gachaponCanvas").classList.add("hidden");
    document.getElementById("gachapon").classList.add("hidden");
  }, 5000);
}

function alertPrize() {
  alert("Congratulations! You won: " + gachaponWheel.getIndicatedSegment().text);
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


// Function to load GSAP asynchronously
function loadGSAP() {
  return new Promise((resolve, reject) => {
      if (window.gsap) {
          // GSAP is already loaded, resolve immediately
          resolve();
      } else {
          // GSAP is not loaded, load it asynchronously
          var script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js';
          script.onload = resolve; // Resolve the promise once GSAP is loaded
          script.onerror = reject; // Reject the promise if there's an error loading GSAP
          document.head.appendChild(script);
      }
  });
}


// Function to initialize Winwheel.js after GSAP is loaded
function initializeWinwheel() {
  // Wrap your canvas-related code inside a function
  function initializeCanvas() {
      // Get the canvas element
      var canvas = document.getElementById('gachaponCanvas');
      if (!canvas) {
          console.error("Canvas element not found.");
          return;
      }

      // Get the 2D context
      var ctx = canvas.getContext('2d');
      if (!ctx) {
          console.error("Unable to obtain 2D context for canvas.");
          return;
      }

      // Now that you have the context, you can use it for drawing
      // For example, initialize Winwheel with the canvas context here
      gachaponWheel = new Winwheel({
          'canvasId': 'gachaponCanvas', // Specify the ID of the canvas
          // Other Winwheel options...
          'numSegments': 3,
          'outerRadius': 150,
          'textFontSize': 16,
          'segments': [
              { 'fillStyle': '#eae56f', 'text': '5 minutes', 'size':  270},
              { 'fillStyle': '#89f26e', 'text': '10 minutes', 'size': 72},
              { 'fillStyle': '#e7706f', 'text': '20 minutes', 'size': 18 }
          ],
          'animation': {
              'type': 'spinToStop',
              'duration': 5,
              'callbackFinished': 'alertPrize()'
          }
      });
  }

  // Use DOMContentLoaded event listener to ensure the canvas is initialized after the DOM is fully loaded
  document.addEventListener("DOMContentLoaded", function() {
      initializeCanvas();
  });

  // Or use window's load event to ensure the canvas is initialized after all resources (including images) are loaded
  window.addEventListener("load", function() {
      initializeCanvas();
  });
}

// Load GSAP and initialize Winwheel after GSAP is loaded
loadGSAP().then(initializeWinwheel).catch(error => {
  console.error("Error loading GSAP:", error);
});