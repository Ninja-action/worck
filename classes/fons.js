function Fons() {
    this.images = [];
    this.TilingSprites = [];
    this.ground;
    this.level_width;
    this.wall = false;
    this.wall_end = false;
    this.up = false;
    this.old = [];
    this.setTilingSprite = function () {
        var Sprites = [];
        this.images.forEach(function (item) {
            var object = new PIXI.TilingSprite(item.image.object, item.image.width, item.image.height);
            object.position = item.image.position;
            object.anchor = item.image.anchor;
            if (item.image.ground == true) {
                this.ground = object;
                this.level_width = item.image.width * -1 + window.w;
            }
            Sprites.push({
                'sprite': {
                    'name': item.image.name,
                    'static': item.image.static,
                    'physics': item.image.physics,
                    'physics_function': item.image.physics_function,
                    'object': object
                }
            });
        });

        this.TilingSprites = Sprites;
    }
    this.LoadLevel = function () {
        this.TilingSprites.forEach(function (item) {
            stage.addChild(item.sprite.object);
            if (item.sprite.physics) {
                item.sprite.physics_function(item.sprite.object);
            }
        });
    }
    this.move = function (direction) {
        var wall = this.wall;
        var wall_end = this.wall_end;
        var old = this.old;
        var all_length = this.TilingSprites.length;
        this.TilingSprites.forEach(function (item, index) {
            switch (direction) {
                case 'right':
                    if (!item.sprite.static)
                        if (this.ground.position.x > this.level_width)
                            item.sprite.object.position.x -= 3;
                    break;
                case 'right_find_wall':
                    if (item.sprite.name == 'wall')
                        if ((player.movie.position.x > item.sprite.object.position.x - 20) && (player.movie.position.x < item.sprite.object.position.x + 20))
                        {
                            //Когда поворачиваюсь назад эта штука не срабатывает
                            //   if (((player.movie.position.y - item.sprite.object.position.y) == 250) && (player.movie.scale.x > 0)) { //Проверка на уровень высоты  //Лицом к стене
                            wall = true;
//                            } else {
//                                wall = false;
//                            }
                        } else {
                            wall = false;
                        }
                    break;

                case 'right_find_wall_end':
                    if (item.sprite.name == 'wall')
                        if ((player.movie.position.x + 43 > item.sprite.object.position.x + item.sprite.object._width + 5) && (player.movie.position.x + 43 < item.sprite.object.position.x + item.sprite.object._width + 10))
                        {
                            //от края +-20 43 - половина игрока 
//                            //Когда поворачиваюсь назад эта штука не срабатывает
                            if (item.sprite.object.position.y > player.movie.position.y) { //Проверка  высоты  
                                wall_end = true;

                            } else {
                                wall_end = false;
                            }
                        } else {
                            wall_end = false;
                        }
                    break;
                case 'wall_end':

                    if (!item.sprite.static) {
                      //  item.sprite.object.position.y -= 8;
                    }
                    break;
                case 'left':
                    if (!item.sprite.static)
                        if (this.ground.position.x < 0)
                            item.sprite.object.position.x += 3;
                    break;

                case 'right_somersault':
                    if (!item.sprite.static)
                        if (this.ground.position.x > this.level_width)
                            item.sprite.object.position.x -= 4;
                    break;
                case 'left_somersault':
                    if (!item.sprite.static)
                        if (this.ground.position.x < 0)
                            item.sprite.object.position.x += 4;
                    break;
                case 'wall':
                    if (!item.sprite.static) {
                      //  item.sprite.object.position.y += 6;
                        // if (!this.up)
                        // item.sprite.object.position.y = item.sprite.object.position.y + 250;
                    }
                    break;
                case 'wall_plus':
                    // item.sprite.object.position.x -= 7;
                    break;

                case 'seve_positions':


//                    old[index] = {'name': item.sprite.name,
//                        'position': item.sprite.object.position};
                   

                    break;
                case 'return_positions':
                    //  if (!item.sprite.static) {
//                    console.log(old_positions[index].y);
                    // console.log(old[index]);

//                    item.sprite.object.position.x = old[index].position.x;
//                    item.sprite.object.position.y = old[index].position.y;
                    //  }
                    break;

            }

        });
        this.up = true;
        this.wall = wall;
        this.wall_end = wall_end;

        //console.log('count');
       // console.log(this.old);
//         if (this.old..length < old.length){
//              this.old_positions = old_positions;
//              console.log('count');
//         }



    }
   
}

