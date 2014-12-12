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
    //this.game.world.setBounds(0, 0, Config.WORLD_WIDTH, Config.WORLD_HEIGHT);
    //this.game.add.sprite(0, 0, 'backdrop');
   
    this.mymap = this.game.add.tilemap('iceworld');
    this.mymap.addTilesetImage('winter-tiles-v5');   //now we add a tilsetimage to the created map-object residing on "mymap" - the name of the tilesetimage is stored in the json file and needs to be the exact same name.. you already chose the right name in your preload function - now use this cachekey 
    this.mymap.addTilesetImage('terrain-assets');

    //create layers - every layer needs to be initialised.. you can leave some layers out - they wont be displayed then
    this.layermain = this.mymap.createLayer('Background');   // on "mymap" we initialise a new layer - the layer with the name "layer1"  - this needs to be the exact same name as defined in tiled - it's stored in the json file
    this.layersecondary = this.mymap.createLayer('terrain assets');

    // here we activate a possible collision for all tiles on terrain assets (the index starts with 1 (first tile) so this means "collide with all tiles on the tilset that are placed on the layer)
    this.mymap.setCollisionByExclusion([21], true, 'Background');

    //this.layerbackground.resizeWorld();
    //this.layermain.resizeWorld();
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

        if (Assets[i].type == "tilemap") {            
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
