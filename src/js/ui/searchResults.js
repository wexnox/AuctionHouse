import { searchPosts } from '../utils/searchPosts.js';
import createHtmlCards from '../ui/common/createHtmlCards.js';
import { displayMessage } from '../ui/common/displayMessage.js';
import { getPosts, setPosts } from '@/js/utils/postsStore.js';

export function handleSearchResults() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get('q');

  const searchList = document.getElementById('searchList');
  if (!searchList) {
    console.error('Search list container not found');
    return;
  }

  const searchTermDisplay = document.getElementById('searchTermDisplay');
  if (searchTermDisplay) {
    searchTermDisplay.textContent = searchTerm || 'All listings';
  }

  if (!searchTerm) {
    searchList.innerHTML = '<p class="text-muted text-center">Please enter a search term.</p>';
    return;
  }

  try {

    let allPosts = getPosts();

    if (!allPosts || allPosts.length === 0) {
      const storedPosts = localStorage.getItem('allPosts');
      if (storedPosts) {
        allPosts = JSON.parse(storedPosts);

        setPosts(allPosts);
      } else {
        allPosts = [];
      }
    }

    const filteredPosts = searchPosts(allPosts, searchTerm);

    if (filteredPosts && filteredPosts.length) {
      searchList.innerHTML = '';
      createHtmlCards(filteredPosts, searchList);
    } else {
      searchList.innerHTML = '<p class="text-muted text-center">No results were found for "' + searchTerm + '".</p>';
    }
  } catch (error) {
    console.error('Error processing search results:', error);
    displayMessage('danger', 'An error occurred while processing search results.');
    searchList.innerHTML = '<p class="text-muted text-center">An error occurred. Please try again.</p>';
  }
}