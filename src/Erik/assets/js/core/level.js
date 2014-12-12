var Assets = require('../configuration/assets'),
    Config = require('../configuration/config'),
    Phaser = require('../phaser');

/**
 *
 */
function Level() { }

/**
 * Configures the level environment.
 */
Level.prototype.create = function () {
    //  we're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // set up our world
    this.game.world.setBounds(0, 0, Config.WORLD_WIDTH, Config.WORLD_HEIGHT);
    this.game.add.sprite(0, 0, 'backdrop');
};

/**
 * Loads all the assets in the game.
 */
Level.prototype.preload = function () {
    for (var i = 0; i < Assets.length; i++) {
        if (Assets[i].type === 'spritesheet') {
            this.game.load.spritesheet(Assets[i].name, Assets[i].url, Assets[i].frameWidth, Assets[i].frameHeight, Assets[i].frames);
            continue;
        }

        this.game.load[Assets[i].type](Assets[i].name, Assets[i].url);
    }
};

/**
 * Creates a new instance of a Phaser game.
 */
Level.prototype.setup = function (gameStates) {
    this.game = new Phaser.Game(Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT, Phaser.AUTO, Config.DOM_ID, gameStates);
};


module.exports = Level;
