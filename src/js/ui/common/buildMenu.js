import { logoutListener } from '@/js/listeners/index.js';

function createMenuItem({ currentPath, path, name, pathname }) {
  const isActive = pathname === currentPath;
  return `<li class="nav-item">
    <a class="nav-link ${isActive ? 'active' : ''}" href="${path}">${name}</a>
  </li>`;
}

function buildMenu() {
  const pathname = window.location.pathname;
  const menu = document.querySelector('#menu');
  const logoutContainer = document.querySelector('#logout-container');
  let isAuthenticated = !!localStorage.getItem('accessToken');

  // Define the menu items for authenticated and unauthenticated states
  const authMenuItems = [
    { currentPath: '/', path: '/', name: 'Home' },
    { currentPath: '/pages/listings/browse.html', path: '/pages/listings/browse.html', name: 'Browse Listings' },
    { currentPath: '/pages/listings/create.html', path: '/pages/listings/create.html', name: 'Create Listing' },
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
    // Create profile dropdown instead of simple logout link
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const username = user.name || user.username || 'Profile';
    const avatarUrl = user.avatar?.url || user.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

    logoutContainer.innerHTML = `
      <div class="dropdown">
        <a class="nav-link dropdown-toggle d-flex align-items-center text-light" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="${avatarUrl}" alt="Profile" class="rounded-circle me-2" width="32" height="32" style="border: 2px solid #dee2e6;">
          <span class="username">${username}</span>
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
          <li>
            <a class="dropdown-item d-flex align-items-center" href="/pages/profile/index.html">
              <i class="me-2">👤</i>Dashboard
            </a>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <a class="dropdown-item d-flex align-items-center" href="#" id="logout">
              <i class="me-2">🚪</i>Logout
            </a>
          </li>
        </ul>
      </div>
    `;
    logoutListener();
  } else {
    logoutContainer.innerHTML = '';
  }
}

export default buildMenu;