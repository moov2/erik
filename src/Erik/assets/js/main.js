var GameState = require('./core/gamestate'),
    Level = require('./core/level'),
    Players = require('./core/players'),
    Server = require('./server/server');

var erik = {
    load: function () {
        this.level = new Level();
        this.players = new Players(this.level);
        this.server = new Server(this.players);
        this.state = new GameState([this.level, this.players, this.server]);
        this.level.setup(this.state);
    }
};

erik.load();
