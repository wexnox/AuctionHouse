import {register} from "../../api/auth/register.js";

export function setRegisterUserListener() {

    const form = document.getElementById("registerForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const userProfile = Object.fromEntries(formData.entries());

            console.log(userProfile); // Add this line to debug
            console.log(JSON.stringify(userProfile));

            register(userProfile);

        });
    }
}

