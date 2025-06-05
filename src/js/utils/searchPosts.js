export function searchPosts(posts, searchTerm) {

  console.log('Filtering posts:', posts);

  searchTerm = searchTerm.toLowerCase();

  return posts.filter(post => {
    const title = post.title || ''; // Safe fallback
    const description = post.description || ''; // Example alternative search field
    const sellerName = post.seller ? post.seller.name || '' : '';
    return title.toLowerCase().includes(searchTerm) ||
      description.toLowerCase().includes(searchTerm) ||
      sellerName.toLowerCase().includes(searchTerm);
  });
}