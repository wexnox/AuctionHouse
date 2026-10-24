import { API_AUTH_URL } from '../constants.js';
import { authFetch } from '../api.js';

/**
 * Registers a new user.
 * @param userProfile
 * @returns {Promise<Object>} The registered user. v2 does not return an access token.
 */

export async function register(userProfile) {
  // console.log('User Profile to register:', userProfile);
  // console.log('JSON payload:', JSON.stringify(userProfile));

  const { media, ...account } = userProfile;
  const payload = { ...account, avatar: { url: media, alt: `${account.name}'s avatar` } };

  // Make the API call
  const response = await authFetch(`${API_AUTH_URL}/register`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    // console.log('Unexpected response format:', result);
    throw new Error(result.errors?.[0]?.message || 'Unexpected error occurred. Please try again later.');
  }

  return result.data;
}
