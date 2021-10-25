// Global variables
let canvas = null;
let ctx = null;

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
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);
    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
}

// we create a new function called gameLoop to be called in the init function
let gameLoop = function() {
    draw();
}

