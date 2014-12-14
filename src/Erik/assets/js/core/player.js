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
        x = 300;
        y = 300;
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
* rotates character to a specified angle
*/
Player.prototype.rotateToAngle = function (angle) {
    this.sprite.angle = angle;
    this.isRequiresSync = true;
}

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
        // mechanism to control rate of fire
        this.fireTime = 0;
        //  Our snowballs group
        this.snowballs = this.game.add.group();
        this.snowballs.enableBody = true;
        this.snowballs.physicsBodyType = Phaser.Physics.ARCADE;
        // create seveal instances of our snowball sprite (limited by how many can be fired at a time)
        this.snowballs.createMultiple(Config.SNOWBALL_CAPACITY, 'snowball');
        // centre the anchor point so positioning will apply to middle of snowball
        this.snowballs.setAll('anchor.x', 0.5);
        this.snowballs.setAll('anchor.y', 0.5);
        // kill sprite if it heads out of the world
        this.snowballs.setAll('outOfBoundsKill', true);
        // checks if still in world bounds each frame to facilitate kill above
        this.snowballs.setAll('checkWorldBounds', true);

        // follow the player around the world
        this.game.camera.follow(this.sprite);
        // setup cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        // shoot with space
        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // or for mobile devices, an onscreen shoot button
        this.shootButton = this.game.add.button(100, 400, 'shoot-button', this.fire, this);
        // keep the button always visible
        this.shootButton.fixedToCamera = true;
        // position button
        this.shootButton.anchor.setTo(0.5, 1); // use middle and bottom of button to position
        this.shootButton.cameraOffset.x = this.game.camera.width / 2; // centre of screen
        this.shootButton.cameraOffset.y = this.game.camera.height -5; // bottom of screen
        // prevent button presses from moving player
        this.pointerMoveEnabled = true;
        this.shootButton.events.onInputDown.add(this.disablePointerMove, this);
        this.shootButton.events.onInputUp.add(this.enablePointerMove, this);
        // lose the shoot button if keyboard present
        this.game.input.keyboard.addCallbacks(this, this.hideButton);
    }
};

Player.prototype.hideButton = function () {
    this.shootButton.kill();
}

Player.prototype.disablePointerMove = function(){
    this.pointerMoveEnabled = false;
}

Player.prototype.enablePointerMove = function(){
    this.pointerMoveEnabled = true;
}

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

    if ((!this.cursors.isDown // if no cursor keys pressed
        && !this.game.input.activePointer.isDown) // and mouse/touch not pressed
        && (this.currentSpeed > 0)) { // and is moving...
        this.currentSpeed -= 4; // then slow down
    }

    if (this.currentSpeed > 0) {
        this.movePlayer();
    } else {
        this.walk(false);
    }

    //  If the sprite is > 8px away from the pointer and that pointer (touch/mouse) is down then let's move towards it
    if (this.game.physics.arcade.distanceToPointer(this.sprite, this.game.input.activePointer) > 8
        && this.game.input.activePointer.isDown
        && this.pointerMoveEnabled) {

        this.currentSpeed = Config.PLAYER_MOVEMENT_SPEED;
        //  Make the object seek to the active pointer (mouse or touch).
        // moveToPointer returns the angle in radians
        // radToDeg converts radians into angle
        var angle = this.game.math.radToDeg(this.game.physics.arcade.moveToPointer(this.sprite, this.currentSpeed));
        this.rotateToAngle(angle);
    }

    //  Firing?
    if (this.fireButton.isDown) {
        this.fire();
    }

};

/**
* Shoots projectile (aka snowball)
*/
Player.prototype.fire = function (event) {
    //  To avoid them being allowed to fire too fast we set a time limit
    if (this.game.time.now > this.fireTime) {
            //  Grab the first bullet we can from the pool (false means it can't already exist I.E isn't already being fired somewhere)
            this.snowball = this.snowballs.getFirstExists(false);

            // if one is available
            if (this.snowball) {
                // set it's start position to that of our player
                this.snowball.reset(this.sprite.x, this.sprite.y);
                // shoot the mother
                this.game.physics.arcade.velocityFromRotation(this.sprite.rotation, Config.SNOWBALL_VELOCITY, this.snowball.body.velocity);
                // set our fire delay to a time slightly in the future
                this.fireTime = this.game.time.now + Config.SNOWBALL_FIRE_RATE;
            }
        }
}

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
