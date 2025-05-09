// Shared route helper functions (e.g., handle errors, page redirects)
import { displayMessage } from '../ui/common/displayMessage.js';

export function handleFeedError(error, context) {

  console.error(`Error loading ${context}:`, error);

  displayMessage('danger', `Failed to load ${context}. Please try again later.`);

  const container = document.querySelector('#listingsContainer');
  if (container) {
    container.innerHTML = `
      <div class="alert alert-warning">
        Unable to load content. 
        <button class="btn btn-sm btn-outline-primary" onclick="location.reload()">Retry</button>
      </div>`;
  }
}