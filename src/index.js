import {getPhoto} from './server-api'

const form = document.querySelector('.search-form');
const bivEl = document.querySelector('.gallery')
const buttonEl = document.querySelector('.load-more')

const axios = require('axios').default;

let input = '';

form.addEventListener('submit', onSubmitForm)
buttonEl.addEventListener('click', onClickBtn)

// getPhoto()
  

function onSubmitForm(evt) { 
  evt.preventDefault();
  bivEl.innerHTML = '';
  
  input = evt.currentTarget.elements.searchQuery.value
  //  form.reset();
  
  getPhoto(input)
 
}

function onClickBtn() {

  getPhoto(input)
}


//   async function getPhoto() {
//   try {
//     const response = await axios.get(`https://pixabay.com/api/?key=37294582-8910eff478423fe25551a6b37&image_type=photo&orientation=horizontal&safesearch=true`);
//     const data = await response.json()
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

