/**
 * Save token to local storage.
 * @param key
 * @param value
 */

export function saveTokenToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Get token from local storage.
 * @param key
 * @returns {any|*[]}
 */

export function getTokenFromStorage(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

/**
 * Clear token from local storage.
 * @param key
 */

export function clearTokenFromStorage(key) {
  localStorage.removeItem(key);
}