import { API_MAIN_URL } from '../constants.js';
import { getTokenFromStorage, saveTokenToStorage } from '../../helpers/storage.js';
import { authFetch } from '../api.js';
import { handleHttpError } from '../handleErrors.js';

const POST_METHOD = 'POST';
const USER_PROFILE_KEY = 'userProfile';

/**
 * Places a bid on an item.
 * @param id
 * @param amount
 * @returns {Promise<any>}
 */

export async function placeBidOnItem(id, amount) {

  const token = getTokenFromStorage('accessToken');

  if (!token) {
    throw new Error('You must be logged in to place a bid');
  }

  const numericAmount = parseFloat(amount);

  if (isNaN(numericAmount) || numericAmount <= 0) {
    throw new Error('Please enter a valid bid amount');
  }
  try {
    const bidURL = `${API_MAIN_URL}/listings/${id}/bids`;
    const response = await authFetch(bidURL, {
      method: POST_METHOD,
      body: JSON.stringify({ amount: amount }),
    });

    handleHttpError(response);

    const jsonResponse = await response.json();
    saveTokenToStorage(USER_PROFILE_KEY, jsonResponse.userName);
    redirectToItemDetailsPage(id);

    return jsonResponse;

  } catch (error) {
    throw new Error(`Failed to place bid due to error: ${error.message}`);
  }
}

/**
 * Redirects to the item details page.
 * @param itemId
 */
function redirectToItemDetailsPage(itemId) {
  location.href = `../../../../pages/listings/details.html?id=${itemId}`;
}