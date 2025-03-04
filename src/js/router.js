import * as listeners from './listeners/index.js';
import buildMenu from './ui/common/buildMenu.js';
import {redirectBasedOnLogin} from './helpers/redirectBasedOnLogin.js';
import {buildFeed} from './ui/posts/buildFeed.js';

async function handleRootIndex() {
  try {
    await buildFeed();
  } catch (error) {
    // TODO: refactor this
    console.error('Error showing posts:', error);
    // Handle error (e.g., show error message to user)
  }

}

function handleAuthRegister() {
  listeners.setRegisterUserListener();
}

function handleAuthLogin() {
  listeners.loginListener();
}

function handleProfileIndex() {
  listeners.userProfileListener();
  listeners.updateAvatarListener();
  listeners.getUserListing();
}

function handleListingsDetails() {
  listeners.getListingsDetailsListener();
  listeners.placeBidListener();
}

function handleListingsCreate() {
  listeners.createNewListingListener();
}

export default function router() {
  const pathname = location.pathname;
  redirectBasedOnLogin(pathname);
  buildMenu(pathname);
  switch (pathname) {
  case '/':
  case '/index.html':
    handleRootIndex();
    break;
  case '/pages/auth/register.html':
    handleAuthRegister();
    break;
  case '/pages/auth/login.html':
    handleAuthLogin();
    break;
  case '/pages/profile/index.html':
    handleProfileIndex();
    return;
  case '/pages/listings/details.html':
    handleListingsDetails();
    break;
  case '/pages/listings/create.html':
    handleListingsCreate();
  }
}