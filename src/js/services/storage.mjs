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
 * @returns {any|null}
 */
export function load(key) {
    try {
        const value = localStorage.getItem(key);
        return JSON.parse(value);
    } catch {
        return null
    }
}

/**
 *
 * @param key
 */
export function remove(key) {
    localStorage.removeItem(key);
}