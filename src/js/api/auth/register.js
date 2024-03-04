import {API_MAIN_URL} from "../constants.js";
import {authFetch} from "../api.js";
import {displayMessage} from "../../ui/common/displayMessage.js";

export async function register(userProfile) {
    const endpoint = "/auth/register";
    const registerURL = `${API_MAIN_URL}${endpoint}`;

    console.log(`The API URL is: ${registerURL}`);
    console.log(`User Profile Sent: ${JSON.stringify(userProfile)}`);


    const options = {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        method: 'POST',
        body: JSON.stringify(userProfile),
    }

    try {

        const {data, error} = await authFetch(registerURL, options);
        if (error) {
            throw new Error(error);
        }


        console.log(data.errors);
        console.log(data);

        if (data.status === 400 && data.errors[0].message === "Profile already exists") {
            return displayMessage('danger', 'Profile already exists. Please use a different email.');
        }

        if (data.status >= 200 && data.status < 300) {
            location.href = "../../../profile/index.html";
        } else {
            console.log('Unexpected response status:', data.status);
            displayMessage('danger', 'Unexpected error occurred. Please try again later.');
        }
        return data;
    } catch (error) {
        return displayMessage('danger', error.message);
    }
}