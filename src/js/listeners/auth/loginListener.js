import {login} from '../../api/auth/login.js';


export function loginListener() {


  const form = document.getElementById('loginForm');

  if (form) {
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