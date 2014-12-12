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
                _this.player = new Player(_this.level.game);
            },
            update: function () {
                _this.player.update();
            }
        });
    }
}

erik.load();
