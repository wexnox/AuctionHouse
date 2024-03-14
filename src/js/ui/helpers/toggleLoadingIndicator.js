export function toggleLoadingIndicator(containerElement) {
    const target = typeof containerElement === 'string' ? document.querySelector(containerElement) : containerElement;
    performActionOnIndicator(target);
}

function performActionOnIndicator(container) {
    const indicator = container.querySelector('#loading');
    if (indicator) {
        container.removeChild(indicator);
    } else {
        createAndAppendIndicator(container);
    }
}

function createAndAppendIndicator(container) {
    const newIndicator = document.createElement('div');
    newIndicator.id = 'loading';
    newIndicator.textContent = 'Loading auctions...';
    container.appendChild(newIndicator);
}