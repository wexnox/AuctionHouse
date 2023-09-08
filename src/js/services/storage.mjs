/**
 *
 * @param key
 * @param value
 */
export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 *
 * @param key
 * @returns {any}
 */
export function get(key) {
    return JSON.parse(localStorage.getItem(key));
}

/**
 *
 * @param key
 */
export function remove(key) {
    localStorage.removeItem(key);
}
