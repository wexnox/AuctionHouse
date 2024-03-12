import * as listeners from './listeners/index.js';
import buildMenu from './ui/common/buildMenu.js';
import {redirectBasedOnLogin} from './helpers/redirectBasedOnLogin.js';

export default function router() {
    const pathname = location.pathname;
    let listAuctions;

    redirectBasedOnLogin(pathname);
    buildMenu(pathname);

    switch (pathname) {
        case "/":
        case "/index.html":
            listAuctions = listeners.getAllAuctionsListener()
            listAuctions() // Initial auctions load
            listeners.loadMore(listAuctions) // Set up listener for subsequent loads
            break;
        case "/auth/register.html":
            listeners.setRegisterUserListener();
            break;
        case "/auth/login.html":
            listeners.loginListener();
            break;
        case "/profile/index.html":
            listeners.userProfileListener()
            listeners.updateAvatarListener();
            listeners.getUserListing()
            return;
        case "/listings/create.html":
            listeners.createNewListingListener()
    }

}
