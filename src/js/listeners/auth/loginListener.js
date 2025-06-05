import { login } from '../../api/auth/login.js';
import togglePassword from '@/js/ui/common/togglePassword.js';
import { displayMessage } from '@/js/ui/common/displayMessage.js';


export function loginListener() {


  const form = document.getElementById('loginForm');

  if (form) {

    togglePassword(true);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const userProfile = Object.fromEntries(formData.entries());

      // console.log(userProfile); // Add this line to debug
      // console.log(JSON.stringify(userProfile));

      try {

        await login(userProfile);

        displayMessage('success', 'Login successful!');

        setTimeout(() => {
          window.location.href = '/pages/profile/index.html';
        }, 1000);

      } catch (error) {

        console.error('Unexpected error during registration:', error);

        displayMessage('danger', 'An unexpected error occurred. Please try again.');
      }

    });
  }
}