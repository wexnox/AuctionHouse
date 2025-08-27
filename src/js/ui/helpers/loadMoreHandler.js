import createHtmlCards from '@/js/ui/common/createHtmlCards.js';
import { getAllListings } from '@/js/api/listings/getAllListings.js';

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

  // Start offset after the initial posts are loaded
  let offset = currentLimit;

  // Add a click event listener to the Load More button
  button.addEventListener('click', async () => {
    try {
      const newPosts = await getAllListings({ limit: currentLimit, offset });

      // Append the new posts to the container
      if (newPosts.length > 0) {
        createHtmlCards(newPosts, container);
        offset += currentLimit;
      }

      if (newPosts.length < currentLimit) {
        button.style.display = 'none';
        console.log('No more posts to load.');
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
      button.style.display = 'none';
    }
  });
}