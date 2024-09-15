const cells = document.querySelectorAll(".cell"); // Select all cells
const statusText = document.getElementById("status"); // Status text element
const restartBtn = document.getElementById("restart"); // Restart button
const winConditions = [ // Winning conditions
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = Array(9).fill(""); // Game options initialized to empty
let currentPlayer = "X"; // Starting player
let running = false; // Game state

initializeGame(); // Start the game

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked)); // Add click event to each cell
    restartBtn.addEventListener("click", restartGame); // Add click event to restart button
    statusText.textContent = `${currentPlayer}'s turn`; // Display current player's turn
    running = true; // Set game state to running
}

function cellClicked() {
    const cellIndex = this.getAttribute("data-index"); // Get index of clicked cell

    if (options[cellIndex] !== "" || !running) {
        return; // Exit if cell is already filled or game is not running
    }

    updateCell(this, cellIndex); // Update cell with current player's mark
    checkWinner(); // Check if there is a winner
}

function updateCell(cell, index) {
    options[index] = currentPlayer; // Mark cell with current player's symbol
    cell.textContent = currentPlayer; // Display current player's symbol
}

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X"; // Switch players
    statusText.textContent = `${currentPlayer}'s turn`; // Update status text
}

function checkWinner() {
    let roundWon = false; // Flag for winning condition

    for (let condition of winConditions) { // Check all winning conditions
        const [a, b, c] = condition;
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
            roundWon = true; // Mark round as won
            break; // Exit loop if a winning condition is found
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`; // Declare winner
        statusText.className = 'win'; // Add win class for styling
        running = false; // End the game
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`; // Declare draw
        statusText.className = 'draw'; // Add draw class for styling
        running = false; // End the game
    } else {
        changePlayer(); // Change to the next player
    }
}

function restartGame() {
    currentPlayer = "X"; // Reset to starting player
    options.fill(""); // Clear options array
    statusText.textContent = `${currentPlayer}'s turn`; // Reset status text
    statusText.className = ''; // Remove any previous styling classes
    cells.forEach(cell => cell.textContent = ""); // Clear all cells
    running = true; // Restart the game
}
