function Fons() {
    this.images = [];
    this.TilingSprites = [];
    this.ground;
    this.level_width;
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
        this.TilingSprites.forEach(function (item) {
            switch (direction) {
                case 'right':
                    if (!item.sprite.static)
                        if (this.ground.position.x > this.level_width)
                            item.sprite.object.position.x -= 3;
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
            }

        });
    }
}

