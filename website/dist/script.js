'use strict';

document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuToggle.hidden = false;

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('is-open', !expanded);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.header-inner')) closeMenu();
});

window.matchMedia('(min-width: 1001px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();

const photoViewer = document.querySelector('.photo-viewer');
if (photoViewer) {
  const photoContainer = photoViewer.querySelector('.photo-viewer-image');
  const photoCaption = photoViewer.querySelector('#photo-viewer-caption');
  const photoError = photoViewer.querySelector('.photo-viewer-error');

  document.querySelectorAll('[data-photo]').forEach((link) => {
    link.addEventListener('click', (event) => {
      // Preserve normal links for new tabs and browsers without native dialogs.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey ||
          typeof photoViewer.showModal !== 'function') return;
      event.preventDefault();
      const image = new Image();
      image.alt = link.querySelector('img').alt;
      image.addEventListener('error', () => { photoError.hidden = false; });
      image.src = link.href;
      photoContainer.replaceChildren(image);
      photoCaption.textContent = link.closest('figure').querySelector('h3').textContent;
      photoError.hidden = true;
      photoViewer.showModal();
      document.documentElement.classList.add('photo-viewer-open');
    });
  });

  photoViewer.querySelector('.photo-viewer-close').addEventListener('click', () => photoViewer.close());
  photoViewer.addEventListener('keydown', (event) => {
    // The close button is the viewer's only interactive control.
    if (event.key === 'Tab') {
      event.preventDefault();
      photoViewer.querySelector('.photo-viewer-close').focus();
    }
  });
  photoViewer.addEventListener('click', (event) => {
    const bounds = photoViewer.getBoundingClientRect();
    if (event.target === photoViewer &&
        (event.clientX < bounds.left || event.clientX > bounds.right ||
         event.clientY < bounds.top || event.clientY > bounds.bottom)) photoViewer.close();
  });
  photoViewer.addEventListener('close', () => {
    document.documentElement.classList.remove('photo-viewer-open');
    photoContainer.replaceChildren();
  });
}
