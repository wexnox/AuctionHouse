import * as listeners from './listeners/index.js';
import buildMenu from './ui/common/buildMenu.js';
import {redirectBasedOnLogin} from './helpers/auth/index.js';

export default function router() {
    const pathname = location.pathname;

    redirectBasedOnLogin(pathname);
    buildMenu(pathname);

    switch (pathname) {
        case "/":
        case "/index.html":
            listeners.getAllListingsListener()
            break;
        case "/auth/login.html":
            listeners.loginListener();
            break;
        case "/auth/register.html":
            listeners.setRegisterUserListener();
            break;
        case "/profile/index.html":
            listeners.fetchProfile()
            listeners.updateProfileListener();
            break;
    }

}
