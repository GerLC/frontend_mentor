// ------------------------------------------------------- //
//                       Variables                         //
// ------------------------------------------------------- //
const btnHamburger = document.querySelector('#btnHamburger');
const header = document.querySelector('.header');

// ------------------------------------------------------- //
//                       FUNCTIONS                         //
// ------------------------------------------------------- //

const openBtn = () => {
    console.log('click hamburger');
  
    if(header.classList.contains('open')){ 
      header.classList.remove('open');    
      
    }
    else { 
      header.classList.add('open');

    }  
}

// ------------------------------------------------------- //
//                       Listeners                         //
// ------------------------------------------------------- //
btnHamburger.addEventListener('click', openBtn);