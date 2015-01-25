function Fons() {
    this.images = [];
    this.TilingSprites = [];
    this.ground;
    this.level_width;
    this.wall = false;
    this.setTilingSprite = function () {
        var Sprites = [];
        this.images.forEach(function (item) {
            var object = new PIXI.TilingSprite(item.image.object, item.image.width, item.image.height);
            object.position = item.image.position;
            object.anchor = item.image.anchor;
            if (item.image.ground == true) {
                this.ground = object;
                this.level_width = item.image.width * -1 + 1000;
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
        this.TilingSprites.forEach(function (item) {
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
                            if (player.movie.scale.x == 1) //Лицом к стене
                                if ((player.movie.position.y - item.sprite.object.position.y) == 250) { //Проверка на уровень высоты
                                    wall = true;
                                } else {
                                    wall = false;
                                }
                        } else {
                            wall = false;
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
                        if (this.ground.position.x > this.level_width)
                            item.sprite.object.position.x += 4;
                    break;
                case 'wall':
                    if (!item.sprite.static)
                        //  if (this.ground.position.x > this.level_width)
                        // console.log(item.sprite.object);
                        item.sprite.object.position.y += 6;
                    break;
                case 'wall_plus':
                    item.sprite.object.position.x -= 7;
                    break;

            }

        });
        this.wall = wall;
    }
}

