module.exports = {
    /**
     * Dimensions of the game.
     */
    CANVAS_HEIGHT: 600,
    CANVAS_WIDTH: 800,

    /**
     * Id of element in the DOM that the canvas should be placed into.
     */
    DOM_ID: 'game',

    /**
     * Dimensions of the world within the game.
     */
    WORLD_HEIGHT: 4096,
    WORLD_WIDTH: 4096,

    /**
     * The speed at which a player will move.
     */
    PLAYER_MAX_VELOCITY: 150,
    PLAYER_MOVEMENT_SPEED: 150,
    PLAYER_ROTATION_SPEED: 4,

    /**
    * Details needed to import tilemap
    */
    BACKGROUND_LAYER_NAME: 'Background',
    BACKGROUND_COLLISION_TILES: [7, 8, 9, 10, 19, 20, 21, 22, 33, 34, 45, 46],
    TERRAIN_LAYER_NAME: 'terrain assets',
    TERRAIN_COLLISION_TILES: [0, 74]


};
