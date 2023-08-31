import * as listeners from './listeners/index.js';

const path = location.pathname;
if (path === '/pages/login/index.html') {
  listeners.setLogInFormListener();
  listeners.setRegisterUserListener();
}
