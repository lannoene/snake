const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 800;
const PLAYER1 = 0;
const PLAYER2 = 1;
//bug: sometimes body pieces get spawned inside of one another, causing you to die
//bug: sometimes body pieces spawn above you, out of bounds
let length = 1;
let length2 = 1;
let inc = [0, 0];
let gameDelay = 5;
let isOn = 'title';
let buffPressed = [];
buffPressed[PLAYER1] = 'down';
buffPressed[PLAYER2] = 'down';
let pressed = [];
pressed[PLAYER1] = 'down';
pressed[PLAYER2] = 'down';
let tileSize = 25;

let players = [];
let gameFrame = 0;
let appleCount = 50;
let collectables = [];

function spawnApples() {
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
}

function drawTitle() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	if (isOn == 'title') {
		ctx.textAlign = 'center';
		ctx.font = '30px Arial';
		ctx.fillText('Snake', 500, 100);
		ctx.fillText("Press 'G' for SinglePlayer, Press 'H' for Vs", 500, 400);
		ctx.fillText("Press 'E' for more info", 500, 450);
	} else if (isOn == 'info') {
		ctx.textAlign = 'left';
		ctx.font = '25px Arial';
		ctx.fillText("Game controlls => WASD for P1, Arrow Keys for P2. Menu controlls => 7 for apple ", 20, 40);
		ctx.fillText("count, 8 for tile size, 9 for player speed.", 20, 70);
	}
	
	if (isOn == 'title' || isOn == 'info') {
		requestAnimationFrame(drawTitle);
	}
}
drawTitle();

function drawGame() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	pressed = buffPressed;

	players.forEach((object, index) => {
		object.draw();
		if (gameFrame % gameDelay === 0) {
			inc[object.id] = 0;
			object.update();
		}
	});

	//console.log(buffPressed);

	collectables.forEach((object, index) => {
		object.update(index);
		object.draw();
	});
	
	ctx.textAlign = 'end';
	ctx.font = '30px Arial';
	ctx.fillStyle = 'black';

	players.forEach((object, index) => {
		ctx.fillText('P' + Number(object.id + 1) +' Score: ' + object.length, CANVAS_WIDTH - 5, 30 + (index*25));
	});
	ctx.textAlign = 'start';
	gameFrame = gameFrame + 1;
	if (isOn == 'game_play') {
		requestAnimationFrame(drawGame);
	}
}