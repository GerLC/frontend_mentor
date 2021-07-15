const shareBtn = document.querySelector('button');
const panel = document.querySelector('.card__profile');

shareBtn.addEventListener('click', () => {
    console.log('click');

    let isHidden = panel.classList.contains('card__profile--hidden');

    if (isHidden) {
        panel.classList.replace('card__profile--hidden', 'card__profile--shown')
    }

    if (!isHidden) {
        panel.classList.replace('card__profile--shown', 'card__profile--hidden')
    }

})