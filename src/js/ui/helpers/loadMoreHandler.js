import createHtmlCards from '@/js/ui/common/createHtmlCards.js';
import { getAllListings } from '@/js/api/listings/getAllListings.js';
import { displayMessage } from '@/js/ui/common/displayMessage.js';

/**
 * Initializes the load more functionality.
 * @param posts
 * @param containerId
 * @param buttonId
 * @param currentLimit
 */

export function initializeLoadMore(posts, containerId, buttonId, currentLimit) {
  const container = document.getElementById(containerId);
  const button = document.getElementById(buttonId);

  // Start on the page after the initial posts are loaded
  // Start offset after the initial posts are loaded
  let page = 2;

  // Add a click event listener to the Load More button
  button.addEventListener('click', async () => {
    try {
      const newPosts = await getAllListings({ limit: currentLimit, page });

      // Append the new posts to the container
      if (newPosts.length > 0) {
        createHtmlCards(newPosts, container);
        page += 1;
      }

      if (newPosts.length < currentLimit) {
        button.style.display = 'none';
        console.log('No more posts to load.');
      }
    } catch (error) {
      // console.error('Error loading more posts:', error);
      displayMessage('danger', 'An unexpected error occurred. Please try again.' + error);
      button.style.display = 'none';
    }
  });
}
