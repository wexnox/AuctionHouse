import { logoutListener } from '../../listeners/index.js';

/**
 * Create a menu item HTML string.
 *
 * @param {Object} options - The options object.
 * @param {string} options.pathname - The current page's pathname.
 * @param {string} options.currentPath - The path of the current page.
 * @param {string} options.path - The path of the menu item.
 * @param {string} options.name - The name of the menu item.
 *
 * @returns {string} - The menu item HTML string.
 */
function createMenuItem({ pathname, currentPath, path, name }) {
  const isActive = pathname === currentPath;
  return `<li class="nav-item">
            <a class="nav-link ${isActive ? 'active' : ''}" href="${path}">${name}</a>
          </li>`;
}

/**
 * Build the menu based on the current authentication state and current URL path.
 *
 * @return {void}
 */
export default function buildMenu() {
  const pathname = window.location.pathname;
  const menu = document.querySelector('#menu');
  let isAuthenticated = localStorage.getItem('accessToken') ? true : false;

  // Define the menu items for authenticated and unauthenticated states
  const authMenuItems = [
    { currentPath: '/', path: '/', name: 'Home' },
    { currentPath: '/pages/listings/browse.html', path: '/pages/listings/browse.html', name: 'Browser Listings' },
    { currentPath: '/pages/listings/create.html', path: '/pages/listings/create.html', name: 'Create Listing' },
    { currentPath: '/pages/profile/', path: '/pages/profile/index.html', name: 'Profile' },
  ];

  const unauthMenuItems = [
    { currentPath: '/', path: '/', name: 'Home' },
    { currentPath: '/pages/listings/browse.html', path: '/pages/listings/browse.html', name: 'Browse Listings' },
    { currentPath: '/pages/listings/create.html', path: '/pages/listings/create.html', name: 'Create Listing' },
    { currentPath: '/pages/auth/login.html', path: '/pages/auth/login.html', name: 'Login' },
    { currentPath: '/pages/auth/register.html', path: '/pages/auth/register.html', name: 'Register' },
  ];

  let menuItems = isAuthenticated ? authMenuItems : unauthMenuItems;
  menuItems = menuItems.map(item => createMenuItem({ ...item, pathname })).join('');

  if (isAuthenticated) {
    menuItems += '<li class=\'nav-item\'><button class=\'btn btn-primary\' id=\'logout\'>Log out</button></li>';
  }

  menu.innerHTML = menuItems;

  if (isAuthenticated) {
    logoutListener();
  }
}