import { API_PROFILE_URL } from '../../api/constants.js';
import { authFetch } from '../../api/api.js';
import { getTokenFromStorage } from '../../helpers/storage.js';
import { Modal } from 'bootstrap';

const profileDOMElement = document.getElementById('userWrapper');

// TODO: Make better styling it looks like crap
// TODO: make a better solution for the backup image

/**
 * Renders the user profile on the page.
 * @param userInfo
 * @returns {Promise<void>}
 */
async function renderUserProfile(userInfo) {

  console.log(userInfo);

  const avatarSrc = userInfo.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  console.log(userInfo);

  profileDOMElement.innerHTML = `
        <div class="profile-container border-bottom shadow p-3 mb-5 d-flex flex-column align-items-center">
            <img class="mx-auto rounded profile-avatar"
            src="${avatarSrc}"
            alt=""
            width="100"
            height="90"
            loading="lazy" decoding="async" referrerpolicy="no-referrer"
            onerror="this.onerror=null;this.src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'">
            <h1 class="profile-name">${userInfo.name}</h1>
            <div class="profile-stats col-lg-6 mx-auto text-center">
                <p class="profile-stats-detail">
                Credits: ${userInfo.credits} | ${userInfo.wins.length} Wining Bids | ${userInfo._count.listings} Listings
                </p>
                <div class="d-flex gap-2 justify-content-center profile-action-btns">
                    <a href="../../pages/listings/create.html" class="btn btn-outline-primary btn-sm px-4" role="button">Create Listing</a>
                    <button type="button" class="btn btn-outline-primary btn-sm px-4" data-bs-toggle="modal" data-bs-target="#updateAvatarModal">Update Avatar</button>
                </div>
            </div>
        </div>`;
}

/**
 * Fetches the user profile and renders it on the page.
 * @returns {Promise<void>}
 */

export async function userProfileListener() {
  try {
    const userProfile = getTokenFromStorage('profile');
    if (!userProfile || !userProfile.name) {
      console.log('User not defined');
      return;
    }
    const requestURL = `${API_PROFILE_URL}/${userProfile.name}`;
    const response = await authFetch(requestURL, 'GET');
    const userInfo = await response.json();

    await renderUserProfile(userInfo);

    // Show the modal
    const updateAvatarModal = new Modal(document.getElementById('updateAvatarModal'));
    updateAvatarModal.hide();
  } catch (error) {
    console.log(error);
  }
}