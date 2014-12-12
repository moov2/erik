var $ = require('../jquery');

function Server (players) {
	this.players = players;
}

var p = Server.prototype = {};

p.create = function () {
	this.initialise();
};

p.initialise = function () {
	this.hubSetupComplete = false;
	this.setupHubs();
};

p.setupHubs = function () {
	this.gameHub = $.connection.gameHub;

	this.gameHub.client.updatePositions = $.proxy(this.players.sync, this.players);

	$.connection.hub.start().done($.proxy(this.setupHubsComplete, this));
};

p.setupHubsComplete = function () {
	this.hubSetupComplete = true;
	this.players.activeConnectionId = this.gameHub.connection.id;
};

p.update = function () {
	if (this.hubSetupComplete !== true){
		return;
	}

	var player = this.players.getActivePlayer();

	if (player) {
		this.gameHub.server.updatePlayerLocation(player.sprite.x, player.sprite.y, player.sprite.angle);
	}
};

module.exports = Server;
