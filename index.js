// Get references to DOM elements
const hoursLabel = document.getElementById('hours');
const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millisecondsLabel = document.getElementById('milliseconds');

const startButton = document.getElementById('startbtn');
const stopButton = document.getElementById('stopbtn');
const pauseButton = document.getElementById('pausebtn');
const resetButton = document.getElementById('resetbtn');

const lapList = document.getElementById('laplist');

// Initialize variables
let interval;
let milliseconds = 0,
    seconds = 0,
    minutes = 0,
    hours = 0;

// Event listeners for buttons
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Function to start the timer
function startTimer() {
    startButton.disabled = true;
    interval = setInterval(updateTimer, 10);
}

// Function to stop the timer and add lap
function stopTimer() {
    clearInterval(interval);
    addToLap();
    startButton.disabled = false;
}

// Function to pause the timer
function pauseTimer() {
    clearInterval(interval);
    startButton.disabled = false;
}

// Function to reset the timer
function resetTimer() {
    clearInterval(interval);
    resetData();
    lapList.innerHTML = '';
    startButton.disabled = false;
}

// Function to reset timer data
function resetData() {
    hours = minutes = seconds = milliseconds = 0;
    displayTimer();
}

// Function to update timer values
function updateTimer() {
    milliseconds++;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }
    displayTimer();
}

// Function to display timer values
function displayTimer() {
    millisecondsLabel.textContent = padTimer(milliseconds);
    secondsLabel.textContent = padTimer(seconds);
    minutesLabel.textContent = padTimer(minutes);
    hoursLabel.textContent = padTimer(hours);
}

// Utility function to pad timer values
function padTimer(time) {
    return time.toString().padStart(2, '0');
}

// Function to add lap
function addToLap() {
    // Format lap time
    const lapTime = `${padTimer(hours)}:${padTimer(minutes)}:${padTimer(seconds)}:${padTimer(milliseconds)}`;
    // Create list item
    const listItem = document.createElement('li');
    // Set inner HTML of list item
    listItem.innerHTML = `<span>Lap ${lapList.childElementCount + 1} : </span> ${lapTime}`;
    // Append list item to lap list
    lapList.appendChild(listItem);
}
