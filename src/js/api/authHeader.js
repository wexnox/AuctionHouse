import {getTokenFromStorage} from "../helpers/storage/storage.mjs";

/**
 *  the authentication header and token
 * @param {string} token - Authentication token stored in localstorage
 * @returns {{Authorization: string, "Content-Type": string}} - Returns bearer token
 */
export function headers() {
    const token = getTokenFromStorage("token");

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
}

/**
 * Contains the required info for auth header
 * @param url
 * @param options
 * @returns {Promise<Response>}
 */
export async function authFetch(url, options = {}) {
    return fetch(url, {
        ...options,
        headers: headers()
    })
}