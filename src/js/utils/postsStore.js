let allPosts = [];

try {
  const storedPosts = localStorage.getItem('allPosts');
  if (storedPosts) {
    allPosts = JSON.parse(storedPosts);
  }
} catch (error) {
  console.error('Error loading posts from localStorage:', error);
}

export function setPosts(posts) {
  allPosts = posts;
  try {
    localStorage.setItem('allPosts', JSON.stringify(posts));
  } catch (error) {
    console.error('Error saving posts to localStorage:', error);
  }
}

export function getPosts() {
  return allPosts;
}

export function addPosts(newPosts) {
  allPosts = [...allPosts, ...newPosts];
  try {
    localStorage.setItem('allPosts', JSON.stringify(allPosts));
  } catch (error) {
    console.error('Error saving updated posts to localStorage:', error);
  }
}
