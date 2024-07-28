let sessionStartTime = new Date(); // Set when the session starts

let currentdate = new Date();
let currentFormattedText = `${currentdate.getHours()} : ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;

// Update time in current session
let sessionTimeElapsed = currentdate - sessionStartTime;
let sessionSeconds = Math.floor(sessionTimeElapsed / 1000);
let sessionMinutes = Math.floor(sessionSeconds / 60);
let sessionHours = Math.floor(sessionMinutes / 60);
let sessionDisplayTime = `${sessionHours} hours, ${sessionMinutes % 60} minutes, and ${sessionSeconds % 60} seconds`;
let sessionTimeText = "Time in Current Session: " + sessionDisplayTime;

function updateRealTime() {
    currentdate = new Date();
    currentFormattedText = `${currentdate.getHours()} : ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;

    // Update time in current session
    sessionTimeElapsed = currentdate - sessionStartTime;
    sessionSeconds = Math.floor(sessionTimeElapsed / 1000);
    sessionMinutes = Math.floor(sessionSeconds / 60);
    sessionHours = Math.floor(sessionMinutes / 60);
    sessionDisplayTime = `${sessionHours} hours, ${sessionMinutes % 60} minutes, and ${sessionSeconds % 60} seconds`;
    sessionTimeText = "Time in Current Session: " + sessionDisplayTime;
}

let realTimeInterval = setInterval(updateRealTime, 16);
