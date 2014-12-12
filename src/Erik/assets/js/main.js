var Phaser = require('./phaser'),
    Player = require('./core/player');

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
        this.player = new Player(this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, 'dude'));

        this.game.camera.follow(this.player.sprite);
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function () {
        this.player.update(this.cursors);
    }
}

erik.load();
