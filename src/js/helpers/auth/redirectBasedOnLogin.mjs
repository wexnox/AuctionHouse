import {isLoggedIn} from "../storage/index.js";

export function redirectBasedOnLogin(pathname) {
    if (isLoggedIn()) {
        if (pathname === "/auth/login.html" || pathname === "/auth/register.html") {
            location.href = "/dashboard";
        }
    } else {
        if (pathname === "/dashboard/" || pathname === "/dashboard/index.html") {
            location.href = "/auth/login.html";
        }
    }
}
