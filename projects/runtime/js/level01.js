var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
               /* { "type": "sawblade", "x": 400, "y": groundY -56 },
                { "type": "sawblade", "x": 600, "y": groundY - 50 },
                { "type": "sawblade", "x": 800, "y": groundY - 56},
                { "type": "sawblade", "x": 1000, "y": groundY - 56},

                { "type": "enemy", "x": 400, "y": groundY - 10 },

                { "type": "reward", "x": 500, "y": groundY - 50 },
            */ ]
            
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        //FUNCTION!!
        //(METEOR)
        function createSawBlade(x, y){
            //sawblade hitbox/damage/whatever
            var hitZoneSize = 25; //assigns value to hitbox size
            var damageFromObstacle = 10; //damage done by hitbox
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates obstacele and stores it
            
            //create obstacles
            sawBladeHitZone.x = x; //stores x value 4 hitbox
            sawBladeHitZone.y = y; //stores y value 4 hitbox
            game.addGameItem(sawBladeHitZone); //adds hitbox as game item
            sawBladeHitZone.velocityX = -3;
            sawBladeHitZone.velocityY = +2;
            

            //sawblade graphics
            var obstacleImage = draw.bitmap("img/meteor.png"); //draws image for saw and stores in ObstacleImage
            sawBladeHitZone.addChild(obstacleImage); // adds obImage as child of sawbladehitzone
            obstacleImage.x = -40; //assigns value to x position
            obstacleImage.y = -60; //assigns value to x position
        }    

            //saw / meteor loop(?)

        

        //ENEMY 1 ( SLUG )
        function createEnemy(x, y, size, velocity){
            var enemy = game.createGameItem("enemy", 25);
        var gameEnemy = draw.bitmap("img/slug.png");
        var damageFromObstacle = 20; //damage done by hitbox
        gameEnemy.x = -50;
        gameEnemy.y = -56;
        enemy.addChild(gameEnemy);
        enemy.x = x;
        enemy.y = y;
        game.addGameItem(enemy);
        enemy.velocityX = -1.5;

        enemy.onPlayerCollision = function(){
            game.changeIntegrity(-10);
        }

        enemy.onProjectileCollision = function(){
            game.increaseScore(200);
            enemy.shrink();
        }

        }

        //ENEMY 2 ( BIRD )
        function createEnemy2(x, y, size, velocity){
            var enemy = game.createGameItem("enemy2", 25);
        var gameEnemy = draw.bitmap("img/bird.png");
        var damageFromObstacle = 30; //damage done by hitbox
        gameEnemy.x = -50;
        gameEnemy.y = -56;
        enemy.addChild(gameEnemy);
        enemy.x = x;
        enemy.y = y;
        game.addGameItem(enemy);
        enemy.velocityX = -3;

            if (enemy.x < 0){
                enemy.x = canvasWidth;
            }

        enemy.onPlayerCollision = function(){
            game.changeIntegrity(-10);
        }

        enemy.onProjectileCollision = function(){
            game.increaseScore(500);
            enemy.fadeOut();
        }

        }

        function createEnemy3(x, y, size, velocity){
            var enemy = game.createGameItem("enemy3", 25);
        var gameEnemy = draw.bitmap("img/ufo.png");
        var damageFromObstacle = 50; //damage done by hitbox
        gameEnemy.x = -50;
        gameEnemy.y = -56;
        enemy.addChild(gameEnemy);
        enemy.x = x;
        enemy.y = y;
        game.addGameItem(enemy);
        enemy.velocityX = -2;
        if(enemy.velocityY < groundY-20 ){
            enemy.velocityY = +0.2;
        } else if (enemy.velocityY > groundY-20){
            enemy.velocityY = -0.2;
        }

        enemy.onPlayerCollision = function(){
            game.changeIntegrity(-10);
        }

        enemy.onProjectileCollision = function(){
            game.increaseScore(1000);
            enemy.shrink();
        }

        }

        
        //SPIKES//
        function createSpike(x, y){
            //sawblade hitbox/damage/whatever
            var hitZoneSize = 25; //assigns value to hitbox size
            var damageFromObstacle = 20; //damage done by hitbox
            var spikeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates obstacele and stores it

            //create obstacles
            spikeHitZone.x = x; //stores x value 4 hitbox
            spikeHitZone.y = y; //stores y value 4 hitbox
            game.addGameItem(spikeHitZone); //adds hitbox as game item

            //sawblade graphics
            var obstacleImage = draw.bitmap("img/spikes.png"); //draws image for saw and stores in ObstacleImage
            spikeHitZone.addChild(obstacleImage); // adds obImage as child of sawbladehitzone
            obstacleImage.x = -45; //assigns value to x position
            obstacleImage.y = -42; //assigns value to x position
            
            spikeHitZone.velocityX = -1;

            if (spikeHitZone.x < 100) {
                spikeHitZone.x = canvasWidth;
            }
        };


        //helpme ( REWARD )
        function createReward(x, y ){
            var reward = game.createGameItem("reward", 25);
            var gameItem = draw.rect(50, 50, "purple");
            gameItem.x = -25;
            gameItem.y = -25;
            reward.addChild(gameItem);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -3;

            reward.onPlayerCollision = function (){
                game.changeIntegrity(10);
                game.increaseScore(300);
                reward.fadeOut();
            }

        }

        for ( var i = 0; i < levelData.gameItems.length; i++){
            var gameItem = levelData.gameItems[i];
            
            if (gameItem.type === "sawblade"){
                createSawBlade(gameItem.x, gameItem.y);
            }

            if (gameItem.type === "enemy"){
                createEnemy(gameItem.x, gameItem.y, scale.x);
            }

            if (gameItem.type === "reward"){
                createReward(gameItem.x, gameItem.y);
            }
        };
        

        //ENEMY CALLS ( this is just easier for me okay ) 
        //plus my graphics werent showing correctly for the other one?? 
        //i dunno im just trying to get this done in time

        //lv1
        createEnemy(400, groundY - 5); //slug
        createSawBlade(600, 0); //meteor
        createSawBlade(800, -130);
        createEnemy2(800, groundY - 40); //bird
        createEnemy3(1000, groundY - 120); //ufo
        createSpike(1100,groundY-10) //spike
        createReward(1500, groundY - 30);

        //lv 2


        //lv 3

        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
