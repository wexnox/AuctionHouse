// Handles all routes related to listings
import { setPageTitle } from '../utils/titleManager.js';
import { buildFeed } from '../ui/buildFeed.js';
import { initializeLoadMore } from '../ui/helpers/loadMoreHandler.js';
import { initializeSearch } from '../ui/search.js';
import * as listeners from '../listeners/index.js';
import { handleFeedError } from './routeHelpers.js';
import { getPosts, setPosts } from '@/js/utils/postsStore.js';
import { displayVersion } from '@/js/ui/common/displayVersion.js';

export async function handleListingRoutes(pathname) {

  if (pathname.endsWith('/browse.html')) {

    setPageTitle('Browse All Listings');

    displayVersion();

    await handleBrowseListings();

  } else if (pathname.endsWith('/details.html')) {

    setPageTitle('Listings Details');

    displayVersion();

    initializeSearch(getPosts());


    await listeners.getListingsDetailsListener();
    await listeners.placeBidListener();

  } else if (pathname.endsWith('/create.html')) {

    setPageTitle('Create Listing');

    displayVersion();

    initializeSearch(getPosts());

    await listeners.createNewListing();
  }
}

async function handleBrowseListings() {

  try {

    const limit = 3;
    const offset = 0;

    const posts = await buildFeed({ limit, offset });

    setPosts(posts);


    if (posts.length > 0) {

      initializeLoadMore(posts, 'listingsContainer', 'loadMore', limit);

      initializeSearch(posts);

    } else {
      console.warn('No listings available to display.');
    }
  } catch (error) {

    handleFeedError(error, 'listings');

  }
}
