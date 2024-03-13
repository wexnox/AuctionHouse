export function renderItems(itemsToRender) {
    const itemsContainer = document.querySelector("#itemsList");

    clearContainer(itemsContainer);
    renderCardsToContainer(itemsContainer, itemsToRender);
}

const clearContainer = (container) => {
    container.innerHTML = '';
};

const renderCardsToContainer = (container, items) => {
    items.forEach((item) => {
        container.insertAdjacentHTML('beforeend', renderCard(item));
    });
};

const renderCard = (item) => {
    const endDate = new Date(item.endsAt);

    const detailsButton = `
    <button type="button" class="btn btn-outline-primary btn-sm px-4 gap-3">
        <a href="../listings/singleListing/index.html?id=${item.id}">Details</a>
    </button>`;

    const expiringDetails = `
    <div class="py-3 px-3">Ending: 
            <p class="bg-info border border-solid rounded mb-3 py-2 px-2">${endDate.toLocaleDateString()} 
                <span class="mx-1">|</span>${endDate.toLocaleTimeString()}
            </p>
    </div>`;

    return `
        <div class="col">
            <div class="card glass py-3 px-3">
                <img src="${item.media}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="card-text">${item.tags}</p>
                    <p class="card-text">Bids on this item:<span class="mx-1">|</span>${item._count.bids}</p>
                </div>
                ${expiringDetails}
                ${detailsButton}
            </div>
        </div>`;
};