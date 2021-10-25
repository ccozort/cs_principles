// global variables
console.log("game initialized");

let canvas = null;
let ctx = null;

// here we wrap it all into a function that can be called with body onload
// note that we can use console log to help us see if a function has run
function draw() {
    console.log("drawing on canvas");
    canvas = document.createElement("canvas");
    ctx = canvas.getContext('2d');  
    document.body.appendChild(canvas);
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10,10,50,50);
    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
}

