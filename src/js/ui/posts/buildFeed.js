import { searchPosts } from '@/js/helpers/searchPosts.js';
import * as listeners from '@/js/listeners/index.js';
import createHtmlCards from '@/js/ui/common/createHtmlCards.js';

const searchBar = document.getElementById('searchBar');
const listingsContainer = document.getElementById('listingsContainer');
const loadMoreButton = document.getElementById('loadMore');

let posts = [];
let allPosts = [];
let currentAuctionLoader = null;

export async function buildFeed(options = {}) {

  if (!listingsContainer) {
    console.error('Listings container not found');
    return;
  }

  const listAuctions = listeners.getAllAuctionsListener();
  currentAuctionLoader = listAuctions;

  // If showAll is true
  if (options.showAll) {
    if (loadMoreButton) {
      loadMoreButton.style.display = 'block';
    }
  } else {
    if (loadMoreButton) {
      loadMoreButton.style.display = 'none';
    }
  }

  posts = await listAuctions();

  posts.sort((a, b) => {
    const dateA = new Date(a.created || a.createdAt || a.endsAt);
    const dateB = new Date(b.created || b.createdAt || b.endsAt);
    return dateB - dateA;
  });

  allPosts = [...posts]; // Store all posts for filtering

  if (options.limit && !options.showAll) {
    const limitedPosts = posts.slice(0, options.limit);
    listingsContainer.innerHTML = '';
    createHtmlCards(limitedPosts, listingsContainer);
  }

  if (options.showAll) {
    setupLoadMoreListener(listAuctions);
  }

}

function setupLoadMoreListener(listAuctionsFunction) {
  if (!loadMoreButton) {
    return;
  }

  loadMoreButton.addEventListener('click', async () => {
    try {
      loadMoreButton.disabled = true;
      loadMoreButton.innerHTML = 'Loading...';

      const newPosts = await listAuctionsFunction();

      if (newPosts && newPosts.length > 0) {
        posts = [...posts, ...newPosts];
        allPosts = [...allPosts, ...newPosts];
      } else {
        loadMoreButton.style.display = 'none';
      }

    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      loadMoreButton.disabled = false;
      loadMoreButton.innerHTML = `
        <svg class="bi bi-hammer" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5 5 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334" />
        </svg>
        Load More Auctions...
      `;
    }
  });
}


// Add search functionality.
if (searchBar) {
  searchBar.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    if (!allPosts || allPosts.length === 0) {
      console.error('No posts available for search.');
      return;
    }

    // Filter the posts using the search term.
    const filteredPosts = searchPosts(allPosts, searchTerm);

    // Clear the container before rendering search results.
    listingsContainer.innerHTML = '';

    // Render the filtered posts using createHtmlCards
    createHtmlCards(filteredPosts, listingsContainer);
  });
}
