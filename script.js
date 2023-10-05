// Create a Player object with a name and a symbol (X or O).
const Player = (initialName, symbol) => {
    // Private variables to store player data.
    let name = initialName;  // The player's name.
    let score = 0;           // The player's score.
    let playerSymbol = symbol;  // The player's symbol (X or O).

    // Retrieve the player's name.
    const getName = () => name;

    // Retrieve the player's current score.
    const getScore = () => score;

    // Retrieve the player's symbol (X or O).
    const getPlayerSymbol = () => playerSymbol;

    // Update the player's score with a new value.
    const setScore = (newScore) => {
        score = newScore;
    }

    // Update the player's name with a new value.
    const setName = (newName) => {
        name = newName;
    }

    // Return public methods to access and modify player data.
    return {
        getName,           // Function to get the player's name.
        getScore,          // Function to get the player's score.
        setScore,          // Function to set the player's score.
        setName,           // Function to set the player's name.
        getPlayerSymbol    // Function to get the player's symbol.
    };
}



// The GameBoard module represents the game board for Tic-Tac-Toe.
const GameBoard = (() => {
    // An array to store the current state of the game board.
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Retrieve the current game board.
    const getGameBoard = () => gameBoard;

    // Add a player's symbol to the game board at the specified cell index.
    const addToGameBoard = (cellIndex, playerSymbol) => {
        // Update the game board at the given cell index with the player's symbol.
        gameBoard.splice(cellIndex, 1, playerSymbol);
    }

    // Check if the game board is full, indicating a tie.
    const isGameBoardFull = () => {
        // If there are 9 cells and none of them are empty strings, the board is full.
        if (gameBoard.length === 9 && !gameBoard.includes("")) {
            return true;
        }
        return false;
    }

    // Print the current state of the game board to the console.
    const printGameBoard = () => {
        console.log(`
         ${gameBoard[0]} | ${gameBoard[1]} | ${gameBoard[2]}
        ---+---+---
         ${gameBoard[3]} | ${gameBoard[4]} | ${gameBoard[5]}
        ---+---+---
         ${gameBoard[6]} | ${gameBoard[7]} | ${gameBoard[8]}
        `);
    }

    // Clear the game board, resetting it to an empty state.
    const emptyGameBoard = () => {
        for (let i = 0; i < gameBoard.length; i++) {
            gameBoard[i] = "";
        }
    }

    // Expose public methods to interact with the game board.
    return {
        getGameBoard,       // Function to get the game board.
        addToGameBoard,     // Function to add a player's symbol to the board.
        isGameBoardFull,    // Function to check if the board is full.
        printGameBoard,     // Function to print the board to the console.
        emptyGameBoard      // Function to clear/reset the board.
    }
})();


// The gameAppLogic module contains the core game logic for Tic-Tac-Toe.
const gameAppLogic = (()=>{

// Variables to store player inputs, game elements, and initial player setup.
let playerOneInput = document.querySelector("#player-one");
let playerTwoInput = document.querySelector("#player-two");
const gameForm = document.querySelector('.game-form');
const gameBoard = document.querySelector('.game-board');
const cells = document.querySelectorAll('.cell');
const playerNameForm = document.querySelector('#player-name-form');
let player1 = Player("player1", "X"); // Create Player 1 with symbol X.
let player2 = Player("player2", "O"); // Create Player 2 with symbol O.
let playerTurn = player1; // Initialize the player turn to Player 1.

// Function to determine the result of the game (win, tie, or ongoing).
const determineResult = () => {
    let gameBoard = GameBoard.getGameBoard();
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (let index = 0; index < winningCombinations.length; index++) {
        const [a, b, c] = winningCombinations[index];
        const firstCell = gameBoard[a];
        const secondCell = gameBoard[b];
        const thirdCell = gameBoard[c];

        if (firstCell !== "" && firstCell === secondCell && secondCell === thirdCell) {
            return "WIN!"; // return WIN result
        }
    }

    if (GameBoard.isGameBoardFull()) {
        return "TIE!"; // return TIE result
    }

    return ""; // return empty string => game ongoing
}

// Function to start the game application.
const startGameApp = () => {
    playerNameForm.addEventListener('submit', (e) => {
        let playerOneInputValue = playerOneInput.value;
        let playerTwoInputValue = playerTwoInput.value;
        player1.setName(playerOneInputValue);
        player2.setName(playerTwoInputValue);

        gameForm.style.display = 'none';
        gameBoard.style.display = 'block';

        console.log("Player one: " + player1.getName());
        console.log("Player two: " + player2.getName());
        e.preventDefault();

        startGame();
    });
}

// Function to start the game by adding click event listeners to cells.
// We remove and add eventlistener to avoid bugs when restarting game
const startGame = () => {
    displayController.displayPlayerTurn(playerTurn);

    // Remove previous event listeners from cells.
    cells.forEach((cell) => {
        cell.removeEventListener('click', cellClickHandler);
    });

    // Add new click event listeners to cells.
    cells.forEach((cell) => {
        cell.addEventListener('click', cellClickHandler);
    });
}

// Function to handle cell click events during the game.
const cellClickHandler = (event) => {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-cell-index');
    if (GameBoard.getGameBoard()[cellIndex] !== "") {
        alert("This Cell is Full");
        return;
    }
    displayController.displaySymbolToGame(cell, playerTurn.getPlayerSymbol());
    GameBoard.addToGameBoard(cellIndex, playerTurn.getPlayerSymbol());
    let result = gameAppLogic.determineResult();
    displayController.displayResult(playerTurn, result);
    if (playerTurn.getName() == player1.getName()) {
        playerTurn = player2;
    } else if (playerTurn.getName() == player2.getName()) {
        playerTurn = player1;
    }
    displayController.displayPlayerTurn(playerTurn);
};

// Function to restart the game by clearing the game board and resetting the display.
const restartGame = () => {
    GameBoard.emptyGameBoard();
    playerTurn = player1;
    displayController.resetGameDisplay();
    startGame();
}

// Expose public methods for external use.
return {
    determineResult,   // Function to determine the game result.
    startGameApp,      // Function to start the game application.
    restartGame,       // Function to restart the game.
}
})();

// The displayController module manages the user interface elements and updates the game display.
const displayController = (()=>{

// Reference to the paragraph displaying the game result.
const resultParagraph = document.querySelector(".winner-paragraph");

// Reference to the restart button.
const restartButton = document.querySelector(".restart-button");

// Reference to all game cells.
const cells = document.querySelectorAll('.cell');

// Function to display a player's symbol (X or O) on a game cell.
const displaySymbolToGame = (cell, symbol) => {
    // Create a new paragraph element to display the symbol.
    const symbolTag = document.createElement("p");
    symbolTag.textContent = symbol;
    cell.appendChild(symbolTag);
}

// Function to display the game result (win, tie, or ongoing).
const displayResult = (winner, result) => {
    if (result === "") {
        return;
    } else if (result === "WIN!") {
        resultParagraph.innerHTML = "Winner is " + winner.getName();
    } else if (result === "TIE!") {
        resultParagraph.innerHTML = result;
    }

    // Show the result paragraph and restart button.
    resultParagraph.hidden = false;
    restartButton.hidden = false;

    // Loop through all cells and add the 'disabled' class.
    cells.forEach(cell => {
        cell.classList.add('disabled');
    });
}

// Function to display the current player's turn.
const displayPlayerTurn = (playerTurn) => {
    const playerTurnHeader = document.querySelector(".player-turn-header");
    playerTurnHeader.innerHTML = `Player Turn: ${playerTurn.getName()} (${playerTurn.getPlayerSymbol()})`;
    playerTurnHeader.hidden = false;
}

// Function to reset the game display, clearing cells and hiding result elements.
const resetGameDisplay = () => {
    // Empty game cells and enable them.
    cells.forEach((cell) => {
        cell.innerHTML = "";
        cell.classList.remove("disabled");
    });
    resultParagraph.hidden = true;
    restartButton.hidden = true;
}

// Expose public methods for updating the game display.
return {
    displaySymbolToGame,   // Function to display a player's symbol.
    displayResult,         // Function to display the game result.
    displayPlayerTurn,     // Function to display the current player's turn.
    resetGameDisplay       // Function to reset the game display.
}

})();


// Starts the Game Application
gameAppLogic.startGameApp();

// Add a click event listener to the restart button to reset the game.
const restartButton = document.querySelector(".restart-button");

restartButton.addEventListener('click', () => {
    // Call the restartGame function from gameAppLogic to reset the game.
    gameAppLogic.restartGame();
});
