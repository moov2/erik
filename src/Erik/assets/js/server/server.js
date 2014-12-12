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
	this.gameHub.client.removePlayer = $.proxy(this.players.removeByConnectionId, this.players);

	$.connection.hub.start().done($.proxy(this.setupHubsComplete, this));
};

p.setupHubsComplete = function () {
	this.hubSetupComplete = true;
	this.players.activeConnectionId = this.gameHub.connection.id;
};

p.update = function () {
	if (!this.hubSetupComplete) {
		return;
	}

	var player = this.players.getActivePlayer();

	if (!player) {
		return;
	}

	if (player.currentSpeed > 0 && player.isRequiresSync) {
		this.gameHub.server.updatePlayerLocation(player.sprite.x, player.sprite.y, player.sprite.angle);
		player.isRequiresSync = false;
	}
};

module.exports = Server;
