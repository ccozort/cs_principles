let canvas = null;
let ctx = null;
let WIDTH = 600;
let HEIGHT = 400;

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

let Square = function (x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.update = function () {
        this.x += 1;
    }
    this.draw = function () {
        /* NEW 
        Below is a necessary ctx method to clear the screen
        after each animation frame is read.
        This gets rid of the "streaking" of graphics 
        across the screen
        */
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
}
// another big step!
// Classes were added to JS to emulate other languages including
// Java, C++, and other object-oriented languages
// A class is essentially a constructor function with different syntax

class Circle {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.update = function () {
            this.x += 1;
            this.y += 1;
        };
        this.draw = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 50, 0, 2 * Math.PI);
            ctx.stroke();;
            ctx.fillStyle = this.color;
            ctx.fill();
        };
    }
}
// here we instantiate the contructor function Square
let redSquare = new Square(10, 10, 50, 50, 'rgb(200, 0, 0)');
// here we instantiate the class Circle
let blueCircle = new Circle(100, 100, 50, 50, 'blue');

let gameLoop = function () {
    // console.log('the game loop is alive! now comment this out before it eats up memory');
    redSquare.update();
    blueCircle.update();
    redSquare.draw();
    blueCircle.draw();
    window.requestAnimationFrame(gameLoop);
}