export function initializeSearch(allPosts = []) {
  const searchInput = document.getElementById('searchBar');

  if (!searchInput) {
    console.error('Search bar not found in the DOM');
    return;
  }

  const searchForm = searchInput.closest('form') || searchInput.parentElement;

  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const searchTerm = searchInput.value.trim();

      if (searchTerm) {
        window.location.href = `/search.html?q=${encodeURIComponent(searchTerm)}`;
      }
    });
  } else {
    searchInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        const searchTerm = event.target.value.trim();

        if (searchTerm) {
          window.location.href = `/search.html?q=${encodeURIComponent(searchTerm)}`;
        }
      }
    });
  }
}
