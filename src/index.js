import {getPhoto} from './server-api'
import Notiflix from 'notiflix';

const form = document.querySelector('.search-form');
const bivEl = document.querySelector('.gallery')
const buttonEl = document.querySelector('.load-more')

let page = 1;
let perPage = 40;
let total = 0;

buttonEl.classList.add('is-hedden')

form.addEventListener('submit', onSubmitForm)
buttonEl.addEventListener('click', onClickBtn) 

function onSubmitForm(evt) { 
   buttonEl.classList.add('is-hedden')
  evt.preventDefault();
  bivEl.innerHTML = '';
  const input = evt.currentTarget.elements.searchQuery.value

  if (input === '') {
   return 
  }
  form.reset();
 page = 1

  getPhoto(input, page).then(data => {
    const photo = data.hits
    if (photo.length === 0) {
      Notiflix.Notify.failure('Sorry there are no images matching your search query. Please try again.');
    }
    getMarkup(photo)
      
    buttonEl.classList.remove('is-hedden')
  }) 
}
function onClickBtn() {
 
  page += 1
  total = page * perPage
  console.log(total)
  getPhoto(input, page).then(data => {
    const totalHits = data.totalHits
    const photo = data.hits
    getMarkup(photo)

    if (total > totalHits) {
      buttonEl.classList.add('is-hedden')
      Notiflix.Notify.failure('Sorry there are no images matching your search query. Please try again.');
    }
  })
}

function getMarkup(photo) {
photo.map((photo) => {
        const markup = `<div class="photo-card"><img src="${photo.webformatURL}"alt="${photo.tags}"loading="lazy"width='320'/>
          <div class="info"><p class="info-item"><b>Likes</b>${photo.likes}</p><p class="info-item"><b>Views</b>${photo.views}</p>
    <p class="info-item">
      <b>Comments</b>${photo.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${photo.downloads}
    </p>
  </div>
</div>`
        bivEl.insertAdjacentHTML("beforeend", markup);
      })
}
