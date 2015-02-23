var fons = new Fons();
function load_level_1() {
    fons.images.push({
        'image': {
            'name': 'fon',
            'width': window.w,
            'height': window.h,
            'ground': false,
            'static': true,
            'physics': false,
            'position': {'x': 0, 'y': 0},
            'anchor': {'x': 0, 'y': 0},
            'object': new PIXI.Texture.fromImage('fon.jpg')
        }
    });
    fons.images.push({
        'image': {
            'name': 'pavement',
            'width': 10000,
            'height': 100,
            'ground': true,
            'static': false,
            'physics': true,
            'physics_function': function (object) {
                 addBody(object, 0, window.h-100*0.3-10, 4000, 10);
                // return false;
            },
            'position': {'x': 0, 'y': window.h-100*0.3-10},
            'anchor': {'x': 0, 'y': 0.3},
            'object': new PIXI.Texture.fromImage('pavement.jpg')
        }
    });
    fons.images.push({
        'image': {
            'name': 'home',
            'width': 1000,
            'height': 810,
            'ground': false,
            'static': false,
            'physics': false,
            'position': {'x': 0, 'y': window.h-810-70},
            'anchor': {'x': 0, 'y': 0},
            'object': new PIXI.Texture.fromImage('home.jpg')
        }
    });
    fons.images.push({
        'image': {
            'name': 'priton',
            'width': 1694,
            'height': 1125,
            'ground': false,
            'static': false,
            'physics': false,
            'position': {'x': 2100, 'y': window.h-1125-60},
            'anchor': {'x': 0, 'y': 0},
            'object': new PIXI.Texture.fromImage('priton.png')
        }
    });
    fons.images.push({
        'image': {
            'name': 'tree1',
            'width': 691,
            'height': 865,
            'ground': false,
            'static': false,
            'physics': false,
            'position': {'x': 0, 'y': window.h-865-50},
            'anchor': {'x': 0, 'y': 0},
            'object': new PIXI.Texture.fromImage('tree1.png')
        }
    });
    fons.images.push({
        'image': {
            'name': 'skameika',
            'width': 516,
            'height': 83,
            'ground': false,
            'static': false,
            'physics': false,
            'position': {'x': 0, 'y': window.h-83-50},
            'anchor': {'x': 0, 'y': 0},
            'object': new PIXI.Texture.fromImage('skameika.png')
        }
    });
    fons.images.push({
        'image': {
            'name': 'circle',
            'width': 50,
            'height': 50,
            'ground': false,
            'static': false,
            'physics': true,
            'physics_function': function (object) {
                addBodyC(object, 100, 410, 50, 50, 0.5);
                // return false;
            },
            'position': {'x': 0, 'y': 350},
            'anchor': {'x': 0.5, 'y': 0.5},
            'object': new PIXI.Texture.fromImage('circle.png')
        }
    });
    fons.images.push({
        'image': {
            'name': 'wall',
            'width': 150,
            'height': 390,
            'ground': false,
            'static': false,
            'physics': true,
            'physics_function': function (object) {
                //addBodyC(object, 100, 410, 50, 50, 0.5);
                // return false;

            },
            'position': {'x': 450, 'y': window.h-390-40},
            'anchor': {'x': 0, 'y': 0},
            'object': new PIXI.Texture.fromImage('wall.png')
        }
    });
    fons.setTilingSprite();
    fons.LoadLevel();
}
