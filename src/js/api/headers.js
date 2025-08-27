import {getTokenFromStorage} from '@/js/helpers/storage.js';

/**
 * Creates headers for API requests.
 * @param hasBody
 * @returns {Headers}
 */

export function headers(hasBody = false) {
  const headers = new Headers();

  const token = getTokenFromStorage('accessToken');

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  // if (APP_KEY){
  //     headers.append("X-Noroff-API-Key", APP_KEY)
  // }

  if (hasBody) {
    headers.append('Content-Type', 'application/json; charset=UTF-8');
  }

  return headers;
}