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
// ------------------------------------------------------- //
//                       FUNCTIONS                         //
// ------------------------------------------------------- //

const openBtn = () => {
    console.log('click hamburger');
    header.classList.toggle('open');
}


const buttonClick = (event) => {

  if (shortenInput) {
    getShortenLink(shortenInput.value);
    event.preventDefault()

	}

}

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
    <a href='https://${shortUrl}' target='_blank'>${shortUrl}</a>
    <button class="button">Copy</button>
  </div>`;

  resultWrapper.appendChild(cardDiv);

}


async function getShortenLink(url) {
  try {
    const response = await fetch(`${urlApi}${url}`);
    const data = await response.json();
    let shortLink = data.result.short_link;
    console.log(shortLink);
    appendDiv(url, shortLink)

  } catch (err) {

    console.log(err);

  }
}



// ------------------------------------------------------- //
//                       Listeners                         //
// ------------------------------------------------------- //
btnHamburger.addEventListener('click', openBtn);
submitBtn.addEventListener('click', buttonClick)