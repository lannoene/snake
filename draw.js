const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 800;
//bug: sometimes body pieces get spawned inside of one another, causing you to die
//bug: sometimes body pieces spawn above you, out of bounds
let length = 1;
let length2 = 1;
let inc = 0;
let inc2 = 0;
let gameDelay = 5;
let isOn = 'title';
let buffPressed = 'right';
let pressed = 'right';
let pressed2 = 'right';
let tileSize = 25;

let playerPieces = [];
let moveArray = [];
let playerPieces2 = null;
let gameFrame = 0;
let appleCount = 1000;
let collectables = [];
for (i = 0; i < appleCount; i = i + 1) {
	let rngX = Math.floor((Math.random() * CANVAS_WIDTH/tileSize))*tileSize;
	let rngY = Math.floor((Math.random() * CANVAS_HEIGHT/tileSize))*tileSize;

	collectables.forEach((object, index) => {
		while (object.x == rngX && object.y == rngY) {
			rngX = Math.floor((Math.random() * CANVAS_WIDTH/tileSize))*tileSize;
			rngY = Math.floor((Math.random() * CANVAS_HEIGHT/tileSize))*tileSize;
			console.log('already exists');
		}
	});

	collectables.push(new collectable('apple', rngX, rngY));
}

function drawTitle() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	ctx.textAlign = 'center';
	ctx.font = '30px Arial';
	ctx.fillText('Snake', 500, 100);
	ctx.fillText("Press 'G' for SinglePlayer, Press 'H' for Vs", 500, 400);
	ctx.fillText("WASD for P1, Arrow Keys for P2", 500, 600);

	if (isOn == 'title') {
		console.log('e');
		requestAnimationFrame(drawTitle);
	}
}
drawTitle();

function drawGame() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	pressed = buffPressed;

	playerPieces.forEach((object, index) => {
		object.draw(index);
		if (gameFrame % gameDelay === 0) {
			object.update(index);
			inc = 0;
		}
	});

	//this is player 2 stupid
	if (playerPieces2 !== null) {
		object.draw(index);
		playerPieces2.forEach((object, index) => {
			if (gameFrame % gameDelay === 0) {
				object.update(index);
				inc2 = 0;
			}
		});
	}

	collectables.forEach((object, index) => {
		object.update(index);
		object.draw();
	});
	
	ctx.textAlign = 'end';
	ctx.font = '30px Arial';
	ctx.fillStyle = 'black';
	if (playerPieces2 !== null) {
		ctx.fillText('P1 Score: ' + length, CANVAS_WIDTH - 5, 30);
		ctx.fillText('P2 Score: ' + length2, CANVAS_WIDTH - 5, 60);
	} else {
		ctx.fillText('Score: ' + length, CANVAS_WIDTH - 5, 30);
	}
	ctx.textAlign = 'start';
	gameFrame = gameFrame + 1;
	if (isOn == 'game_play') {
		requestAnimationFrame(drawGame);
	}
}