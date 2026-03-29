// Variables
const settingsButton = document.getElementById("settingsButton");
const settingsMenu = document.getElementById("settingsMenu");
const resumeButton = document.getElementById("resumeButton");
const restartButton = document.getElementById("restartButton");
const quitButton = document.getElementById("quitButton");

// Open/Close Settings Menu
settingsButton.addEventListener("click", () => {
    settingsMenu.classList.toggle("active");
});

// Resume button closes menu
resumeButton.addEventListener("click", () => {
    settingsMenu.classList.remove("active");
});

// Restart button reloads page
restartButton.addEventListener("click", () => {
    location.reload();
});

// Quit button goes to homepage
quitButton.addEventListener("click", () => {
    window.location.href = "index.html";
});

const cells = document.querySelectorAll(".cell");

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        cell.classList.toggle("marked");
    });
});

// Random number generator
const randomBtn = document.getElementById('randomBtn');
const randomResult = document.getElementById('randomResult');

randomBtn.addEventListener('click', () => {
    const randomNum = Math.floor(Math.random() * 54) + 1;
    randomResult.textContent = `Random Number: ${randomNum}`;
});