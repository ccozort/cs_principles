let canvas = null;
let ctx = null;
// This time we've added a width and height variable for the screen/canvas size
let WIDTH = 600;
let HEIGHT = 400;

function init() {
    // we've also added a div to the HTML document in case we need to style an element
    // in this case we've 
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

/* Note below that we've added color as a parameter
This is one way to add additional properties to an object, 
or constructor function in this case...

*/
let Square = function (x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    // adding color here
    this.color = color;
    this.update = function () {
        this.x += 5;
    }
    this.draw = function () {
        // changing the fillstyle to use this.color
        // it will be used when we create an instance
        // of this constructor function
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
}
/* // see below how we can now change color when we
instantiate the objects.

 */
let redSquare = new Square(10, 10, 50, 50, 'rgb(200, 0, 0)');
let blueSquare = new Square(10, 10, 50, 50, 'rgb(0, 0, 200)');

let gameLoop = function () {
    // console.log('the game loop is alive! now comment this out before it eats up memory');
    redSquare.update();
    // console.log(oneSquare.x);
    redSquare.draw();
    window.requestAnimationFrame(gameLoop);
}