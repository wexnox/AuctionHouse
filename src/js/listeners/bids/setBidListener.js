import { placeBidOnItem } from '../../api/listings/placeBid.js';
import { getCurrentUserProfile } from '../../api/profile/getCurrentUser.js';
import { getListingDetails } from '../../api/listings/getListingDetails.js';
import { validateBid } from '../../utils/bidValidation.js';
import { createBidErrorContainer, showBidError, hideBidError } from '../../ui/modal/bidErrorHandler.js';
import { getTokenFromStorage } from '../../helpers/storage.js';
import handleErrors from '../../api/handleErrors.js';
import { Modal } from 'bootstrap';

export async function placeBidListener() {
  const form = document.querySelector('#bidForm');

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const bidAmountInput = document.querySelector('#bidAmount');
      const bidAmount = Number(bidAmountInput.value);
      const errorContainer = createBidErrorContainer();

      hideBidError(errorContainer);

      const params = new URLSearchParams(window.location.search);
      const itemId = params.get('id');

      if (!itemId || !bidAmount) {
        showBidError(errorContainer, 'Please enter a valid bid amount');
        return;
      }

      try {

        const listingData = await getListingDetails(itemId);

        let userProfile;
        try {
          userProfile = await getCurrentUserProfile();
        } catch (profileError) {
          console.warn('Could not fetch fresh profile, using cached data:', profileError);
          userProfile = getTokenFromStorage('profile');
        }

        const validationResult = validateBid(bidAmount, listingData, userProfile);

        if (!validationResult.isValid) {
          showBidError(errorContainer, validationResult.message);
          return;
        }

        await placeBidOnItem(itemId, bidAmount);


        const modalElement = document.getElementById('placeBidModal');
        if (modalElement) {
          const placeBidModal = new Modal(modalElement);
          placeBidModal.hide();
        }

        console.log('Bid placed successfully');
      } catch (error) {
        console.error('Error placing bid:', error);

        try {
          handleErrors(error);
        } catch (handledError) {
          showBidError(errorContainer, handledError.message || 'An error occurred while placing your bid');
        }
      }
    });
  }
}