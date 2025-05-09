import buildMenu from '@/js/ui/common/buildMenu.js';
import { redirectBasedOnLogin } from './helpers/redirectBasedOnLogin.js';
import { handleIndexRoutes } from './routes/indexRoutes.js';
import { handleAuthRoutes } from './routes/authRoutes.js';
import { handleProfileRoutes } from './routes/profileRoutes.js';
import { handleListingRoutes } from './routes/listingRoutes.js';

export default function router() {
  const pathname = location.pathname;

  redirectBasedOnLogin(pathname);
  buildMenu(pathname);

  if (pathname === '/' || pathname === '/index.html') {
    handleIndexRoutes();
  } else if (pathname.startsWith('/pages/auth')) {
    handleAuthRoutes(pathname);
  } else if (pathname.startsWith('/pages/profile')) {
    handleProfileRoutes(pathname);
  } else if (pathname.startsWith('/pages/listings')) {
    handleListingRoutes(pathname);
  }
}