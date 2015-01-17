var interactive = true;
var stage = new PIXI.Stage(0x66FF99, interactive);
var renderer = PIXI.autoDetectRenderer(792, 481);
var image_ground = new PIXI.Texture.fromImage('ground.jpg');
var ground = new PIXI.TilingSprite(image_ground, 800, 800);
var assetsToLoader = ["tranquility.json"];
loader = new PIXI.AssetLoader(assetsToLoader);
loader.onComplete = onAssetsLoaded
loader.load();
stage.addChild(ground);

//////////////////////Текстуры///////////////////////////////////////////// 
///////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    $('.game').append(renderer.view);
});
function onAssetsLoaded() {

    var ninja = [];
    for (var i = 0; i < 20; i++) {
        ninja.push(PIXI.Texture.fromFrame("tranquility" + i + ".png"));
    }
    //ninja.push(PIXI.Texture.fromFrame("tranquility0.png"));
//
    var ninja_muv = new PIXI.MovieClip(ninja);
    ninja_muv.anchor = {
        x: 0.5,
        y: 0.5};
    ninja_muv.position = {
        x: 400,
        y: 400};
    ninja_muv.animationSpeed = 0.5;
    ninja_muv.play();

    stage.addChild(ninja_muv);
    // start animating
    requestAnimFrame(animate);
}

function animate() {
    requestAnimFrame(animate);

    // render the stage
    renderer.render(stage);
}