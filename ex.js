// Default difficulty level (Medium)
var numCircles = 4;

// Arrays to store colors and the picked color
var colors = [];
var pickedColor;

// Selecting elements from the HTML document
var circles = document.querySelectorAll(".circle");
var colorDisplay = document.querySelector("#color-display");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var timerDisplay = document.querySelector("#timer-display");
var countdown; // Variable to store the countdown interval

// Initialize the game
init();

// Event listener for the "New Colors" button
resetButton.addEventListener("click", function () {
    reset();
    startTimer(10); // Adjust the number of seconds as needed
});

// Initialize the game
function init() {
    // Set the initial color display and setup game elements
    colorDisplay.textContent = pickedColor;
    setupCircles();
    setupMode();
    reset();
}

// Set up event listeners for the colored circles
function setupCircles() {
    for (var i = 0; i < circles.length; i++) {
        // Set initial circle colors and click event handlers
        circles[i].style.backgroundColor = colors[i];
        circles[i].addEventListener("click", circleClickHandler);
    }
}

// Set up event listeners for the difficulty mode buttons
function setupMode() {
    for (var i = 0; i < modeButtons.length; i++) {
        // Add click event handlers to mode buttons
        modeButtons[i].addEventListener("click", function () {
            for (var i = 0; i < modeButtons.length; i++) {
                modeButtons[i].classList.remove("selected");
            }
            this.classList.add("selected");

            // Update difficulty level based on the button clicked
            if (this.textContent === "Easy") {
                numCircles = 3;
            } else if (this.textContent === "Medium") {
                numCircles = 4;
            } else {
                numCircles = 6;
            }
            reset();
        });
    }
}

// Reset the game
function reset() {
    // Generate new random colors and reset game state
    colors = genRandomColors(numCircles);
    pickedColor = chooseColor();
    colorDisplay.textContent = pickedColor;
    h1.style.backgroundColor = "#232323";
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
    for (var i = 0; i < circles.length; i++) {
        if (colors[i]) {
            circles[i].style.display = "block";
            circles[i].style.backgroundColor = colors[i];
        } else {
            circles[i].style.display = "none";
        }
        // Add event listeners back to the circles
        circles[i].addEventListener("click", circleClickHandler);
    }
    startTimer(10); // Adjust the number of seconds as needed
}

// Change the color of all circles and h1 to the given color
function changeColors(color) {
    for (var i = 0; i < circles.length; i++) {
        circles[i].style.backgroundColor = color;
        h1.style.backgroundColor = color;
    }
}

// Choose a random color from the colors array
function chooseColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// Generate an array of random colors
function genRandomColors(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(makeColor());
    }
    return arr;
}

// Generate a random RGB color string
function makeColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

// Display the modal with a given message
function showModal(message) {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    var modalContent = document.querySelector(".modal-content p");
    modalContent.textContent = message;
}

// Start the timer with the given number of seconds
function startTimer(seconds) {
    var remainingTime = seconds;
    timerDisplay.textContent = remainingTime;

    if (countdown) {
        clearInterval(countdown);
    }

    countdown = setInterval(function () {
        remainingTime--;
        timerDisplay.textContent = remainingTime;

        if (remainingTime <= 0) {
            clearInterval(countdown);
            timerDisplay.textContent = "Time's up!";
            showModal("Time's up! Play Again");

            // Remove event listeners for the circles
            for (var i = 0; i < circles.length; i++) {
                circles[i].removeEventListener("click", circleClickHandler);
            }
        }
    }, 1000);
}

// Handle the click event on a circle
function circleClickHandler() {
    var clickedColor = this.style.backgroundColor;
    if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct";
        resetButton.textContent = "Play Again";
        changeColors(pickedColor);
        showModal("Correct! Play Again");
        clearInterval(countdown); // Stop the timer
    } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try again";
    }
}

// Add click event listeners to circles
for (var i = 0; i < circles.length; i++) {
    circles[i].addEventListener("click", circleClickHandler);
}

// "Play Again" button click event handler
document.getElementById("playAgainButton").addEventListener("click", function () {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    
    // Reset the game state
    reset();
});
