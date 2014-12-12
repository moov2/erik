var GameState = require('./core/gamestate'),
    Level = require('./core/level'),
    Players = require('./core/players');

var erik = {
    load: function () {
        this.level = new Level();
        this.players = new Players(this.level);
        this.state = new GameState([this.level, this.players]);

        this.level.setup(this.state);
    }
}

erik.load();
