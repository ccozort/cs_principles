let canvas = null;
let ctx = null;
let allSquares = [];


// NEW settings are now wrapped in a JS object
// note that this will require settings.WIDTH, etc. in order to access values
let settings = {
    WIDTH: 660,
    HEIGHT: 270,
    TILESWIDE: 22,
    TILESHIGH: 9,
    TILESIZE: 30,
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

let keysDown = {};
let keysUp = {};

// welcome to event listeners!  
/* With event listeners, we can use the addEventListener callback function to listen for keys as they are pressed and released

*/
addEventListener("keydown", function (event) {
    keysDown[event.key] = true;
    console.log("keys down " + keysDown);
    

    delete keysUp[event.key];
    console.log(event);
}, false);
addEventListener("keyup", function (event) {
    keysUp[event.key] = true;

    delete keysDown[event.key];
    // console.log("keys up " + keysUp);

}, false);

// experimental function to read and adjust scaling based on
// game plan
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
    console.log('parseplan ' + planLength/tilesHigh);  
    console.log('parseplan ' + tilesHigh);  
    settings.TILESWIDE = planLength/tilesHigh;
    settings.TILESHIGH = tilesHigh;
    settings.TILESIZE = Math.floor(WIDTH/settings.TILESWIDE);
}

class Square {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        allSquares.push(this);

    }
    speak() {
        console.log("hello from square");
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
        // move below to draw function
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
                    startActors.push(t.create(x * settings.TILESIZE, y * settings.TILESIZE, settings.TILESIZE, settings.TILESIZE, 'red'))
                }
            }
        }
    }
    return startActors;
}

function init() {
    // parsePlan(gamePlan);
    let currentLevel = readLevel(makeGrid(gamePlan, settings.TILESWIDE));
    console.log(currentLevel);
    let gameDiv = document.createElement("div");
    gameDiv.setAttribute("style", "border: 1px solid;"
        + "width:" + settings.WIDTH + "px; "
        + "height:" + settings.HEIGHT + "px; "
        + "background-color: chartreuse");
    document.body.appendChild(gameDiv);
    canvas = document.createElement("canvas");
    // added width and height
    canvas.width = settings.WIDTH;
    canvas.height = settings.HEIGHT;

    ctx = canvas.getContext('2d');
    console.log("game initialized");
    try {
        gameDiv.appendChild(canvas);
    } catch (e) {
        alert(e.message);
    }
    gameLoop();
}

function update() {
    for (i of allSquares) {
        if (i instanceof Square) {
            i.update();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, settings.WIDTH, settings.HEIGHT);
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, settings.WIDTH, settings.HEIGHT);
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