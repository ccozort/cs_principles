let canvas = null;
let ctx = null;
let WIDTH = 660;
let HEIGHT = 270;
// NEW we designate tile size for our grid here
let TILESIZE = 30;
// we create an array to put our squares into
let allSquares = [];
let allCircles = [];



// NEW made some familiar changes to our grid...
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
        // currently used for walls so no movement update is needed
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
        // pushing any circles created into the allCircles array
        allCircles.push(this);
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
        // NEW changed circle to use width for diameter
        ctx.arc(this.x, this.y, this.w, 0, 2 * Math.PI);
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

/* NEW big changes below; we are now using the grid
data from makeGrid to read the level in order to 
assign specific x and y values based on their location
in the level plan.

*/
function readLevel(grid) {
    let startActors = [];
    // note the change from i to x and y
    for (y in grid) {
        for (x in grid[y]) {
            /*              crate a variable based on the current
            item in the two dimensional array being read
             */
            let ch = grid[y][x];
            /* if the character is not a new line character
            create a variable from the value attached to the 
            key in the object, e.g. 

            const levelChars = {
                ".": "empty",
                "#": Square,
            };

            where "." is the key and the value is "empty"
            In the case of "#", the key is "#" and the value
            is the Square class.
            
            */
            if (ch != "\n") {
                let type = levelChars[ch];
                if (typeof type == "string") {
                    startActors.push(type);
                }
                else {
                    let t = new type;
                /*  Here we can use the x and y values from reading the grid, 
                    then adjust them based on the tilesize
                     */
                    startActors.push(t.create(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE, 'red'))
                }
            }
        }
    }
    return startActors;
}

/* the readlevel function reads the level after the makeGrid function
creates a two dimensional array from the one dimensional game plan string.
We also set a static width here.
*/
readLevel(makeGrid(gamePlan, 22));


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

let currentLevel = readLevel(makeGrid(gamePlan, 22))
console.log(currentLevel);
console.log(allSquares);

function update() {
    for (i of allSquares) {
        if (i instanceof Square) {
            i.update();
        }
    }
    for (i of allCircles) {
        if (i instanceof Circle) {
            i.update();
        }
    }
}
function draw() {
/* NEW note that we've moved the clearRect method to the global
draw function so that we don't apply it to each object in the game
this increases efficiency as it only needs to be done once
per cycle instead of multiple times per cycle

 */
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    for (i of allSquares) {
        // console.log('drawing');
        i.draw();
    }
    for (i of allCircles) {
        // console.log('drawing');
        i.draw();
    }
}

// let redSquare = new Square(10, 10, 50, 50, 'rgb(200, 0, 0)');
let blueCircle = new Circle(100, 100, TILESIZE, 100, 'rgb(150, 150, 245)');

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