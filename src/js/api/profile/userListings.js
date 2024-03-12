import {API_PROFILE_URL, API_LISTINGS_URL} from "../constants.js";
import {getTokenFromStorage} from "../../helpers/storage.js";
import {authFetch} from "../api.js";
import {renderItems} from "../../ui/common/renderListings.js";


function getUserName() {
    const user = getTokenFromStorage("profile");
    return user.name;
}

function getProfileListingsUrl(userName) {
    return `${API_PROFILE_URL}/${userName}${API_LISTINGS_URL}?_seller=true&_bids=true`;
}

export async function getUserListing() {
    const userName = getUserName();
    const url = getProfileListingsUrl(userName);
    try {
        const response = await authFetch(url);
        const data = await response.json();
        if (response.status !== 200) {
            console.log(`Error${response.status}: ${data.message}`);
            return;
        }
        renderItems(data);
    } catch (error) {
        console.log(error);
    }
}