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
                //20 seconds
                    { "type": "sawblade", "x": 3000, "y": groundY-60 }, //meteor
                    { "type": "spike", "x": 800, "y": groundY - 10}, //spikes
                    { "type": "reward", "x": 800, "y": groundY - 90 }, //battery
                    { "type": "spike", "x": 1200, "y": groundY - 10}, //spikes
                    { "type": "reward", "x": 1200, "y": groundY - 90 }, //battery
                    { "type": "enemy", "x": 700, "y": groundY - 15 }, //slug
                    { "type": "enemy3", "x": 1000, "y": groundY - 80*10 }, //ufo
                    { "type": "enemy2", "x": 700*2, "y": groundY - 55 }, //bird 

                //40 seconds
                    { "type": "enemy", "x": 700*3, "y": groundY - 15 }, //slug
                    { "type": "reward", "x": 600*3, "y": groundY - 90 }, //battery
                    { "type": "enemy", "x": 750*3, "y": groundY - 15 }, //slug
                    { "type": "enemy", "x": 750*3, "y": groundY - 15 }, //slug
                    { "type": "sawblade", "x": 610, "y": 0 }, //meteor
                    { "type": "sawblade", "x": 1000*4, "y": groundY-90 }, //meteor
                    { "type": "sawblade", "x": 1000*6, "y": groundY-60 }, //meteor
                    { "type": "sawblade", "x": 1000*7, "y": groundY-50 }, //meteor
                    { "type": "sawblade", "x": 1000*8, "y": groundY-80 }, //meteor
                    { "type": "sawblade", "x": 1000*9, "y": groundY-70 }, //meteor
                    { "type": "enemy3", "x": 1000*8, "y": groundY - 1300*10 }, //ufo
              
             ]
            
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
            
            //sawblade graphics
            var obstacleImage = draw.bitmap("img/meteor.png"); //draws image for saw and stores in ObstacleImage
            sawBladeHitZone.addChild(obstacleImage); // adds obImage as child of sawbladehitzone
            obstacleImage.x = -40; //assigns value to x position
            obstacleImage.y = -60; //assigns value to x position
        }    

        //ENEMY 1 ( SLUG )
        function createEnemy(x, y, size, velocity){
            var enemy = game.createGameItem("enemy", 25);
        var gameEnemy = draw.bitmap("img/slug.png");
        var damageFromObstacle = 20; //damage done by hitbox
        gameEnemy.x = -50; //enemy x position
        gameEnemy.y = -56; //enemy y position
        enemy.addChild(gameEnemy); //adds enemy to game as a game enemy
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

        enemy.onPlayerCollision = function(){
            game.changeIntegrity(-20);
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
        enemy.velocityX = -1;

        //i also wanted to make this enemy go up and down, but i could only get it to go in one direction
        //how would i be able to do this?? ( if i even can do it here )
         if(gameEnemy.y < groundY-90 ){
            enemy.velocityY = +1;
        } 
        if (gameEnemy.y > groundY-10){
            enemy.velocityY = -1;
        }

        enemy.onPlayerCollision = function(){
            game.changeIntegrity(-30);
        }

        enemy.onProjectileCollision = function(){
            game.increaseScore(1000);
            enemy.shrink();
        }

        }

        
        //SPIKES//
        function createSpike(x, y){
            //spike hitbox/damage/whatever
            var hitZoneSize = 25; //assigns value to hitbox size
            var damageFromObstacle = 20; //damage done by hitbox
            var spikeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates obstacele and stores it

            //create obstacles
            spikeHitZone.x = x; //stores x value 4 hitbox
            spikeHitZone.y = y; //stores y value 4 hitbox
            game.addGameItem(spikeHitZone); //adds hitbox as game item

            //spike graphics
            var obstacleImage = draw.bitmap("img/spikes.png"); //draws image for spikes and stores in ObstacleImage
            spikeHitZone.addChild(obstacleImage); // adds obImage as child of spikehitzone
            obstacleImage.x = -45; //assigns value to x position
            obstacleImage.y = -42; //assigns value to x position
            
            spikeHitZone.velocityX = -1;

            //yeah i tried making the spikes and meteor loop, i dunno if thats possible though:
            if (spikeHitZone.x < 0) {
                spikeHitZone.x = canvasWidth;
            }
        };


        //helpme ( REWARD )
        function createReward(x, y ){
            var reward = game.createGameItem("reward", 25);
            var gameItem = draw.bitmap("img/battery.png");
            gameItem.x = -55;
            gameItem.y = -55;
            reward.addChild(gameItem);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -1;

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

            if (gameItem.type === "spike"){
                createSpike(gameItem.x, gameItem.y);
            }

            if (gameItem.type === "enemy"){
                createEnemy(gameItem.x, gameItem.y);
            }

            if (gameItem.type === "enemy2"){
                createEnemy2(gameItem.x, gameItem.y);
            }

            if (gameItem.type === "enemy3"){
                createEnemy3(gameItem.x, gameItem.y);
            }

            if (gameItem.type === "reward"){
                createReward(gameItem.x, gameItem.y);
            }
        };
        

        //ENEMY CALLS ( this is just easier for me okay ) 
        //plus my graphics werent showing correctly for the other one?? 
        //i dunno im just trying to get this done in time

        //lv1
        

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
