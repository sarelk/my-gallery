var gPacman;

const PACMAN = '&#9786;';

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  // TODO: When pacman eats a power-food:
  // ▪ ghosts should appear in different color
  // ▪ If pacman meets a ghost it kills it – the ghost should be removed from the ghosts array
  // ▪ Super power ends after 5 sec and ghosts are back to life
  if (nextCell === SUPERFOOD && gPacman.isSuper === true) {
    return;
  } else if (nextCell === SUPERFOOD && gPacman.isSuper !== true) {
    gPacman.isSuper = true;
    updateScore(1)
    ghostsBlue();
    setTimeout(backToBlack, 5000)
  }

  // Hitting CHERRY 

  if (nextCell === CHERRY) updateScore(10);

  // Hitting FOOD? update score
  if (nextCell === FOOD) updateScore(1);
  else if (nextCell === GHOST && gPacman.isSuper !== true) {
    gameOver()
    renderCell(gPacman.location, EMPTY);
    return;
  } else if (nextCell === GHOST && gPacman.isSuper === true) {
    eatGhost(nextLocation);
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default: return null;
  }

  return nextLocation;
}