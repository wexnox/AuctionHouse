import { getAllListings } from '@/js/api/listings/getAllListings.js';
import createHtmlCards from '@/js/ui/common/createHtmlCards.js';

export async function buildFeed({ limit, offset = 0 }) {
  const container = document.getElementById('listingsContainer');
  if (!container) {
    console.error('Listings container not found in DOM.');
    return [];
  }

  try {
    const posts = await getAllListings({ limit, offset }); // Fetch all posts
    console.log('Fetched posts:', posts); // Debug fetched posts

    // Handle edge case: empty data
    if (!Array.isArray(posts) || posts.length === 0) {
      console.warn('No posts returned from API.');
      container.innerHTML = '<div class="alert alert-warning">No listings available to display.</div>';
      return [];
    }

    container.innerHTML = ''; // Clear the container


    const visiblePosts = limit ? posts.slice(0, limit) : posts;
    createHtmlCards(visiblePosts, container);

    return posts; // Return all fetched posts
  } catch (error) {
    console.error('Error while building feed:', error);
    container.innerHTML = '<div class="alert alert-danger">Failed to load listings. Please try again later.</div>';
    return []; // Return an empty array on failure
  }
}