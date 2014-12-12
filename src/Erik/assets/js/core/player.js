var Config = require('../Configuration/Config'),
    Phaser = require('../phaser');

/**
 *
 */
function Player(game, connectionId, isActive, x, y, angle) {
    this.game = game;
    this.connectionId = connectionId;
    this.isActive = isActive;

    if (isActive) {
        x = this.game.world.width / 2;
        y = this.game.world.height / 2;
    }

    this.sprite = this.game.add.sprite(x, y, 'dude');
    this.sprite.angle = angle;
    this.sprite.anchor.setTo(0.5, 0.5);
    this.currentSpeed = 0;
    this.setup();
}

/**
 * Moves the character forwards.
 */
Player.prototype.accelerate = function () {
    this.currentSpeed = Config.PLAYER_MOVEMENT_SPEED;
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

    if (this.isActive) {
        this.game.camera.follow(this.sprite);
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }
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
 * Moves character to position provided.
 */
Player.prototype.sync = function (posX, posY, angle) {
    this.sprite.x = posX;
    this.sprite.y = posY;
    this.sprite.angle = angle;
};

/**
 * Updates the player.
 */
Player.prototype.update = function () {
    if (!this.cursors) {
        return;
    }

    if (this.cursors.left.isDown) {
        this.turnLeft();
    }

    if (this.cursors.right.isDown) {
        this.turnRight();
    }

    if (this.cursors.up.isDown) {
        this.accelerate();
    }

    if (!this.cursors.isDown && (this.currentSpeed > 0)) {
        this.currentSpeed -= 4;
    }

    if (this.currentSpeed > 0) {
        this.movePlayer();
    }
};

module.exports = Player;
