import { API_MAIN_URL, API_LISTINGS_URL } from '../constants.js';
import { authFetch } from '../api.js';
import { handleHttpError } from '../handleErrors.js';

export async function createNewListing(listingData) {

  const createURL = `${API_MAIN_URL}${API_LISTINGS_URL}`;

  const method = 'POST';

  try {

    const response = await authFetch(createURL, {

      method,
      body: JSON.stringify(listingData),

    });
    console.log('Sending listing data:', JSON.stringify(listingData, null, 2));

    handleHttpError(response);

    return await response.json();

  } catch (error) {

    console.log(error);

    throw error;

  }

}