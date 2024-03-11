import {logoutListener} from "../../listeners/index.js";

// Utility function to create a menu item
function createMenuItem({pathname, currentPath, path, name}) {
    const isActive = pathname === currentPath;
    return `<li class="nav-item">
            <a class="nav-link ${isActive ? "active" : ""}" href="${path}">${name}</a>
          </li>`;
}

// Function to build the menu based on authentication state
export default function buildMenu() {
    const pathname = window.location.pathname;
    const menu = document.querySelector("#menu");
    const isAuthenticated = Boolean(localStorage.getItem('token'));

    // Define the menu items for authenticated and unauthenticated states
    const authMenuItems = [
        {currentPath: "/", path: "/", name: "Home"},
        {currentPath: "/profile/", path: "/profile/details.html", name: "Profile"},
        {currentPath: "/profile/listings/", path: "/listings/details.html", name: "Listings"}
    ];

    const unauthMenuItems = [
        {currentPath: "/", path: "/", name: "Home"},
        {currentPath: "/auth/login.html", path: "/auth/login.html", name: "Login"},
        {currentPath: "/auth/register.html", path: "/auth/register.html", name: "Register"}
    ];

    // Generate menu items based on authentication state
    let menuItems = isAuthenticated ? authMenuItems : unauthMenuItems;
    menuItems = menuItems.map(item => createMenuItem({...item, pathname})).join('');

    // Add logout button for authenticated users
    if (isAuthenticated) {
        menuItems += `<li class="nav-item"><button class="btn btn-primary" id="logout">Log out</button></li>`;
        logoutListener();
    }

    menu.innerHTML = menuItems;
}