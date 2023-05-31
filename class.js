let j = 0;
let k = 0;
class player {
	constructor(id, x, y, player) {
		this.x = x;
		this.y = y;
		if (id === 0) {
			this.image = playerHeadRight;
		} else {
			this.image = playerBody;
		}
		console.log(id);
		this.length = 1;
		this.id = id;
		this.lastMove = [pressed];
		this.inc = 0;
	}
	update(index) {
		playerPieces.forEach((object, index) => {
			if (object.x === this.x && object.y === this.y && this.id !== object.id || object.x < 0 || object.y < 0 || object.x > CANVAS_WIDTH - tileSize || object.y > CANVAS_HEIGHT - tileSize) {
				if (j < 1) {
					ctx.font = '30px Arial';
					ctx.fillStyle = 'red';
					ctx.fillText('You Died (player 1)!', 400, 400);
					isOn = 'game_over';
					j = j + 1;
					console.log(this, object);
					console.log(object.x === this.x && object.y === this.y && this.id !== object.id, object.x < 0, object.y < 0, object.x > CANVAS_WIDTH - tileSize, object.y > CANVAS_HEIGHT - tileSize);
					
				}
			}
		});
		if (index !== 0) {

			if (this.id == playerPieces.length - 1 && this.id !== 0) {
				this.image = playerBody;
			} else if (this.id === 0) {
				this.image = apple;
			} else {
				this.image = playerBody;
			}
		} else {
			if (pressed == 'right') {
				this.x = this.x + tileSize;
				this.image = playerHeadRight;
			} else if (pressed == 'left') {
				this.image = playerHeadLeft;
				this.x = this.x - tileSize;
			} else if (pressed == 'up') {
				this.image = playerHeadUp;
				this.y = this.y - tileSize;
			} else if (pressed == 'down') {
				this.image = playerHeadDown;
				this.y = this.y + tileSize;
			}
			this.lastMove.unshift(pressed);
			this.lastMove.splice(2, this.lastMove.length - 1);

			moveArray.unshift(pressed);
			console.log(moveArray);

			playerPieces.forEach((object, index) => {
				if (object.x === this.x && object.y === this.y && this.id !== this.id) {
					alert('you died!');
				}
			});
			if (playerPieces2 !== null) {
			playerPieces2.forEach((object, index) => {
				if (object.x === this.x && object.y === this.y) {
						alert('Player 2 wins!');
						isOn = 'gameOver';
					}
				});
			}
		}
	}
	draw(index) {
		ctx.drawImage(this.image, this.x, this.y, tileSize, tileSize);
		ctx.font = '25px Arial';
		ctx.textAlign = 'Right';
		ctx.fillText(index, this.x, this.y + tileSize);
	}
}

class collectable {
	constructor(type, x, y) {
		this.type = type;
		this.x = x;
		this.y = y;

		switch (type) {
			case 'apple':
				this.image = apple;
			break;
		}
	}
	update(index) {
		if (playerPieces[0].x == this.x && playerPieces[0].y == this.y) {
			collectables.splice(index, 1);
			if (playerPieces[playerPieces.length - 1].lastMove[0] == 'down') {
				playerPieces.push(new player(length, playerPieces[playerPieces.length - 1].x, playerPieces[playerPieces.length - 1].y - tileSize));
			} else if (playerPieces[playerPieces.length - 1].lastMove[0] == 'up') {
				playerPieces.push(new player(length, playerPieces[playerPieces.length - 1].x, playerPieces[playerPieces.length - 1].y + tileSize));
			} else if (playerPieces[playerPieces.length - 1].lastMove[0] == 'right') {
				playerPieces.push(new player(length, playerPieces[playerPieces.length - 1].x - tileSize, playerPieces[playerPieces.length - 1].y));
			} else if (playerPieces[playerPieces.length - 1].lastMove[0] == 'left') {
				playerPieces.push(new player(length, playerPieces[playerPieces.length - 1].x + tileSize, playerPieces[playerPieces.length - 1].y));
			} else if (playerPieces[playerPieces.length - 1].lastMove[0] ==  undefined) {
				throw new Error('The last move of the piece is undefined!');
			}
			
			console.log(playerPieces[playerPieces.length - 1].lastMove[1]);
			playerPieces[playerPieces.length - 1].lastMove[1] = playerPieces[playerPieces.length - 2].lastMove[0];
			length = ++length;
			console.log('colleted', playerPieces[playerPieces.length - 1].lastMove[1]);
			collectables.push(new collectable('apple', Math.floor((Math.random() * CANVAS_WIDTH/tileSize))*tileSize, Math.floor((Math.random() * CANVAS_HEIGHT/tileSize))*tileSize));

		}  else if (playerPieces2 !== null && playerPieces2[0].x == this.x && playerPieces2[0].y == this.y) {//player 2 logic
			collectables.splice(index, 1);
			if (playerPieces2[playerPieces2.length - 1].lastMove[0] == 'down') {
				playerPieces2.push(new player2(length, playerPieces2[playerPieces2.length - 1].x, playerPieces2[playerPieces2.length - 1].y - tileSize));
			} else if (playerPieces2[playerPieces2.length - 1].lastMove[0] == 'up') {
				playerPieces2.push(new player2(length, playerPieces2[playerPieces2.length - 1].x, playerPieces2[playerPieces2.length - 1].y + tileSize));
			} else if (playerPieces2[playerPieces2.length - 1].lastMove[0] == 'right') {
				playerPieces2.push(new player2(length, playerPieces2[playerPieces2.length - 1].x - tileSize, playerPieces2[playerPieces2.length - 1].y));
			} else if (playerPieces2[playerPieces2.length - 1].lastMove[0] == 'left') {
				playerPieces2.push(new player2(length, playerPieces2[playerPieces2.length - 1].x + tileSize, playerPieces2[playerPieces2.length - 1].y));
			} else if (playerPieces2[playerPieces2.length - 1].lastMove[1] ==  undefined) {
				throw new Error('The last move of the piece is undefined!');  
			}
			
			console.log(playerPieces2[playerPieces2.length - 1].lastMove[1]);
			//playerPieces[index].lastMove[0] = playerPieces[playerPieces.length - 2].lastMove[1];
			playerPieces2[playerPieces2.length - 1].lastMove[1] = playerPieces2[playerPieces2.length - 2].lastMove[0];
			length2 = ++length2;
			console.log('colleted', playerPieces2[playerPieces2.length - 1].lastMove[1]);
			let rngX = Math.floor((Math.random() * CANVAS_WIDTH/tileSize))*tileSize;
			let rngY = Math.floor((Math.random() * CANVAS_HEIGHT/tileSize))*tileSize;

			collectables.forEach((object, index) => {
				while (object.x = rngX && object.y == rngY) {
					rngX = Math.floor((Math.random() * CANVAS_WIDTH/tileSize))*tileSize;
					rngY = Math.floor((Math.random() * CANVAS_HEIGHT/tileSize))*tileSize;
				}
			});

			collectables.push(new collectable('apple', rngX, rngY));
			
		}
	}
	draw() {
		ctx.drawImage(this.image, this.x, this.y, tileSize, tileSize);
	}
}

class player2 {
	constructor(id, x, y, player) {
		this.x = x;
		this.y = y;
		if (id === 0) {
			this.image = apple;
		} else {
			this.image = playerBody;
		}
		console.log(id);
		this.length = 1;
		this.id = id;
		this.lastMove = [pressed2];
		this.inc = 0;
	}
	update(index) {
		playerPieces2.forEach((object, index) => {
			if (object.x === this.x && object.y === this.y && this.id !== object.id || object.x < 0 || object.y < 0 || object.x > CANVAS_WIDTH - tileSize || object.y > CANVAS_HEIGHT - tileSize) {
				ctx.font = '30px Arial';
				ctx.fillStyle = 'red';
				ctx.fillText('You Died (Player 2)!', 400, 400);
				isOn = 'game_over';
			}
		});
		if (index !== 0) {
			console.log(playerPieces2[index].lastMove[1]);
			if (playerPieces2[index - 1].lastMove[1] == 'right') {
				this.x = this.x + tileSize;
			} else if (playerPieces2[index - 1].lastMove[1] == 'left') {
				this.x = this.x - tileSize;
			} else if (playerPieces2[index - 1].lastMove[1] == 'up') {
				this.y = this.y - tileSize;
			} else if (playerPieces2[index - 1].lastMove[1] == 'down') {
				this.y = this.y + tileSize;
			}
			this.lastMove.unshift(playerPieces2[index - 1].lastMove[1]);
			this.lastMove.splice(2, this.lastMove.length - 1);

			if (this.id == playerPieces2.length - 1 && this.id !== 0) {
				this.image = playerBody;
			} else if (this.id === 0) {
				this.image = apple;
			} else {
				this.image = playerBody;
			}
		} else {
			if (pressed2 == 'right') {
				this.x = this.x + tileSize;
				this.image = playerHeadRight;
			} else if (pressed2 == 'left') {
				this.image = playerHeadLeft;
				this.x = this.x - tileSize;
			} else if (pressed2 == 'up') {
				this.image = playerHeadUp;
				this.y = this.y - tileSize;
			} else if (pressed2 == 'down') {
				this.image = playerHeadDown;
				this.y = this.y + tileSize;
			}
			this.lastMove.unshift(pressed2);
			this.lastMove.splice(2, this.lastMove.length - 1);

			playerPieces2.forEach((object, index) => {
				if (object.x === this.x && object.y === this.y && this.id !== this.id) {
					alert('you died!');
				}
			});

			playerPieces.forEach((object, index) => {
				if (object.x === this.x && object.y === this.y) {
					alert('Player 1 wins!');
					isOn = 'gameOver';
				}
			});
		}
		console.log(playerPieces2[0].lastMove);
	}
	draw() {
		ctx.drawImage(this.image, this.x, this.y, tileSize, tileSize);
	}
}