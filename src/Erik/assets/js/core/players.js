var Player = require('./player');

/**
 * Manages all the players in the game.
 */
function Players(level) {
    // players will be added to this array.
    this.players = [];
    this.level = level;
}

/**
 * Creates players in the environment.
 */
Players.prototype.create = function () {
    if (!this.level.game) {
        return;
    }

    this.players.push(new Player(this.level.game));
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
