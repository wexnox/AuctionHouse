import {API_MAIN_URL} from "../constants.js";
import {saveTokenToStorage} from "../../helpers/storage.js";
import {authFetch} from "../api.js";

const POST_METHOD = "POST";
const USER_PROFILE_KEY = "userProfile";

export async function placeBidOnItem(id, amount) {
    try {
        const bidURL = `${API_MAIN_URL}/listings/${id}/bids`;
        const response = await authFetch(bidURL, {
            method: POST_METHOD,
            body: JSON.stringify({amount: amount}),
        });

        if (response.status !== 200) {
            throw new Error(`There was something wrong, please try again ${response.status}`);
        }

        const jsonResponse = await response.json();
        saveTokenToStorage(USER_PROFILE_KEY, jsonResponse.userName);
        redirectToItemDetailsPage(id);

        return jsonResponse;

    } catch (error) {
        throw new Error(`Failed to place bid due to error: ${error}`);
    }
}

function redirectToItemDetailsPage(itemId) {
    location.href = `../../../listings/details.html?id=${itemId}`;
}