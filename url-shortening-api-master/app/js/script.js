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

let linksSaved = getItems();

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


const resetForm = () => {
  const inputForm = document.querySelector('.card__form');
  inputForm.reset();
}


// Append
const appendDiv = (url, shortUrl) => {
  let cardDiv = document.createElement('div');
	cardDiv.classList = 'card card__result flex flex-col';
	cardDiv.innerHTML = `
  <div class="card__heading">
    <p class="overflow-ellipsis" onclick='copyClip(event)'>
      ${url}
    </p>
  </div>
  <div class="card__divider"></div>
  <div class="card__content">
    <a href='https://${shortUrl}' target='_blank' id='copy'>${shortUrl}</a>
    <button aria-label="Copy!" class="button" id='buttonCopy' onclick='copyClip(event)'></button>
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
  formControl.classList.add('shake');
	small.innerText = message;

  setTimeout(() => {
    formControl.classList.remove('shake');
  }, 1000)
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
    document.querySelector('.input').classList.add('success');

    submitBtn.classList.remove('onclic');
    submitBtn.classList.add('validate');
  }, 500)

  setTimeout(() => {
    document.querySelector('.input').classList.remove('success');
    submitBtn.classList.remove('validate');
    resetForm();
  }, 1000)

}

const error = () => {
  setTimeout(() => {
    submitBtn.classList.remove('onclic');
  }, 2000)
}


const successCopy = (e) => {
  e.classList.add('validate-copy');

  setTimeout(() => {
    e.classList.remove('validate-copy');
  }, 1000)

}


// Load Links in Storage on Refresh
async function shortenLinkOnLoadStorage(url) {
  try {
    const response = await fetch(`${urlApi}${url}`);
    const data = await response.json();
    let shortLink = data.result.short_link;
    appendDiv(url, shortLink);
  } catch (err) {
    error();
    setErrorFor(shorten, 'Please provide a valid link');
    console.log(err);
  }
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
    appendDiv(url, shortLink);
    linksSaved.push(url);
    success();
    storeLink();

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

  // console.log(parent, copyText, copyText.innerText);

  // copyText.select();
  navigator.clipboard.writeText(copyText.innerText);
  successCopy(copyBtn);
}


function getLinks() {
  linksSaved.forEach(x => {
    console.log(x)
    shortenLinkOnLoadStorage(x);
  })
}

// ------------------------------------------------------- //
//                   WebStorage FUNCTIONS                  //
// ------------------------------------------------------- //

const storeLink = () => {
  sessionStorage.setItem("links", JSON.stringify(linksSaved));
}

function getItems() {
  return JSON.parse(sessionStorage.getItem("links") || "[]");
}


// ------------------------------------------------------- //
//                       Listeners                         //
// ------------------------------------------------------- //
btnHamburger.addEventListener('click', openBtn);
submitBtn.addEventListener('click', buttonClick);



// ------------------------------------------------------- //
//                       Start App                         //
// ------------------------------------------------------- //

getLinks();