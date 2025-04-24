import * as listeners from './listeners/index.js';
import buildMenu from './ui/common/buildMenu.js';
import { redirectBasedOnLogin } from './helpers/redirectBasedOnLogin.js';
import { buildFeed } from './ui/posts/buildFeed.js';
// import { handleCreateListing } from './listeners/index.js';
// import { createNewListing } from '@/js/api/listings/createNewListing.js';
import { displayMessage } from './ui/common/displayMessage.js';

async function handleRootIndex() {
  try {
    await buildFeed();
  } catch (error) {
    handleFeedError(error, 'feed');
    console.error('Error showing posts:', error);
  }
}

// TODO: was i done?
function handleFeedError(error, context) {
  console.error(`Error loading ${context}:`, error);
  displayMessage('danger', `Failed to load ${context}. Please try again later.`);

  const container = document.querySelector('#listingsContainer');
  if (container) {
    container.innerHTML = '<div class="alert alert-warning">Unable to load content. <button class="btn btn-sm btn-outline-primary" onclick="handleRootIndex()">Retry</button></div>';
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

// TODO:'createNewListing' is defined but never used     no-unused-vars
function handleListingsCreate() {
  listeners.createNewListing();
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
    break;
  case '/pages/listings/details.html':
    handleListingsDetails();
    break;
  case '/pages/listings/create.html':
    handleListingsCreate();
    break;
  }
}