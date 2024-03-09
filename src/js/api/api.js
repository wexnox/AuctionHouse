import {getTokenFromStorage} from "../helpers/storage.js";

export function headers() {
    const token = getTokenFromStorage("accessToken");

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
}

export async function authFetch(url, options = {}) {
    return fetch(url, {
        ...options,
        headers: headers()
    })
}