document.addEventListener('keydown', (event) => {
	let code = event.code;
	if (inc == 0) {
		if (code == 'KeyA' && pressed != 'right') {
			buffPressed = 'left';
		} else if (code == 'KeyD' && pressed != 'left') {
			buffPressed = 'right';
		} else if (code == 'KeyW' && pressed != 'down') {
			buffPressed  = 'up';
		} else if (code == 'KeyS' && pressed != 'up') {
			buffPressed = 'down';
		}
		inc = inc + 1;
	}
	if (inc2 == 0) {
		if (code == 'ArrowLeft' && pressed2 != 'right') {
			pressed2 = 'left';
		} else if (code == 'ArrowRight' && pressed2 != 'left') {
			pressed2 = 'right';
		} else if (code == 'ArrowUp' && pressed2 != 'down') {
			pressed2  = 'up';
		} else if (code == 'ArrowDown' && pressed2 != 'up') {
			pressed2 = 'down';
		}
		inc2 = inc2 + 1;
	}

	if (code == 'KeyG' && isOn == 'title') {
		playerPieces = [new player(0, 0, 0)];
		isOn = 'game_play';
		drawGame();
	} else if (code == 'KeyH' && isOn == 'title') {
		playerPieces = [new player(0, 0, 0)];
		playerPieces2 = [new player2(0, 100, 0)];
		gameFrame = 0;
		isOn = 'game_play';
		drawGame();
	}
	console.log('press');
});