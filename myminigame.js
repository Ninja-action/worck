var interactive = true;
var stage = new PIXI.Stage(0x66FF99, interactive);
var renderer = PIXI.autoDetectRenderer(792, 481);
var image_ground = new PIXI.Texture.fromImage('ground.jpg');
var ground = new PIXI.TilingSprite(image_ground, 792, 481);
var assetsToLoader = ["tranquility.json", "running.json", "vertushka.json", "sitting.json", "somersault.json"];
loader = new PIXI.AssetLoader(assetsToLoader);
loader.onComplete = onAssetsLoaded
loader.load();
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
                if (pavement.position.x > -4000)
                    pavement.position.x -= 4;
                if (home.position.x > -4000) {
                    home.position.x -= 2.5;
                    home2.position.x -= 2.5;
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
                    pavement.position.x += 4;
                if (home.position.x < 0) {
                    home.position.x += 2.5;
                    home2.position.x += 2.5;
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

var image_fon = new PIXI.Texture.fromImage('fon.jpg');
var fon = new PIXI.TilingSprite(image_fon, 1920, 1080);
fon.position = {'x': 0, 'y': 0};
stage.addChild(fon);

var image_pavement = new PIXI.Texture.fromImage('pavement.jpg');
var pavement = new PIXI.TilingSprite(image_pavement, 5000, 100);
pavement.position = {'x': 0, 'y': 411};
stage.addChild(pavement);

var image_home = new PIXI.Texture.fromImage('home.jpg');
var home = new PIXI.TilingSprite(image_home, 1000, 810);
home.position = {'x': 0, 'y': -395};
var home2 = new PIXI.TilingSprite(image_home, 1000, 810);
home2.position = {'x': 1050, 'y': -395};

stage.addChild(home);
stage.addChild(home2);
function onAssetsLoaded() {




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

    requestAnimFrame(animate);
}

function animate() {
    requestAnimFrame(animate);


    player.action();





    if (player.movie.position.x < 0) {
        pavement.position.x += 3.5;
    }

    // render the stage
    renderer.render(stage);
}