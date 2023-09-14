import {login} from "../../api/auth/index.js";

export function loginListener() {
    const form = document.getElementById("loginForm");

    if (form) {
        form.addEventListener("submit", handleLogin);
    }
}

async function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const userProfile = Object.fromEntries(formData.entries());


    const button = form.querySelector("button");
    button.innerText = "Logging in...";

    login(userProfile);

}
