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
    resultWrapper.style.display = 'flex';

    player.classList.add(`btn-${playerChoice}`);
    house.classList.add(`is-loading`);

    setTimeout(() => {

        getResult();
        resultDisplay.style.display = 'flex';
        house.classList.remove(`is-loading`);
        house.classList.add(`btn-${houseChoice}`);

    }, 3000)


}

function getResult() {
    if (isWinner) {
        result.textContent = 'You Win';
        player.classList.add('is-winner');
        score++;
        scoreValue.textContent = score;
        localStorage.setItem('score', score)
    }

    if (isWinner == false) {
        result.textContent = 'You Lose';
        house.classList.add('is-winner');
        score--;
        scoreValue.textContent = score;
        localStorage.setItem('score', score)
    }

    if (typeof(isWinner) === 'undefined') {
        result.textContent = 'It\'s a Draw';
    }

}

function resetGame() {
    gameWrapper.style.display = 'flex';
    resultWrapper.style.display = 'none';
    resultDisplay.style.display = 'none';

    player.classList.remove(`btn-${playerChoice}`, 'is-winner');
    house.classList.remove(`btn-${houseChoice}`, 'is-winner');

    playerChoice = null;
    houseChoice = null;
    isWinner = false;
}

function resetScore() {
    localStorage.clear()
}