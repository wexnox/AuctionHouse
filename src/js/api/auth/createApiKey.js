import { API_AUTH_URL } from '../constants.js';
import { authFetch } from '../api.js';

/**
 * Creates an API key for the logged in user. The key is required on authenticated v2 endpoints.
 * @returns {Promise<string>} The API key
 */

export async function createApiKey() {
  const response = await authFetch(`${API_AUTH_URL}/create-api-key`, {
    method: 'POST',
    body: JSON.stringify({ name: 'AuctionHouse' }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.errors?.[0]?.message || 'Could not create API key');
  }

  return result.data.key;
}
