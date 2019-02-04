function getRandomNumber(max) {
    return Math.floor((Math.random() * 1000) + 1) % max;
}

function incrementSeconds() {
    gGame.secsPassed += 1;
    var elTimer = document.querySelector('.timer');
    elTimer.innerHTML = gGame.secsPassed;
}

function stopTimer() {
    clearInterval(secondsInterval);
    secondsInterval = 0;
}

function turnBackSmiley() {
    var elSmiley = document.querySelector('.smiley');
    elSmiley.src = 'img/regular.png';
}

function smileyLost() {
    var elSmiley = document.querySelector('.smiley');
    elSmiley.src = 'img/lost.png';
    // console.log("l")
}
function smileyWon() {
    var elSmiley = document.querySelector('.smiley');
    elSmiley.src = 'img/victory.png';
    // console.log("l")
}

