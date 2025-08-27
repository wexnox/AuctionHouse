/**
 * Toggles the display of the load more button.
 * @param hideBtn
 */

export function toggleAuctionLoadMore(hideBtn = false) {
  const button = document.querySelector('#loadMore');

  if (button) {
    button.style.display = hideBtn ? 'none' : 'block';
  }
}
