// Handles all routes related to authentication (login, register)
import { setPageTitle } from '../utils/titleManager.js';
import * as listeners from '../listeners/index.js';
import { initializeSearch } from '@/js/ui/search.js';
import { displayVersion } from '@/js/ui/common/displayVersion.js';
import { getPostsForSearch } from '@/js/ui/helpers/getPostsForSearch.js';
import { displayMessage } from '@/js/ui/common/displayMessage.js';

/**
 * Handles all routes related to authentication (login, register)
 * @param pathname
 * @returns {Promise<void>}
 */
export async function handleAuthRoutes(pathname) {
  if (pathname.endsWith('/register.html')) {
    setPageTitle('Register');

    displayVersion();
    try {
      await getPostsForSearch();
    } catch (error) {
      displayMessage('danger', 'An unexpected error occurred. Please try again.' + error);
    }

    initializeSearch();

    listeners.setRegisterUserListener();
  } else if (pathname.endsWith('/login.html')) {
    setPageTitle('Login');

    displayVersion();

    try {
      await getPostsForSearch();
    } catch (error) {
      displayMessage('danger', 'An unexpected error occurred. Please try again.' + error);
    }

    initializeSearch();

    listeners.loginListener();
  }
}
