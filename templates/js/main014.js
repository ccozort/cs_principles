let canvas = null;
let ctx = null;
let WIDTH = 500;
let HEIGHT = 250;
let allSquares = [];

let settings = {
    canvas: null,
    ctx: null,
    WIDTH: 660,
    HEIGHT: 270,
    TILESWIDE: 22,
    TILESHIGH: 8,
    TILEWIDTH: null,
    TILEHEIGHT: null,
    TILESIZE: null,
}

let gamePlan = `
......................
..............#.......
......................
......................
...........#####......
......................
......................
####..################
####..################`;

function parsePlan(plan){
    let tilesHigh = 0;
    let planLength = 0;
    for (i of plan){
        if (i == "\n"){
            tilesHigh++;
        }
        else{
            planLength++;
        }
    }
    // console.log('parseplan ' + planLength/tilesHigh);  
    // console.log('parseplan ' + tilesHigh);  
    settings.TILESWIDE = planLength/tilesHigh;
    settings.TILESHIGH = tilesHigh;
    settings.TILEWIDTH = WIDTH/settings.TILESWIDE;
    settings.TILEHEIGHT = HEIGHT/settings.TILESHIGH;
    // settings.TILEWIDTH = Math.floor(WIDTH/settings.TILESWIDE);
    // settings.TILEHEIGHT = Math.floor(HEIGHT/settings.TILESHIGH);
}



function breadthFirstSearch(graph, start){
    console.log(graph);
    console.log(start);
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
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.pos = new Vec(x,y);
        this.color = color;
        allSquares.push(this);

    }
    create(x, y, w, h, color) {
        return new Square(x, y, w, h, color);
    }
    update() {
        // currently used for walls so no movement
        // this.x += 1;
        // this.y += 1;
        // console.log('trying')
        // console.log(this.x)
    };
    draw() {
        // commented out here to allow for multiple entities to render
        //  move below to draw function
        // ctx.clearRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };

}

class Circle {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.pos = new Vec(x,y);
        this.color = color;
    }
    create() {
        return new Circle(x, y, w, h, color);
    }
    update() {
        this.x += 1;
        this.y += 1;
    };
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 50, 0, 2 * Math.PI);
        ctx.stroke();;
        ctx.fillStyle = this.color;
        ctx.fill();
    };
}

const levelChars = {
    ".": "empty",
    "#": Square,
};

function makeGrid(plan, width) {
    let newGrid = [];
    let newRow = [];
    for (i of plan) {
        if (i != "\n") {
            newRow.push(i);
        }
        if (newRow.length % width == 0 && newRow.length != 0) {
            newGrid.push(newRow);
            newRow = [];
        }
    }
    return newGrid;
}

function readLevel(grid) {
    let startActors = [];
    for (y in grid) {
        for (x in grid[y]) {
            let ch = grid[y][x];
            if (ch != "\n") {
                let type = levelChars[ch];
                if (typeof type == "string") {
                    startActors.push(type);
                }
                else {
                    let t = new type;
                    startActors.push(t.create(x * settings.TILEWIDTH, y * settings.TILEHEIGHT, settings.TILEWIDTH, settings.TILEHEIGHT, 'red'))
                }
            }
        }
    }
    return startActors;
}

function init() {
    // experimental function below derives geometry from plan string
    // parsePlan(gamePlan);
    let currentLevel = readLevel(makeGrid(gamePlan, settings.TILESWIDE));
    // breadthFirstSearch(currentLevel, "pending");
    let gameDiv = document.createElement("div");
    gameDiv.setAttribute("style", "border: 1px solid;"
        + "width:" + WIDTH + "px; "
        + "height:" + HEIGHT + "px; "
        + "background-color: chartreuse");
    document.body.appendChild(gameDiv);
    canvas = document.createElement("canvas");
    // added width and height
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    ctx = canvas.getContext('2d');
    try {
        gameDiv.appendChild(canvas);
    } catch (e) {
        alert(e.message);
    }
    gameLoop();
    console.log("game initialized");

}

function update() {
    for (i of allSquares) {
        if (i instanceof Square) {
            i.update();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    for (i of allSquares) {
        // console.log('drawing');
        i.draw();
    }
}

// let redSquare = new Square(10, 10, 50, 50, 'rgb(200, 0, 0)');
// let blueCircle = new Circle(100, 100, 50, 50, 'blue');

let gameLoop = function () {
    // console.log('the game loop is alive! now comment this out before it eats up memory');
    // redSquare.update();
    // blueCircle.update();
    // redSquare.draw();
    // blueCircle.draw();
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}