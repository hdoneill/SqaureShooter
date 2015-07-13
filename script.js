/* TODO 
	- Add better jump/ movemnt physics (Hugh 2)
	- Add projectiles + projectil collison
	- Add 2 player controls (Hugh 1)
	- Add win / lose condiditons 
	- Add player animation
*/



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

	platforms.forEach(function(platform) {
		var dir = checkCollision(player, platform);
		if (dir == "l" || dir == "r") {
			player.xVelocity = 0;
		}
		else if (dir == "b") {
			player.yVelocity = 0;
		}

		else if (dir == "t") {
			player.yVelocity = -2;
		}
		else {
			player.xVelocity = 2;
			player.yVelocity = -2;
		}
	});

	if (player.input.left == true) {
		player.x -= player.xVelocity;
	}
	if (player.input.right == true) {
		player.x += player.xVelocity;
	}

	if (player.input.jump == true) { //get physics for jumping
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
	platforms.forEach(function(platform) {
		platform.draw();
	});
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

//platform object (look for a better way to do this)
var platforms = [];

var platform = {
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

//make a deep copy of the base platform object
var platform1 = jQuery.extend(true, [], platform);
platform1.color = "red";
platform1.x = 300;
platform1.y = 250;
platforms.push(platform1);

var platform2 = jQuery.extend(true, [], platform);
platform2.color = "green";
platform2.x = 50;
platform2.y = 250;
platforms.push(platform2);

var platform3 = jQuery.extend(true, [], platform);
platform3.x = 175;
platform3.y = 100;
platforms.push(platform3);

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
function checkCollision(a, b) {
	var vX = (a.x + (a.width / 2)) - (b.x + (b.width / 2)),
		vY = (a.y + (a.height / 2)) - (b.y + (b.height / 2)),
		halfWidths = (a.width / 2) + (b.width / 2),
		halfHeights = (a.height / 2) + (b.height / 2),
		colSide = null;

		//check if objects are colliding on top, bottom, left or right sides
	if (Math.abs(vX) < halfWidths && Math.abs(vY) < halfHeights) {
		var oX = halfWidths - Math.abs(vX),
			oY = halfHeights - Math.abs(vY);
		if (oX >= oY) {
			if (vY > 0) {
				colSide = "t";
				a.y += oY;
			} 
			else {
				colSide = "b";
				a.y -= oY - 1; //find fix for -1 being needed (based on player velocity)
			}
		}
		else {
			if (vX > 0) {
				colSide = "l";
				a.x += oX - 1;
			}
			else {
				colSide = "r";
				a.x -= oX - 1;
			}
		}
	}
	return colSide;
}