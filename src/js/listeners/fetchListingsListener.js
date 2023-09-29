import {API_MAIN_URL} from "../constants/constants.js";
import {authFetch} from "../api/authHeader.js";
import {renderListings} from "../ui/common/renderCards.js";

export async function getAllListingsListener(items) {

    try {
        const url = `${API_MAIN_URL}/listings?_active=true&_seller=true&_bids=true&sort=created&sortOrder=desc`;
        const method = "GET";

        const response = await authFetch(url, method)
        const resultJSON = await response.json(items);

        renderListings(resultJSON)

    } catch (e) {
        console.log(e)
    }


}

