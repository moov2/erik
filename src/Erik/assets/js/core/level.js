var Assets = require('../configuration/assets'),
    Config = require('../configuration/config'),
    Phaser = require('../phaser');

/**
 *
 */
function Level() { }

/**
 * Configures the level environment.
 */
Level.prototype.create = function () {
    //  we're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // set up our world
    // create the tilemap using the cachekey specified in the assets.json
    this.mymap = this.game.add.tilemap('iceworld');
    // set the world to be the same size as the tilemap
    this.game.world.setBounds(0, 0, this.mymap.widthInPixels, this.mymap.heightInPixels);
    // add the tilesets that the tilemap uses (tilesets are basically spritesheets)
    this.mymap.addTilesetImage('winter-tiles-v6');   // the cachekey must match the tileset "name" property in the tilemap json...
    this.mymap.addTilesetImage('terrain-assets');    // ...which must also match the image filename (without the extension)

    // here we create layers which correspond to the layers from the tilemap
    this.background = this.mymap.createLayer(Config.BACKGROUND_LAYER_NAME);   // again, layer names must match that in the tilemap json file
    this.background.renderSettings.enableScrollDelta = false;
    this.terrain = this.mymap.createLayer(Config.TERRAIN_LAYER_NAME);
    this.terrain.renderSettings.enableScrollDelta = false;

    // now we tell the tilemap that we want tiles in the Background layer to be collidable EXCEPT for the specified indexes
    // these indexes correspond to the tile position in the layer's tileset
    // so for example, in this case index 21 is just normal ground which we do want to be abel to walk on
    // anything NOT included in the exclusion array will be collidable I.e we can't walk through/over it
    this.mymap.setCollisionByExclusion(Config.BACKGROUND_COLLISION_TILES, true, Config.BACKGROUND_LAYER_NAME);
    this.mymap.setCollisionByExclusion(Config.TERRAIN_COLLISION_TILES, true, Config.TERRAIN_LAYER_NAME);
};

/**
 * Loads all the assets in the game.
 */
Level.prototype.preload = function () {
    for (var i = 0; i < Assets.length; i++) {

        if (Assets[i].type === 'spritesheet') {
            this.game.load.spritesheet(Assets[i].name, Assets[i].url, Assets[i].frameWidth, Assets[i].frameHeight, Assets[i].frames);
            continue;
        }

        if (Assets[i].type == 'tilemap') {            
            this.game.load.tilemap(Assets[i].name, Assets[i].url, null, Phaser.Tilemap.TILED_JSON);
            continue;
        }
        
        this.game.load[Assets[i].type](Assets[i].name, Assets[i].url);
    }
};

/**
 * Creates a new instance of a Phaser game.
 */
Level.prototype.setup = function (gameStates) {
    this.game = new Phaser.Game(Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT, Phaser.AUTO, Config.DOM_ID, gameStates);
};


module.exports = Level;
