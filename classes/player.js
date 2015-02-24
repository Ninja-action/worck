function Ninja() {
    this.textures = {
        'tranquility': [],
        'running_right': [],
        'running_left': [],
        'vertushka': [],
        'sitting_down': [],
        'sitting_up': [],
        'somersault': [],
        'rise': [],
        'drop_down': []
    };
    this.speed = 2000000;
    this.animations = {
        'tranquility': {
            'texture': [],
            'play': function (movie) {
                movie.textures = this.texture;
                movie.play();
                movie.animationSpeed = 0.5;
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
        },
        'rise': {
            'texture': [],
            'play': function (movie) {
                movie.textures = this.texture;
                movie.animationSpeed = 0.4;
                movie.gotoAndPlay(0);
                movie.loop = false;
                // movie.position.x += 100;
                movie.anchor = {
                    x: 0.5,
                    y: 0.5};
                return 0;
            }
        },
        'drop_down': {
            'texture': [],
            'play': function (movie) {
                movie.textures = this.texture;
                movie.animationSpeed = 0.5;
                movie.gotoAndPlay(0);
                movie.loop = false;
                // movie.position.x += 100;
                movie.anchor = {
                    x: 0.5,
                    y: -0.02};
                return 0;
            }
        }

    };
    this.lock = 0;
    this.playanimation = function (animation) {
        if (this.lock == 0)
            this.lock = this.animations[animation].play(this.movie);
        // console.log(this.lock);
    }
    this.movie = null;
    this.action = function () {
//        //Передвидение вправо влево
        if (this.lock == 0)
            if (this.right_run) {
                this.playanimation('running');
                if (!fons.wall_end)
                    this.movie.position.x += 4;
                this.movie.scale.x = 1;
                this.animation = 'run_right';

                // this.speed *= -1;
                if (this.movie.position.x > window.w - 500) {
                    this.movie.position.x = window.w - 500;
                    fons.move('right'); //Двигаем фон
                }
                fons.move('right_find_wall');
                fons.move('right_find_wall_end');



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
                fons.move('left_find_wall');
                fons.move('left_find_wall_end');

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
                    if (this.movie.position.x > window.w - 500) {
                        this.movie.position.x = window.w - 500;
                        fons.move('right_somersault');
                    }
                } else {
                    this.movie.position.x -= 5;
                    if (this.movie.position.x < 100) {
                        this.movie.position.x = 50;
                        fons.move('left_somersault');
                    }
                }
                this.movie.anchor.x += 0.025;

                //   console.log(this.movie.anchor);
            }
        }

        //Анимация подъема нужно еще настраивать 
        if ((this.wall) && (fons.wall)) {
            this.playanimation('rise');
            this.wall = 0;
            this.animation = 'wall';
            this.lock = 1;
            this.movie.anchor.y = 1;
        } else {
            this.wall = 0;
            if ((this.movie.playing) && (this.animation == 'wall')) {
                // fons.move('wall');
                // this.movie.position.y += 6;
            } else {
                if ((this.animation == 'wall')) {
                    this.lock = 0;
                    this.movie.position.y -= 385;
                }
            }
        }

        //console.log(this.movie.position.x);
        //Слезаем со стены
        if (fons.wall_end) {
            //  console.log('Край стены');
            this.playanimation('drop_down');

            this.animation = 'drop_down';
            this.lock = 1;
            if ((this.movie.playing) && (this.animation == 'drop_down')) {
                // console.log(this.movie.currentFrame);

                //  fons.move('wall_end');
                //  this.movie.position.y -= 8;

                if ((this.movie.currentFrame == 9)) {
                    this.movie.position.y += 20;
                    //   console.log(this.movie.position.y);
                } else {
                    if (this.movie.currentFrame == 13) {
                        //this.movie.position.y = 0;
                        //console.log(this.movie.position.y);
                    }
                }
            } else {
                this.lock = 0;
                fons.wall_end = false;
                this.movie.position.x += 45;
                this.movie.position.y = window.h - 110;

                fons.move('return_positions');
                console.log(fons.old);
            }
            //
            //  fons.move('wall_end');
        }


        //Спокойная стойка
        if (!this.movie.playing)
            if (this.lock == 0)
            {
                this.playanimation('tranquility');
                this.animation = 'tranquility';
                this.movie.anchor.x = 0.5;
                this.movie.anchor.y = 0.5;
                this.movie.animationSpeed = 0.5;
                // fons.move('seve_positions');
            }




    }
}
