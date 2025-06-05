// Handles all routes related to user profiles
import { setPageTitle } from '../utils/titleManager.js';
import * as listeners from '../listeners/index.js';
import { initializeSearch } from '@/js/ui/search.js';
import { displayVersion } from '@/js/ui/common/displayVersion.js';
import { getPostsForSearch } from '@/js/ui/helpers/getPostsForSearch.js';

export async function handleProfileRoutes(pathname) {

  if (pathname.endsWith('/index.html')) {

    setPageTitle('Profile');

    displayVersion();

    try {

      const searchPosts = await getPostsForSearch();

      initializeSearch();

    } catch (error) {

      console.error('Error initializing search:', error);

      initializeSearch();
    }


    await listeners.userProfileListener();

    await listeners.updateAvatarListener();

    await listeners.getUserListing();

  }
}
