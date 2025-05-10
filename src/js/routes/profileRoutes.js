// Handles all routes related to user profiles
import { setPageTitle } from '../utils/titleManager.js';
import * as listeners from '../listeners/index.js';
import { initializeSearch } from '@/js/ui/search.js';
import { getPosts } from '@/js/utils/postsStore.js';

export async function handleProfileRoutes(pathname) {

  if (pathname.endsWith('/index.html')) {

    setPageTitle('Profile');

    initializeSearch(getPosts());

    listeners.userProfileListener();
    listeners.updateAvatarListener();
    listeners.getUserListing();
  }
}
