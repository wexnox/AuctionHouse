import {headers} from '@/js/api/headers.js';

export async function authFetch(url, options = {}) {
  const isFormData = options && options.body && typeof FormData !== 'undefined' && options.body instanceof FormData;
  return fetch(url, {
    ...options,
    headers: headers(isFormData ? false : Boolean(options.body)),
  });
}