// Validation for placing bids
import { getTokenFromStorage } from '../helpers/storage.js';

export function validateBid(bidAmount, listingData, userProfile = null) {
  const profile = userProfile || getTokenFromStorage('profile');

  // Check if bidding on own item
  if (listingData.seller?.name === profile?.name) {
    return { isValid: false, message: 'You cannot bid on your own items.' };
  }

  // Check if the user has enough credits
  if (profile?.credits < bidAmount) {
    return {
      isValid: false,
      message: `Insufficient credits. You have ${profile.credits} credits, but need ${bidAmount} credits to place this bid.`,
    };
  }

  // Check if bid meets minimum requirement
  const highestBid = getHighestBid(listingData.bids);
  const minimumBid = (highestBid?.amount || 0) + 1;

  if (bidAmount < minimumBid) {
    const message = highestBid
      ? `Your bid must be higher than the current highest bid of ${highestBid.amount} credits.`
      : 'Minimum bid amount is 1 credit.';
    return { isValid: false, message };
  }

  return { isValid: true };
}

function getHighestBid(bids) {
  return bids?.length > 0
    ? bids.reduce((max, bid) => bid.amount > max.amount ? bid : max)
    : null;
}