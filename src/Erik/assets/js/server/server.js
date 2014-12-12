var $ = require('../jquery');

function Server () {
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

p.update = function (player) {
	if(this.hubSetupComplete !== true){
		console.log("can't update, hub setup not complete");
		return;
	}
	this.defaultHub.server.updatePlayerLocation(0, player.sprite.x, player.sprite.y);
};

module.exports = Server;