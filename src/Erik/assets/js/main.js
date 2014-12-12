var Level = require('./core/level'),
    Players = require('./core/players');

var erik = {
    load: function () {
        var _this = this;

        this.level = new Level({
            preload: function () {
                _this.level.game.load.image('backdrop', '/assets/images/test_world.png');
                _this.level.game.load.spritesheet('dude', '/assets/images/dude.png', 32, 48);

                _this.players = new Players(_this.level.game);
            },
            create: function () {
                _this.level.create();
                _this.players.create();
            },
            update: function () {
                _this.players.update();
            }
        });
    }
}

erik.load();
