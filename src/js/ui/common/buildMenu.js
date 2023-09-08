import { isLoggedIn, getName } from '../../helpers/storage/index.js';
import * as listeners from '../../listeners/auth/index.js';

export default function buildMenu(pathname) {
  const menu = document.querySelector('#menu');

  if (isLoggedIn()) {
    const name = getName();

    menu.innerHTML += `<li class="dropdown">
                        <a class="dropdown-menu ${
                          pathname === '/' || pathname === '/index.html' ? 'active' : ''
                        }" href="/">Home</a>
                      </li>
                      <li class="nav-item">
                        <a class=dropdown-menu ${
                          pathname === '/dashboard/' ? 'active' : ''
                        }" href="/dashboard">Dashboard</a>
                      </li>
                      <li class="dropdown-menu">
                        <button class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center" id="logout">Log out ${name}</button>
                      </li>`;

    listeners.logoutListener();
  } else {
    menu.innerHTML += `<li class="dropdown">
                        <a class="dropdown-menu ${
                          pathname === '/' || pathname === '/index.html' ? 'active' : ''
                        }" href="/">Home</a>
                      </li>
                      <li class="dropdown-menu">
                        <a class=" ${pathname === '/auth/login.html' ? 'active' : ''}" href="/auth/login.html">Login</a>
                      </li>
                      <li class="dropdown-menu">
                        <a class="dropdown-menu ${
                          pathname === '/auth/register.html' ? 'active' : ''
                        }" href="/auth/register.html">Register</a>
                      </li>`;
  }
}
