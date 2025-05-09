// Handles the root or index page routes
import { setPageTitle } from '@/js/utils/titleManager.js';
import { buildFeed } from '../ui/buildFeed.js';


export function handleIndexRoutes() {
  setPageTitle('Home');
  displayHomePageFeed();
}

async function displayHomePageFeed() {
  const limit = 3;
  const offset = 0; // Start at the beginning

  try {

    await buildFeed({ limit, offset });

  } catch (error) {
    console.error('Error loading homepage feed:', error);

  }
}
