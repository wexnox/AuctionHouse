import {searchPosts} from '@/js/helpers/search.js';
import {renderItems} from '@/js/ui/common/renderListings.js';

const searchBar = document.getElementById('searchBar');
const listingsContainer = document.getElementById('listingsContainer');

let posts = [];


searchBar.addEventListener('keyup', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredPosts = searchPosts(posts, searchTerm);
  renderItems(filteredPosts, listingsContainer);
});