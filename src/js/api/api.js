import {getTokenFromStorage} from "../helpers/storage.js";

export async function authFetch(url, options = {}) {
    const token = getTokenFromStorage("accessToken");

    return fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}