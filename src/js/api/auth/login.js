import { API_AUTH_URL } from '../constants.js';
import { authFetch } from '@/js/api/api.js';

/**
 * Logs in a user.
 * @param credentials {{email: string, password: string}}
 * @returns {Promise<Object>} The logged in user, including the access token
 */

export async function login(credentials) {
  const response = await authFetch(`${API_AUTH_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.errors?.[0]?.message || 'Login failed. Please try again.');
  }

  return result.data;
}
