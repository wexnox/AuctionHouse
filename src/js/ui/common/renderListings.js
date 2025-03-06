export function renderItems(itemsToRender) {
  const itemsContainer = document.querySelector('#listingsContainer');

  clearContainer(itemsContainer);
  if (itemsToRender.length === 0) {
    itemsContainer.innerHTML = '<p>No matching listings found.</p>';
  } else {
    renderCardsToContainer(itemsContainer, itemsToRender);
  }
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
  return `
        <div class="col">
            <div class="card glass py-3 px-3">
                <img src="${item.media}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="card-text">Tags: ${item.tags.join(', ')}</p>
                    <p class="card-text">Bids on this item: ${item._count.bids}</p>
                </div>
                <div class="py-3 px-3">Ending: 
                    <p class="bg-info border border-solid rounded mb-3 py-2 px-2">
                        ${endDate.toLocaleDateString()} | ${endDate.toLocaleTimeString()}
                    </p>
                </div> 
      <button type="button" class="btn btn-outline-primary bt-buttn-sm px-4 gap-3">
                    <a href="pages/listings/details.html?id=${item.id}">Details</a>
                </button>
            </div>
        </div>`;
};

// THIS IS WRONG FILE