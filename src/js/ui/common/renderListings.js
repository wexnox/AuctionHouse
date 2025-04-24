// import { createAvatarImage, createHighestBidInfo } from '@/js/listeners/index.js';
//
// export function renderItems(itemsToRender) {
//   const itemsContainer = document.querySelector('#listingsContainer');
//
//   clearContainer(itemsContainer);
//
//   if (itemsToRender.length === 0) {
//     itemsContainer.innerHTML = '<p>No matching listings found.</p>';
//   } else {
//     const rowDiv = document.createElement('div');
//     rowDiv.classList.add('row', 'gy-4'); // Adds Bootstrap grid row with gap between cards
//
//     itemsToRender.forEach((item) => {
//       const colDiv = document.createElement('div');
//       colDiv.classList.add('col-sm-12', 'col-md-6', 'col-lg-4', 'd-flex'); // Equal-sized columns for different screen sizes
//       colDiv.innerHTML = renderCard(item); // Render card inside column
//       rowDiv.appendChild(colDiv); // Add column to the Bootstrap row
//     });
//
//     itemsContainer.appendChild(rowDiv); // Append the Bootstrap row to the container
//   }
//
// }
//
// const clearContainer = (container) => {
//   container.innerHTML = '';
// };
//
//
// const renderCard = (item) => {
//   const endDate = new Date(item.endsAt);
//   const avatar = item.seller ? createAvatarImage(item.seller) : '<div class="text-muted">No Avatar</div>';
//   const highestBid = createHighestBidInfo(item);
//
//   return `
//         <div class="card h-100 shadow border-0 rounded-3 overflow-hidden">
//             <div class="position-relative card-img-container">
//                 <img src="${item.media || 'assets/images/placeholder.jpg'}"
//                      class="card-img-top"
//                      alt="${item.title} image"
//                      onerror="this.src='assets/images/placeholder.jpg'">
//                 <div class="position-absolute bottom-0 start-0 p-2 bg-dark bg-opacity-50 text-white w-100">
//                   <small>Ends: ${endDate.toLocaleDateString()} | ${endDate.toLocaleTimeString()}</small>
//                 </div>
//             </div>
//             <div class="card-body">
//                 <h5 class="card-title text-truncate">${item.title}</h5>
//                 <p class="card-text text-muted mb-2 small">${item.description || 'No description provided'}</p>
//                 <div class="badge bg-primary mb-2">${highestBid || 'No bids yet'}</div>
//                 <div class="seller-info small mb-2">${avatar}</div>
//                 <p class="small text-muted">Tags: ${item.tags?.join(', ') || 'No tags available'}</p>
//                 <p class="small text-muted">Bids: ${item._count?.bids || 0}</p>
//             </div>
//             <div class="card-footer bg-light d-flex justify-content-between align-items-center border-top-0">
//                 <a href="pages/listings/details.html?id=${item.id}" class="btn btn-sm btn-outline-primary">View Details</a>
//                 <button class="btn btn-sm btn-primary">
//                     <a class="text-white text-decoration-none" href="pages/listings/bid.html?id=${item.id}">Place Bid</a>
//                 </button>
//             </div>
//         </div>`;
//
// };
//
// // Used in getUserListing
// // TODO: create placeholder.jpg