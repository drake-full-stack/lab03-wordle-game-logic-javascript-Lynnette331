// ===== GAME STATE VARIABLES =====
// Test: Confirm keydown events are being captured
const TARGET_WORD = "WORDS";  // Our secret word for testing
let currentRow = 0;           // Which row we're filling (0-5)
let currentTile = 0;          // Which tile in the row (0-4)
let gameOver = false;         // Is the game finished?

// DOM element references (set up on page load)
let gameBoard, rows, debugOutput;

// ===== HELPER FUNCTIONS (PROVIDED) =====

// Debug/Testing Functions
function logDebug(message, type = 'info') {
    // Log to browser console
    console.log(message);
    
    // Also log to visual testing area
    if (!debugOutput) {
        debugOutput = document.getElementById('debug-output');
    }
    
    if (debugOutput) {
        const entry = document.createElement('div');
        entry.className = `debug-entry ${type}`;
        entry.innerHTML = `
            <span style="color: #666; font-size: 12px;">${new Date().toLocaleTimeString()}</span> - 
            ${message}
        `;
        
        // Add to top of debug output
        debugOutput.insertBefore(entry, debugOutput.firstChild);
        
        // Keep only last 20 entries for performance
        const entries = debugOutput.querySelectorAll('.debug-entry');
        if (entries.length > 20) {
            entries[entries.length - 1].remove();
        }
    }
}

function clearDebug() {
    const debugOutput = document.getElementById('debug-output');
    if (debugOutput) {
        debugOutput.innerHTML = '<p style="text-align: center; color: #999; font-style: italic;">Debug output cleared - ready for new messages...</p>';
    }
}

// Helper function to get current word being typed
function getCurrentWord() {
    const currentRowElement = rows[currentRow];
    const tiles = currentRowElement.querySelectorAll('.tile');
    let word = '';
    tiles.forEach(tile => word += tile.textContent);
    return word;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    gameBoard = document.querySelector('.game-board');
    rows = document.querySelectorAll('.row');
    debugOutput = document.getElementById('debug-output');
    
    logDebug("🎮 Game initialized successfully!", 'success');
    logDebug(`🎯 Target word: ${TARGET_WORD}`, 'info');
    logDebug("💡 Try typing letters, pressing Backspace, or Enter", 'info');
});

// ===== YOUR CHALLENGE: IMPLEMENT THESE FUNCTIONS =====

// Main event listener for keyboard input
document.addEventListener("keydown", (event) => {
    if (gameOver) return; // Check if game is over first
    const key = event.key.toUpperCase(); // Convert to uppercase

    if (key === "BACKSPACE") {
        deleteLetter();
    } else if (key === "ENTER") {
        submitGuess();
    } else if (/^[A-Z]$/.test(key)) {
        addLetter(key);
    }
});

// Listen for clicks on a specific button (example, update as needed)
// const button = document.getElementById("yourButtonId");
// function handleButtonClick() {
//     console.log("Button was clicked!");
// }
// if (button) button.addEventListener("click", handleButtonClick);
    
// TODO: Implement addLetter function
function addLetter(letter) {
    logDebug(`🎯 addLetter("${letter}") called`, 'info');
    if (gameOver) {
        logDebug('❌ Game is over. Cannot add more letters.', 'error');
        return;
    }
    if (currentRow >= 6) {
        logDebug('❌ No more rows available.', 'error');
        return;
    }
    if (currentTile >= 5) {
        logDebug('❌ Row is already full. Cannot add more letters.', 'error');
        return;
    }
    const currentRowElement = rows[currentRow];
    const tiles = currentRowElement.querySelectorAll('.tile');
    const tile = tiles[currentTile];
    tile.textContent = letter;
    tile.classList.add('filled');
    logDebug(`✅ Letter "${letter}" added at row ${currentRow}, tile ${currentTile}`, 'success');
    currentTile++;
    logDebug(`Current word progress: ${getCurrentWord()}`, 'info');
    logDebug(`State after addLetter: currentRow=${currentRow}, currentTile=${currentTile}`, 'info');
}

// TODO: Implement deleteLetter function  

function deleteLetter() {
    logDebug(`🗑️ deleteLetter() called`, 'info');
    if (currentTile <= 0) {
        logDebug('❌ No letters to delete.', 'error');
        return;
    }
    currentTile--;
    const currentRowElement = rows[currentRow];
    const tiles = currentRowElement.querySelectorAll('.tile');
    const tile = tiles[currentTile];
    const deletedLetter = tile.textContent;
    tile.textContent = '';
    tile.classList.remove('filled');
    logDebug(`🗑️ Deleted letter "${deletedLetter}" from row ${currentRow}, tile ${currentTile}`, 'success');
    logDebug(`Current word status: ${getCurrentWord()}`, 'info');
}

// TODO: Implement submitGuess function
function submitGuess() {
    logDebug(`📝 submitGuess() called`, 'info');
    // Check if row has exactly 5 letters
    if (currentTile !== 5) {
        alert('Please enter exactly 5 letters before submitting!');
        logDebug('❌ Not enough letters to submit guess.', 'error');
        return;
    }
    // Get the current row element and tiles
    const currentRowElement = rows[currentRow];
    const tiles = currentRowElement.querySelectorAll('.tile');
    let guess = '';
    tiles.forEach(tile => {
        guess += tile.textContent;
    });
    // Log the guess and target word
    logDebug(`🔎 Guess: ${guess}, Target: ${TARGET_WORD}`, 'info');
    currentRow++;
    currentTile = 0;
    logDebug(`State after submitGuess: currentRow=${currentRow}, currentTile=${currentTile}`, 'info');
    // Check win condition
    if (guess === TARGET_WORD) {
        gameOver = true;
        setTimeout(() => alert('Congratulations! You won!'), 500);
        logDebug('🏆 Game won!', 'success');
    }
    // Check lose condition
    else if (currentRow >= 6) {
        gameOver = true;
        setTimeout(() => alert(`Game over! The word was ${TARGET_WORD}`), 500);
        logDebug('💀 Game lost!', 'error');
    }
    else {
        logDebug('➡️ Moving to next row.', 'info');
    }
}

// TODO: Implement checkGuess function (the hardest part!)
function checkGuess(guess, tiles) {
    const target = TARGET_WORD.split('');
    const guessArray = guess.split('');
    const result = ['absent', 'absent', 'absent', 'absent', 'absent'];

    // STEP 1: Find exact matches
    for (let i = 0; i < 5; i++) {
        if (guessArray[i] === target[i]) {
            result[i] = 'correct';
            target[i] = null;      
            guessArray[i] = null;  
        }
    }

    // STEP 2: Find wrong position matches  
    for (let i = 0; i < 5; i++) {
        if (guessArray[i] !== null) {
            const idx = target.indexOf(guessArray[i]);
            if (idx !== -1) {
                result[i] = 'present';
                target[idx] = null; 
            }
        }
    }

    // TODO: Apply CSS classes to tiles -- we'll do this in the next step
    return result;
}