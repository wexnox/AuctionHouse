import {API_PROFILE_URL} from "../../constants/constants.js";

import {authFetch} from "../authHeader.js";


export async function updateProfile(profileData) {

    if (!profileData.name) {
        throw new Error("Update requires a name");
    }

    const url = `${API_PROFILE_URL}/${profileData.name}`;

    const response = await authFetch(url, {
        method: 'PUT',
        body: JSON.stringify(profileData),
    });

    return await response.json();

}

