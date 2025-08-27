import { API_MAIN_URL } from '../constants.js';
import { authFetch } from '../api.js';
import { handleHttpError } from '../handleErrors.js';

/**
 * Fetches the details of a listing by its ID.''
 * @param itemId
 * @returns {Promise<any>}
 */

export async function getListingDetails(itemId) {
  try {
    const url = `${API_MAIN_URL}/listings/${itemId}?_bids=true&_seller=true`;
    const response = await authFetch(url, { method: 'GET' });

    handleHttpError(response);
    return await response.json();
  } catch (error) {
    console.error('Error fetching listing details:', error);
    throw error;
  }
}