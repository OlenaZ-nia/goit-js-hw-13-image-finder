import './createNotify';
import { error } from '@pnotify/core';

//Render templates
import formTempl from '../templates/form.hbs'
import cardTempl from '../templates/card.hbs'
import loadMoreBtn from '../templates/loadMoreBtn.hbs'

// import refs from './refs'
// const { header, galleryRef } = refs;

const header = document.querySelector('.container-fixed')
const galleryRef = document.querySelector('#list');

function renderTampl(tampl, elem, source) {
  let markup = tampl(source)
    return elem.insertAdjacentHTML('beforeend', markup)
}

renderTampl(formTempl, header)
renderTampl(loadMoreBtn, header)


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

  newApiService.query = input.value;
  // console.dir(e.currentTarget.elements.query)
  // console.log(input.value === e.currentTarget.elements.query.value)

  if (newApiService.query.trim() === '') {
    button.classList.add('is-hidden')
    return error({
    text: 'Enter query!'
    });
  }

  newApiService.resetPage();
    
  newApiService.fetchImg().then(images => {
    if (images.total == 0) {
      button.classList.add('is-hidden')
      return error({
        text: 'Not found!'
      });
    }
  
    renderTampl(cardTempl, galleryRef, images);
    scrollPage()

    button.classList.remove('is-hidden')
    button.removeAttribute('disabled')
  })
}

function onFetch() {
  newApiService.fetchImg().then(images => {
    if (images.hits.length === 0) {
      button.setAttribute('disabled', true);
      return error({
        text: 'No more!'
      });
    }
    renderTampl(cardTempl, galleryRef, images)
    scrollPage()
  })
}

function clearGalleryList() {
  galleryRef.innerHTML = '';
}

//Open modal
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function onOpenModal(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const modalImage = `<img src=${e.target.dataset.source} alt="${e.target.alt}" />`;
  const instance = basicLightbox.create(modalImage);
  instance.show();
}

galleryRef.addEventListener('click', onOpenModal)

//Scroll
function scrollPage() {
  setTimeout(() => {
    galleryRef.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});
  }, 1000)

}
