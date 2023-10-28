import Player from "../src/modules/Player";

describe("Player Tests", () => {
let player1, player2; // Declare the variables in an accessible scope

beforeAll(() => {
    player1 = new Player('Belal','X'); 
    player2 = new Player('Maria','O');
  });

  test('test player one name', () => {
    expect(player1.name).toBe('Belal');
  });

  test('test player two name', () => {
    expect(player2.name).toBe('Maria');
  });

  test('test player one symbol', () => {
    expect(player1.playerSymbol).toBe('X');
  });

  test('test player two symbol', () => {
    expect(player2.playerSymbol).toBe('O');
  });

  test('test player one score', () => {
    player1.score = 2;
    expect(player1.score).toBe(2);
  });

  test('test player two score', () => {
    player2.score = 2;
    expect(player2.score).toBe(2);
  });

});
