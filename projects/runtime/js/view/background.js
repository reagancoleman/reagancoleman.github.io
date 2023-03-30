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
        
        var tree;
        // var buildings = [];
        var mountain;
        var floor;
        var floor2;

     
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
            var mountain = draw.bitmap("img/mountain1.png");
             mountain.x = 0;
             mountain.y = groundY - 340;
             mountain.scaleX = 1;
             mountain.scaleY = 1;
             background.addChild(mountain);
            
            var floor = draw.bitmap("img/surface.png"); 
            floor.x = 0; 
            floor.y = groundY - 90; 
            background.addChild(floor)
            //ahaha i dont know how to do this optimally
            var floor2 = draw.bitmap("img/surface.png"); 
            floor2.x = 1049; 
            floor2.y = groundY - 90; 
            background.addChild(floor2)

            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            /*
            for (var i = 0; i < 5; ++i) {
                var buildingHeights = [ 220, 250, 180, 300 ];
                var buildingColors = ['cyan', 'limegreen', 'lightpink', 'yellow']
                var building = draw.rect(75, buildingHeights[i], buildingColors[i], "Black", 1);
                building.x = 200 * i;
                building.y = groundY - buildingHeights[i];
                background.addChild(building);
                buildings.push(building);
                }
            
                */


            // TODO 4: Part 1 - Add a tree
            
            tree = draw.bitmap("img/tree.png"); //uses bitmap to draw image and stores it in var tree
            tree.x = 100; // assign xv to tree
            tree.y = groundY - 260; //assign yv to tree
            background.addChild(tree); //add tree to bg to make it visible
            
             

        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            
            //tree
            tree.x = tree.x - 1;

            if (tree.x < -300) {
            tree.x = canvasWidth;
            }

            //cactus ??
            
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
