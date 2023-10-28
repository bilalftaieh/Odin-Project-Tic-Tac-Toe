import GameBoard from "../src/modules/GameBoard";

describe("GameBoard Tests", () => {
  let gameBoard;

  beforeAll(() => {
    gameBoard = GameBoard; // Reference the exported GameBoard instance.
  });

  beforeEach(() => {
    gameBoard.emptyGameBoard();
  });

  test("should allow adding a symbol to the game board", () => {
    gameBoard.addToGameBoard(0, 'X');
    expect(gameBoard.gameBoard[0]).toBe('X');
  });

  test("should correctly detect a full game board", () => {
    gameBoard.gameBoard = ['X', 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'X'];
    expect(gameBoard.isGameBoardFull()).toBe(true);
  });

  test("should be able to clear the game board", () => {
    gameBoard.gameBoard = ['X', 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'X'];
    gameBoard.emptyGameBoard();
    expect(gameBoard.isGameBoardFull()).toBe(false);
  });
});
