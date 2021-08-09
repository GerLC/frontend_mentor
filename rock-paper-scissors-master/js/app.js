let scoreValue = document.querySelector('#score');
let winnerText = document.querySelector('#result');
const logo = document.getElementsByClassName('scoreboard__logo')[0];

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

logo.addEventListener('click', changeToBonusGame)

function changeToBonusGame() {

    gameWrapper.style.opacity = 0;
    addAnimation(logo, 'twirl', 2.5);
    logo.style.opacity = 0;

    setTimeout(() => {
        document.body.classList.toggle("bonus");
        logo.style.opacity = 1;

    }, 1500);

    setTimeout(() => {
        gameWrapper.style.opacity = 1;

        logo.removeAttribute("style");
    }, 2000);

}

buttonsSelection.forEach((x) => {
    x.addEventListener('click', startGame)
})

let addAnimation = (element, animation, time) => {
    element.style.animation = `${animation}+${time}s ease-in forwards`
}

playAgainBtn.addEventListener('click', resetGame);

function housePlay() {
    let random = null;

    if (document.body.classList.contains('bonus')) {
        random = Math.floor(Math.random() * buttonsSelection.length);
    } else {
        random = Math.floor(Math.random() * (buttonsSelection.length - 2));
    }
    
    houseSelection = buttonsSelection[random].id;

    return houseSelection;
}


function startGame(e) {
    playerChoice = e.currentTarget.id;
    houseChoice = housePlay();
    // console.log(playerChoice, houseChoice);

    compareResult(playerChoice, houseChoice);
    // console.log('result = ', compareResult(playerChoice, houseChoice))

    addAnimation(e.target.parentElement, "zoomOut", .5)

    setTimeout(() => renderResult(), .6 * 999);

}


function compareResult(player, oponent) {

    if (player === oponent) {
        isWinner = undefined;
    }

    if (player == 'scissor' && (oponent == 'paper' || oponent == 'lizard')) {
        isWinner = true;
    }

    if (player == 'rock' && (oponent == 'scissor' || oponent == 'lizard')) {
        isWinner = true;
    }

    if (player == 'paper' && (oponent == 'rock' || oponent == 'spock')) {
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
    
    gameWrapper.removeAttribute("style");
    logo.removeAttribute("style");

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