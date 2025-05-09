import { searchPosts } from '@/js/helpers/searchPosts.js';
import createHtmlCards from '@/js/ui/common/createHtmlCards.js';

export function initializeSearch(allPosts = []) {
  const searchInput = document.getElementById('searchBar');
  const searchList = document.getElementById('searchList');

  searchInput.addEventListener('input', (event) => {

    const searchTerm = event.target.value.trim();

    // Filter posts based on the search term
    const filteredPosts = searchPosts(allPosts, searchTerm);

    // Render filtered posts dynamically into `#searchList`
    if (filteredPosts.length) {
      searchList.innerHTML = ''; // Clear previous results
      createHtmlCards(filteredPosts, searchList);
    } else {
      searchList.innerHTML = '<p class="text-muted text-center">No results were not found.</p>';
    }
  });
}