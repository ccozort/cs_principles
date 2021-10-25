let canvas = null;
let ctx = null;
let WIDTH = 600;
let HEIGHT = 400;
let allSquares = [];

let gamePlan = `
......................
..#................#..
..#................#..
..#................#..
..#........#####...#..
..#####............#..
......#............#..
......##############..
......................`;

class Square {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        // NEW when instantiated, pushes new objects into allSquares
        allSquares.push(this);


    }
    create(x, y, w, h, color) {
        return new Square(x, y, w, h, color);
    }
    update() {
        this.x += 1;
    };
    draw() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
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

function buildLevel(plan, width) {
    let newGrid = [];
    let newRow = [];
    for (i of plan) {
        if (i != "\n") {
            newRow.push(i);
        }
        if (newRow.length % width == 0 && newRow.length != 0) {
            console.log(newRow.length)
            newGrid.push(newRow);
            newRow = [];
            console.log("here's i " + i + " and here's new row " + newRow);
        }
    }
    return newGrid;
}

function readLevel() {
    let startActors = [];
    for (i of gamePlan) {
        console.log(i);
        if (i != "\n") {
            let type = levelChars[i];
            if (typeof type == "string") {
                startActors.push(type);
                console.log('string found');
            }
            else {
                i = new type;
                startActors.push(i.create(10,20,30,40, 'red'))
            }
        }
    }
    console.log(startActors);
}

readLevel();


function init() {
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
    console.log("game initialized");
    try {
        gameDiv.appendChild(canvas);
    } catch (e) {
        alert(e.message);
    }
    gameLoop();
}

/* here we add a global update function
where all items can be updated in a batch
*/
function update() {
    /* looks through the array an updates
    all items in the array according to their update routing
    */
    for (i of allSquares) {
        if (i instanceof Square) {
            i.update();
        }
    }
}


let redSquare = new Square(10, 10, 50, 50, 'rgb(200, 0, 0)');
let blueCircle = new Circle(100, 100, 50, 50, 'blue');

let gameLoop = function () {
    // console.log('the game loop is alive! now comment this out before it eats up memory');
    update();
    // redSquare.update();
    blueCircle.update();
    redSquare.draw();
    blueCircle.draw();
    window.requestAnimationFrame(gameLoop);
}