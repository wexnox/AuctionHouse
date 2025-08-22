// Handles the root or index page routes
import { setPageTitle } from '@/js/utils/titleManager.js';
import { buildFeed } from '../ui/buildFeed.js';
import { initializeSearch } from '@/js/ui/search.js';
import { displayVersion } from '@/js/ui/common/displayVersion.js';
import { getPostsForSearch } from '@/js/ui/helpers/getPostsForSearch.js';

export async function handleIndexRoutes() {
  setPageTitle('Home');

  displayVersion();

  await displayHomePageFeed();

}

async function displayHomePageFeed() {
  const limit = 3;
  const offset = 0; // Start at the beginning

  try {

    await buildFeed({ limit, offset, layout: 'row' });

    await getPostsForSearch();

    initializeSearch();


  } catch (error) {
    console.error('Error loading homepage feed:', error);

    initializeSearch();


  }
}
