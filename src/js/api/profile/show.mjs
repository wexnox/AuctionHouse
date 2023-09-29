import {authFetch} from "../authHeader.js";
import {API_PROFILE_URL} from "../../constants/constants.js";

export async function getProfile(name) {
    if (!name) {
        throw new Error("Get requires a name");
    }

    const getProfileURL = `${API_PROFILE_URL}/${name}`;

    const response = await authFetch(getProfileURL)

    return await response.json();
}