import * as listeners from './listeners/index.js';
import buildMenu from './ui/common/buildMenu.js';
import { redirectBasedOnLogin } from './helpers/auth/index.js';

export default function router() {
  const pathname = location.pathname;

  redirectBasedOnLogin(pathname);
  buildMenu(pathname);

  if (pathname === '/pages/login/index.html') {
    listeners.loginListener();
    listeners.setRegisterUserListener();
  }
  // else if (path === '/pages/listings/create/index.html') {
  // } else if (path === '/pages/profile/index.html') {
  // } else if (path === '/pages/listingsDetails/index.html') {
  // }
}
