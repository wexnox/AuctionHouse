import {register} from "../../api/auth/register.js";

export function setRegisterUserListener() {
    const form = document.getElementById("registerForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const form = event.target;
            const formData = new FormData(form);
            const userProfile = Object.fromEntries(formData.entries());

            console.log(userProfile)
            register(userProfile);
        });
    }
}

