import { startSession } from '../../api/auth/startSession.js';
import buildMenu from '../../ui/common/buildMenu.js';
import togglePassword from '@/js/ui/common/togglePassword.js';
import { displayMessage } from '@/js/ui/common/displayMessage.js';

/**
 * Sets up the event listener for the login form.
 */

export function loginListener() {
  const form = document.getElementById('loginForm');

  if (form) {
    togglePassword(true);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const userProfile = Object.fromEntries(formData.entries());

      try {
        await startSession({ email: userProfile.email, password: userProfile.password });

        buildMenu(); // Refresh the menu to reflect the authenticated state

        displayMessage('success', 'Login successful!');

        setTimeout(() => {
          window.location.href = '/pages/profile/index.html';
        }, 1000);
      } catch (error) {
        console.error('Unexpected error during registration:', error);

        displayMessage('danger', error.message);
      }
    });
  }
}
