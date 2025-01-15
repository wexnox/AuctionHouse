import {API_MAIN_URL, AUCTIONS_LIMIT} from '../constants.js';
import handleErrors from '../handleErrors.js';
import {authFetch} from '@/js/api/api.js';

export async function getAllListings(offset) {

  const url = `${API_MAIN_URL}/listings?limit=${AUCTIONS_LIMIT}&offset=${offset}&_active=true`;
  const response = await authFetch(url);

  const data = await response.json();

  if (response.ok) {
    return data;
  }
  // TODO: add search
  handleErrors(data);
}