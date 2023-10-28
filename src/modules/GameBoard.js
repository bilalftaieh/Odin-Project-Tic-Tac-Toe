// The GameBoard class manages the game board and its state.

class GameBoard {
    constructor() {
        // Initialize an empty game board with 9 cells.
        this._gameBoard = ["", "", "", "", "", "", "", "", ""];
    }

    // Get the current state of the game board.
    get gameBoard() {
        return this._gameBoard;
    }

    // Set a new game board state.
    set gameBoard(newGameBoard) {
        this._gameBoard = newGameBoard;
    }

    // Place a player's symbol on the game board at a specific cell index.
    addToGameBoard = (cellIndex, playerSymbol) => {
        // Update the cell with the player's symbol.
        this._gameBoard.splice(cellIndex, 1, playerSymbol);
    }

    // Check if the game board is full, indicating a tie.
    isGameBoardFull = () => {
        // If there are 9 cells and none of them are empty, the board is full.
        return this._gameBoard.length === 9 && !this._gameBoard.includes("");
    }

    // Display the current state of the game board on the console.
    printGameBoard = () => {
        console.log(`
         ${this._gameBoard[0]} | ${this._gameBoard[1]} | ${this._gameBoard[2]}
        ---+---+---
         ${this._gameBoard[3]} | ${this._gameBoard[4]} | ${this._gameBoard[5]}
        ---+---+---
         ${this._gameBoard[6]} | ${this._gameBoard[7]} | ${this._gameBoard[8]}
        `);
    }

    // Clear the game board, resetting it to an empty state.
    emptyGameBoard = () => {
        // Reset all cells to empty strings.
        for (let i = 0; i < this._gameBoard.length; i++) {
            this._gameBoard[i] = "";
        }
    }
}

// Export an instance of the GameBoard class for easy access.
export default new GameBoard;
