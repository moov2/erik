var Phaser = require('./phaser'),
    Level = require('./core/level');
    Player = require('./core/player');

var erik = {
    load: function () {
        var _this = this;

        this.level = new Level({
            preload: function () {
                _this.level.game.load.image('backdrop', '/assets/images/test_world.png');
                _this.level.game.load.spritesheet('dude', '/assets/images/dude.png', 32, 48);
            },
            create: function () {
                _this.level.create();

                // The player and its settings
                _this.player = new Player(_this.level.game.add.sprite(_this.level.game.world.width / 2, _this.level.game.world.height / 2, 'dude'));

                _this.level.game.camera.follow(_this.player.sprite);
                _this.cursors = _this.level.game.input.keyboard.createCursorKeys();
            },
            update: function () {
                _this.player.update(_this.cursors);
            }
        });
    }
}

erik.load();
