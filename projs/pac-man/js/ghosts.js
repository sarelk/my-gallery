var GHOST = '&#9781';

var gIntervalGhosts;
var gGhosts;

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor(),
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = getGhostHTML(ghost, false);
}


function createGhosts(board) {
    // Empty the gGhosts array, create some ghosts
    gGhosts = [];

    createGhost(board)
    createGhost(board)

    // Run the interval to move them
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];

        // Create the moveDiff
        var moveDiff = getMoveDiff();
        // console.log('moveDiff', moveDiff);
        var nextLocation = {
            i: ghost.location.i + moveDiff.i,
            j: ghost.location.j + moveDiff.j,
        }
        // console.log('nextLocation', nextLocation);

        var nextCell = gBoard[nextLocation.i][nextLocation.j]
        // If WALL return
        if (nextCell === GHOST) {
            console.log('Ghost Hitting a GHOST');
            return;
        }
        if (nextCell === WALL) {
            console.log('Ghost Hitting a Wall');
            return;
        }
        // DETECT gameOver
        if (nextCell === PACMAN && gPacman.isSuper !== true) {
            gameOver();
        } else if (nextCell === PACMAN && gPacman.isSuper !== true) {
            eatGhost(nextLocation);
        }

        // Set back what we stepped on
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
        renderCell(ghost.location, ghost.currCellContent);

        // Move the ghost MODEL
        ghost.currCellContent = nextCell;
        ghost.location = nextLocation
        gBoard[ghost.location.i][ghost.location.j] = GHOST;

        // Updade the DOM 
        renderCell(ghost.location, getGhostHTML(ghost, false));
    }
}

// There are 4 options where to go
// function getMoveDiff() {
//     // return { i: getRandomIntInclusive(-1, 1), j: getRandomIntInclusive(-1, 1) }
//     var opts = [{ i: 0, j: 1 }, { i: 1, j: 0 }, { i: -1, j: 0 }, { i: 0, j: -1 }];
//     return opts [getRandomIntInc { i: 0, j: 1 } lusive(0, opts.length - 1)];
// }

function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100)
    if (randNum < 25) {
        return {i: 0, j: 1}
    } else if (randNum < 50) {
        return {i: -1, j: 0}
    } else if (randNum < 75) {
        return {i: 0, j: -1}
    } else {
        return {i: 1, j: 0}
    }    
}


function getGhostHTML(ghost, isSuper) {
    if (isSuper === false) {
        return `<span style="color:${ghost.color}">${GHOST}</span>`
    } else {
        return `<span style="color:blue">${GHOST}</span>`
    }
}

function ghostsBlue() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        ghost.color = "blue";
    }
}

function eatGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        if (ghost.location.i === location.i && ghost.location.j === location.j) {
            var ghostId = gGhosts.indexOf(ghost);
            gGhosts.splice(ghostId, 1);
        }
    }
}




