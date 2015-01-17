var interactive = true;
var stage = new PIXI.Stage(0x66FF99, interactive);
var renderer = PIXI.autoDetectRenderer(792, 481);
var image_ground = new PIXI.Texture.fromImage('ground.jpg');
var ground = new PIXI.TilingSprite(image_ground, 792, 481);
var assetsToLoader = ["tranquility.json", "running.json"];
loader = new PIXI.AssetLoader(assetsToLoader);
loader.onComplete = onAssetsLoaded
loader.load();
stage.addChild(ground);

//////////////////////Текстуры///////////////////////////////////////////// 
///////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    $('.game').append(renderer.view);

    $(document).keydown(function (event) {
        if ((event.which == 39) || (event.which == 68)) {
            player.right_run = 1;
        }
    });
    $(document).keydown(function (event) {
        if ((event.which == 37) || (event.which == 65)) {
            player.left_run = 1;
        }
    });

    $(document).keyup(function (event) {
        if ((event.which == 39) || (event.which == 68)) {
            player.right_run = 0;
        }
    });

    $(document).keyup(function (event) {
        if ((event.which == 37) || (event.which == 65)) {
            player.left_run = 0;
        }
    });

});




function Ninja() {
    this.textures = {
        'tranquility': [],
        'running_right': [],
        'running_left': []
    };
    this.movie = null;
    this.action = function () {
        //Передвидение вправо влево
        if (this.right_run) {
            this.movie.position.x += 3.5;
            player.movie.scale.x = 1;
            this.movie.animationSpeed = 0.3;
            this.movie.textures = this.textures.running_right;
            this.movie.play();
        } else {
            this.movie.textures = this.textures.tranquility;
            this.movie.play();
        }
        if (this.left_run) {
            this.movie.position.x -= 3.5;
            player.movie.scale.x = -1;
            this.movie.animationSpeed = 0.3;
            this.movie.textures = this.textures.running_right;
            this.movie.play();
        }


    }
}

var player = new Ninja();



function onAssetsLoaded() {


    for (var i = 0; i < 20; i++) {
        player.textures.tranquility.push(PIXI.Texture.fromFrame("tranquility" + i + ".png"));

    }
    for (var i = 5; i < 16; i++) {
        player.textures.running_right.push(PIXI.Texture.fromFrame("running" + i + ".png"));
    }
    // ninja.push(PIXI.Texture.fromFrame("running0.png"));
    player.movie = new PIXI.MovieClip(player.textures.tranquility);
    player.movie.anchor = {
        x: 0.5,
        y: 0.5};
    player.movie.position = {
        x: 400,
        y: 400};
    player.movie.animationSpeed = 0.5;
    // console.log(player.movie);

    player.movie.play();




//    player2.movie = new PIXI.MovieClip(player2.textures.running);
//    player2.movie.anchor = {
//        x: 0.5,
//        y: 0.5};
//    player2.movie.position = {
//        x: 300,
//        y: 400};
//    player2.movie.animationSpeed = 0.3;
//    player2.movie.play();


    stage.addChild(player.movie);
    //   stage.addChild(player2.movie);
    // start animating
    requestAnimFrame(animate);
}

function animate() {
    requestAnimFrame(animate);
//    player2.movie.position.x += 3.5;
//    if (player2.movie.position.x > 792)
//        player2.movie.position.x = 0;

    player.action();



    if (player.movie.position.x > 792)
        player.movie.position.x = 0;
    if (player.movie.position.x < 0)
        player.movie.position.x = 792;

    // render the stage
    renderer.render(stage);
}