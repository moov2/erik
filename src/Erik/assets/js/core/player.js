var Config = require('../Configuration/Config');

/**
 *
 */
function Player(sprite) {
    this.sprite = sprite;

    this.setup();
}

/**
 * Moves the character up.
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
    this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
    this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
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
Player.prototype.update = function (cursors) {
    var isMoving = cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown;

    if (cursors.left.isDown) {
        this.moveLeft();
    }

    if (cursors.right.isDown) {
        this.moveRight();
    }

    if (cursors.up.isDown) {
        this.moveUp();
    }

    if (cursors.down.isDown) {
        this.moveDown();
    }

    // character hasn't moved.
    if (!isMoving) {
        this.still();
    }
};

module.exports = Player;
