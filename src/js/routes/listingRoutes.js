// Handles all routes related to listings
import { setPageTitle } from '../utils/titleManager.js';
import { buildFeed } from '../ui/buildFeed.js';
import { initializeLoadMore } from '../ui/helpers/loadMoreHandler.js';
import { initializeSearch } from '../ui/search.js';
import * as listeners from '../listeners/index.js';
import { handleFeedError } from './routeHelpers.js';
import { displayVersion } from '@/js/ui/common/displayVersion.js';
import { getPostsForSearch } from '@/js/ui/helpers/getPostsForSearch.js';

export async function handleListingRoutes(pathname) {

  if (pathname.endsWith('/browse.html')) {

    setPageTitle('Browse All Listings');

    displayVersion();

    await handleBrowseListings();

  } else if (pathname.endsWith('/details.html')) {

    setPageTitle('Listings Details');

    displayVersion();

    try {
      await getPostsForSearch();

      initializeSearch();

    } catch (error) {

      console.error('Error initializing search:', error);

      initializeSearch();
    }


    await listeners.getListingsDetailsListener();

    await listeners.placeBidListener();

  } else if (pathname.endsWith('/create.html')) {

    setPageTitle('Create Listing');

    displayVersion();

    try {
      await getPostsForSearch();

      initializeSearch();

    } catch (error) {

      console.error('Error initializing search:', error);

      initializeSearch();
    }


    await listeners.createNewListing();
  }
}

async function handleBrowseListings() {

  try {

    const limit = 3;
    const offset = 0;

    const posts = await buildFeed({ limit, offset });


    if (posts.length > 0) {

      initializeLoadMore(posts, 'listingsContainer', 'loadMore', limit);

      await getPostsForSearch();

      initializeSearch();


    } else {
      console.warn('No listings available to display.');

      initializeSearch();

    }
  } catch (error) {

    handleFeedError(error, 'listings');

  }
}
