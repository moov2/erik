var Phaser = require('./phaser');

var erik = {
    load: function () {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: this.preload, create: this.create, update: this.update });
    },

    preload: function () {
        this.game.load.spritesheet('dude', '/assets/images/dude.png', 32, 48);
    },

    create: function () {
        //  We're going to be using physics, so enable the Arcade Physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // The player and its settings
        this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

        //  We need to enable physics on the player
        this.game.physics.arcade.enable(this.player);

        //  Player physics properties.
        this.player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function () {
        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown) {
            //  Move to the left
            this.player.body.velocity.x = -150;

            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            //  Move to the right
            this.player.body.velocity.x = 150;

            this.player.animations.play('right');
        }
        else {
            //  Stand still
            this.player.animations.stop();

            this.player.frame = 4;
        }
    }
}

erik.load();
