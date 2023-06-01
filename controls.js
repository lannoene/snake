document.addEventListener('keydown', (event) => {
	let code = event.code;
	const inputs = [
		{right: 'KeyD', left: 'KeyA', up: 'KeyW', down: 'KeyS'},
		{right: 'ArrowRight', left: 'ArrowLeft', up: 'ArrowUp', down: 'ArrowDown'},
	];
	for (let i = 0; i <= PLAYER2; ++i) {
		if (inc[i] == 0) {
			if (code == inputs[i].left && pressed[i] != 'right') {
				buffPressed[i] = 'left';
			} else if (code == inputs[i].right && pressed[i] != 'left') {
				buffPressed[i] = 'right';
			} else if (code == inputs[i].up && pressed[i] != 'down') {
				buffPressed[i]  = 'up';
			} else if (code == inputs[i].down && pressed[i] != 'up') {
				buffPressed[i] = 'down';
			}
			inc[i] = inc[i] + 1;
		}
	}

	if (code == 'KeyG' && isOn == 'title') {
		players[PLAYER1] = new player(PLAYER1, 0, 0);
		spawnApples();
		isOn = 'game_play';
		drawGame();
	} else if (code == 'KeyH' && isOn == 'title') {
		players[PLAYER1] = new player(PLAYER1, 0, 0);
		players[PLAYER2] = new player(PLAYER2, 100, 0);
		spawnApples();
		gameFrame = 0;
		isOn = 'game_play';
		drawGame();
	}

	if (code == 'Digit7') {
		appleCount = Number(prompt('Enter apple count'));
	} else if (code == 'Digit8') {
		tileSize = Number(prompt('Enter tile size'));
	} else if (code == 'Digit9') {
		gameDelay = Number(prompt('Enter speed (one space per X frames)'));
	}

	if (code == 'KeyE' && isOn == 'title') {
		isOn = 'info';
	} else if (code == 'KeyE' && isOn == 'info') {
		isOn = 'title';
	}
});