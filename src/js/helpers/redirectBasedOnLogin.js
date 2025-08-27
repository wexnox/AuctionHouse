
/**
 * Redirects based on login status.
 * @param pathname
 */

export function redirectBasedOnLogin(pathname) {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    redirectToURL(pathname, ['/auth/profile.html', '/auth/register.html'], '/profile');
  } else {
    redirectToURL(pathname, ['/profile/', '/profile/details.html'], '/auth/profile.html');
  }
}

/**
 * Redirects to a specific URL if the pathname matches any of the provided paths.
 * @param pathname
 * @param paths
 * @param redirectTo
 */

function redirectToURL(pathname, paths, redirectTo) {
  if (paths.includes(pathname)) {
    location.href = redirectTo;
  }
}