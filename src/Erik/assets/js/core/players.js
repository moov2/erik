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
Players.prototype.createWithConnectionId = function (connectionId, posX, posY, angle) {
    if (!this.level.game) {
        return;
    }

    this.players.push(new Player(this.level.game, connectionId, connectionId === this.activeConnectionId, posX, posY, angle));
};

/**
 * Returns the Player object for the active player.
 */
Players.prototype.getActivePlayer = function () {
    if (!this._activePlayer) {
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].isActive) {
                this._activePlayer = this.players[i];
                break;
            }
        }
    }

    return this._activePlayer;
};

/**
 * Gets a player by there connection id.
 */
Players.prototype.getByConnectionId = function (connectionId) {
    for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].connectionId === connectionId) {
            return this.players[i];
        }
    }

    return undefined;
};

/**
 * Returns the index of the player with a matching connection id.
 */
Players.prototype.getIndexByConnectionId = function (connectionId) {
    for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].connectionId === connectionId) {
            return i
        }
    }

    return undefined;
};

Players.prototype.sync = function (players) {
    for (var i = 0; i < players.length; i++) {
        var player = this.getByConnectionId(players[i].ConnectionId);

        if (!player) {
            this.createWithConnectionId(players[i].ConnectionId, players[i].X, players[i].Y, players[i].Angle);
            return;
        }

        if (!player.isActive) {
            player.sync(players[i].X, players[i].Y, players[i].Angle);
        }
    }
};

/**
 * Removes a player by their connection id.
 */
Players.prototype.removeByConnectionId = function (connectionId) {
    var index = this.getIndexByConnectionId(connectionId),
        player = this.players[index];

    if (player) {
        this.players.splice(index, 1);
        player.kill();
    }
};

/**
 * Updates the positions of the players.
 */
Players.prototype.update = function () {
    for (var i = 0; i < this.players.length; i++) {
        this.level.game.physics.arcade.collide(this.players[i].sprite, this.level.layermain);
        this.players[i].update();
    }
};

module.exports = Players;
