import {isLoggedIn, getName} from "../../helpers/storage/index.js";
import * as listeners from "../../listeners/auth/index.js";

export default function buildMenu(pathname) {
    const menu = document.querySelector("#menu");

    if (isLoggedIn()) {
        const name = getName();

        menu.innerHTML += `
                        <li class="nav-item">
                            <a class="nav-link ${pathname === "/" || pathname === "/index.html" ? "active" : ""}" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${pathname === "/dashboard/" ? "active" : ""}" aria-current="page" href="/dashboard">Dashboard</a>
                        </li>
                        <li class="nav-item">
                            <button class="btn btn-warning" id="logout" aria-current="page">Log out ${name}</button>
                        </li>
`;

        listeners.logoutListener();
    } else {
        menu.innerHTML += `
                        <li class="nav-item">
                            <a class="nav-link ${pathname === "/" || pathname === "/index.html" ? "active" : ""}" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${pathname === "/auth/login.html" ? "active" : ""}" aria-current="page" href="/auth/login.html">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${pathname === "/auth/register.html" ? "active" : ""}" aria-current="page" href="/auth/register.html">Register</a>
                        </li>`;
    }
}
