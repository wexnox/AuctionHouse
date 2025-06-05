import { getAllListings } from '@/js/api/listings/getAllListings.js';

export async function getPostsForSearch() {
  try {
    const posts = await getAllListings({ limit: 100, offset: 0, _active: true });
    return posts;
  } catch (e) {
    console.error('Failed to fetch posts for search:', e);
    return [];
  }
}