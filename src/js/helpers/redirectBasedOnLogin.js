export function redirectBasedOnLogin(pathname) {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    redirectToURL(pathname, ['/auth/profile.html', '/auth/register.html'], '/profile');
  } else {
    redirectToURL(pathname, ['/profile/', '/profile/details.html'], '/auth/profile.html');
  }
}

function redirectToURL(pathname, paths, redirectTo) {
  if (paths.includes(pathname)) {
    location.href = redirectTo;
  }
}