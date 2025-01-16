export function searchPosts(posts, searchTerm) {
  searchTerm = searchTerm.toLowerCase();
  return posts.filter(post => {
    const title = post.title ? post.title.toLowerCase() : '';
    const sellerName = post.seller && post.seller.name ? post.seller.name.toLowerCase() : '';

    return title.includes(searchTerm) || sellerName.includes(searchTerm);
  });
}