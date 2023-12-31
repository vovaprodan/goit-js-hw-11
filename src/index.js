import {getPhoto} from './server-api'
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let inputValue = '';
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
  inputValue = evt.currentTarget.elements.searchQuery.value

  if (inputValue === '') {
   return 
  }
  form.reset();
 page = 1

  getPhoto(inputValue, page).then(data => {
    const photo = data.hits
    const totalHits = data.totalHits;
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
    buttonEl.classList.remove('is-hedden')
    if (photo.length === 0) {
      Notiflix.Notify.failure('Sorry there are no images matching your search query. Please try again.');
    buttonEl.classList.add('is-hedden')
    }
    getMarkup(photo)
   const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  
   });
    lightbox.refresh() 
    
  }) 
}
function onClickBtn() {
 
  page += 1
  total = page * perPage
  
  getPhoto(inputValue, page).then(data => {
    const totalHits = data.totalHits;
    
    const photo = data.hits
    getMarkup(photo)
    lightbox.refresh() 

    if (total > totalHits) {
      buttonEl.classList.add('is-hedden')
      Notiflix.Notify.failure('Sorry there are no images matching your search query. Please try again.');
    }
  })
}

function getMarkup(photo) {
photo.map((photo) => {
  const markup = `<div class="photo-card">
  <a href="${photo.largeImageURL}">
  <img src="${photo.webformatURL}"alt="${photo.tags}"loading="lazy"width='320'/></a>
          <div class="info"><p class="info-item"><b>Likes</b><br>${photo.likes}</p>
          <p class="info-item"><b>Views</b><br>${photo.views}</p>
    <p class="info-item">
       <b>Comments</b><br>${photo.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b><br>${photo.downloads}
    </p>
  </div>
</div>`
        bivEl.insertAdjacentHTML("beforeend", markup);
      })
}
