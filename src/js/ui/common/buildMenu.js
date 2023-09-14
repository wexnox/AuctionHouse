import * as listeners from "../../listeners/auth/index.js";

export default function buildMenu() {
    const pathname = window.location.pathname;
    const menu = document.querySelector("#menu");
    const token = localStorage.getItem('token');

    if (token) {
        
        menu.innerHTML = `<li class="nav-item">
                        <a class="nav-link ${pathname === "/" || pathname === "/index.html" ? "active" : ""}" href="/">Home</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link ${pathname === "/profile/" ? "active" : ""}" href="/profile/index.html">Profile</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link ${pathname === "/profile/listings/" ? " active" : ""}" aria-current="page" href="/listings/index.html">Listings</a>
                      </li>
                      <li class="nav-item">
                        <button class="btn btn-primary" id="logout">Log out</button>
                      </li>`;

        listeners.logoutListener();

    } else {
        menu.innerHTML = `<li class="nav-item">
                        <a class="nav-link ${pathname === "/" || pathname === "/index.html" ? "active" : ""}" href="/">Home</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link ${pathname === "/auth/login.html" ? "active" : ""}" href="/auth/login.html">Login</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link ${pathname === "/auth/register.html" ? "active" : ""}" href="/auth/register.html">Register</a>
                      </li>`;
    }
}


