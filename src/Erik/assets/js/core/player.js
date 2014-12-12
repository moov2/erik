var Config = require('../configuration/config'),
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
    this.walk(true);
    this.isRequiresSync = true;
};

/**
 * Removes the player from the game.
 */
Player.prototype.kill = function () {
    this.sprite.kill();
};

/**
 * rotates the character counter clockwise
 */
Player.prototype.turnLeft = function () {
    this.sprite.angle -= Config.PLAYER_ROTATION_SPEED;
    this.isRequiresSync = true;
};

/**
* rotates the character clockwise
*/
Player.prototype.turnRight = function () {
    this.sprite.angle += Config.PLAYER_ROTATION_SPEED;
    this.isRequiresSync = true;
};

/**
 * Sets up the player animations.
 */
Player.prototype.setup = function () {
    // moves the registration point to the middle of the image.
    this.sprite.anchor.setTo(0.5, 0.5);

    this.game.physics.enable(this.sprite);

    // setting drag to 5 removes an issue where the player will move slightly even
    // though there is no input from the user.
    this.sprite.body.drag.set(5);
    this.sprite.body.maxVelocity.setTo(Config.PLAYER_MAX_VELOCITY, Config.PLAYER_MAX_VELOCITY);
    this.sprite.body.collideWorldBounds = true;

    this.sprite.animations.add('walk');

    if (this.isActive) {
        this.game.camera.follow(this.sprite);
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }
};

Player.prototype.movePlayer = function () {
    this.game.physics.arcade.velocityFromRotation(this.sprite.rotation, this.currentSpeed, this.sprite.body.velocity);
    this.isRequiresSync = true;
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
    } else {
        this.walk(false);
    }
};

/**
 * Turns on / off the walking animation dependending on the provided flag.
 */
Player.prototype.walk = function (isEnabled) {
    if (this.isEnabled === isEnabled) {
        return;
    }

    this.isEnabled = isEnabled;

    if (isEnabled) {
        this.sprite.animations.play('walk', 20, true);
        return;
    }

    this.sprite.animations.stop('walk', true);
};

module.exports = Player;
