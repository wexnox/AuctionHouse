// Handles all routes related to authentication (login, register)
import { setPageTitle } from '../utils/titleManager.js';
import * as listeners from '../listeners/index.js';
import { initializeSearch } from '@/js/ui/search.js';

export function handleAuthRoutes(pathname) {

  if (pathname.endsWith('/register.html')) {

    setPageTitle('Register');

    initializeSearch(posts);

    listeners.setRegisterUserListener();

  } else if (pathname.endsWith('/login.html')) {

    setPageTitle('Login');

    initializeSearch(posts);

    listeners.loginListener();
  }
}
