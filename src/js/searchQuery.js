//Render templates
import formTempl from '../templates/form.hbs'
import galleryTempl from '../templates/gallery.hbs'
// import cardTempl from '../templates/card.hbs'

const bodyRef = document.querySelector('body');
const galleryRef = document.querySelector('.gallery');
const galleryContainer = document.querySelector('.gallery-container');
// console.log(bodyRef, galleryContainer);
function renderTampl(tampl, elem, source) {
    let markup = tampl(source)
    return elem.insertAdjacentHTML('afterbegin', markup)
}

renderTampl(formTempl, bodyRef)
// renderTampl(galleryTempl, galleryContainer)
// renderTampl(cardTempl, bodyRef)

//Query API
import ApiService from "./apiService"

const searchForm = document.querySelector('#search-form');
const input = searchForm.querySelector('input');

const newApiService = new ApiService()

searchForm.addEventListener('submit', onSearch)
const button = document.querySelector('[data-action="load-more"]');
button.addEventListener('click', onFetch);

function onSearch(e) {
  e.preventDefault();
  clearGalleryList();

  newApiService.query = e.currentTarget.elements.query.value;
  console.dir(e.currentTarget.elements.query)
  // console.log(input.value === e.currentTarget.elements.query.value)

  if (newApiService.query === '') {
    return alert('Введи что-то нормальное');
  }

  newApiService.resetPage();
    
  newApiService.fetchImg().then(images => {
    if (images.total == 0) {
      return alert('Not found');
    }
    renderTampl(galleryTempl, galleryContainer, images);
    button.classList.remove('is-hidden')
  })
}

function onFetch() {
  newApiService.fetchImg().then(images => {
    renderTampl(galleryTempl, galleryContainer, images)
  })
}

function clearGalleryList() {
  galleryContainer.innerHTML = '';
}

//Open modal
// const modal = document.querySelector('.js-lightbox');
// const modalImage = document.querySelector('.lightbox__image');

// function onOpenModal() {
//   window.addEventListener('keydown', onEscKeyPress);
//   window.addEventListener('keydown', scrolImg);
//   modal.classList.add('is-open');
// }

// list.addEventListener('click', (e) => {
//   e.preventDefault()
  
//   if (e.target.nodeName === 'IMG') {
//     onOpenModal();
//     modalImage.setAttribute('src', e.target.dataset.source);
//     modalImage.setAttribute('alt', e.target.alt);
//   }
// })
