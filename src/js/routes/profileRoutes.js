// Handles all routes related to user profiles
import { setPageTitle } from '../utils/titleManager.js';
import * as listeners from '../listeners/index.js';

export function handleProfileRoutes(pathname) {

  if (pathname.endsWith('/index.html')) {

    setPageTitle('Profile');

    listeners.userProfileListener();
    listeners.updateAvatarListener();
    listeners.getUserListing();
  }
}
