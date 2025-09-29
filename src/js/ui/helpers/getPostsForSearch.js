import { getAllListings } from '@/js/api/listings/getAllListings.js';
import { displayMessage } from '@/js/ui/common/displayMessage.js';

/**
 * Fetches posts for search.
 * @returns {Promise<*|undefined|*[]>}
 */

export async function getPostsForSearch() {
  try {
    return await getAllListings({ limit: 100, offset: 0, _active: true });
  } catch (e) {
    // console.error('Failed to fetch posts for search:', e);
    displayMessage('danger', 'An unexpected error occurred. Please try again.' + e);
    return [];
  }
}
