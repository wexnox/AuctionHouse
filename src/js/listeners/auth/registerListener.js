import { register } from '../../api/auth/register.js';
import { displayMessage } from '@/js/ui/common/displayMessage.js';
import togglePassword from '../../ui/common/togglePassword.js';

export function setRegisterUserListener() {

  const form = document.getElementById('registerForm');

  if (form) {
    // Initialize password toggle functionality
    togglePassword();

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const userProfile = Object.fromEntries(formData.entries());

      const emailRegex = /^[\w\-.]+@(stud\.)?noroff\.no$/;
      if (!emailRegex.test(userProfile.email)) {
        return displayMessage('danger', 'Registration is only available for noroff.no or stud.noroff.no email addresses');
      }

      // Check password match
      const password = userProfile.password;
      const confirmPassword = userProfile.confirmPassword;

      if (password !== confirmPassword) {
        return displayMessage('danger', 'Passwords do not match');
      }

      delete userProfile.confirmPassword;

      // console.log(userProfile);
      // console.log(JSON.stringify(userProfile));

      register(userProfile);

    });

    const emailInput = document.getElementById('email');
    if (emailInput) {
      emailInput.addEventListener('input', function() {
        const emailValue = this.value;
        const emailRegex = /^[\w\-.]+@(stud\.)?noroff\.no$/;
        const isValid = emailRegex.test(emailValue);

        if (emailValue && !isValid) {
          this.setCustomValidity('Only noroff.no or stud.noroff.no email addresses are allowed');
          this.classList.add('is-invalid');
        } else {
          this.setCustomValidity('');
          this.classList.remove('is-invalid');
        }
      });
    }

    // password confirmation validation
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    if (passwordInput && confirmPasswordInput) {
      const validatePasswords = function() {
        if (confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value) {
          confirmPasswordInput.setCustomValidity('Passwords do not match');
          confirmPasswordInput.classList.add('is-invalid');
        } else {
          confirmPasswordInput.setCustomValidity('');
          confirmPasswordInput.classList.remove('is-invalid');
        }
      };

      passwordInput.addEventListener('input', validatePasswords);
      confirmPasswordInput.addEventListener('input', validatePasswords);
    }


  }
}

