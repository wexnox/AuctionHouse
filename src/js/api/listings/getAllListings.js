import { API_MAIN_URL } from '../constants.js';
import handleErrors, { handleHttpError } from '../handleErrors.js';
import { authFetch } from '@/js/api/api.js';

/**
 * Fetches all listings from the API.
 * @param options
 * @returns {Promise<any>}
 */
export async function getAllListings(options = {}) {
  const { limit = 15, page = 1, _active = true, _tag } = options;
  const params = new URLSearchParams({ limit, page, _active, _seller: true, sort: 'created', sortOrder: 'desc' });
  if (_tag) {
    params.set('_tag', _tag);
  }
  const url = `${API_MAIN_URL}/listings?${params.toString()}`;
  try {
    const response = await authFetch(url);
    handleHttpError(response);

    const data = await response.json();
    console.log('API response data:', data);

    handleErrors(data);

    return data.data;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
}
