import {headers} from '@/js/api/headers.js';

/**
 * A helper function that performs a fetch request with additional authorization headers.
 *
 * @param {string} url The URL to fetch data from.
 * @param {Object} [options={}] The options object to configure the fetch request, similar to the standard fetch API.
 * @param {*} [options.body] The body of the request, automatically handled if it's an instance of FormData.
 * @return {Promise<Response>} A promise resolving to the fetch API's Response object.
 */

export async function authFetch(url, options = {}) {
  const isFormData = options && options.body && typeof FormData !== 'undefined' && options.body instanceof FormData;
  return fetch(url, {
    ...options,
    headers: headers(isFormData ? false : Boolean(options.body)),
  });
}