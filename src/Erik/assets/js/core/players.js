var Player = require('./player');

/**
 * Manages all the players in the game.
 */
function Players(game) {
    this.game = game;

    // players will be added to this array.
    this.players = [];
}

/**
 * Creates players in the environment.
 */
Players.prototype.create = function () {
    this.players.push(new Player(this.game));
};

/**
 * Updates the positions of the players.
 */
Players.prototype.update = function () {
    for (var i = 0; i < this.players.length; i++) {
        this.players[i].update();
    }
};

module.exports = Players;
