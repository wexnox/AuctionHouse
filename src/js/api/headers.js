import {getTokenFromStorage} from "@/js/helpers/storage.js";

export function headers(hasBody = false) {
    const headers = new Headers();

    const token = getTokenFromStorage("accessToken")

    if (token) {
        headers.append("Autherization", `Bearer ${token}`)
    }

    // if (APP_KEY){
    //     headers.append("X-Noroff-API-Key", APP_KEY)
    // }

    if (hasBody) {
        headers.append("Content-Type", "application/json")
    }

    return headers;
}