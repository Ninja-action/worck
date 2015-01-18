var interactive = true;
var stage = new PIXI.Stage(0x66FF99, interactive);
var renderer = PIXI.autoDetectRenderer(792, 481);
var image_ground = new PIXI.Texture.fromImage('ground.jpg');
var ground = new PIXI.TilingSprite(image_ground, 792, 481);
var assetsToLoader = ["tranquility.json", "running.json", "vertushka.json", "sitting.json", "somersault.json"];
loader = new PIXI.AssetLoader(assetsToLoader);
loader.onComplete = onAssetsLoaded
loader.load();
stage.addChild(ground);

//////////////////////Текстуры///////////////////////////////////////////// 
///////////////////////////////////////////////////////////////////////////

var mySound = new buzz.sound("KharmaGuess - Ninja Action Ringtone", {
    formats: ["mp3"]
});




$(document).ready(function () {
    mySound.play()
            .fadeIn()
            .loop()
            .bind("timeupdate", function () {
                var timer = buzz.toTimer(this.getTime());
                document.getElementById("timer").innerHTML = timer;
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
        }
    });
    //Встал
    $(document).keyup(function (event) {
        if (event.which == 67) {
            player.sitting_up = 1;
            player.timer = 0;
        }
    });



});

$(document).ready(function () {
    $(document).keyboard(
            'c+space',
            function (e, bind) {
                player.somersault = 1;
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
    this.movie = null;
    this.action = function () {
        //Передвидение вправо влево
        if (this.right_run) {
            this.animation = 1;
            this.movie.position.x += 3.5;
            player.movie.scale.x = 1;
            this.movie.animationSpeed = 0.2;
            this.movie.textures = this.textures.running_right;
        } else {
            if (this.animation == 1)
                this.movie.stop();
        }

        if (this.left_run) {
            this.animation = 2;
            this.movie.position.x -= 3.5;
            player.movie.scale.x = -1;
            this.movie.animationSpeed = 0.2;
            this.movie.textures = this.textures.running_right;

        } else {
            if (this.animation == 2)
                this.movie.stop();
        }
        //Удар с разворота
        if (this.vertushka) {
            this.movie.textures = this.textures.vertushka;
            this.movie.animationSpeed = 0.3;
            this.movie.gotoAndPlay(0);
            this.movie.loop = false;
            this.vertushka = 0;
            this.animation = 3;
        }
        //Сел
        if (this.sitting_down)
        {
            if (this.timer == 0) {
                this.animation = 4;
                this.movie.textures = this.textures.sitting_down;
                this.movie.animationSpeed = 0.3;
                this.movie.gotoAndPlay(0);
                this.movie.loop = false;

                this.old_position = this.movie.position;
                this.sel = 1;
            }
            this.timer += 1;
        }


        //Встал
        if (this.sitting_up > 0)
            if (this.sitting_down > 0)
            {
                this.animation = 5;
                this.movie.textures = this.textures.sitting_up;
                this.movie.animationSpeed = 0.3;
                this.movie.gotoAndPlay(0);
                this.movie.loop = false;
                this.sitting_down = 0;
                this.sitting_up = 0;
                this.sel = 2;
            }

        if (this.sel == 1) {
            this.movie.position.y = this.old_position.y + 10;
            this.sel = 0;
        }
        if (this.sel == 2)
        {
            this.movie.position.y = this.old_position.y - 10;
            this.sel = 0;
        }



        //кувырок
        if (this.somersault) {
            this.count += 1;
            if (this.count < 2) {
                this.movie.textures = this.textures.somersault;
                this.movie.animationSpeed = 0.3;
                this.movie.gotoAndPlay(0);
                this.movie.loop = false;
                // this.somersault = 0;
                this.animation = 5;
            }
//            if (this.old_position.x + 10 > this.movie.position.x)
//                this.movie.position.x += 1;
        }


        //Спокойная стойка
        if (!this.movie.playing)
            if (!this.sitting_down)
            {
                this.movie.loop = true;
                this.movie.textures = this.textures.tranquility;
                this.movie.play();
                this.animation = 0;
                this.timer = 0;
                this.somersault = 0;
                this.count = 0;
            }




    }
}

var player = new Ninja();



function onAssetsLoaded() {

    //Стойка
    for (var i = 0; i < 20; i++) {
        player.textures.tranquility.push(PIXI.Texture.fromFrame("tranquility" + i + ".png"));

    }
    //Бег
    for (var i = 5; i < 16; i++) {
        player.textures.running_right.push(PIXI.Texture.fromFrame("running" + i + ".png"));
    }
    //Удар
    for (var i = 0; i < 15; i++) {
        player.textures.vertushka.push(PIXI.Texture.fromFrame("vertushka" + i + ".png"));
    }
    //Присел
    for (var i = 0; i < 4; i++) {
        player.textures.sitting_down.push(PIXI.Texture.fromFrame("sitting" + i + ".png"));
    }
    //Встал
    for (var i = 3; i < 7; i++) {
        player.textures.sitting_up.push(PIXI.Texture.fromFrame("sitting" + i + ".png"));
    }
    //Кувырок
    for (var i = 0; i < 14; i++) {
        player.textures.somersault.push(PIXI.Texture.fromFrame("somersault" + i + ".png"));
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
    player.timer = 0;



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