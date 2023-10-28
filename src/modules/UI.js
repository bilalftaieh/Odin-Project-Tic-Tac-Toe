// Import the GameLogic class to manage the game logic.
import GameLogic from "./GameLogic";

// The UI class handles the user interface and interactions for the game.

class UI {
    constructor() {
        // Variables to store player inputs, game elements, and initial player setup.
        this._playerOneInput = document.querySelector("#player-one");
        this._playerTwoInput = document.querySelector("#player-two");
        this._gameForm = document.querySelector('.game-form');
        this._gameBoard = document.querySelector('.game-board');
        this._cells = document.querySelectorAll('.cell');
        this._scoreDisplay = document.querySelector(".score-display");
        this._playerNameForm = document.querySelector('#player-name-form');

        // Reference to the paragraph displaying the game result.
        this._resultParagraph = document.querySelector(".winner-paragraph");

        // Reference to the restart button.
        this._restartButton = document.querySelector(".restart-button");
        this._restartButton.addEventListener('click', this.restartButtonClickHandler);

        this._playerOneNameSpan = document.querySelector("#player-one-name");
        this._playerOneScoreSpan = document.querySelector("#player-one-score");

        this._playerTwoNameSpan = document.querySelector("#player-two-name");
        this._playerTwoScoreSpan = document.querySelector("#player-two-score");
    }

    // Initialize the game application and display player setup.
    startGameAppUI = () => {
        this._playerNameForm.addEventListener('submit', (e) => {
            let playerOneInputValue = this._playerOneInput.value;
            let playerTwoInputValue = this._playerTwoInput.value;
            GameLogic.startGameApp(playerOneInputValue, playerTwoInputValue);

            this._gameForm.style.display = 'none';
            this._gameBoard.style.display = 'block';

            e.preventDefault();

            this.startGameUI();
        });
    }

    // Start the game UI and set up event listeners for cells.
    startGameUI = () => {
        this.displayPlayerTurn(GameLogic.playerTurn);
        this.displayPlayersScore(GameLogic.playerOne, GameLogic.playerTwo);
        this._scoreDisplay.hidden = false;

        // Remove previous event listeners from cells.
        this._cells.forEach((cell) => {
            cell.removeEventListener('click', this.cellClickHandler);
        });

        // Add new click event listeners to cells.
        this._cells.forEach((cell) => {
            cell.addEventListener('click', this.cellClickHandler);
        });
    }

    // Function to handle cell click events during the game.
    cellClickHandler = (event) => {
        const cell = event.target;
        const cellIndex = cell.getAttribute('data-cell-index');
        const currentPlayer = GameLogic.playerTurn;
        if (GameLogic.isGameBoardCellFull(cellIndex)) {
            alert("This Cell is Full");
            return;
        }
        this.displaySymbolToGame(cell, currentPlayer.playerSymbol);
        GameLogic.addSymbolToGameBoard(cellIndex, currentPlayer.playerSymbol);
        let result = GameLogic.determineResult();
        this.displayResult(currentPlayer, result);
        GameLogic.switchPlayerTurn();

        this.displayPlayersScore(GameLogic.playerOne, GameLogic.playerTwo);
        this.displayPlayerTurn(GameLogic.playerTurn);
    };

    // Handler for the restart button.
    restartButtonClickHandler = () => {
        GameLogic.restartGame();
        this.resetGameDisplay();
        this.startGameUI();
    }

    // Function to display a player's symbol (X or O) on a game cell.
    displaySymbolToGame = (cell, symbol) => {
        // Create a new paragraph element to display the symbol.
        const symbolTag = document.createElement("p");
        symbolTag.textContent = symbol;
        cell.appendChild(symbolTag);
    }

    // Function to display the game result (win, tie, or ongoing).
    displayResult = (winner, result) => {
        if (result === "") {
            return;
        } else if (result === "WIN!") {
            this._resultParagraph.innerHTML = "Winner is " + winner.name;
            GameLogic.incrementPlayerScore(winner);
        } else if (result === "TIE!") {
            this._resultParagraph.innerHTML = result;
        }

        // Show the result paragraph and restart button.
        this._resultParagraph.hidden = false;
        this._restartButton.hidden = false;

        // Loop through all cells and add the 'disabled' class.
        this._cells.forEach(cell => {
            cell.classList.add('disabled');
        });
    }

    // Function to display the current player's turn.
    displayPlayerTurn = (playerTurn) => {
        const playerTurnHeader = document.querySelector(".player-turn-header");
        playerTurnHeader.innerHTML = `Player Turn: ${playerTurn.name} (${playerTurn.playerSymbol})`;
        playerTurnHeader.hidden = false;
    }

    // Function to reset the game display, clearing cells and hiding result elements.
    resetGameDisplay = () => {
        // Empty game cells and enable them.
        this._cells.forEach((cell) => {
            cell.innerHTML = "";
            cell.classList.remove("disabled");
        });
        this._resultParagraph.hidden = true;
        this._restartButton.hidden = true;
    }

    // Function to display players' names and scores.
    displayPlayersScore = (player1, player2) => {
        this._playerOneNameSpan.innerHTML = player1.name;
        this._playerOneScoreSpan.innerHTML = player1.score;

        this._playerTwoNameSpan.innerHTML = player2.name;
        this._playerTwoScoreSpan.innerHTML = player2.score;
    }
}

// Export an instance of the UI class for easy access.
export default new UI;
