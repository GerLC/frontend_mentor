const hamburgerBtn = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburgerBtn.addEventListener('click', () => {
    console.info('Clicked!')
    hamburgerBtn.classList.toggle('opened');
    menu.classList.toggle('nav__items--shown');

})
