var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        
        // var tree;
        // var buildings = [];
        var mountain;
        var mountainTwo;
        var floor;
        var floor2;
        var floor3;
        var tallCactus;
        var smallCactus;
        var bigRock;
        var smallRock;

        //i would add more if i had skillz :'|
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var groundFill = draw.rect(canvasWidth, canvasHeight, '#4e4178' );
            background.addChild(groundFill);
            var backgroundFill = draw.rect(canvasWidth, groundY,'#1f0d3d');
            background.addChild(backgroundFill);

            
            
            // TODO: 3 - Add a moon and starfield

             //loop that draws 100 stars
             for (var i = 0; i < 100; i++){
                var circle = draw.circle(1, "white", "LightGray", 1); // draws circle and stores it in var circle
                circle.x = canvasWidth * Math.random(); // multiplies a random decimal x the width of the canvas and stores it as the circles x position
                circle.y = groundY * Math.random(); // multiplies random decimal times the groundY and stores it as circles y position
                background.addChild(circle); // adds circle as child to BG
            }

            var moon = draw.bitmap("img/planets.png"); //draws the moon using .bitmap and stores it in the moon variable
            moon.x = canvasWidth - 770; // adds x value to the moon of 300 pixels
            moon.y = groundY - 350; // adds y value to moon of 200 pixels
            moon.scaleX = 0.5; //scales moons x value
            moon.scaleY = 0.5; //scales moon y value
            background.addChild(moon); //add the moon as a child of bg

            //MOUNTAINS yes there will be a lot of this cause im confused >_<
                mountain = draw.bitmap("img/mountain1.png"); //mountain 1
                mountain.x = 0;
                mountain.y = groundY - 340;
                mountain.scaleX = 1; //changes x scale of the mountain ( makes it bigger/smaller )
                mountain.scaleY = 1; //changes y scale of the mountain
                background.addChild(mountain);

                //mountain 2
                mountainTwo = draw.bitmap("img/mountain2.png"); //mountain 2
                mountainTwo.x = 1000;
                mountainTwo.y = groundY - 340;
                mountainTwo.scaleX = 0.7;
                mountainTwo.scaleY = 0.7;
                background.addChild(mountainTwo);
            
            //ground ( kinda jank when they loop i know i dunno how to layer those correctly )
                floor = draw.bitmap("img/surface.png"); 
                floor.x = 0; 
                floor.y = groundY - 90; 
                background.addChild(floor)
                //ahaha i dont know how to do this optimally
                floor2 = draw.bitmap("img/surface.png"); 
                floor2.x = 1049; 
                floor2.y = groundY - 90; 
                background.addChild(floor2);

                floor3 = draw.bitmap("img/surface.png"); 
                floor3.x = 2098; 
                floor3.y = groundY - 90; 
                background.addChild(floor3)
            

            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            // didn't use this one sorry :(
            /* for (var i = 0; i < 5; ++i) {
                    var buildingHeights = [ 220, 250, 180, 300 ];
                    var buildingColors = ['cyan', 'limegreen', 'lightpink', 'yellow']
                    var building = draw.rect(75, buildingHeights[i], buildingColors[i], "Black", 1);
                    building.x = 200 * i;
                    building.y = groundY - buildingHeights[i];
                    background.addChild(building);
                    buildings.push(building);
                }*/

            // TODO 4: Part 1 - Add a tree ( i kinda just replaced the tree with cactus, is that okay??)
            
                tallCactus = draw.bitmap("img/cactus.png"); //uses bitmap to draw image and stores it in var tree
                tallCactus.x = 100; // assign xv to tree
                tallCactus.y = groundY - 230; //assign yv to tree
                background.addChild(tallCactus); //add tree to bg to make it visible
                
                //little cactus
                smallCactus = draw.bitmap("img/cactus2.png");
                smallCactus.x = 236;
                smallCactus.y = groundY - 130; 
                background.addChild(smallCactus);

            //rocks
                //small rock
                smallRock = draw.bitmap("img/smallRock.png");
                smallRock.x = 736;
                smallRock.y = groundY - 130; 
                background.addChild(smallRock);

                //big rock ( last one i swear)
                //small rock
                bigRock = draw.bitmap("img/bigRock.png");
                bigRock.x = 1036;
                bigRock.y = groundY - 260; 
                background.addChild(bigRock);

        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            
                //tree ( cactus )
                tallCactus.x = tallCactus.x - 1;

                if (tallCactus.x < -300) {
                    tallCactus.x = canvasWidth;
                }
                
                //smaller cactus
                smallCactus.x = smallCactus.x - 1;

                if (smallCactus.x < -300) {
                    smallCactus.x = canvasWidth;
                }

                //small rock
                smallRock.x = smallRock.x - 1;

                if (smallRock.x < -300) {
                    smallRock.x = canvasWidth;
                }

                //big rock
                bigRock.x = bigRock.x - 1;

                if (bigRock.x < -400) {
                    bigRock.x = canvasWidth;
                }

                //mountains loops(?)
                mountain.x = mountain.x - 0.2;

                if (mountain.x < -900) {
                    mountain.x = canvasWidth;
                }

                //2nd mountain loop
                mountainTwo.x = mountainTwo.x - 0.2;

                if (mountainTwo.x < -900) {
                    mountainTwo.x = canvasWidth;
                }


            

            //ground AAAAAAAAAAAAAAAA this took me forever to do ;-;
                floor.x = floor.x - 1;

                if (floor.x < -1100) {
                    floor.x = canvasWidth + 500;
                }
                floor2.x = floor2.x - 1;

                if (floor2.x < -1100) {
                    floor2.x = canvasWidth + 500;
                } 
                floor3.x = floor3.x - 1;

                if (floor3.x < -1100) {
                    floor3.x = canvasWidth + 500;
                } 
            
            // TODO 5: Part 2 - Parallax
            
            /*SHOULD move buildings and reset the x value to the right side if they go off left
            for(var i = 0; i < buildings.length; i++){
                var build = buildings[i]; //stores index of array in var building
                build.x = build.x - 0.5; //subtracts from x value of building to make it move left
                
                //WHY ISNT IT WORKING??? nvm
                if(buildings.x < -100 ){ //checks buildings x value to see if it has gone left
                    buildings.x = canvasWidth + 100; //resets x value to cavaswidth / right side
                }
            }
            */

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
