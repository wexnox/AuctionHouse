// Handles the root or index page routes
import { setPageTitle } from '@/js/utils/titleManager.js';
import { buildFeed } from '../ui/buildFeed.js';
import { initializeSearch } from '@/js/ui/search.js';
import { getPosts, setPosts } from '@/js/utils/postsStore.js';

export function handleIndexRoutes() {
  setPageTitle('Home');

  displayHomePageFeed();

}

async function displayHomePageFeed() {
  const limit = 3;
  const offset = 0; // Start at the beginning

  try {

    const posts = await buildFeed({ limit, offset });

    setPosts(posts);

    initializeSearch(posts);

  } catch (error) {
    console.error('Error loading homepage feed:', error);
    initializeSearch(getPosts());

  }
}
