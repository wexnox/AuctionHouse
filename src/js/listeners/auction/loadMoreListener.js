export function loadMoreListener(func) {
    const button = document.querySelector('#loadMore');
    button.addEventListener('click', () => func());
}