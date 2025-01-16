export function saveTokenToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getTokenFromStorage(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

export function clearTokenFromStorage(key) {
  localStorage.removeItem(key);
}