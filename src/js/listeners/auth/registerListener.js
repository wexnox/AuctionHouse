import { register } from '../../api/auth/register.js';
import { displayMessage } from '@/js/ui/common/displayMessage.js';
import togglePassword from '../../ui/common/togglePassword.js';
import { isValidEmail } from '@/js/utils/validation.js';

/**
 * Sets up the event listener for the registration form.
 */
export function setRegisterUserListener() {
  const form = document.getElementById('registerForm');

  if (form) {
    togglePassword();

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const userProfile = Object.fromEntries(formData.entries());

      if (!isValidEmail(userProfile.email)) {
        return displayMessage(
          'danger',
          'Registration is only available for noroff.no or stud.noroff.no email addresses'
        );
      }

      const password = userProfile.password;
      const confirmPassword = userProfile.confirmPassword;

      if (password.length < 8) {
        return displayMessage('danger', 'Password must be at least 8 characters long');
      }

      if (password !== confirmPassword) {
        return displayMessage('danger', 'Passwords do not match');
      }
      // TODO: remove this console.warn
      if (password.length < 8) {
        // console.warn('Password length validation failed', { password });
        displayMessage('danger', 'Password must be at least 8 characters long' + password);
      }

      delete userProfile.confirmPassword;
      try {
        await register(userProfile);
      } catch (error) {
        // console.error('Unexpected error during registration:', error);
        displayMessage('danger', 'An unexpected error occurred. Please try again.' + error);
      }
    });

    const emailInput = document.getElementById('email');
    if (emailInput) {
      emailInput.addEventListener('input', function () {
        const emailValue = this.value;
        const isValid = isValidEmail(emailValue);

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
      const validatePasswords = function () {
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
