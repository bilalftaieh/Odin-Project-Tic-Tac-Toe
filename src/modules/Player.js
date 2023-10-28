// The Player class represents a game participant.

export default class Player {
    // Create a new player with a name and symbol.
    constructor(initialName, symbol) {
        this._name = initialName;      // Set the player's name.
        this._playerSymbol = symbol;   // Assign the player's symbol.
        this._score = 0;              // Initialize the player's score.
    }

    // Get the player's name.
    get name() {
        return this._name;
    }

    // Change the player's name.
    set name(newName) {
        this._name = newName;
    }

    // Get the symbol associated with the player.
    get playerSymbol() {
        return this._playerSymbol;
    }

    // Change the player's symbol.
    set playerSymbol(newPlayerSymbol) {
        this._playerSymbol = newPlayerSymbol;
    }

    // Get the player's current score.
    get score() {
        return this._score;
    }

    // Update the player's score.
    set score(newScore) {
        this._score = newScore;
    }
}
