//importScripts('classes/fons.js');
//importScripts('classes/player.js');
//////////////////Box2d////////////////////
// create box2d world

// setup axis-aligned bounding box
var worldAABB = new b2AABB();
worldAABB.minVertex.Set(-2000, -2000);
worldAABB.maxVertex.Set(2000, 2000);
// define gravity
var gravity = new b2Vec2(0, 100);
// body can sleep
var doSleep = true;
// create world
var world = new b2World(worldAABB, gravity, doSleep);
//console.log(world);
// frame duration
var timeStep = 1 / 60;
// how many iteration for collisions calculations
var iteration = 1;
function addBody(sprite, x, y, width, height, density) {
    // определение формы тела
    // var shapeDef = new b2CircleDef();  //new b2BoxDef();
    var shapeDef = new b2BoxDef();
    // var poligon =  new b2CircleShape();
    // размеры (из-за особенностей реализации Box2d, ополовиниваем размеры)
    shapeDef.extents.Set(width * 0.5, height * 0.5);
    // console.log(shapeDef);
    // shapeDef.radius = 50;
    //  shapeDef.localPosition = {'x': width * 0.5, 'y': height * 0.5};
    // определение тела
    var bodyDef = new b2BodyDef();
    // console.log(bodyDef);
    bodyDef.AddShape(shapeDef);
    bodyDef.position.Set(x, y);

    // если тело не статическое (имеет плотность)
    if (density) {
        shapeDef.density = density;
        // трение
        shapeDef.friction = 1;
        // упругость
        shapeDef.restitution = 0;
        // немного повернем
        // bodyDef.rotation = 0.8;
    }
    body = world.CreateBody(bodyDef);
    // приколотим спрайт к телу
    body.m_userData = sprite;
    //   console.log(body);

}

function addBodyC(sprite, x, y, width, height, density) {
    // определение формы тела
    var shapeDef = new b2CircleDef();  //new b2BoxDef();
    // var shapeDef = new b2BoxDef();
    // var poligon =  new b2CircleShape();
    // размеры (из-за особенностей реализации Box2d, ополовиниваем размеры)
    // shapeDef.extents.Set(width * 0.5, height * 0.5);
    // console.log(shapeDef);
    shapeDef.radius = 25;
    //  shapeDef.localPosition = {'x': width * 0.5, 'y': height * 0.5};
    // определение тела
    var bodyDef = new b2BodyDef();
    // console.log(bodyDef);
    bodyDef.AddShape(shapeDef);
    bodyDef.position.Set(x, y);

    // если тело не статическое (имеет плотность)
    if (density) {
        shapeDef.density = density;
        // трение
        shapeDef.friction = 40;
        // упругость
        shapeDef.restitution = 0.5;
        // немного повернем
        // bodyDef.rotation = 0.8;
    }
    body = world.CreateBody(bodyDef);
    // приколотим спрайт к телу
    body.m_userData = sprite;
    console.log(body);

}

//function b2Vec2(x, y) {
//    this.x = x;
//    this.y = y;
//}
power = 50;
degrees = 45;
function draw() {
    var body, sprite;
    for (body = world.m_bodyList; body; body = body.m_next) {
        // выбираем спрайт из тела
        sprite = body.GetUserData();

        // if (!udar) {
//        body.ApplyForce(new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power,
//                Math.sin(degrees * (Math.PI / 180)) * power), body.GetCenterPosition());
        //  console.log(player);
        if (player) {



            body.ApplyImpulse(
                    new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power,
                            Math.sin(degrees * (Math.PI / 180)) * power), {'x': 200, 'y': 200});
//player.movie.position
            //  body.ApplyTorque(player.speed);

        }
        //  body.GetWorldVector();
        //  {'x': 1, 'y': 1}
        // body.ApplyTorque(50);        
        // console.log(sprite);
//            udar = 1;
//        }
        if (sprite) {
            sprite.position = body.GetCenterPosition();
            sprite.rotation = body.GetRotation();

        }

    }


}

////////////////Box2d////////////////////




var interactive = true;
var stage = new PIXI.Stage(0x66FF99, interactive);
var renderer = PIXI.autoDetectRenderer(792, 481);
//var image_ground = new PIXI.Texture.fromImage('ground.jpg');
//var ground = new PIXI.TilingSprite(image_ground, 792, 481);
var assetsToLoader = ["tranquility.json", "running.json", "vertushka.json", "sitting.json", "somersault.json", "rise.json", "drop_down.json"];
loader = new PIXI.AssetLoader(assetsToLoader);
loader.onComplete = onAssetsLoaded
loader.load();
console.log(loader);
//stage.addChild(ground);

//////////////////////Текстуры///////////////////////////////////////////// 
///////////////////////////////////////////////////////////////////////////

var mySound = new buzz.sound("KharmaGuess - Ninja Action Ringtone", {
    formats: ["mp3"]
});




$(document).ready(function () {
    // mySound.play().loop();
    $('#stop').click(function () {
        mySound.stop();
    });
    $('#play').click(function () {
        mySound.play();
    });
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


    //Удары
    $(document).keyup(function (event) {
        if (event.which == 86) {
            player.vertushka = 1;
            // udar = 0;
        }
    });

    //Сел
    $(document).keydown(function (event) {
        if (event.which == 67) {
            player.sitting_down = 1;
            //  player.timer = 0;
            console.log('сел');
        }
    });
    //Встал
    $(document).keyup(function (event) {
        if (event.which == 67) {
            player.sitting_down = 0;
            console.log('встал');
        }
    });
    //Вверх по стене
    $(document).keyup(function (event) {
        if (event.which == 32) {
            player.wall = 1;
        }
    });

    $(document).keyup(function (event) {
        if (event.which == 88) {
            player.somersault = 1;
        }
    });


});

$(document).ready(function () {
    $(document).keyboard(
            'x',
            function (e, bind) {
                // player.somersault = 1;
            }
    );
});











var player = new Ninja();





function onAssetsLoaded() {
    load_level_1();
    image_box = new PIXI.Texture.fromImage('box.png');






    //Стойка
    for (var i = 0; i < 20; i++) {
        player.animations.tranquility.texture.push(PIXI.Texture.fromFrame("tranquility" + i + ".png"));

    }
    //Бег
    for (var i = 5; i < 16; i++) {
        player.animations.running.texture.push(PIXI.Texture.fromFrame("running" + i + ".png"));
    }
    //Удар
    for (var i = 0; i < 15; i++) {
        player.animations.vertushka.texture.push(PIXI.Texture.fromFrame("vertushka" + i + ".png"));
    }
    //Присел
    for (var i = 0; i < 4; i++) {
        player.animations.sitting_down.texture.push(PIXI.Texture.fromFrame("sitting" + i + ".png"));
    }
    //Встал
    for (var i = 3; i < 7; i++) {
        player.animations.sitting_up.texture.push(PIXI.Texture.fromFrame("sitting" + i + ".png"));
    }
    //Кувырок
    for (var i = 0; i < 14; i++) {
        player.animations.somersault.texture.push(PIXI.Texture.fromFrame("somersault" + i + ".png"));
    }
    //Забраться по стене
    for (var i = 0; i < 17; i++) {
        player.animations.rise.texture.push(PIXI.Texture.fromFrame("rise" + i + ".png"));
    }
    //Слезть со стены
    for (var i = 0; i < 19; i++) {
        player.animations.drop_down.texture.push(PIXI.Texture.fromFrame("drop_down" + i + ".png"));
    }

    // ninja.push(PIXI.Texture.fromFrame("running0.png"));
    player.movie = new PIXI.MovieClip(player.animations.tranquility.texture);
    player.movie.anchor = {
        x: 0.5,
        y: 0.5};
    player.movie.position = {
        x: 400,
        y: 375};
    player.movie.animationSpeed = 0.5;

    player.timer = 0;

    stage.addChild(player.movie);
    // addBody(player_box, player.movie.position.x, player.movie.position.y, 20, 20, 0.5);
    requestAnimFrame(animate);
}

function animate() {
    requestAnimFrame(animate);
    //box[1].applyImpulse(10, 45);

    player.action();

    // вычисляем шаг эмуляции Box2d
    world.Step(timeStep, iteration);

    // рисуем спрайты pixi, руководствуясь новыми параметрами мира Box2d
    draw();

    // render the stage
    renderer.render(stage);
}