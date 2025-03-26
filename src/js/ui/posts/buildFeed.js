import {searchPosts} from '@/js/helpers/searchPosts.js';
import * as listeners from '@/js/listeners/index.js';
import createHtmlCards from '@/js/ui/common/createHtmlCards.js';

const searchBar = document.getElementById('searchBar');
const listingsContainer = document.getElementById('listingsContainer');

let posts = [];

export async function buildFeed() {
  const listAuctions = listeners.getAllAuctionsListener();
  posts = await listAuctions(); // populate the posts array
  listeners.loadMoreListener(listAuctions);
}

// Add search functionality.
searchBar.addEventListener('keyup', (e) => {
  const searchTerm = e.target.value.toLowerCase();

  // Ensure posts array has been populated before filtering.
  if (!posts || posts.length === 0) {
    console.error('No posts available for search.');
    return;
  }

  // Filter the posts using the search term.
  const filteredPosts = searchPosts(posts, searchTerm);

  // Clear the container before rendering search results.
  listingsContainer.innerHTML = '';

  // Render the filtered posts using createHtmlCards
  createHtmlCards(filteredPosts, listingsContainer);
});
