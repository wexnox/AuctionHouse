import {API_MAIN_URL, API_LISTINGS_URL} from '../constants.js';
import {authFetch} from '../api.js';
import {handleHttpError} from '../handleErrors.js';

const method = 'POST';

// TODO:'createNewListing' is defined but never used     no-unused-vars
export async function createNewListing(listingData) {
  const createURL = `${API_MAIN_URL}${API_LISTINGS_URL}`;

  try {
    const response = await authFetch(createURL, {
      method,
      body: JSON.stringify(listingData),
    });
    handleHttpError(response);
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}