var fps = 60;

var canvas_width = 800;
var canvas_height = 600;

var canvas = $("<canvas width='" + canvas_width +
	                     "' height='" + canvas_height + "'></canvas>");
var ctx = canvas.get(0).getContext("2d");

//onload function
$(function() {
	canvas.appendTo("body");

	setInterval(function() {
		update();
		draw();
		}, 1000/fps);

});


//game update function
function update() {
	if (player.input.left == true) {
		player.x -= player.xVelocity;
	}
	if (player.input.right == true) {
		player.x += player.xVelocity;
	}

	if (player.input.jump == true) { //get physics for jumping
		player.y += player.yVelocity;
	}
	else {
		if (player.y < 100)
			player.y -= player.yVelocity;
	}

}

//game draw function
function draw() {
	ctx.clearRect(0,0, 800, 600);
	player.draw();
}


//player object (all numbers are temp)
var player = {
	color: "black", 
	x: 100, 
	y: 100, 
	xVelocity: 2,
	yVelocity: -2,
	width: 30, 
	height: 50,
	alive: true,
	input: {left: false, right: false, jump: false},
	draw: function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

//keybinds
document.addEventListener("keydown", function(ev) {return onKey(ev, ev.keyCode, true); }, false);
document.addEventListener("keyup", function(ev) {return onKey(ev, ev.keyCode, false); }, false);

function onKey(ev, key, pressed) {
	switch(key) {
		case 32: player.input.jump = pressed; ev.preventDefault(); break;
		case 37: player.input.left = pressed; ev.preventDefault(); break;
		case 39: player.input.right = pressed; ev.preventDefault(); break;
	}
}

