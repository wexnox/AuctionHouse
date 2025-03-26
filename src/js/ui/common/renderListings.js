import {createAvatarImage, createHighestBidInfo} from '@/js/listeners/index.js';

export function renderItems(itemsToRender) {
  const itemsContainer = document.querySelector('#listingsContainer');

  clearContainer(itemsContainer);

  if (itemsToRender.length === 0) {
    itemsContainer.innerHTML = '<p>No matching listings found.</p>';
  } else {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row', 'gy-4'); // Adds Bootstrap grid row with gap between cards

    itemsToRender.forEach((item) => {
      const colDiv = document.createElement('div');
      colDiv.classList.add('col-sm-12', 'col-md-6', 'col-lg-4', 'd-flex'); // Equal-sized columns for different screen sizes
      colDiv.innerHTML = renderCard(item); // Render card inside column
      rowDiv.appendChild(colDiv); // Add column to the Bootstrap row
    });

    itemsContainer.appendChild(rowDiv); // Append the Bootstrap row to the container
  }

}

const clearContainer = (container) => {
  container.innerHTML = '';
};


const renderCard = (item) => {
  const endDate = new Date(item.endsAt);
  const avatar = item.seller ? createAvatarImage(item.seller) : '<div class="text-muted">No Avatar</div>';
  const highestBid = createHighestBidInfo(item);

  return `
        <div class="col">
            <div class="card glass py-3 px-3">
                <img src="${item.media || 'placeholder.jpg'}"
                 class="card-img-top" alt="${item.title} image">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    ${highestBid}
                    ${avatar}
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

// Used in getUserListing
// TODO: create placeholder.jpg