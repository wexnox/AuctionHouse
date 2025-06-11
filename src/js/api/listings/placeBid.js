import { API_MAIN_URL } from '../constants.js';
import { getTokenFromStorage, saveTokenToStorage } from '../../helpers/storage.js';
import { authFetch } from '../api.js';

const POST_METHOD = 'POST';
const USER_PROFILE_KEY = 'userProfile';

export async function placeBidOnItem(id, amount) {
  try {

    const token = getTokenFromStorage('accessToken');

    if (!token) {
      throw new Error('You must be logged in to place a bid');
    }

    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      throw new Error('Please enter a valid bid amount');
    }

    const bidURL = `${API_MAIN_URL}/listings/${id}/bids`;
    const response = await authFetch(bidURL, {
      method: POST_METHOD,
      body: JSON.stringify({ amount: amount }),
    });

    if (response.status !== 200 && response.status !== 201) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }


    const jsonResponse = await response.json();
    saveTokenToStorage(USER_PROFILE_KEY, jsonResponse.userName);
    redirectToItemDetailsPage(id);

    return jsonResponse;

  } catch (error) {
    throw new Error(`Failed to place bid due to error: ${error}`);
  }
}

function redirectToItemDetailsPage(itemId) {
  location.href = `../../../../pages/listings/details.html?id=${itemId}`;
}
