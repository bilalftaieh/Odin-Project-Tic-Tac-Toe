// Import the GameBoard and Player classes.
import GameBoard from "./GameBoard";
import Player from "./Player";

// The GameLogic class manages the game logic and state.

class GameLogic {
    constructor() {
        // Create Player 1 with symbol X and Player 2 with symbol O.
        this._player1 = new Player("player1", "X");
        this._player2 = new Player("player2", "O");
        this._playerTurn = this._player1; // Player 1 goes first.
    }

    // Get Player 1.
    get playerOne() {
        return this._player1;
    }

    // Get Player 2.
    get playerTwo() {
        return this._player2;
    }

    // Set Player 1.
    set playerOne(newPlayer) {
        this._player1 = newPlayer;
    }

    // Set Player 2.
    set playerTwo(newPlayer) {
        this._player2 = newPlayer;
    }

    // Get the current player's turn.
    get playerTurn() {
        return this._playerTurn;
    }

    // Set the current player's turn.
    set playerTurn(newPlayerTurn) {
        this._playerTurn = newPlayerTurn;
    }

    // Determine the result of the game.
    determineResult = () => {
        let gameBoard = GameBoard.gameBoard;
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
                return "WIN!"; // Return WIN result.
            }
        }

        if (GameBoard.isGameBoardFull()) {
            return "TIE!"; // Return TIE result.
        }

        return ""; // Return an empty string, indicating the game is ongoing.
    }

    // Start a new game application with custom player names.
    startGameApp = (playerOneName, playerTwoName) => {
        GameBoard.emptyGameBoard(); // Clear the game board.
        this.createNewPlayers(playerOneName, playerTwoName);
    }

    // Create and assign new player names.
    createNewPlayers = (playerOneName, playerTwoName) => {
        this._player1.name = playerOneName;
        this._player2.name = playerTwoName;
    }

    // Add a player's symbol to the game board at a specific cell index.
    addSymbolToGameBoard = (cellIndex, playerSymbol) => {
        GameBoard.addToGameBoard(cellIndex, playerSymbol);
    }

    // Check if a cell on the game board is already occupied.
    isGameBoardCellFull = (cellIndex) => {
        return GameBoard.gameBoard[cellIndex] !== "";
    }

    // Switch the player's turn.
    switchPlayerTurn = () => {
        this._playerTurn = this._playerTurn === this._player1 ? this._player2 : this._player1;
    }

    // Restart the game by clearing the game board and setting the player turn to Player 1.
    restartGame = () => {
        GameBoard.emptyGameBoard();
        this._playerTurn = this._player1;
    }

    // Increment a player's score.
    incrementPlayerScore = (player) => {
        if (player.name === this._player1.name) {
            this._player1.score += 1;
        } else {
            this._player2.score += 1;
        }
    }
}

// Export an instance of the GameLogic class for easy access.
export default new GameLogic;
