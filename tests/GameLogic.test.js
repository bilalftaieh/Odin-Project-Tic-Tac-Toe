import GameLogic from "../src/modules/GameLogic";

describe('GameLogic', () => {
  let gameLogic;

  beforeEach(() => {
    gameLogic = GameLogic;
  });

  test('should create players and set the initial player turn', () => {
    expect(gameLogic.playerOne).toBeDefined();
    expect(gameLogic.playerTwo).toBeDefined();
    expect(gameLogic.playerTurn).toBe(gameLogic.playerOne);
  });

  test('should change player turn when switching players', () => {
    gameLogic.switchPlayerTurn();
    expect(gameLogic.playerTurn).toBe(gameLogic.playerTwo);
    gameLogic.switchPlayerTurn();
    expect(gameLogic.playerTurn).toBe(gameLogic.playerOne);
  });

  test('should add symbols to the game board', () => {
    gameLogic.addSymbolToGameBoard(0, 'X');
    expect(gameLogic.isGameBoardCellFull(0)).toBeTruthy();
    expect(gameLogic.isGameBoardCellFull(1)).toBeFalsy();
  });

  test('should determine the game result as WIN', () => {
    // Simulate a winning condition
    gameLogic.addSymbolToGameBoard(0, 'X');
    gameLogic.addSymbolToGameBoard(1, 'X');
    gameLogic.addSymbolToGameBoard(2, 'X');
    expect(gameLogic.determineResult()).toBe('WIN!');
  });

  test('should determine the game result as TIE', () => {
    // Simulate a tie condition
    gameLogic.addSymbolToGameBoard(0, 'X');
    gameLogic.addSymbolToGameBoard(1, 'O');
    gameLogic.addSymbolToGameBoard(2, 'X');
    gameLogic.addSymbolToGameBoard(3, 'O');
    gameLogic.addSymbolToGameBoard(4, 'X');
    gameLogic.addSymbolToGameBoard(5, 'X');
    gameLogic.addSymbolToGameBoard(6, 'O');
    gameLogic.addSymbolToGameBoard(7, 'X');
    gameLogic.addSymbolToGameBoard(8, 'O');
    expect(gameLogic.determineResult()).toBe('TIE!');
  });

  test('should increment the player score', () => {
    gameLogic.incrementPlayerScore(gameLogic.playerOne);
    expect(gameLogic.playerOne.score).toBe(1);
    gameLogic.incrementPlayerScore(gameLogic.playerTwo);
    expect(gameLogic.playerTwo.score).toBe(1);
  });
});
