import { API_MAIN_URL } from '../constants.js';
import { authFetch } from '../api.js';
import { displayMessage } from '../../ui/common/displayMessage.js';
import * as storage from '../../helpers/storage.js';

/**
 * Registers a new user.
 * @param userProfile
 * @returns {Promise<Omit<{name}|{accessToken}|any, "accessToken">|any|void>}
 */

export async function register(userProfile) {
  const endpoint = '/auth/register';
  const registerURL = `${API_MAIN_URL}${endpoint}`;

  // console.log('User Profile to register:', userProfile);
  // console.log('JSON payload:', JSON.stringify(userProfile));

  try {
    // Make the API call
    const response = await authFetch(registerURL, {
      method: 'POST',
      body: JSON.stringify(userProfile),
    });

    const data = await response.json();

    // Check for "Profile already exists" error
    if (data && data.errors && data.errors.length > 0) {
      const errorMessage = data.errors[0].message;

      if (errorMessage === 'Profile already exists') {
        return displayMessage('danger', 'Profile already exists. Please use a different email.');
      }

      return displayMessage('danger', `Registration failed: ${errorMessage}`);
    }

    // Handle successful registration
    if (data && data.accessToken && data.name) {
      const { accessToken, ...user } = data;

      storage.saveTokenToStorage('accessToken', accessToken);
      storage.saveTokenToStorage('profile', user);

      console.log('Registration successful:', user);

      // TODO: need to test if this one works as intended
      displayMessage(
        'success',
        'Registration successful!' +
          '\n' +
          'You can now log in.' +
          '\n' +
          'Redirecting to profile page...' +
          user.name +
          '...'
      );

      location.href = 'profile/index.html';
      return user;
    } else {
      // console.log('Unexpected response format:', data);
      displayMessage('danger', 'Unexpected error occurred. Please try again later.');
      return data;
    }
  } catch (error) {
    console.error('Registration exception:', error);
    return displayMessage('danger', `An error occurred: ${error.message}`);
  }
}
