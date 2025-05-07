import * as listeners from './listeners/index.js';
import buildMenu from './ui/common/buildMenu.js';
import { redirectBasedOnLogin } from './helpers/redirectBasedOnLogin.js';
import { buildFeed } from './ui/posts/buildFeed.js';
// import { handleCreateListing } from './listeners/index.js';
// import { createNewListing } from '@/js/api/listings/createNewListing.js';
import { displayMessage } from './ui/common/displayMessage.js';
import { setPageTitle } from '@/js/utils/titleManager.js';

async function handleRootIndex() {
  try {
    await buildFeed({ limit: 3 }); // Show the latest 3 posts on the home page
  } catch (error) {
    handleFeedError(error, 'feed');
    console.error('Error showing posts:', error);
  }
}

async function handleBrowseListings() {
  try {
    // Show all listings on the browse page
    await buildFeed({ showAll: true }); // Shows all listings on the browse page
  } catch (error) {
    handleFeedError(error, 'listings');
    console.error('Error showing all listings:', error);
  }
}

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
    setPageTitle('Home');
    handleRootIndex();
    break;
  case '/pages/auth/register.html':
    setPageTitle('Register ');
    handleAuthRegister();
    break;
  case '/pages/auth/login.html':
    setPageTitle('Login ');
    handleAuthLogin();
    break;
  case '/pages/profile/index.html':
    setPageTitle('Profile');
    handleProfileIndex();
    break;
  case '/pages/listings/details.html':
    setPageTitle('Listings Details ');
    handleListingsDetails();
    break;
  case '/pages/listings/create.html':
    setPageTitle('Create Listing');
    handleListingsCreate();
    break;
  case '/pages/listings/browse.html':
    setPageTitle('Browse All Listings');
    handleBrowseListings();
    break;

  }
}