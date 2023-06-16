const form = document.querySelector('.search-form');
const bivEl = document.querySelector('.gallery')
const buttonEl = document.querySelector('.load-more')



form.addEventListener('submit',onSubmitForm)
  

function onSubmitForm(evt) { 
  evt.preventDefault();

  const {
    elements: {searchQuery  }
  } = evt.currentTarget;
  //  console.log(searchQuery.value)
  fetch(`https://pixabay.com/api/?key=37294582-8910eff478423fe25551a6b37&q=${searchQuery.value}&image_type=photo&orientation=horizontal&safesearch=true`)
  .then(response => {
     return response.json();
  })
    .then(data => {
      const photoData = data.hits;
      photoData.map((photo) => {
        const markup = `<div class="photo-card"><img src="${photo.webformatURL}"alt="${photo.tags}"loading="lazy"/>
          <div class="info"><p class="info-item"><b>Likes</b>${photo.likes}</p><p class="info-item"><b>Views</b>${photo.views}</p>
    <p class="info-item">
      <b>Comments</b>${photo.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${photo.downloads}
    </p>
  </div>
</div>`
        bivEl.insertAdjacentHTML("afterbegin", markup);
      })
  
    console.log(data)
    console.log(photoData)
  })
  .catch(error => {
    console.log(error)
  });
}

