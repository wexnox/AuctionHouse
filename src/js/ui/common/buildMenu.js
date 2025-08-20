import { logoutListener } from '@/js/listeners/index.js';
import { authFetch } from '@/js/api/api.js';
import { API_PROFILE_URL } from '@/js/api/constants.js';
import { getTokenFromStorage } from '@/js/helpers/storage.js';

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
  const isAuthenticated = !!localStorage.getItem('accessToken');

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

  const menuItems = isAuthenticated ? authMenuItems : unauthMenuItems;
  if (menu) {
    menu.innerHTML = menuItems.map(item => createMenuItem({ ...item, pathname })).join('');
  }

  if (isAuthenticated) {
    // Create profile dropdown instead of simple logout link
    const storedProfile = getTokenFromStorage('profile') || {};
    const username = storedProfile.name || storedProfile.username || 'Profile';
    const avatarUrl = storedProfile.avatar?.url
      || storedProfile.avatar
      || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

    let credits = typeof storedProfile.credits === 'number' ? storedProfile.credits : null;

    // Try to fetch fresh profile to get up-to-date credits
    (async () => {
      try {
        if (!storedProfile?.name) {
          throw new Error('No profile in storage');
        }
        const res = await authFetch(`${API_PROFILE_URL}/${storedProfile.name}`, { method: 'GET' });
        if (res.ok) {
          const fresh = await res.json();
          credits = typeof fresh.credits === 'number' ? fresh.credits : credits;

          const creditsEl = document.querySelector('#nav-credits');
          const nameEl = document.querySelector('#nav-username');
          const avatarEl = document.querySelector('#nav-avatar');
          if (creditsEl && typeof credits === 'number') {
            creditsEl.textContent = `${credits} points`;
          }
          if (nameEl) {
            nameEl.textContent = fresh.name || username;
          }
          if (avatarEl && fresh.avatar) {
            avatarEl.src = fresh.avatar;
          }
        }
      } catch (_) {
        // ignore
      }
    })();

    const pointsText = typeof credits === 'number' ? `${credits} points` : '';

    if (logoutContainer) {
      logoutContainer.innerHTML = `
      <div class="dropdown">
        <a class="nav-link dropdown-toggle d-flex align-items-center text-light gap-2" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <span id="nav-credits" class="me-1">${pointsText}</span>
          <img id="nav-avatar" src="${avatarUrl}" alt="Profile" class="rounded-circle" width="28" height="28" style="border: 2px solid #dee2e6; object-fit: cover;">
          <span id="nav-username" class="username">${username}</span>
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
      </div>`;
    }
    logoutListener();
  } else if (logoutContainer) {
    logoutContainer.innerHTML = '';
  }
}

export default buildMenu;