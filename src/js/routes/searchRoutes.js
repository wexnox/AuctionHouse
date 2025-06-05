// Handles search page routes
import { setPageTitle } from '../utils/titleManager.js';
import { handleSearchResults } from '../ui/searchResults.js';
import { displayVersion } from '@/js/ui/common/displayVersion.js';

export function handleSearchRoutes(pathname) {
  if (pathname.endsWith('/search.html')) {
    setPageTitle('Search Results');

    displayVersion();
    handleSearchResults();
  }
}

