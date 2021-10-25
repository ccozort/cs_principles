let canvas = null;
let ctx = null;
let allSprites = [];

let settings = {
    WIDTH: 660,
    HEIGHT: 270,
    TILESWIDE: 22,
    TILESHIGH: 9,
    TILESIZE: 30,
}

class Vec {
    constructor(x, y) {
      this.x = x; this.y = y;
    }
    plus(other) {
      return new Vec(this.x + other.x, this.y + other.y);
    }
    times(factor) {
      return new Vec(this.x * factor, this.y * factor);
    }
  }

class Square {
    constructor(pos, w, h, color) {
        this.pos = pos;
        this.w = w;
        this.h = h;
        this.color = color;
        allSprites.push(this);
    }

    create(pos, w, h, color) {
        return new Square(pos, w, h, color);
    }
    update() {
        return new Square(this.pos, 10, 10, 'red');
        // this.pos.plus(new Vec(1,1));
    };
    draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
    };

}

function init() {
    let gameDiv = document.createElement("div");
    gameDiv.setAttribute("style", "border: 1px solid;"
        + "width:" + settings.WIDTH + "px; "
        + "height:" + settings.HEIGHT + "px; "
        + "background-color: chartreuse");
    document.body.appendChild(gameDiv);
    canvas = document.createElement("canvas");
    canvas.width = settings.WIDTH;
    canvas.height = settings.HEIGHT;
    ctx = canvas.getContext('2d');
    console.log("game initialized");
    try {
        gameDiv.appendChild(canvas);
    } catch (e) {
        alert(e.message);
    }
    let aSquare = new Square(new Vec(10,10),10,10,"red");
    console.log(aSquare.pos.x);
    console.log(aSquare.pos.x);
    console.log(allSprites);
    gameLoop();
}

function update() {
    for (i of allSprites) {
            i.update();
    }
}

function draw() {
    ctx.clearRect(0, 0, settings.WIDTH, settings.HEIGHT);
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, settings.WIDTH, settings.HEIGHT);
    for (i of allSprites) {
        i.draw();
    }
}

let gameLoop = function () {
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}