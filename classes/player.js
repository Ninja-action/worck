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
    this.speed = 2000000;
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
        if (this.lock == 0)
            if (this.right_run) {
                this.playanimation('running');
                this.movie.position.x += 4;
                this.movie.scale.x = 1;
                this.animation = 'run_right';

                // this.speed *= -1;
                if (this.movie.position.x > 600) {
                    this.movie.position.x = 600;
                    fons.move('right'); //Двигаем фон
                }

            } else {
                if (this.animation == 'run_right') {
                    this.movie.stop();
                    this.lock = 0;
                }
            }
//
        if (this.lock == 0)
            if (this.left_run) {
                this.playanimation('running');
                this.movie.position.x -= 4;
                this.animation = 'run_left';
                this.movie.scale.x = -1;
                //this.speed *= -1;
                if (this.movie.position.x < 100) {
                    this.movie.position.x = 100;
                    fons.move('left');
                }
            } else {
                if (this.animation == 'run_left') {
                    this.movie.stop();
                    this.lock = 0;
                }
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
                    if (this.movie.position.x > 600) {
                        this.movie.position.x = 600;
                        fons.move('right_somersault');
                    }
                } else {
                    this.movie.position.x -= 5;
                    if (this.movie.position.x < 100) {
                        this.movie.position.x = 100;
                        fons.move('left_somersault');
                    }
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
