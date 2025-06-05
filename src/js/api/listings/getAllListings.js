import { API_MAIN_URL } from '../constants.js';
import handleErrors, { handleHttpError } from '../handleErrors.js';
import { authFetch } from '@/js/api/api.js';

export async function getAllListings(options = {}) {

  const { limit = 15, offset = 0, _active = true } = options;
  const url = `${API_MAIN_URL}/listings?limit=${limit}&offset=${offset}&_active=${_active}`;
  try {
    const response = await authFetch(url);
    handleHttpError(response);

    const data = await response.json();
    console.log('API response data:', data);

    handleErrors(data);

    return data;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
}