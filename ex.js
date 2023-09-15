// Default difficulty level (Medium)
let numCircles = 4;

// Arrays to store colors and the picked color
const colors = [];
let pickedColor;

// Selecting elements from the HTML document
const circles = document.querySelectorAll(".circle");
const colorDisplay = document.querySelector("#color-display");
const messageDisplay = document.querySelector("#message");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");
const timerDisplay = document.querySelector("#timer-display");
let countdown; // Variable to store the countdown interval

// Simulate an asynchronous operation (e.g., fetching data from an API)
const simulateAsyncOperation = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 1000); // Simulate a 1-second delay
    });
};

// Initialize the game
const init = async () => {
    await simulateAsyncOperation(); // Simulate an asynchronous operation

    // Set the initial color display and setup game elements
    colorDisplay.textContent = pickedColor;
    setupCircles();
    setupMode();
    reset();
};

// Set up event listeners for the colored circles
const setupCircles = () => {
    circles.forEach((circle, index) => {
        // Set initial circle colors and click event handlers
        circle.style.backgroundColor = genRandomColor();
        circle.addEventListener("click", circleClickHandler);
    });
};

// Set up event listeners for the difficulty mode buttons
const setupMode = () => {
    modeButtons.forEach(button => {
        // Add click event handlers to mode buttons
        button.addEventListener("click", () => {
            modeButtons.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");

            // Update difficulty level based on the button clicked
            numCircles = button.textContent === "Easy" ? 3 : button.textContent === "Medium" ? 4 : 6;
            reset();
        });
    });
};

// Reset the game
const reset = () => {
    // Generate new random colors and reset game state
    colors.splice(0, colors.length, ...genRandomColors(numCircles));
    pickedColor = chooseColor();
    colorDisplay.textContent = pickedColor;
    h1.style.backgroundColor = "#232323";
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";

    circles.forEach((circle, index) => {
        if (index < numCircles) {
            circle.style.display = "block";
            circle.style.backgroundColor = colors[index];
        } else {
            circle.style.display = "none";
        }
        // Add event listeners back to the circles
        circle.addEventListener("click", circleClickHandler);
    });

    startTimer(10); // Adjust the number of seconds as needed
};

// Change the color of all circles and h1 to the given color
const changeColors = color => {
    circles.forEach(circle => {
        circle.style.backgroundColor = color;
    });
    h1.style.backgroundColor = color;
};

// Choose a random color from the colors array
const chooseColor = () => {
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
};

// Generate an array of random colors
const genRandomColors = num => Array.from({ length: num }, genRandomColor);

// Generate a random RGB color string
const genRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
};

// Display the modal with a given message
const showModal = message => {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
    const modalContent = document.querySelector(".modal-content p");
    modalContent.textContent = message;
};

// Start the timer with the given number of seconds
const startTimer = seconds => {
    let remainingTime = seconds;
    timerDisplay.textContent = remainingTime;

    if (countdown) {
        clearInterval(countdown);
    }

    countdown = setInterval(() => {
        remainingTime--;
        timerDisplay.textContent = remainingTime;

        if (remainingTime <= 0) {
            clearInterval(countdown);
            timerDisplay.textContent = "Time's up!";
            showModal("Time's up! Play Again");

            // Remove event listeners for the circles
            circles.forEach(circle => {
                circle.removeEventListener("click", circleClickHandler);
            });
        }
    }, 1000);
};

// Handle the click event on a circle
const circleClickHandler = function() {
    const clickedColor = this.style.backgroundColor;
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
};

// Add click event listeners to circles
circles.forEach(circle => {
    circle.addEventListener("click", circleClickHandler);
});

// "Play Again" button click event handler
document.getElementById("playAgainButton").addEventListener("click", () => {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";

    // Reset the game state
    reset();
});
resetButton.addEventListener("click", reset);
// Initialize the game when the page loads
window.addEventListener("load", init);
