// global variables
console.log("game initialized");

// here we initialize some global variables with null first so we can change them later
let canvas = null;
let ctx = null;

// here we assign the canvas and context to the variables
canvas = document.createElement("canvas");
ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

ctx.fillStyle = 'rgb(200, 0, 0)';
ctx.fillRect(10,10,50,50);
ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
ctx.fillRect(30, 30, 50, 50);

