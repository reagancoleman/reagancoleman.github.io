(function (window) {
    'use strict';
    window.opspark = window.opspark || {};
    let opspark = window.opspark;
    
    // TODO : Load config for url //
    opspark.preload = function (game) {
        game.load.image('cannon', './asset/cat.png');
        game.load.image('projectile', './asset/hamsterball.png');
        game.load.image('platform', './asset/platform.png');
        game.load.image('db', './asset/collectable/dog.png');
        game.load.image('steve', './asset/collectable/COLLECTABLE 1.png');
        game.load.image('grace', './asset/collectable/oh no.png');
        game.load.image('kennedi', './asset/collectable/fart2.png');
        game.load.image('max', './asset/collectable/hampter2.png');
        game.load.atlas('halle', './asset/halle/phaser-json-array/halle.png', './asset/halle/phaser-json-array/halle.json');
    };
})(window);
