var Config = require('../Configuration/Config'),
    Phaser = require('../phaser');

/**
 *
 */
function Player(game) {
    this.game = game;
    this.sprite = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, 'dude');

    this.setup();
}

/**
 * Moves the character forwards.
 */
Player.prototype.moveDown = function () {
    this.sprite.y += Config.MOVEMENT_STEP;
};

/**
 * Moves the character left.
 */
Player.prototype.moveLeft = function () {
    this.sprite.x -= Config.MOVEMENT_STEP;
    this.sprite.animations.play('left');
};

/**
* Moves the character left.
*/
Player.prototype.moveRight = function () {
    this.sprite.x += Config.MOVEMENT_STEP;
    this.sprite.animations.play('right');
};

/**
 * Moves the character up.
 */
Player.prototype.moveUp = function () {
    this.sprite.y -= Config.MOVEMENT_STEP;
};

/**
 * Sets up the player animations.
 */
Player.prototype.setup = function () {
    this.sprite.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.drag.set(0.2);
    this.sprite.body.maxVelocity.setTo(400, 400);
    this.sprite.body.collideWorldBounds = true;

    this.game.camera.follow(_this.player.sprite);
    this.cursors = this.game.input.keyboard.createCursorKeys();
};

/**
 * Updates character to a standing still pose.
 */
Player.prototype.still = function () {
    this.sprite.animations.stop();
    this.sprite.frame = 4;
};

/**
 * Updates the player.
 */
Player.prototype.update = function () {
    var isMoving = this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown;

    if (this.cursors.left.isDown) {
        this.moveLeft();
    }

    if (this.cursors.right.isDown) {
        this.moveRight();
    }

    if (this.cursors.up.isDown) {
        this.moveUp();
    }

    if (this.cursors.down.isDown) {
        this.moveDown();
    }

    // character hasn't moved.
    if (!isMoving) {
        this.still();
    }
};

module.exports = Player;
