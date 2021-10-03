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
    <div class="icon trash" onclick='remove(event)'>
      <svg id="ecUvfY3VaWr1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><g id="ecUvfY3VaWr2"><path id="ecUvfY3VaWr3" d="M424,64L336,64L336,48C336,21.49,314.51,0,288,0L224,0C197.49,0,176,21.49,176,48L176,64L88,64C65.909,64,48,81.909,48,104L48,136C48,144.837,55.163,152,64,152L448,152C456.837,152,464,144.837,464,136L464,104C464,81.909,446.091,64,424,64ZM208,48C208,39.18,215.18,32,224,32L288,32C296.82,32,304,39.18,304,48L304,64L208,64Z" transform="matrix(1 0 0 1 0.000004 32)" fill="rgb(0,0,0)" stroke="none" stroke-width="1"/><path id="ecUvfY3VaWr4" d="M78.364,184C75.509,184,73.234,186.386,73.37,189.238L86.57,466.28C87.79,491.92,108.85,512,134.51,512L377.49,512C403.15,512,424.21,491.92,425.43,466.28L438.63,189.238C438.766,186.386,436.491,184,433.636,184ZM320,224C320,215.16,327.16,208,336,208C344.84,208,352,215.16,352,224L352,432C352,440.84,344.84,448,336,448C327.16,448,320,440.84,320,432ZM240,224C240,215.16,247.16,208,256,208C264.84,208,272,215.16,272,224L272,432C272,440.84,264.84,448,256,448C247.16,448,240,440.84,240,432ZM160,224C160,215.16,167.16,208,176,208C184.84,208,192,215.16,192,224L192,432C192,440.84,184.84,448,176,448C167.16,448,160,440.84,160,432Z" fill="rgb(0,0,0)" stroke="none" stroke-width="1"/></g></svg>
    </div>
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


const removeArrayItem = (item) => {
  for (let i=0; i<linksSaved.length; i++) {
    console.log(linksSaved[i].trim() == item.trim())
    console.log(linksSaved[i].trim())
    console.log(item.trim())

    if(linksSaved[i].trim() == item.trim()) {
      linksSaved.splice(i, 1); 
      break;
    }

  }

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
    // console.log(shortLink);
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
  // console.log('click hamburger');
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


const remove = (event) => {
  const element = event.currentTarget.closest('.card__result');
  const link = event.currentTarget.parentElement.querySelector('.overflow-ellipsis');

  removeArrayItem(link.textContent);
  storeLink();
  element.classList.add('removed');
  
  setTimeout(()=> {
    element.remove();
  }, 1000);
}

function getLinks() {
  linksSaved.forEach(x => {
    // console.log(x)
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