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

	checkCollision();

	if (player.input.left == true) {
		player.x -= player.xVelocity;
	}
	if (player.input.right == true) {
		player.x += player.xVelocity;
	}

	if (player.input.jump == true) { //get physics for jumping
			player.onGround = false;
			player.yVelocity = -2;
			player.y += player.yVelocity * 2;
	}
	else {
		player.y -= player.yVelocity;
	}
	
}

//game draw function
function draw() {
	ctx.clearRect(0,0, 800, 600);
	player.draw();
	map.draw();
	map1.draw();
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

//map object (look for a better way to do this)
var map = {
	color: "blue",
	x: 10,
	y: 200,
	width: 200,
	height: 50,
	draw: function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	} 
}

//make a deep copy of the base map object
var map1 = jQuery.extend(true, [], map);
map1.color = "red";
map1.x = 300;
map1.y = 300;

var platforms = [map, map1];

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

//basic collision detection
function collide(a,b) {
	return a.x < b.x + b.width &&
		a.x + a.width > b.x &&
		a.y < b.y + b.height &&
		a.y  + a.height > b.y;
}

//check collisions
function checkCollision() {
	//check collision between player and platforms
	platforms.some(function(platform) {
		if (collide(platform, player)) {
			player.y += player.yVelocity;
		}
	});
}