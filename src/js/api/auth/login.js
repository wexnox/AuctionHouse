import {API_MAIN_URL} from '../../constants/constants.js';
import * as storage from '../../helpers/storage/storage.mjs';


const endpoint = '/auth/login';
const method = 'post';


export async function login(profile) {
    const loginURL = API_MAIN_URL + endpoint;
    const body = JSON.stringify(profile);

    try {
        const response = await fetch(loginURL, {
            headers: {
                'Content-Type': 'application/json',
            },
            method,
            body,
        });

        const {accessToken, ...user} = await response.json();

        if (response.status !== 200) {
            alert("eeeeek")
        }

        if (response.status === 200) {
            storage.saveTokenToStorage('token', accessToken);
            storage.saveTokenToStorage('profile', user);
            alert('You are now logged in');
            location.href = "../../../profile/index.html"
        }


    } catch (error) {
        console.log(error);
    }


}
