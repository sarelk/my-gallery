//CR : ALL GLOBALS WHO AREN'T const SHOULD START AS gGameOver, gSecondsInterval
//CR : I LIKED WHAT YOU DID WITH THE NUMBERS' CLASSES
//CR : FINISH THE MISSIING GAME FUNCTIONALITY (VICTORY, RESTARTING, etc...)

var gMat = [];
var gMines = [];
var secondsInterval = 0;
var gameOver = false;

var gLevel = {
    beginner: {
        SIZE: 4,
        MINES: 2
    },
    medium: {
        SIZE: 6,
        MINES: 5
    },
    expert: {
        SIZE: 8,
        MINES: 15
    },
};

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var LEVEL = "beginner"
var SIZE = gLevel[LEVEL].SIZE;
var isGame = gGame.isOn;
var MINES = gLevel[LEVEL].MINES;

function initGame() {
    // This is called when page loads
    gameOver = false;
    gMat = [];
    var board = buildBoard();
    renderBoard(board);
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gMines = [];

}

function buildBoard() {
    //Builds the board by setting
    // mines at random locations, and
    // then calling the
    // setMinesNegsCount()
    // Then return the created board
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            };
        }
    }
    gMat = board;
    return board;
}

function placeMines(mat, i, j) {
    var minesPlaced = 0;
    while (minesPlaced < MINES) {
        var iRnd = getRandomNumber(SIZE);
        var jRnd = getRandomNumber(SIZE);
        if (iRnd === i) iRnd = getRandomNumber(SIZE);
        if (jRnd === i) jRnd = getRandomNumber(SIZE);

        if (!mat[iRnd][jRnd].isMine) {
            mat[iRnd][jRnd].isMine = true;
            gMines.push({ i: iRnd, j: jRnd })
            minesPlaced++;
        }
    }
}
function countNeg(board, iIs, jIs) {
    var negsCount = 0;
    for (var i = iIs - 1; i <= iIs + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = jIs - 1; j <= jIs + 1; j++) {
            if (i === iIs && j === jIs) continue;
            if (j < 0 || j >= board[0].length) continue;
            var cell = board[i][j];
            if (cell.isMine === true) negsCount++
        }
    }
    return negsCount;
}

function setMinesNegsCount(board) {
    // Sets mines-count to neighbours
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {

            var negMines = countNeg(board, i, j);
            if (board[i][j].isMine) {
                var cell = {
                    minesAroundCount: negMines,
                    isShown: false,
                    isMine: true,
                    isMarked: false,
                }
            } else {
                var cell = {
                    minesAroundCount: negMines,
                    isShown: false,
                    isMine: false,
                    isMarked: false,
                }
            }
            board[i][j] = cell;
        }
    }
}

function renderBoard(board) {
    // Print the board as a <table> to the page
    var strHTML = '<table border="1"><thead><tr border="0"><th colspan="' + SIZE + '" class="game"><img src="img/regular.png" class="smiley" onclick="initGame()"><span class="timer">0</span></th></tr></thead><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var className = 'cell cell' + i + '-' + j;
            strHTML += '<td class="' + className + ' hidden-grey" onclick="cellClicked(' + i + ',' + j + ')" oncontextmenu="cellMarked(' + i + ',' + j + ')"></td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector('.board');
    elContainer.innerHTML = strHTML
}

function checkCell(i, j) {
    if (gMat[i][j].isMine === true) {
        revealCell(i, j)
        // console.log("check cell");
        var className = '.cell' + i + '-' + j;
        var elCell = document.querySelector(className);
        elCell.classList.add('border');
        youLost();
    } else {
        revealCell(i, j);
        // console.log("check cell");
        expandShown(i, j);
    }
}

function cellClicked(i, j) {
    //CR : YOU'RE REPEATING YOURSELF HERE AND IN cellMarked
    // Called when a cell (td) is clicked
    if (gameOver) return;
    var elSmiley = document.querySelector('.smiley');
    elSmiley.src = 'img/active.png';
    setTimeout(turnBackSmiley, 200);
    if (gMat[i][j].isShown === true) return;
    var isOn = gGame.isOn;
    if (secondsInterval === 0) secondsInterval = setInterval(incrementSeconds, 1000);
    if (!isOn) {
        gGame.isOn = true;
        placeMines(gMat, i, j);
        setMinesNegsCount(gMat);
        revealCell(i, j);
        expandShown(i, j);
    } else {
        checkCell(i, j);
    }
}

function cellMarked(i, j) {
    // Called on right click to mark a
    // cell as suspected to have a mine
    if (gameOver) return;
    var isOn = gGame.isOn;
    var elSmiley = document.querySelector('.smiley');
    elSmiley.src = 'img/active.png';
    setTimeout(turnBackSmiley, 200);
    if (!isOn) {
        secondsInterval = setInterval(incrementSeconds, 1000);
        gGame.isOn = true;
        placeMines(gMat, i, j);
        setMinesNegsCount(gMat);
    }
    if (gMat[i][j].isMarked === true) {
        var className = '.cell' + i + '-' + j;
        var elCell = document.querySelector(className);
        elCell.classList.remove('flag');
        elCell.classList.add('hidden-grey');
        gMat[i][j].isMarked = false;
        gGame.markedCount--;
    } else {
        var className = '.cell' + i + '-' + j;
        var elCell = document.querySelector(className);
        elCell.classList.remove('hidden-grey');
        elCell.classList.add('flag');
        gMat[i][j].isMarked = true;
        gGame.markedCount++;
    }
}

function checkGameOver() {
    //     Game ends when all mines are
    // marked and all the other cells
    // are shown 

    // there is a bug I didnt succeed to solve. im still on it (~_~) . 
}

function revealCell(i, j) {
    var className = '.cell' + i + '-' + j;
    var elCell = document.querySelector(className);
    elCell.classList.remove('hidden-grey');
    if (gMat[i][j].isMine === true) {
        var className = '.cell' + i + '-' + j;
        var elCell = document.querySelector(className);
        elCell.classList.add('mine');
        gMat[i][j].isShown = true;
    } else {
        var cellContains = gMat[i][j].minesAroundCount;
        if (cellContains === 0) elCell.classList.add('grey');
        if (cellContains === 1) elCell.classList.add('number1');
        if (cellContains === 2) elCell.classList.add('number2');
        if (cellContains === 3) elCell.classList.add('number3');
        if (cellContains === 4) elCell.classList.add('number4');
        if (cellContains === 5) elCell.classList.add('number5');
        if (cellContains === 6) elCell.classList.add('number6');
        if (cellContains === 7) elCell.classList.add('number7');
        if (cellContains === 8) elCell.classList.add('number8');
    }
    gMat[i][j].isShown = true;
    gGame.shownCount++;
    // console.log("revealCell");
}

function expandShown(coordI, coordJ) {
    var res = [];
    var i = coordI;
    if (gMat[i][coordJ].minesAroundCount < 1) {
        for (var idx = coordJ; i >= 0; i) {
            var coord = { i: i--, j: idx };
            if (isMine(coordI, coordJ) === true) {
                continue;
            }
            res.push(coord);
        }

        for (var idx = coordJ; i >= SIZE; i) {
            var coord = { i: i++, j: idx };
            if (isMine(coordI, coordJ) === true) {
                continue;
            }
            res.push(coord);
        }
        for (var idx = coordJ - 1; i >= 0; i--) {
            var coord = { i: i, j: idx };
            if (isMine(coordI, coordJ) === true) {
                continue;
            }
            res.push(coord);
        }

        for (var idx = coordJ + 1; i >= SIZE; i++) {
            var coord = { i: i, j: idx };
            if (isMine(coordI, coordJ) === true) {
                continue;
            }
            res.push(coord);
        }
    }
    for (var i = 0; i < res.length; i++) {
        var iRes = res[i].i;
        var jRes = res[i].j;
        if (isMine(iRes, jRes) === true) {
            res.splice(i);
        }
        // console.log(res);
    }
    for (var i = 0; i < res.length - 1; i++) {
        var iCell = res[i].i;
        var jCell = res[i].j;
        var gMatIsMine = gMat[iCell][jCell];
        revealCell(iCell, jCell);
        // console.log("expand");
    }
}

function youLost() {
    for (var i = 0; i < gMines.length; i++) {
        var iCell = gMines[i].i;
        var jCell = gMines[i].j;
        revealCell(iCell, jCell);
        gameOver = true;
        stopTimer();
        setTimeout(smileyLost, 200);

    }
}

function isMine(i, j) {
    if (gMat[i][j].isMine === true) {
        return true;
    }
}

function changeLevel() {
    var e = document.getElementById("level");
    var strUser = e.options[e.selectedIndex].value;
    LEVEL = strUser;
    SIZE = gLevel[LEVEL].SIZE;
    MINES = gLevel[LEVEL].MINES;
    initGame();
}