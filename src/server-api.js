const bivEl = document.querySelector('.gallery')
const axios = require('axios').default
const API_KEY = '37294582-8910eff478423fe25551a6b37'

let input = '';
async function getPhoto(input,page) {
  try {
const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${input}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
    const data = await response.data;
    return data;
   
  } catch (error) {
    console.error(error);
  }
  } 

//    


export {getPhoto}