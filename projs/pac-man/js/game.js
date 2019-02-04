'use strict';

var gIntervalCherrys;
var WALL = '#';
var FOOD = '.';
var SUPERFOOD = '*';
var EMPTY = ' ';
var CHERRY = '<img src="img/cherry.png"/ class="cherry">';

var gBoard;
var gFood;
var gGame = {
  score: 0,
  isOn: false
};

function init() {
  gBoard = buildBoard();
  gFood = 0;
  createPacman(gBoard);
  createGhosts(gBoard);
  createSuperFood();
  printMat(gBoard, '.board-container');
  // console.table(gBoard);
  gGame.isOn = true;
  var elModal = document.querySelector('.modal');
  elModal.style.display = 'none';
  gGame.score = 0;
  countFood();
  document.querySelector('header h3 span').innerText = gGame.score;
  gIntervalCherrys = setInterval(createCherrys, 15000)
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;
      }
    }
  }
  return board;
}

function countFood() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      if (gBoard[i][j] === '.')++gFood;
    }
  }
  gFood += 5;
}

function createSuperFood() {
  gBoard[1][1] = SUPERFOOD;
  gBoard[8][1] = SUPERFOOD;
  gBoard[1][8] = SUPERFOOD;
  gBoard[8][8] = SUPERFOOD;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
  --gFood;
  if (gFood === 0) gameOver('victory');
}

function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function gameOver(isVictory) {
  console.log('Game Over');
  gGame.isOn = false;

  var elModal = document.querySelector('.modal');
  var elModalSpan = document.querySelector('.modal span');
  if (isVictory === "victory") {
    elModalSpan.innerText = 'YOU WON!. PLAY AGAIN?'
  } else {
    elModalSpan.innerText = 'ARGG. YOU LOST. PLAY AGAIN?'
  }
  elModal.style.display = 'block';
}

function createCherrys() {
  var emptyCells = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      if (gBoard[i][j] === EMPTY) {
        emptyCells.push({ i: i, j: j });
        console.log(emptyCells);
      }
    }
  }
  var randomNum = Math.floor(Math.random() * (emptyCells.length - 1));
  console.log(randomNum);
  renderCell(emptyCells[randomNum], CHERRY);
}