import * as storage from "../../helpers/storage/storage.mjs";


export function logoutListener() {
    const logoutBtn = document.getElementById('logout');

    logoutBtn.addEventListener('click', () => {
        storage.clearTokenFromStorage("token");
        storage.clearTokenFromStorage("profile")
        location.href = '/';
    });
}
