export default function togglePassword(isLoginPage = false) {
  const togglePassword = document.querySelector('#togglePassword');
  const password = document.querySelector('#password');
  const confirmPassword = document.querySelector('#confirmPassword');

  if (togglePassword && password) {
    togglePassword.addEventListener('click', function() {
      if (isLoginPage) {
        // Login page: only one password field
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.textContent = type === 'password' ? '👁️' : '🙈';
      } else {
        // Register page: two password fields
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        if (confirmPassword) {
          confirmPassword.setAttribute('type', type);
        }
        this.textContent = type === 'password' ? '👁️' : '🙈';
      }
    });
  }
}