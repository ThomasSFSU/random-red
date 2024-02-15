var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");


/*//Rectangle

c.fillStyle = "rgba(0, 255, 0, .8)";
c.fillRect(100, 100, 50,50);
console.log(canvas);

//Line

c.beginPath();
c.moveTo(100, 100);
c.lineTo(50, 300);
c.lineTo(100, 300);
c.lineTo(100, 100);
c.strokeStyle = "green";
c.stroke();
c.fillStyle = "rgba(0,0,255, .8)";
c.fill();


//Circle / Arc
c.beginPath();
c.arc(100, 100, 30, 0, Math.PI * 2, false);
c.strokeStyle = "blue";
c.stroke();

for (var i = 0; i < 1000; i++) {
	var x = Math.random() * window.innerWidth;
	var y = Math.random() * window.innerHeight;
	var value1 = Math.floor(Math.random() * 255);
	var value2 = Math.floor(Math.random() * 255);
	var value3 = Math.floor(Math.random() * 255);
	c.beginPath();
	c.arc(x, y, 30, 0, Math.PI * 2, false);
	c.strokeStyle = "rgb(" + value1 + "," + value2 + "," + value3 + ")";
	c.stroke();
}
*/

//Creates mouse object to store the intital values of mouse.x and mouse.y

var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 65;
var minRadius = 30;

//Event listener to detect mouse movement

window.addEventListener("mousemove", function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
});

//Resizes the cavas each time the window size is altered

window.addEventListener("resize", function(){
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;

	var value1 = Math.floor(Math.random() * 255);
	var value2 = Math.floor(Math.random() * 255);
    var value3 = Math.floor(Math.random() * 255);
    var value4 = Math.floor(Math.random() * 255);
    var value5 = Math.floor(Math.random() * 255);
    var value6 = Math.floor(Math.random() * 255);
    var opacity = Math.random() + 0.1;
    var outline = Math.floor(Math.random() * 15);

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
		c.strokeStyle = "rgba( " + value1 + ", 0, 0," + opacity + ")";
		c.lineWidth = outline;
		c.stroke();
		c.fillStyle = "rgba( " + value2 + ", 0, 0," + opacity + ")";
		c.fill();
	}

	this.update = function() {
		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		if (this.y + this.radius > canvas.height || this.y - this.radius <0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		//Interactivity

		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			if (this.radius < maxRadius){
			this.radius += 2;
		}
		} else if ( this.radius > this.minRadius){
			this.radius -= 1;
		}

		this.draw();
	}
}


var circleArray = [];

function init() {

circleArray = [];

for (var i = 0; i < 300; i++) {

	var radius = (Math.random() * minRadius) + 1;
	var x = Math.random() * (canvas.width - radius * 2) + radius;
	var y = Math.random() * (canvas.height - radius * 2) + radius;
	var dx = (Math.random() - 0.5) * 2;
	var dy = (Math.random() - 0.5) * 2;

	circleArray.push(new Circle(x, y, dx, dy, radius));
}

}

function animate() {

	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}

}

init();
animate();