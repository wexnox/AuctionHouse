import { API_MAIN_URL } from '../constants.js';
import { handleHttpError } from '../handleErrors.js';
import { authFetch } from '../api.js';

/**
 * Searches listings by title or description on the API.
 * @param query
 * @param options
 * @returns {Promise<any[]>}
 */

export async function searchListings(query, options = {}) {
  const { limit = 100, page = 1 } = options;
  const params = new URLSearchParams({ q: query, limit, page, _seller: true });
  const response = await authFetch(`${API_MAIN_URL}/listings/search?${params.toString()}`);

  handleHttpError(response);

  const { data } = await response.json();
  return data;
}
