// Handles all routes related to user profiles
import { setPageTitle } from '../utils/titleManager.js';
import * as listeners from '../listeners/index.js';
import { initializeSearch } from '@/js/ui/search.js';
import { displayVersion } from '@/js/ui/common/displayVersion.js';
import { getPostsForSearch } from '@/js/ui/helpers/getPostsForSearch.js';
import { displayMessage } from '@/js/ui/common/displayMessage.js';

/**
 * Handles all routes related to user profiles
 * @param pathname
 * @returns {Promise<void>}
 */

export async function handleProfileRoutes(pathname) {
  if (pathname.endsWith('/index.html')) {
    setPageTitle('Profile');

    displayVersion();

    try {
      await getPostsForSearch();

      initializeSearch();
    } catch (error) {
      displayMessage('danger', 'Error initializing search' + error);

      initializeSearch();
    }

    await listeners.userProfileListener();

    await listeners.updateAvatarListener();

    await listeners.getUserListing();
  }
}
