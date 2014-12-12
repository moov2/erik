var Config = require('../Configuration/Config');

/**
 *
 */
function Player(game) {
    this.game = game;
    this.sprite = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, 'dude');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.currentSpeed = 0;

    this.setup();
}

/**
 * Moves the character forwards.
 */
Player.prototype.accelerate = function () {
    this.currentSpeed = Config.MOVEMENT_SPEED;
};

/**
 * Moves the character backwards.
 */
Player.prototype.reverse = function () {
    this.currentSpeed = Config.MOVEMENT_SPEED*-1;
};

/**
 * rotates the character counter clockwise
 */
Player.prototype.turnLeft = function () {
    this.sprite.angle -= Config.PLAYER_ROTATION_SPEED;
};

/**
* rotates the character clockwise
*/
Player.prototype.turnRight = function () {
    this.sprite.angle += Config.PLAYER_ROTATION_SPEED;
};

/**
 * Sets up the player animations.
 */
Player.prototype.setup = function () {
    this.sprite.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this.sprite);
    this.sprite.body.drag.set(0.2);
    this.sprite.body.maxVelocity.setTo(400, 400);
    this.sprite.body.collideWorldBounds = true;
};

Player.prototype.movePlayer = function () {
    this.game.physics.arcade.velocityFromRotation(this.sprite.rotation, this.currentSpeed, this.sprite.body.velocity);
}

/**
 * Updates character to a standing still pose.
 */
Player.prototype.still = function () {
};

/**
 * Updates the player.
 */
Player.prototype.update = function (cursors) {
    var isMoving = cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown;

    if (cursors.left.isDown) {
        this.turnLeft();
    }

    if (cursors.right.isDown) {
        this.turnRight();
    }

    if (cursors.up.isDown) {
        this.accelerate();
    }

    if (cursors.down.isDown) {
        this.reverse();
    }

    if (!cursors.done && (this.currentSpeed > 0)) {
        this.currentSpeed -= 4;
    }

    if (this.currentSpeed > 0) {
        this.movePlayer();
    }
};

module.exports = Player;
