import * as storage from "../../helpers/storage.js";


export function logoutListener() {
    const logoutBtn = document.getElementById('logout');

    logoutBtn.addEventListener('click', () => {
        storage.clearTokenFromStorage("accessToken");
        storage.clearTokenFromStorage("profile")
        location.href = '/';
    });
}
