import { login } from '../../api/auth/login.js';
import togglePassword from '@/js/ui/common/togglePassword.js';


export function loginListener() {


  const form = document.getElementById('loginForm');

  if (form) {

    togglePassword(true);

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const userProfile = Object.fromEntries(formData.entries());

      console.log(userProfile); // Add this line to debug
      console.log(JSON.stringify(userProfile));

      login(userProfile);
    });
  }
}