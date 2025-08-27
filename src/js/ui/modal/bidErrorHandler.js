// Error handling for modal

/**
 * Creates an error container for displaying bid errors.
 * @returns {Element}
 */

export function createBidErrorContainer() {
  const modalBody = document.querySelector('#placeBidModal .modal-body');

  let errorContainer = document.querySelector('#bidErrorMessage');

  if (!errorContainer) {
    errorContainer = document.createElement('div');
    errorContainer.id = 'bidErrorMessage';
    errorContainer.className = 'alert alert-danger';
    errorContainer.style.display = 'none';

    modalBody.insertBefore(errorContainer, modalBody.firstChild);
  }

  return errorContainer;
}

export function showBidError(container, message) {
  container.innerHTML = message;
  container.style.display = 'block';
}

export function hideBidError(container) {
  container.innerHTML = '';
  container.style.display = 'none';
}

