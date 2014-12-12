var Phaser = require('./phaser');

var erik = {
    load: function () {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: this.preload, create: this.create, update: this.update });
    },

    preload: function () {
        this.game.load.image('backdrop', '/assets/images/test_world.png');
        this.game.load.spritesheet('dude', '/assets/images/dude.png', 32, 48);
    },

    create: function () {
        //  We're going to be using physics, so enable the Arcade Physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // set up our world
        this.game.world.setBounds(0, 0, 4096, 4096);
        this.game.add.sprite(0, 0, 'backdrop');

        // The player and its settings
        this.player = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, 'dude');

        this.game.camera.follow(this.player);

        //  Our two animations, walking left and right.
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function () {
        
        if (this.cursors.left.isDown) {
            //  Move to the left
            this.player.x -= 4;

            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            //  Move to the right
            this.player.x += 4;

            this.player.animations.play('right');
        }
        else if (this.cursors.up.isDown) {
            // move up
            this.player.y -= 4;
        }
        else if (this.cursors.down.isDown) {
            // move down
            this.player.y += 4;
        }
        else {
            //  Stand still
            this.player.animations.stop();
            this.player.frame = 4;
        }
    }
}

erik.load();
