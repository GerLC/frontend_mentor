// https://shrtco.de/docs/
// GET/POST: https://api.shrtco.de/v2/shorten?url=example.org/very/long/link.html

// ------------------------------------------------------- //
//                       Variables                         //
// ------------------------------------------------------- //
const urlApi = 'https://api.shrtco.de/v2/shorten?url=';

const btnHamburger = document.querySelector('#btnHamburger');
const header = document.querySelector('.header');
const submitBtn = document.querySelector('#submitBtn');
const shortenInput = document.querySelector('#shorten');

const resultWrapper = document.querySelector('.result');
const fadeElems = document.querySelectorAll('.has-fade');

// ------------------------------------------------------- //
//                      HELPER FUNCTIONS                   //
// ------------------------------------------------------- //

const fadeElements = () => {

  if( header.classList.contains('open') ){
    fadeElems.forEach(function(element){
      element.classList.remove('fade-out');
      element.classList.add('fade-in');
    });
  }  else { 
    fadeElems.forEach(function(element){
      element.classList.remove('fade-in');
      element.classList.add('fade-out');
    });
  } 

}

// Append
const appendDiv = (url, shortUrl) => {
  let cardDiv = document.createElement('div');
	cardDiv.classList = 'card card__result flex flex-col';
	cardDiv.innerHTML = `
  <div class="card__heading">
    <p class="overflow-ellipsis">
      ${url}
    </p>
  </div>
  <div class="card__divider"></div>
  <div class="card__content">
    <a href='https://${shortUrl}' target='_blank' id='copy'>${shortUrl}</a>
    <button class="button" id='buttonCopy' onclick='copyClip(event)'></button>
  </div>`;

  resultWrapper.appendChild(cardDiv);

}


// Validate Input
function checkInputs() {
	const urlValue = shortenInput.value.trim();

  if (!isValidURL(urlValue)) {
    setErrorFor(shorten, 'Please provide a valid link');
  }

  if(urlValue === '') {
    setErrorFor(shorten, 'Please add a link');
  } 

  if (isValidURL(urlValue)) {
    animateShortBtn();
    document.querySelector('.input').classList.remove('error');
    getShortenLink(urlValue);
  }
	
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.classList.add('error');
	small.innerText = message;
}

function isValidURL(url) {
  var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

  return (res !== null)
};


// Click Animation
const animateShortBtn = () => {
  submitBtn.classList.add('onclic')
}

const success = () => {

  setTimeout(() => {
    submitBtn.classList.remove('onclic');
    submitBtn.classList.add('validate');
  }, 500)

  setTimeout(() => {
    submitBtn.classList.remove('validate');
  }, 1000)

}

const error = () => {
  setTimeout(() => {
    submitBtn.classList.remove('onclic');
  }, 2250)
}


const successCopy = (e) => {
  e.classList.add('validate-copy');

  setTimeout(() => {
    e.classList.remove('validate-copy');
  }, 1000)


}

  
// ------------------------------------------------------- //
//                      MAIN FUNCTIONS                     //
// ------------------------------------------------------- //

async function getShortenLink(url) {
  try {
    const response = await fetch(`${urlApi}${url}`);
    const data = await response.json();
    let shortLink = data.result.short_link;
    console.log(shortLink);
    appendDiv(url, shortLink)
    success();

  } catch (err) {
    error();
    setErrorFor(shorten, 'Please provide a valid link');
    console.log(err);
  }
}

const openBtn = () => {
  console.log('click hamburger');
  header.classList.toggle('open');
  fadeElements();
}

const buttonClick = (event) => {
  event.preventDefault();
  checkInputs();
}


function copyClip(event) {
  const parent = event.currentTarget.parentElement;
  const copyText = parent.querySelector('#copy');
  const copyBtn = parent.querySelector('#buttonCopy');

  console.log(parent, copyText, copyText.innerText);

  // copyText.select();
  navigator.clipboard.writeText(copyText.innerText);
  successCopy(copyBtn);

}


// ------------------------------------------------------- //
//                   WebStorage FUNCTIONS                  //
// ------------------------------------------------------- //

sessionStorage.setItem('key', 'value');


// ------------------------------------------------------- //
//                       Listeners                         //
// ------------------------------------------------------- //
btnHamburger.addEventListener('click', openBtn);
submitBtn.addEventListener('click', buttonClick);
