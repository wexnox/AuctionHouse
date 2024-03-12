export function toggleAuctionLoadMore(hideButton = false) {
    const button = document.querySelector('#loadMore');

    if (button) {
        button.style.display = hideButton ? 'none' : 'block';
    }
}
