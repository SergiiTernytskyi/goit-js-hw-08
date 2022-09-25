import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryRef = document.querySelector('.gallery');

const galleryItemDivMarkupString = galleryItems
  .map(({ preview, original, description }) => {
    return `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`;
  })
  .join('');

galleryRef.insertAdjacentHTML('beforeend', galleryItemDivMarkupString);

let gallery = new SimpleLightbox('.gallery__item', {
  captionPosition: 'bottom',
  captionDelay: 250,
  captionsData: 'alt',
});
