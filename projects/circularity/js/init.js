var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
            //circles vars
            var circle;
            var circles = [];

        // TODO 2 : Create a function that draws a circle 
            //circle draw function
            function drawCircle(){
                //drawing the circle(s)
                circle = draw.randomCircleInArea(canvas, true, true, '#999', 2);
                physikz.addRandomVelocity(circle, canvas);
                view.addChild(circle);
                circles.push(circle);
            }

        // TODO 3 / 7 : Call the drawCircle() function 
        //draw 1 circle

        //BAAD >:C
            drawCircle();

        // loopies ( yeah i think this way is easier to do than for loops )
        //drawing 100 more circles w/ loops
            var loops = 0
            while ( loops < 100 ){
                drawCircle(loops);
                loops++
            }

            //circle doesnt look like a real word anymore :C
        // DRAW 5 ( 4 ) CIRCLES!!
            drawCircle();
            drawCircle();
            drawCircle();
            drawCircle();

        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position //
           
            //moving circles now
            physikz.updatePosition(circles[0]);
            physikz.updatePosition(circles[1]);
            physikz.updatePosition(circles[2]);
            physikz.updatePosition(circles[3]);
            physikz.updatePosition(circles[4]);
            
            
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
            
            // keeping circles inside,,,
            game.checkCirclePosition(circles[0]);
            game.checkCirclePosition(circles[1]);
            game.checkCirclePosition(circles[2]);
            game.checkCirclePosition(circles[3]);
            game.checkCirclePosition(circles[4]);

            // TODO 9 : Iterate over the array
            // is this 8?? it has the same title?
            
            //oh wow that actually worked
            //making all 100 circles move at once w/ loops + keeping them inside
            var loops = 0
            while ( loops < 100 ){
                physikz.updatePosition(circles[loops]);
                game.checkCirclePosition(circles[loops]);
                loops++
            }
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if ( circle.x > canvas.width + 20 ) {
                circle.x = -20;
            } //right --> left  
            
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            
            if( circle.x < -20 ){
                circle.x = canvas.width + 20;
            } //left -- right
            if( circle.y > canvas.height + 20 ){
                circle.y = -20;
            } //up? -- down
            if( circle.y < -20 ){
                circle.y = canvas.height + 20;
            } //down?? -- up

            //challenge thing ( hah i made it smooth without doing this >: )
            var rightEdge = circle.x + circle.radius; //should make the circles move on/off the screen more smoothly
            

            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
