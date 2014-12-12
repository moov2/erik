var $ = require('../jquery');

function Server (players) {
	this.players = players;
	this.initialise();
}

var p = Server.prototype = {};

p.initialise = function () {
	this.hubSetupComplete = false;
	this.setupHubs();
};

p.setupHubs = function () {
	var _this = this;
	this.defaultHub = $.connection.defaultHub;

	$.connection.hub.start().done(function () {
		_this.setupHubsComplete();
	});
};

p.setupHubsComplete = function () {
	this.hubSetupComplete = true;
};

p.update = function () {
	if(this.hubSetupComplete !== true){
		// can't update, hub setup not complete
		return;
	}
	for(var i = 0; i < this.players.players.length; i++){
		this.defaultHub.server.updatePlayerLocation(0, this.players.players[i].sprite.x, this.players.players[i].sprite.y);
	}
};

module.exports = Server;