var interactive = true;
var stage = new PIXI.Stage(0x66FF99, interactive);
var renderer = PIXI.autoDetectRenderer(792, 481);
var image_ground = new PIXI.Texture.fromImage('ground.jpg');
var ground = new PIXI.TilingSprite(image_ground, 800, 800);
var assetsToLoader = ["tranquility.json", "running.json"];
loader = new PIXI.AssetLoader(assetsToLoader);
loader.onComplete = onAssetsLoaded
loader.load();
stage.addChild(ground);

//////////////////////Текстуры///////////////////////////////////////////// 
///////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    $('.game').append(renderer.view);
});




function Ninja() {
    this.textures = {
        'tranquility': [],
        'running': []
    };
    this.movie = null;
}

var player = new Ninja();
var player2 = new Ninja();


function onAssetsLoaded() {


    for (var i = 0; i < 20; i++) {
        player.textures.tranquility.push(PIXI.Texture.fromFrame("tranquility" + i + ".png"));

    }
    for (var i = 5; i < 16; i++) {
        player2.textures.running.push(PIXI.Texture.fromFrame("running" + i + ".png"));
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
    player.movie.play();




    player2.movie = new PIXI.MovieClip(player2.textures.running);
    player2.movie.anchor = {
        x: 0.5,
        y: 0.5};
    player2.movie.position = {
        x: 300,
        y: 400};
    player2.movie.animationSpeed = 0.3;
    player2.movie.play();


    stage.addChild(player.movie);
    stage.addChild(player2.movie);
    // start animating
    requestAnimFrame(animate);
}

function animate() {
    requestAnimFrame(animate);

    // render the stage
    renderer.render(stage);
}