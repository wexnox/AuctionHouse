import * as listeners from './listeners/index.js';
import buildMenu from './ui/common/buildMenu.js';
import {redirectBasedOnLogin} from './helpers/redirectBasedOnLogin.js';

/**
 * Handles the root index page.
 * Calls the necessary listeners to display auctions and load more auctions.
 *
 * @return {undefined}
 */
function handleRootIndex() {
    const listAuctions = listeners.getAllAuctionsListener()
    listAuctions();
    listeners.loadMoreListener(listAuctions);
}

/**
 * Sets the register user listener for authentication.
 *
 * @returns {void}
 */
function handleAuthRegister() {
    listeners.setRegisterUserListener();
}

/**
 * Handles the authentication login process.
 *
 * This method calls the loginListener function to initiate the login process.
 *
 * @return {void} This method does not return a value.
 */
function handleAuthLogin() {
    listeners.loginListener();
}

/**
 * Calls the necessary listener functions to handle the profile index.
 *
 * @return {void}
 */
function handleProfileIndex() {
    listeners.userProfileListener();
    listeners.updateAvatarListener();
    listeners.getUserListing();
}

/**
 * Handle sorting the listings based on the specified index.
 * This method triggers the retrieval of the sorted listings.
 *
 * @function handleSortIndex
 * @memberof module:Listings
 */
function handleSortIndex() {
    // listeners.getSortedListings();
}

/**
 * Handles the details of listings.
 * Calls the listeners for getting listings details and placing bid.
 *
 * @return {void}
 */
function handleListingsDetails() {
    listeners.getListingsDetailsListener();
    listeners.placeBidListener();
}

/**
 * Handles the creation of new listings.
 *
 * @return {void}
 */
function handleListingsCreate() {
    listeners.createNewListingListener();
}

/**
 * The router function handles routing within the application based on the current pathname.
 * It redirects the user based on their login status, builds the menu, and handles different
 * pathname cases to execute specific functionality.
 *
 * @function router
 * @returns {void}
 */
export default function router() {
    const pathname = location.pathname;
    redirectBasedOnLogin(pathname);
    buildMenu(pathname);
    switch (pathname) {
        case "/":
        case "/index.html":
            handleRootIndex();
            break;
        case "/auth/register.html":
            handleAuthRegister();
            break;
        case "/auth/login.html":
            handleAuthLogin();
            break;
        case "/profile/index.html":
            handleProfileIndex();
            return;
        case "/listings/index.html":
            handleSortIndex()
            break;
        case "/listings/details.html":
            handleListingsDetails();
            break;
        case "/listings/create.html":
            handleListingsCreate();
    }
}