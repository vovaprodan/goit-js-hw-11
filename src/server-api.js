const bivEl = document.querySelector('.gallery')
let page = 1;
function getPhoto(input) {

    console.log(this)
fetch(`https://pixabay.com/api/?key=37294582-8910eff478423fe25551a6b37&q=${input}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
  .then(response => {
     return response.json();
  })
    .then(data => {
        page += 1;
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
  
    // console.log(data)
    // console.log(photoData)
  })
  .catch(error => {
    console.log(error)
  });
}

export {getPhoto}