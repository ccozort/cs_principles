let canvas = null;
let ctx = null;
let WIDTH = 600;
let HEIGHT = 400;

// now we'll introduce a gameplan below
// this game plan is a string, or array of characters

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

/* note that we've converted square to a class
operationally we'll be using it the same way
also note that we've moved the classes to the top of the code
this helps when we need to have access to them later as they 
will now be read early when the code is interpreted
 */
class Square {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;

    }
    // note 
    create(x, y, w, h, color) {
        return new Square(x, y, w, h, color);
    }
    update() {
        this.x += 1;
    };
    draw() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
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


// Another new way to create objects!
/* below you will see a contant that will help 
use tell the game which characters do what in the level map

*/
const levelChars = {
    ".": "empty",
    "#": Square,
};

/* below we'll parse (or read and do something with)
the level plan.  We will be reading the characters in the string
and when we reach a new line or "\n" we'll take the previously 
read characters into an array newRow and push them into the array
newGrid 
 */
function buildLevel(plan, width) {
    let newRow = [];
    let newGrid = [];
/* 
    a for loop that looks through the string value in 
    the plan string (an array of chars) and pushes the one
    dimensional array into a two dimensional array
    giving us a way to delineate between x and y values for 
    elements on the 'level'
    */

    for (i of plan) {
        // looks for new line and if it is not seen, 
        // pushes the current character into the newRow array
        if (i != "\n") {
            newRow.push(i);
        }
        /* looks to see if the newRow length is evenly 
        divisible without remainder with the width value
        When the modulo of the current row and the designated
        width is zero, the parser begins building a new row
        */
        if (newRow.length % width == 0 && newRow.length != 0) {
            console.log(newRow.length)
            // pushes newRow into newGrid
            newGrid.push(newRow);
            // "resets" newRow to an empty array to be filled again
            newRow = [];
            console.log("here's i " + i + " and here's new row " + newRow);
        }
    }
    return newGrid;
}


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



let redSquare = new Square(10, 10, 50, 50, 'rgb(200, 0, 0)');
let blueCircle = new Circle(100, 100, 50, 50, 'blue');

let gameLoop = function () {
    // console.log('the game loop is alive! now comment this out before it eats up memory');
    redSquare.update();
    blueCircle.update();
    redSquare.draw();
    blueCircle.draw();
    window.requestAnimationFrame(gameLoop);
}