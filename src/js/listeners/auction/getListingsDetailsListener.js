import { authFetch } from '../../api/api.js';
import { API_MAIN_URL } from '../../api/constants.js';
import { Modal } from 'bootstrap';
import { createMediaGallery, initializeGalleryNavigation } from '@/js/ui/components/mediaGallery.js';
import { initCountdown } from '@/js/ui/helpers/countdown.js';

const params = new URLSearchParams(document.location.search);
const id = params.get('id');
const method = 'GET';
const url = `${API_MAIN_URL}/listings/${id}?_bids=true&_seller=true`;
const title = document.querySelector('title');
const wrapper = document.querySelector('#detailsContainer');

/**
 * Fetches the details of a listing and renders it on the page.
 * @returns {Promise<void>}
 */

export function createAvatarImage(seller) {
  return seller.avatar
    ? `<img src="${seller.avatar}" alt="Avatar for ${seller.name}" class="img-fluid rounded-circle mb-4" width="100" height="100" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='../../src/images/no-image.jpeg'" />`
    : '<div class="mb-4"><i class="bi bi-person-circle icon-xl"></i></div>';
}

/**
 * Converts media data to an array of image objects.
 * @param media
 * @returns {[{url: string, alt: string}]|*|*[]}
 */

function toGalleryImages(media) {
  const result = [];
  if (!media) {
    return result; // Returnerer tom array hvis ingen data

  }

  /**
   * Normalizes the media data to a standard format.
   * @param value
   * @param index
   * @returns {{url: string, alt: string}|{url: (*|string), alt: (string|string|*|string|string)}}
   */

  const normalizeOne = (value, index = 0) => {
    // Hvis verdien er en string (bare URL)
    if (typeof value === 'string') {
      return { url: value, alt: `Image ${index + 1}` };
    }
    // Hvis verdien er et objekt
    if (value && typeof value === 'object') {
      const url = value.url || value.src || value.href || '';
      const alt = value.alt || `Image ${index + 1}`;
      return { url, alt };
    }
    // Fallback for ugyldige verdier
    return { url: '', alt: '' };
  };

  if (Array.isArray(media)) {
    return media
      .map((item, i) => normalizeOne(item, i)) // Normaliser hvert element
      .filter((m) => Boolean(m.url)); // Fjern elementer uten URL
  }

  if (typeof media === 'string') {
    return [{ url: media, alt: 'Listing image' }];
  }

  return result;
}

/**
 * Creates the HTML for displaying the highest bid and bids.
 * @param detailsListing
 * @returns {string|string}
 */

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

/**
 * Creates the HTML for displaying the list of bids.
 * @param detailsListing
 * @returns {string}
 */

function createBidList(detailsListing) {
  let bidsListString = detailsListing.bids && detailsListing.bids.length > 0
    ? detailsListing.bids.map(bid => `
        <li class="list-group-item py-2 px-3">
          <div class="fw-semibold">${bid.amount} Credits by ${bid.bidderName}</div>
          <div class="text-muted small">On ${new Date(bid.created).toLocaleDateString()} at ${new Date(bid.created).toLocaleTimeString()}</div>
        </li>
      `).join('')
    : '<li class="list-group-item text-muted">No bids yet</li>';

  return `<ul class="list-group list-group-flush">${bidsListString}</ul>`;
}

/**
 * Fetches the details of a listing and renders it on the page.
 * @returns {Promise<void>}
 */
export async function getListingsDetailsListener() {
  try {
    const response = await authFetch(url, { method });
    const detailsListing = await response.json();

    title.innerHTML = `Auction House | ${detailsListing.title}`;

    const sellerDetails = detailsListing.seller ? detailsListing.seller : {
      name: 'Not specified',
      email: 'Not provided',
      avatar: null,
    };

    const avatarImage = createAvatarImage(sellerDetails);
    const images = toGalleryImages(detailsListing.media);
    const highestBidInfo = createHighestBidInfo(detailsListing);
    const bidList = createBidList(detailsListing);
    const modalElement = new Modal(document.getElementById('placeBidModal'));
    modalElement.hide();

    const bidsCount = Array.isArray(detailsListing.bids) ? detailsListing.bids.length : 0;
    const endsAtDate = detailsListing.endsAt ? new Date(detailsListing.endsAt) : null;
    const highestBid = detailsListing.bids && detailsListing.bids.length > 0
      ? detailsListing.bids.reduce((max, bid) => bid.amount > max.amount ? bid : max, detailsListing.bids[0])
      : null;

    wrapper.innerHTML = `
    <div class="listing-details mt-4">
      <div class="row g-4">
        <div class="col-lg-7">
          <div id="gallery-mount"></div>
        </div>
        <div class="col-lg-5">
          <div class="card shadow-sm h-100">
            <div class="card-body d-flex flex-column">
              <h2 class="h4 text-break mb-3">${detailsListing.title}</h2>

              <div class="d-flex flex-wrap gap-2 mb-3">
                <span class="stat-chip"><i class="bi bi-clock me-1"></i><span id="time-remaining">${endsAtDate ? endsAtDate.toLocaleString() : 'No end date'}</span></span>
                <span class="stat-chip"><i class="bi bi-gavel me-1"></i>${bidsCount} bids</span>
              </div>

              <div class="seller-mini d-flex align-items-center gap-2 mb-3">
                ${sellerDetails.avatar ? `<img src="${sellerDetails.avatar}" alt="${sellerDetails.name}" class="rounded-circle" width="40" height="40" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='../../src/images/no-image.jpeg'">` : '<div class="rounded-circle bg-light d-inline-flex align-items-center justify-content-center avatar-40">👤</div>'}
                <div class="small text-muted">Seller</div>
                <div class="fw-semibold">${sellerDetails.name}</div>
              </div>

              <div class="d-flex flex-wrap gap-1 mb-3">
                ${(Array.isArray(detailsListing.tags) ? detailsListing.tags : []).map(t => `<a href="/pages/listings/browse.html?_tag=${encodeURIComponent(t)}" class="badge bg-light text-secondary border" aria-label="Filter by tag ${t}">#${t}</a>`).join('')}
              </div>
              <p class="card-text text-break">${detailsListing.description || 'No description provided'}</p>

              <div class="mt-auto">
                <div class="mb-3">
                  <div class="small text-muted">Highest bid</div>
                  <div class="bid-amount">${highestBid ? `${highestBid.amount} Credits` : '—'}</div>
                </div>
                <button class="btn btn-primary w-100" type="button" data-bs-toggle="modal" data-bs-target="#placeBidModal">Add a Bid</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-4 mt-1">
        <div class="col-lg-7">
          <div class="card shadow-sm">
            <div class="card-header d-flex align-items-center justify-content-between">
              <span class="fw-semibold">Previous Bids</span>
              <span class="badge bg-secondary">${bidsCount}</span>
            </div>
            <div class="card-body p-0">
              ${bidList}
            </div>
          </div>
        </div>
      </div>
    </div>`;


    // Mount gallery after HTML is injected
    const mount = document.getElementById('gallery-mount');
    if (mount) {
      const galleryEl = createMediaGallery(images, { containerId: 'details-media-gallery', showThumbnails: true });
      mount.appendChild(galleryEl);
      if (images.length > 1) {
        initializeGalleryNavigation(galleryEl, images);
      }
    }


    // Countdown for time remaining (moved to reusable helper)
    const timeEl = document.getElementById('time-remaining');
    if (timeEl && endsAtDate instanceof Date && !isNaN(endsAtDate.getTime())) {
      initCountdown(timeEl, endsAtDate, { urgentMs: 60 * 60 * 1000, endedText: 'Auction ended' });
    }

  } catch (error) {
    console.error(error);
  }
}