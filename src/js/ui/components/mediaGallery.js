/**
 * Creates a media gallery with navigation and thumbnails.
 * @param images
 * @param options
 * @returns {HTMLElement|HTMLDivElement}
 */

export function createMediaGallery(images = [], options = {}) {

  const { containerId = 'media-gallery', showThumbnails = true, maxImages = 8, } = options;

  const container = document.getElementById(containerId) || document.createElement('div');
  container.id = containerId;
  container.className = 'media-gallery';

  if (!images.length) {

    container.innerHTML = '<p class="no-images">No images available</p>';

    return container;

  }

  container.innerHTML = `
    <div class="gallery-main">
      <div class="main-image-container">
        <img id="main-image" src="${images[0].url}" alt="${images[0].alt || 'Gallery image'}" />
        ${images.length > 1 ? `
          <button class="nav-btn prev-btn" data-direction="prev" aria-label="Previous image">&lt;</button>
          <button class="nav-btn next-btn" data-direction="next" aria-label="Next image">&gt;</button>
          <div class="image-counter">
            <span class="current">1</span> / <span class="total">${images.length}</span>
          </div>
        ` : ''}
      </div>
      ${showThumbnails && images.length > 1 ? `
        <div class="thumbnails-container">
          ${images.map((img, index) => `
            <img class="thumbnail ${index === 0 ? 'active' : ''}" 
                 src="${img.url}" 
                 alt="${img.alt || `Image ${index + 1}`}"
                 data-index="${index}" loading="lazy" />
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;

  return container;
}

/**
 * Initializes navigation for a media gallery.
 * @param galleryContainer
 * @param images
 */

export function initializeGalleryNavigation(galleryContainer, images) {
  let currentIndex = 0;

  const mainImage = galleryContainer.querySelector('#main-image');
  const prevBtn = galleryContainer.querySelector('.prev-btn');
  const nextBtn = galleryContainer.querySelector('.next-btn');
  const thumbnails = galleryContainer.querySelectorAll('.thumbnail');
  const currentSpan = galleryContainer.querySelector('.current');

  function updateGallery(index) {
    currentIndex = index;
    mainImage.src = images[index].url;
    mainImage.alt = images[index].alt || `Image ${index + 1}`;

    if (currentSpan) {
      currentSpan.textContent = index + 1;
    }

    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
  }

  /**
   * Navigates to the next image in the gallery.
   */

  function navigateToNext() {
    const nextIndex = (currentIndex + 1) % images.length;
    updateGallery(nextIndex);
  }

  /**
   * Navigates to the previous image in the gallery.
   */

  function navigateToPrev() {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery(prevIndex);
  }

  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', navigateToPrev);
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', navigateToNext);
  }

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => updateGallery(index));
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      navigateToPrev();
    }
    if (e.key === 'ArrowRight') {
      navigateToNext();
    }
  });
}