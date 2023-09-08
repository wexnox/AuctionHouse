import {API_BASE_URL} from '../../constants/constants.mjs';

/**
 *
 * @type {string}
 */
const action = '/auth/register';
/**
 *
 * @type {string}
 */
const method = 'post';

/**
 *
 * @param profile
 * @returns {Promise<any>}
 */
export async function register(profile) {
    const registerURL = API_BASE_URL + action;
    const body = JSON.stringify(profile);

    const response = await fetch(registerURL, {
        headers: {
            'Content-Type': 'application/json',
        },
        method,
        body,
    });

    const result = await response.json();
    console.log(result);
    alert('You are now registered');
    return result;
}
