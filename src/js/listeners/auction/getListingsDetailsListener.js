import {authFetch} from '../../api/api.js';
import {API_MAIN_URL} from '../../api/constants.js';
import {Modal} from 'bootstrap';


const params = new URLSearchParams(document.location.search);
const id = params.get('id');
const method = 'GET';
const url = `${API_MAIN_URL}/listings/${id}?_bids=true`;
const title = document.querySelector('title');
const wrapper = document.querySelector('#detailsContainer');

export function createAvatarImage(seller) {
  return seller.avatar
    ? `<img src="${seller.avatar}" alt="Avatar for ${seller.name}" class="img-fluid rounded-circle mb-4" width="100" height="100"/>`
    : '<div class="mb-4"><i class="bi bi-person-circle" style="font-size: 4rem;"></i></div>';
}

function createListingImage(detailsListing) {
  return detailsListing.media
    ? `<img src="${detailsListing.media}" alt="Image for ${detailsListing.title}" class="img-fluid"/>`
    : '<div class="text-muted">No Image Available</div>';
}

export function createHighestBidInfo(detailsListing) {
  const highestBid = detailsListing.bids && detailsListing.bids.length > 0
    ? detailsListing.bids.reduce((max, bid) => bid.amount > max.amount ? bid : max, detailsListing.bids[0])
    : null;

  return highestBid
    ? `<div class="text-center mt-3">
            <h5>Latest Bid</h5>
            <p>${highestBid.amount} Credits by ${highestBid.bidderName}</p> 
            <small>On ${new Date(highestBid.created).toLocaleDateString()} at ${new Date(highestBid.created).toLocaleTimeString()}</small>
           </div>`
    : '<div class="text-center mt-3"><p>No bids yet</p></div>';
}

function createBidList(detailsListing) {
  let bidsListString = detailsListing.bids && detailsListing.bids.length > 0
    ? detailsListing.bids.map(bid => `<li class="list-group-item">${bid.amount} Credits by ${bid.bidderName} <br> On ${new Date(bid.created).toLocaleDateString()} at ${new Date(bid.created).toLocaleTimeString()}</li>`).join('')
    : '<li class="list-group-item">No bids yet</li>';

  return `<ul class="list-group list-group-flush">${bidsListString}</ul>`;
}

export async function getListingsDetailsListener() {
  try {
    const response = await authFetch(url, {method});
    const detailsListing = await response.json();

    title.innerHTML = `Auction House | ${detailsListing.title}`;

    const sellerDetails = detailsListing.seller ? detailsListing.seller : {
      name: 'Not specified',
      email: 'Not provided',
      avatar: null
    };

    const avatarImage = createAvatarImage(sellerDetails);
    const listingImage = createListingImage(detailsListing);
    const highestBidInfo = createHighestBidInfo(detailsListing);
    const bidList = createBidList(detailsListing);
    const modalElement = new Modal(document.getElementById('placeBidModal'));
    modalElement.hide();

    wrapper.innerHTML = `
            <div class="container py-4">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header text-center">
                                ${detailsListing.title}
                            </div>
                            <div class="card-body">
                                ${listingImage}
                                <div class="seller-info text-center mt-3">
                                    ${avatarImage}
                                    <h6 class="card-subtitle mb-2 text-muted">${sellerDetails.name}</h6>
                                </div>
                                ${highestBidInfo}
                            </div>
                            <div class="card-footer">
                                <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#placeBidModal">Add a Bid</button>
                            </div>
                        </div>
                        <div class="card mt-3">
                            <div class="card-header">
                                Previous Bids
                            </div>
                            <div class="card-body p-0">
                                ${bidList}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

  } catch (error) {
    console.error(error);
  }
}