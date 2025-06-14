import { API_PROFILE_URL, API_LISTINGS_URL } from '../constants.js';
import { getTokenFromStorage } from '../../helpers/storage.js';
import { authFetch } from '../api.js';
import createHtmlCards from '@/js/ui/common/createHtmlCards.js';


function getUserName() {
  const user = getTokenFromStorage('profile');
  return user.name;
}

function getProfileListingsUrl(userName) {
  return `${API_PROFILE_URL}/${userName}${API_LISTINGS_URL}?_seller=true&_bids=true`;
}

export async function getUserListing() {

  const userName = getUserName();

  const url = getProfileListingsUrl(userName);

  try {

    const response = await authFetch(url);
    const data = await response.json();

    if (response.status !== 200) {
      console.log(`Error${response.status}: ${data.message}`);
      return;
    }

    const container = document.getElementById('itemsList');

    if (!container) {
      console.error('User listings container not found in DOM.');
      return;
    }
    container.innerHTML = '';


    createHtmlCards(data, container);
  } catch (error) {
    console.log(error);
  }
}