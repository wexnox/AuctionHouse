import * as listeners from './listeners/index.js';
import buildMenu from './ui/common/buildMenu.js';
import { redirectBasedOnLogin } from './helpers/redirectBasedOnLogin.js';
import { buildFeed } from './ui/buildFeed.js';
// import { handleCreateListing } from './listeners/index.js';
// import { createNewListing } from '@/js/api/listings/createNewListing.js';
import { displayMessage } from './ui/common/displayMessage.js';
import { setPageTitle } from '@/js/utils/titleManager.js';
import { initializeSearch } from '@/js/ui/search.js';
import { initializeLoadMore } from '@/js/ui/helpers/loadMoreHandler.js';


async function handleRootIndex() {
  try {
    const limit = 3;
    await buildFeed({ limit });
  } catch (error) {
    handleFeedError(error, 'feed');
    console.error('Error showing posts:', error);
  }
}

async function handleBrowseListings() {
  try {
    const limit = 9;
    const offset = 0;

    const posts = await buildFeed({ limit, offset });

    if (posts.length > 0) {
      initializeLoadMore(posts, 'listingsContainer', 'loadMore', limit);
      initializeSearch(posts);
    } else {
      console.warn('No listings available to display or search.');
    }
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