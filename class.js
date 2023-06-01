let j = 0;
let k = 0;

class player {
	constructor(id, x, y) {
		this.x = x;
		this.y = y;
		this.image = playerHeadRight;
		console.log(id);
		this.length = 0;
		this.id = id;
		this.lastMove = [pressed];
		this.inc = 0;
		this.bodyXY = [];
		this.moveArray = [];
	}
	update() {
		let plrPressed = pressed[this.id];
		if (plrPressed == 'right') {
			this.x = this.x + tileSize;
			this.image = playerHeadRight;
		} else if (plrPressed == 'left') {
			this.image = playerHeadLeft;
			this.x = this.x - tileSize;
		} else if (plrPressed == 'up') {
			this.image = playerHeadUp;
			this.y = this.y - tileSize;
		} else if (plrPressed == 'down') {
			this.image = playerHeadDown;
			this.y = this.y + tileSize;
		}
		this.moveArray.unshift(plrPressed);

		this.bodyXY = [];
		let position = {x: this.x, y: this.y};
		for (let i = 0; i < this.length; i++) {
			if (i < this.moveArray.length) {
				if (this.moveArray[i] == 'right') {
					position.x = position.x - tileSize;
				} else if (this.moveArray[i] == 'left') {
					position.x = position.x + tileSize;
				} else if (this.moveArray[i] == 'up') {
					position.y = position.y + tileSize;
				} else if (this.moveArray[i] == 'down') {
					position.y = position.y - tileSize;
				}
			}
			this.bodyXY[i] = {x: position.x, y: position.y}; // We need to make a new object
		}

		players.forEach((object, index) => {
			if (this.x === object.x && this.y === object.y && this !== object) {//headshot
				ctx.fillStyle = 'red';
				ctx.textAlign = 'center';
				ctx.fillText('You both died. Headshot!', 500, 400);
				alert('dead (headshot)');
				isOn = 'game_over';
			}

			if (this.x < 0 || this.y < 0 || this.x > CANVAS_WIDTH - tileSize || this.y > CANVAS_HEIGHT - tileSize) {
				ctx.fillStyle = 'red';
				ctx.textAlign = 'center';
				ctx.fillText('Player ' + Number(this.id + 1) + ' died (out of bounds)', 500, 400);
				isOn = 'game_over';
			}

			for (let i = 0; i < object.bodyXY.length; i++) {//body colis
				if (this.x === object.bodyXY[i].x && this.y === object.bodyXY[i].y) {
					ctx.fillStyle = 'red';
				ctx.textAlign = 'center';
				ctx.fillText('Player ' + Number(this.id + 1) + ' died', 500, 400);
					isOn = 'game_over';
				}
			}
		});
	}
	draw(index) {
		ctx.drawImage(this.image, this.x, this.y, tileSize, tileSize);

		for (let i = 0; i < this.bodyXY.length; i++) {
			ctx.drawImage(playerBody, this.bodyXY[i].x, this.bodyXY[i].y, tileSize, tileSize);
		}
		//ctx.font = '25px Arial';
		//ctx.textAlign = 'Right';
		//ctx.fillText(index, this.x, this.y + tileSize);
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
	update(ColIndex) {
		players.forEach((object, index) => {
			if (object.x == this.x && object.y == this.y) {
				collectables.splice(ColIndex, 1);
	
				++object.length;
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
		});
		
	}
	draw() {
		ctx.drawImage(this.image, this.x, this.y, tileSize, tileSize);
	}
}