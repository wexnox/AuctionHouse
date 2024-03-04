import {API_MAIN_URL} from '../constants.js';
import * as storage from '../../helpers/storage.js';
import {displayMessage} from "../../ui/common/displayMessage.js";
// import togglePassword from "../../listeners/auth/togglePassword.js";

// togglePassword()

export async function login(userProfile) {
    const endpoint = '/auth/login';
    const loginURL = `${API_MAIN_URL}${endpoint}`;

    console.log(`The API URL is: ${loginURL}`);
    console.log(`User Profile Sent: ${JSON.stringify(userProfile)}`);

    try {
        const response = await fetch(loginURL, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            method: 'POST',
            body: JSON.stringify(userProfile),
        });

        const {accessToken, ...user} = await response.json();

        if (response.status === 200) {
            storage.saveTokenToStorage('accessToken', accessToken);
            storage.saveTokenToStorage('profile', user);
            location.href = "../"
        } else {
            console.log('Unexpected response status:', response.status);
            displayMessage('danger', 'Unexpected error occurred. Please try again later.');
        }

    } catch (error) {
        return displayMessage('danger', error.message);
    }
}
