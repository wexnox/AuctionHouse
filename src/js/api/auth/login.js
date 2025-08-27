import { API_MAIN_URL } from '../constants.js';
import * as storage from '../../helpers/storage.js';
import { displayMessage } from '../../ui/common/displayMessage.js';
import buildMenu from '../../ui/common/buildMenu.js';
import { authFetch } from '@/js/api/api.js';

/**
 * Logs in a user.
 * @param userProfile
 * @returns {Promise<void>}
 */

export async function login(userProfile) {
  const endpoint = '/auth/login';
  const loginURL = `${API_MAIN_URL}${endpoint}`;

  try {
    const response = await authFetch(loginURL, {
      method: 'POST',
      body: JSON.stringify(userProfile),
    });

    const { accessToken, ...user } = await response.json();

    if (response.status === 200) {
      storage.saveTokenToStorage('accessToken', accessToken);
      storage.saveTokenToStorage('profile', user);

      buildMenu(); // Refresh the menu to reflect the authenticated state

      location.href = '/';
    } else {
      console.log('Unexpected response status:', response.status);
      displayMessage('danger', 'Unexpected error occurred. Please try again later.');
    }


  } catch (error) {
    return displayMessage('danger', error.message);
  }
}
