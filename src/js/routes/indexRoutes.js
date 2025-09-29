// Handles the root or index page routes
import { setPageTitle } from '@/js/utils/titleManager.js';
import { buildFeed } from '../ui/buildFeed.js';
import { initializeSearch } from '@/js/ui/search.js';
import { displayVersion } from '@/js/ui/common/displayVersion.js';
import { getPostsForSearch } from '@/js/ui/helpers/getPostsForSearch.js';
import { displayMessage } from '@/js/ui/common/displayMessage.js';

/**
 * Handles the root or index page routes.
 * @returns {Promise<void>}
 */
export async function handleIndexRoutes() {
  setPageTitle('Home');

  displayVersion();
  try {
    await displayHomePageFeed();
  } catch (error) {
    displayMessage('danger', 'An unexpected error occurred. Please try again.' + error);
  }
}

/**
 * Displays the homepage feed with a limit of 3 items.
 * @returns {Promise<void>}
 */
async function displayHomePageFeed() {
  // this is the limit for the home page feed
  const limit = 3;
  const offset = 0; // Start at the beginning

  try {
    await buildFeed({ limit, offset, layout: 'row' });

    await getPostsForSearch();

    initializeSearch();
  } catch (error) {
    displayMessage('danger', 'An unexpected error occurred. Please try again.' + error);

    initializeSearch();
  }
}
