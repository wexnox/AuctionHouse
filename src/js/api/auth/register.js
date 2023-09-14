import {API_MAIN_URL} from "../../constants/constants.js";

const action = "/auth/register";


export async function register(userProfile) {
    const registerURL = `${API_MAIN_URL}${action}`;

    const options = {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        method: 'POST',
        body: JSON.stringify(userProfile),
    }

    try {

        const response = await fetch(registerURL, options);
        const result = await response.json();
        console.log(response);
        console.log(result);
        if (response.status === 201) {
            // location.href = "../../../profile/index.html";
        }

        if (response.status !== 201) {
            alert("Something went wrong!");
            console.log(response.status)
        }
        return result;
    } catch (error) {
        console.log(error);
    }
}
