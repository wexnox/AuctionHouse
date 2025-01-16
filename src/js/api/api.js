import {headers} from '@/js/api/headers.js';

export async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(Boolean(options.body)),
  });
}