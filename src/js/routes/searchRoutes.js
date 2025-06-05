// Handles search page routes
import { setPageTitle } from '../utils/titleManager.js';
import { handleSearchResults } from '../ui/searchResults.js';
import { displayVersion } from '@/js/ui/common/displayVersion.js';
import { initializeSearch } from '@/js/ui/search.js';
import { getPostsForSearch } from '@/js/ui/helpers/getPostsForSearch.js';

export async function handleSearchRoutes(pathname) {
  if (pathname.endsWith('/search.html')) {

    setPageTitle('Search Results');

    displayVersion();

    await getPostsForSearch();

    initializeSearch();

    await handleSearchResults();

  }
}

