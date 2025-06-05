import { logoutListener } from '../../listeners/index.js';

function createMenuItem({ pathname, currentPath, path, name }) {
  const isActive = pathname === currentPath;
  return `<li class="nav-item">
            <a class="nav-link ${isActive ? 'active' : ''}" href="${path}">${name}</a>
          </li>`;
}

export default function buildMenu() {
  const pathname = window.location.pathname;
  const menu = document.querySelector('#menu');
  const logoutContainer = document.querySelector('#logout-container');
  let isAuthenticated = !!localStorage.getItem('accessToken');

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
    { currentPath: '/pages/auth/login.html', path: '/pages/auth/login.html', name: 'Login' },
    { currentPath: '/pages/auth/register.html', path: '/pages/auth/register.html', name: 'Register' },
  ];

  let menuItems = isAuthenticated ? authMenuItems : unauthMenuItems;
  menu.innerHTML = menuItems.map(item => createMenuItem({ ...item, pathname })).join('');

  if (isAuthenticated) {
    logoutContainer.innerHTML = '<a class="nav-link text-light p-0" href="#" id="logout">Log out</a>';
    logoutListener();
  } else {
    logoutContainer.innerHTML = '';
  }
}