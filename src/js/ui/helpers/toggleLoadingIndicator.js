
/**
 * Toggles the loading indicator on a container element.
 * @param {string|HTMLElement} containerElement - The container element or its selector.
 */

export function toggleLoadingIndicator(containerElement) {
  const target = typeof containerElement === 'string' ? document.querySelector(containerElement) : containerElement;
  performActionOnIndicator(target);
}

/**
 * Performs the action on the loading indicator.
 * @param {HTMLElement} container - The container element.
 */

function performActionOnIndicator(container) {
  const indicator = container.querySelector('#loading');
  if (indicator) {
    container.removeChild(indicator);
  } else {
    createAndAppendIndicator(container);
  }
}

/**
 * Creates and appends a new loading indicator to the container.
 * @param {HTMLElement} container - The container element.
 */

function createAndAppendIndicator(container) {
  const newIndicator = document.createElement('div');
  newIndicator.id = 'loading';
  newIndicator.textContent = 'Loading auctions...';
  container.appendChild(newIndicator);
}