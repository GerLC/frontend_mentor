let scoreValue = document.querySelector('#score');
let winnerText = document.querySelector('#result');

const gameWrapper = document.querySelector('.main-wrapper');
const resultWrapper = document.querySelector('.result-wrapper');
const resultDisplay =  document.querySelector('.result');
const playAgainBtn = document.querySelector('#play-again-btn');
const buttonsSelection = document.querySelectorAll('.btn');

const player = document.querySelector('#player-choice');
const house = document.querySelector('#house-choice');

let playerChoice, houseChoice;
let isWinner = false;
let score = localStorage.getItem('score') | 0;

scoreValue.textContent = score;

console.log(score)

console.log(housePlay())

buttonsSelection.forEach((x) => {
    x.addEventListener('click', startGame)
})


playAgainBtn.addEventListener('click', resetGame);

function housePlay() {
    const random = Math.floor(Math.random() * buttonsSelection.length);
    houseSelection = buttonsSelection[random].id;

    return houseSelection;
}


function startGame(e) {
    playerChoice = e.currentTarget.id;
    houseChoice = housePlay();
    console.log(playerChoice, houseChoice);

    compareResult(playerChoice, houseChoice);
    console.log('result = ', compareResult(playerChoice, houseChoice))

    renderResult();
}


function compareResult(player, oponent) {

    if (player == oponent) {
        isWinner = undefined;
    }

    if (player == 'scissor' && oponent == 'paper') {
        isWinner = true;
    }

    if (player == 'rock' && oponent == 'scissor') {
        isWinner = true;
    }

    if (player == 'paper' && oponent == 'rock') {
        isWinner = true;
    }
    
    return isWinner;
}

function renderResult() {
    gameWrapper.style.display = 'none';
    resultWrapper.style.display = 'grid';

    player.classList.add(`btn-${playerChoice}`);
    house.classList.add(`is-loading`);
    resultWrapper.style.maxWidth = '1024px';

    setTimeout(() => {
        getResult();
        resultDisplay.style.display = 'flex';
        house.classList.remove(`is-loading`);
        house.classList.add(`btn-${houseChoice}`);
        resultWrapper.classList.add('result-wrapper--show');
        resultWrapper.style.maxWidth = '100%';

    }, 3000)

}

function getResult() {
    if (isWinner) {
        result.textContent = 'You Win';
        result.classList.add('result-player--won');

        player.classList.add('is-winner');
        score++;
        scoreValue.textContent = score;
        localStorage.setItem('score', score)
    }

    if (isWinner == false) {
        result.textContent = 'You Lose';
        result.classList.add('result-player--lost');

        house.classList.add('is-winner');
        score--;
        scoreValue.textContent = score;
        localStorage.setItem('score', score)
    }

    if (typeof(isWinner) === 'undefined') {
        result.textContent = 'It\'s a Draw';
        result.classList.add('result-player--draw');
    }

}

function resetGame() {
    gameWrapper.style.display = 'flex';
    resultWrapper.style.display = 'none';
    resultDisplay.style.display = 'none';

    player.classList.remove(`btn-${playerChoice}`, 'is-winner');
    house.classList.remove(`btn-${houseChoice}`, 'is-winner');
    result.classList.remove('result-player--won', 'result-player--lost', 'result-player--draw');
    resultWrapper.classList.remove('result-wrapper--show');

    playerChoice = null;
    houseChoice = null;
    isWinner = false;
}

function resetScore() {
    localStorage.clear()
}