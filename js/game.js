// global variables
let canvas;
let ctx;

// here we use init (short for initialize) to setup the canvas and context
// this function will be called in the HTML document in body onload = ""
// we also append the body with a new canvas element
function init() {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext('2d');
    console.log("game initialized");
    document.body.appendChild(canvas);
    gameLoop();
}

// we now have just the drawing commands in the function draw
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    oneSquare.draw();
    twoSquare.draw();
}

// here we have a big leap!
// We are using the window.requestAnimationFrame() 
// .requestAnimationFrame() is a method (likg a function attached to an object)
// It tells the browser that you wish to animate
// It asks the browser to call a specific function, in our case gameLoop
// It uses this function to 'repaint'
// In JS this called a callback, where a function passes an argument to another function
class Square {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        }
        update(){
            this.x += 5;
        };
        draw(){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.w, this.h);
        };
    }

// instantiations...
let oneSquare = new Square(10, 10, 50, 50, 'rgb(200, 100, 200)');
let twoSquare = new Square(60, 60, 50, 50, 'rgb(200, 200, 0)');

// MDN reference https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
let gameLoop = function () {
    // console.log('the game loop is alive! now comment this out before it eats up memory...');
    oneSquare.update();
    draw();
    window.requestAnimationFrame(gameLoop);
}