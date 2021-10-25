// global variables

// creates a variable called canvas that holds the HTML document element <canvas></canvas>
// the canvas allows us to draw things on the HTML document page
// check out the MDN reference here for more info https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
let canvas = document.createElement("canvas");
// the CanvasRenderingContext2D interface, part of the Canvas API, allows us to draw
// You can use it to create shapes, text, images, and other objects.
// here we assign the context to ctx, which is a shorthand way of accessing commands
let ctx = canvas.getContext('2d');
// Here we append the body of the HTML document, which adds the canvas to the document body
document.body.appendChild(canvas);

// Using the CanvasRenderingContext2D we have access to draw and fill commands
ctx.fillStyle = 'rgb(200, 0, 0)';
ctx.fillRect(10,10,50,50);
ctx.fillStyle = 'rgba(0, 0, 200, .2)';
ctx.fillRect(30, 30, 50, 50);
