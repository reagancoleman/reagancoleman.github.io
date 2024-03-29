var init = function (window) {
    'use strict';

    var 
        opspark = window.opspark,
        draw = opspark.draw,
        physikz = opspark.racket.physikz,
        world = opspark.world,
        
        data = 'assets/spritesheet/halle/data-v9.json',
        app = opspark.makeApp(world.makeRules()),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
    
    var 
        space, 
        rules,
        ground,
        spritesheet,
        halle,
        hud, 
        orbManager, 
        playerManager, 
        particleManager;
    
    var debugHalleHitZones = false;

    space = app.space;
    rules = app.rules,
    particleManager = opspark.makeParticleManager(app.stage);
    ground = opspark.makeGround(app);

    // TODO 2 : add background
    var background = opspark.makeBackground(app, ground); //calls the makeBackground function and stores it in var background
    view.addChild(background); // adds the bg as a child of view
    
    var help = draw.textfield('CONTROLS: || up - jump | right - flying jump | down - crouch | space - shoot | Q - E X P L O D E | is there a way to loop the obstacles??', 
        '15px cursive',
        '#731132', 'left');
    help.x = 10;
    help.y = ground.y + ground.getBounds().height + 120;
    view.addChild(help);
    
    window.opspark.makeSpriteSheet(data)
        .then(function (ss) {
            spritesheet = ss;
            halle = window.opspark.makeHalle(spritesheet, particleManager,debugHalleHitZones);
            halle.x = halle.getBounds().width * 2;
            halle.y = ground.y - halle.getBounds().height + 3;
            app.addUpdateable(halle);
            view.addChild(halle);
            
            playerManager = opspark.makePlayerManager(
                halle, 
                app, 
                opspark.makeProjectileManager(view, space, particleManager));
            
            app.addUpdateable(playerManager);
            app.addUpdateable({update: update});
        });
    
    view.addChild(fps);
    app.addUpdateable(fps);
    
    function update() {
        space.forEach(function (body) {
            physikz.updatePosition(body);
            physikz.updateSpace(space, physikz.hitTestRadial, rules.handleCollision);
            playerManager.hitTest(body);
        });
    }
    
    // TODO 1 : add a heads-up display to game
    var hud = opspark.makeHud(); //calls makeHud function and stores it in the variable hud
    view.addChild(hud); //us3es addChild to add the hud as the child of view so it is visible on screen
    window.hud = hud; //assigns the variable hud to the window.hud


    var game = opspark.createGameManager(app,hud);
    opspark.runLevelInGame(game);

};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
