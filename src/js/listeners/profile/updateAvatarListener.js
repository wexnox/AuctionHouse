import {saveTokenToStorage} from '../../helpers/storage.js';
import {updateUserAvatar} from '../../api/profile/updateAvatar.js';
import {Modal} from 'bootstrap';

export async function updateAvatarListener() {
  const form = document.querySelector('#updateAvatarForm');

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      console.log('Form submitted');

      const formData = new FormData(form);
      const avatarData = Object.fromEntries(formData.entries());
      const avatarUrl = avatarData.media;

      saveTokenToStorage('avatar', avatarUrl);
      try {
        await updateUserAvatar({avatar: avatarUrl});
        // hide the modal after updating the avatar
        const modalElement = document.getElementById('updateAvatarModal');
        if (modalElement) {
          const updateAvatarModal = new Modal(modalElement);
          updateAvatarModal.hide();
        }

        // user feedback upon successful update
        alert('Successfully updated avatar');

      } catch (error) {
        console.error('Error updating avatar:', error);

        // user feedback upon failed update
        alert('Failed to update avatar, please try again');
      }
    });
  } else {
    alert('Update avatar form not found. Please ensure the form is present on the page.');
  }
}