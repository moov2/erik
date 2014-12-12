var Config = require('../configuration/config'),
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
    this.game.world.setBounds(0, 0, 4096, 4096);
    this.game.add.sprite(0, 0, 'backdrop');
};

/**
 * Loads all the assets in the game.
 */
Level.prototype.preload = function () {
    this.game.load.image('backdrop', '/assets/images/test_world.png');
    this.game.load.spritesheet('dude', '/assets/images/dude.png', 32, 48);
};

/**
 * Creates a new instance of a Phaser game.
 */
Level.prototype.setup = function (gameStates) {
    this.game = new Phaser.Game(Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT, Phaser.AUTO, '', gameStates);
};


module.exports = Level;
