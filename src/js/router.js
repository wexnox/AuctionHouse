import buildMenu from '@/js/ui/common/buildMenu.js';
import { redirectBasedOnLogin } from './helpers/redirectBasedOnLogin.js';
import { handleIndexRoutes } from './routes/indexRoutes.js';
import { handleAuthRoutes } from './routes/authRoutes.js';
import { handleProfileRoutes } from './routes/profileRoutes.js';
import { handleListingRoutes } from './routes/listingRoutes.js';
import { handleSearchRoutes } from './routes/searchRoutes.js';

/**
 * Handles routing based on the current URL.
 * @returns {Promise<void>}
 */
export default async function router() {
  const pathname = location.pathname;

  redirectBasedOnLogin(pathname);
  buildMenu(pathname);

  if (pathname === '/' || pathname === '/index.html') {
    await handleIndexRoutes();
  } else if (pathname.startsWith('/pages/auth')) {
    handleAuthRoutes(pathname);
  } else if (pathname.startsWith('/pages/profile')) {
    await handleProfileRoutes(pathname);
  } else if (pathname.startsWith('/pages/listings')) {
    await handleListingRoutes(pathname);
  } else if (pathname.endsWith('/search.html')) {
    handleSearchRoutes(pathname);
  }
}
