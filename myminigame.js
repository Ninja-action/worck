////////////////Box2d////////////////////
// create box2d world

// setup axis-aligned bounding box
var worldAABB = new b2AABB();
worldAABB.minVertex.Set(-800, -800);
worldAABB.maxVertex.Set(800, 800);
// define gravity
var gravity = new b2Vec2(0, 100);
// body can sleep
var doSleep = true;
// create world
var world = new b2World(worldAABB, gravity, doSleep);
console.log(world);
// frame duration
var timeStep = 1 / 60;
// how many iteration for collisions calculations
var iteration = 1;
function addBody(sprite, x, y, width, height, density) {
    // определение формы тела
    var shapeDef = new b2BoxDef();
    // размеры (из-за особенностей реализации Box2d, ополовиниваем размеры)
    shapeDef.extents.Set(width * 0.5, height * 0.5);
    // определение тела
    var bodyDef = new b2BodyDef();
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
    console.log(body);

}
var udar = 1;
//function b2Vec2(x, y) {
//    this.x = x;
//    this.y = y;
//}
power = 20;
degrees = 45;
function draw() {
    var body, sprite;
    for (body = world.m_bodyList; body; body = body.m_next) {
        // выбираем спрайт из тела
        sprite = body.GetUserData();

        // if (!udar) {
//        body.ApplyForce(new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power,
//                Math.sin(degrees * (Math.PI / 180)) * power), body.GetCenterPosition());
        body.ApplyImpulse(
                new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power,
                        Math.sin(degrees * (Math.PI / 180)) * power), {'x': 200, 'y': 200});
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
var assetsToLoader = ["tranquility.json", "running.json", "vertushka.json", "sitting.json", "somersault.json"];
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
    mySound.play().loop();
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








function Ninja() {
    this.textures = {
        'tranquility': [],
        'running_right': [],
        'running_left': [],
        'vertushka': [],
        'sitting_down': [],
        'sitting_up': [],
        'somersault': []
    };
    this.animations = {
        'tranquility': {
            'texture': [],
            'play': function (movie) {
                movie.textures = this.texture;
                movie.play();
                movie.loop = true;
                return 0;
            }
        },
        'running': {
            'texture': [],
            'play': function (movie) {
                movie.textures = this.texture;
                movie.animationSpeed = 0.25;
                movie.play();
                movie.loop = true;
                return 0;
            }
        },
        'vertushka': {
            'texture': [],
            'play': function (movie) {
                movie.animationSpeed = 0.3;
                movie.textures = this.texture;
                movie.gotoAndPlay(0);
                movie.loop = false;
                return 0;
            }
        },
        'sitting_down': {
            'texture': [],
            'play': function (movie) {
                movie.textures = this.texture;
                movie.animationSpeed = 0.3;
                movie.gotoAndPlay(0);
                movie.loop = false;
                movie.position.y += 10;
                return 1;
            }
        },
        'sitting_up': {
            'texture': [],
            'play': function (movie) {
                movie.textures = this.texture;
                movie.animationSpeed = 0.3;
                movie.gotoAndPlay(0);
                movie.loop = false;
                movie.position.y -= 10;
                return 0;
            }
        },
        'somersault': {
            'texture': [],
            'play': function (movie) {
                movie.textures = this.texture;
                movie.animationSpeed = 0.4;
                movie.gotoAndPlay(0);
                movie.loop = false;
                // movie.position.x += 100;
                movie.anchor = {
                    x: 0.1,
                    y: 0.5};
                return 0;
            }
        }

    };
    this.lock = 0;
    this.playanimation = function (animation) {
        if (this.lock == 0)
            this.lock = this.animations[animation].play(this.movie);
        console.log(this.lock);
    }
    this.movie = null;
    this.action = function () {
//        //Передвидение вправо влево
        if (this.right_run) {
            this.playanimation('running');
            this.movie.position.x += 4;
            this.movie.scale.x = 1;
            this.animation = 'run_right';
            if (this.movie.position.x > 600) {
                this.movie.position.x = 600;
                if (pavement.position.x > -9000)
                    pavement.position.x -= 3;
                if (home.position.x > -9000) {
                    home.position.x -= 3;
                    home2.position.x -= 3;
                    priton.position.x -= 3;
                    skameika.position.x -= 3;
                    skameika2.position.x -= 3;
                    tree1.position.x -= 3;
                    tree2.position.x -= 3;
                }
            }

        } else {
            if (this.animation == 'run_right')
                this.movie.stop();
        }
//
        if (this.left_run) {
            this.playanimation('running');
            this.movie.position.x -= 4;
            this.animation = 'run_left';
            this.movie.scale.x = -1;
            if (this.movie.position.x < 100) {
                this.movie.position.x = 100;
                if (pavement.position.x < 0)
                    pavement.position.x += 3;
                if (home.position.x < 0) {
                    home.position.x += 3;
                    home2.position.x += 3;
                    priton.position.x += 3;
                    skameika.position.x += 3;
                    skameika2.position.x += 3;
                    tree1.position.x += 3;
                    tree2.position.x += 3;
                }
            }
        } else {
            if (this.animation == 'run_left')
                this.movie.stop();
        }
//        //Удар с разворота
        if (this.vertushka) {
            this.playanimation('vertushka');
            this.vertushka = 0;
        }
//        //Сел
        if (this.sitting_down)
        {
            this.animation = 'sitting';
            this.playanimation('sitting_down');

        } else {
            if (this.animation == 'sitting') {
                this.lock = 0;
                this.animation = 'sitting_up';
                this.playanimation('sitting_up');
            }
        }

//        //кувырок
        if (this.somersault) {
            this.playanimation('somersault');
            this.somersault = 0;
            this.animation = 'somersault';

        } else {
            if (this.animation == 'somersault') {

                if (this.movie.scale.x > 0) {
                    this.movie.position.x += 5;
                } else {
                    this.movie.position.x -= 5;
                }
                this.movie.anchor.x += 0.025;

                //   console.log(this.movie.anchor);
            }
        }




        //Спокойная стойка
        if (!this.movie.playing)
            if (this.lock == 0)
            {
                this.playanimation('tranquility');
                this.animation = 'tranquility';
                this.movie.anchor.x = 0.5;
            }




    }
}

var player = new Ninja();

var image_fon;
var fon;


var image_pavement;
var pavement;


var image_home;
var home;
var home2;

var priton;

var skameika;
var tree1;

var box = [];
var player_box;
var balka;




function onAssetsLoaded() {

    image_pavement = new PIXI.Texture.fromImage('pavement.jpg');
    pavement = new PIXI.TilingSprite(image_pavement, 10000, 100);
    pavement.position = {'x': 0, 'y': 411};
    pavement.anchor = {'x': 0, 'y': 0.3};

    image_box = new PIXI.Texture.fromImage('box.png');





    image_fon = new PIXI.Texture.fromImage('fon.jpg');
    fon = new PIXI.TilingSprite(image_fon, 1920, 1080);
    fon.position = {'x': 0, 'y': 0};





    image_priton = new PIXI.Texture.fromImage('priton.png');
    priton = new PIXI.TilingSprite(image_priton, 1694, 1125);
    priton.position = {'x': 2100, 'y': -710};
    stage.addChild(priton);

    image_skameika = new PIXI.Texture.fromImage('skameika.png');
    skameika = new PIXI.TilingSprite(image_skameika, 516, 83);
    skameika.position = {'x': 0, 'y': 350};
    skameika2 = new PIXI.TilingSprite(image_skameika, 516, 83);
    skameika2.position = {'x': 3600, 'y': 350};

    image_tree1 = new PIXI.Texture.fromImage('tree1.png');
    tree1 = new PIXI.TilingSprite(image_tree1, 691, 865);
    tree1.position = {'x': 0, 'y': -440};
    tree2 = new PIXI.TilingSprite(image_tree1, 691, 865);
    tree2.position = {'x': 3650, 'y': -440};

    image_home = new PIXI.Texture.fromImage('home.jpg');
    home = new PIXI.TilingSprite(image_home, 1000, 810);
    home.position = {'x': 0, 'y': -395};
    home2 = new PIXI.TilingSprite(image_home, 1000, 810);
    home2.position = {'x': 1050, 'y': -395};



    stage.addChild(fon);
    stage.addChild(pavement);
    stage.addChild(home);
    stage.addChild(tree1);
    stage.addChild(tree2);

    stage.addChild(home2);
    stage.addChild(skameika);
    stage.addChild(skameika2);

    addBody(pavement, 0, 440, 4000, 10);


    for (var i = 0; i < 1; i++) {
        box[i] = new PIXI.TilingSprite(image_box, 20, 20);
        box[i].anchor = {'x': 0.5, 'y': 0.5};
        box[i].position = {'x': 0, 'y': 0};
        stage.addChild(box[i]);

    }

    for (var i = 0; i < 1; i++) {
        addBody(box[i], 100, 320 + i * 20, 20, 20, 0.5);
    }
//    for (var i = 5; i < 10; i++) {
//        addBody(box[i], 520, 220 + i * 20, 20, 20, 0.5);
//    }

    image_balka = new PIXI.Texture.fromImage('balka.png');
    balka = new PIXI.TilingSprite(image_balka, 300, 20);
    balka.position = {'x': 520, 'y': 300};
    balka.anchor = {'x': 0.5, 'y': 0.5};
   // stage.addChild(balka);
    //addBody(balka, 520, 340, 300, 20, 0.5);
    //  player_box = new PIXI.TilingSprite(image_box, 20, 20);
    // stage.addChild(player_box);










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