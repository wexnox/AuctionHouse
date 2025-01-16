import * as storage from '../../helpers/storage.js';
import buildMenu from '../../ui/common/buildMenu.js';


export function logoutListener() {
  const logoutBtn = document.getElementById('logout');

  logoutBtn.addEventListener('click', () => {
    storage.clearTokenFromStorage('accessToken');
    storage.clearTokenFromStorage('profile');
    location.href = '/';
    buildMenu(); // Rebuild the menu to reflect the unauthenticated state
  });
}
