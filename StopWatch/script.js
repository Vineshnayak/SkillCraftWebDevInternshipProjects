let timer;
let seconds = 0;
let isRunning = false;

// Update display format
function updateDisplay() {
    const display = document.getElementById('display');
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    display.textContent = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Start or resume the stopwatch
document.getElementById('start').addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        document.getElementById('pause').textContent = 'Pause'; // Change button text to Pause
        timer = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
    }
});

// Pause or resume the stopwatch
document.getElementById('pause').addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        document.getElementById('pause').textContent = 'Resume'; // Change button text to Resume
    } else {
        isRunning = true;
        document.getElementById('pause').textContent = 'Pause'; // Change button text back to Pause
        timer = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
    }
});

// Reset the stopwatch
document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    updateDisplay();
    document.getElementById('pause').textContent = 'Pause'; // Reset button text
    document.getElementById('laps-list').innerHTML = ''; // Clear lap times
});

// Record lap time
document.getElementById('lap').addEventListener('click', () => {
    if (isRunning) {
        const lapItem = document.createElement('li');
        lapItem.textContent = document.getElementById('display').textContent;
        document.getElementById('laps-list').appendChild(lapItem);
    }
});
