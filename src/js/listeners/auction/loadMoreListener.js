/**
 * Load more listener.
 * @param func
 */
// TODO: check if this is still needed
export function loadMoreListener(func) {
  const button = document.querySelector('#loadMore');
  if (button) {
    button.addEventListener('click', () => func());
  } else {
    console.error('Load more button not found in the DOM');
  }
}