
function GameState(actions) {
    this.actions = actions;
}

/**
 * Creates players in the environment.
 */
GameState.prototype.preload = function () {
    for (var i = 0; i < this.actions.length; i++) {
        if (this.actions[i]['preload']) {
            this.actions[i]['preload']();
        }
    }
};

/**
 * Sets the phaser game instance that is used to control the players.
 */
GameState.prototype.create = function () {
    for (var i = 0; i < this.actions.length; i++) {
        if (this.actions[i]['create']) {
            this.actions[i]['create']();
        }
    }
};

/**
 * Updates the positions of the players.
 */
GameState.prototype.update = function () {
    for (var i = 0; i < this.actions.length; i++) {
        if (this.actions[i]['update']) {
            this.actions[i]['update']();
        }
    }
};

module.exports = GameState;
